import { NextResponse } from 'next/server';

export async function GET() {
  const testUrl = 'https://spf.shopee.co.th/181xwuLat';

  try {
    const response = await fetch(testUrl, {
      method: 'GET',
      redirect: 'follow', // ให้ตามรอย Redirect อัตโนมัติ
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
      }
    });

    return NextResponse.json({
      message: response.url !== testUrl ? "✅ SUCCESS: แกะลิงก์สำเร็จด้วย HTTP Request!" : "❌ FAILED: ลิงก์ไม่เปลี่ยน (อาจจะตาย หรือโดนบล็อคด้วย JS)",
      original_url: testUrl,
      final_url: response.url,
      status_code: response.status,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      success: false
    });
  }
}
