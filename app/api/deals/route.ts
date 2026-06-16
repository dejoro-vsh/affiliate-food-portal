import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis 
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const deals = await redis.get('flashfoodie_deals') || { campaigns: [], baitDeals: [] };
    return NextResponse.json({ status: 'success', data: deals });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Validate data structure loosely
    if (!data.campaigns || !data.baitDeals) {
      return NextResponse.json({ status: 'error', message: 'Invalid payload' }, { status: 400 });
    }
    
    // Save to Redis
    await redis.set('flashfoodie_deals', data);
    
    return NextResponse.json({ status: 'success', message: 'Deals updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
