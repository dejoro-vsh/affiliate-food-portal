import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// กำหนดขีดจำกัดเวลา (Optional)
export const maxDuration = 10; 
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Initialize Redis 
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

async function resolveLink(url: string, inject_affiliate: boolean) {
  if (!url) throw new Error('URL is required');

  // 1. Check Redis Cache
  const cacheKey = `resolved_url:${url}`;
  const cachedUrl = await redis.get<string>(cacheKey);
  
  if (cachedUrl) {
    return {
      status: 'success',
      original_url: url,
      resolved_url: cachedUrl,
      source: 'redis_cache'
    };
  }

  let finalUrl = url;
  let apiStatus = null;
  let apiData: any = null;
  let pageTitle = null;

  // 2. Try Shopee Internal API first (Lightning fast, no Puppeteer needed)
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname.replace(/^\/+/, '');
    if (path) {
      const apiUrl = `https://spf.shopee.co.th/api/v4/pages/is_short_url/?path=${path}`;
      const res = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15'
        }
      });
      apiStatus = res.status;
      if (res.ok) {
        const json = await res.json();
        apiData = json;
        if (json && json.data && json.data.url) {
          finalUrl = json.data.url;
        }
      } else {
        apiData = await res.text();
      }
    }
  } catch(e: any) {
    apiData = e.message;
  }

  // 3. Fallback to Puppeteer if API failed
  let isTimeout = false;
  let errorMessage = null;

  if (finalUrl === url) {
    const executablePath = await chromium.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v123.0.1/chromium-v123.0.1-pack.tar"
    );
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath || undefined,
      headless: chromium.headless as any,
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1');

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => {
      isTimeout = true;
      reject(new Error('Timeout after 8 seconds'));
    }, 8000));
    
    // ดักจับ Network Response ทุกเส้นที่เบราว์เซอร์โหลด
    let interceptedUrl = '';
    page.on('response', async (response) => {
      if (response.url().includes('is_short_url')) {
        try {
          const json = await response.json();
          if (json && json.data && json.data.url) {
            interceptedUrl = json.data.url;
          }
        } catch (e) {}
      }
    });

    const gotoPromise = async () => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 2000));
      return page.url();
    };

    let allPageLinks: string[] = [];

    try {
      await Promise.race([gotoPromise(), timeoutPromise]);
      pageTitle = await page.title();

      // ดึงทุกลิงก์ที่โผล่บนหน้าเว็บ
      allPageLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'))
          .map(a => a.href)
          .filter(href => href && href.includes('shopee'));
        return Array.from(new Set(links));
      });

      if (interceptedUrl) {
         finalUrl = interceptedUrl;
      } else {
         finalUrl = await page.url();
      }

    } catch (e: any) {
      errorMessage = e.message;
      console.error("Puppeteer resolve error/timeout:", e.message);
    } finally {
      await browser.close();
    }
  }

  // 5. ฝังรหัส Affiliate
  let resolvedUrl = finalUrl;
  if (inject_affiliate && resolvedUrl !== url) {
    try {
      const urlObj = new URL(resolvedUrl);
      urlObj.searchParams.set('aff_id', 'FlashFoodie'); // ตัวอย่างการฝัง Tracking
      resolvedUrl = urlObj.toString();
    } catch(e) {}
  }

  // 6. บันทึกลง Redis Cache (อายุ 7 วัน)
  if (resolvedUrl !== url) {
    await redis.set(cacheKey, resolvedUrl, { ex: 604800 });
  }

  return {
    status: 'success',
    original_url: url,
    resolved_url: resolvedUrl,
    source: 'live_compute',
    debug: {
      is_timeout: isTimeout,
      error_message: errorMessage,
      api_status: apiStatus,
      api_data: apiData,
      page_title: pageTitle,
      all_links: allPageLinks
    }
  };
}

export async function POST(request: Request) {
  try {
    const { url, inject_affiliate } = await request.json();
    const result = await resolveLink(url, inject_affiliate);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

// แปะ GET เข้ามาด้วย เผื่อทดสอบผ่าน URL บน Browser ได้ง่ายๆ
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    if (!url) return NextResponse.json({ error: 'Please provide ?url= parameter' }, { status: 400 });
    
    const result = await resolveLink(url, true);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
