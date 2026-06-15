import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// กำหนดขีดจำกัดเวลา (Optional)
export const maxDuration = 10; 

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

  // 2. Setup Browser on Vercel
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
  
  // 3. ปลอมตัวเป็นมือถือ
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1');

  let finalUrl = url;

  let isTimeout = false;
  let errorMessage = null;

  // 4. Promise.race เพื่อจับเวลาไม่ให้เกิน 8 วินาที
  const timeoutPromise = new Promise((_, reject) => setTimeout(() => {
    isTimeout = true;
    reject(new Error('Timeout after 8 seconds'));
  }, 8000));
  
  const gotoPromise = async () => {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    // ให้เวลามันรันคำสั่งเด้งหน้าเว็บสักนิด
    await new Promise(r => setTimeout(r, 2000));
    return page.url();
  };

  try {
    finalUrl = await Promise.race([gotoPromise(), timeoutPromise]) as string;
  } catch (e: any) {
    errorMessage = e.message;
    console.error("Puppeteer resolve error/timeout:", e.message);
  } finally {
    await browser.close();
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
      error_message: errorMessage
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
