import { NextResponse } from 'next/server';

export const revalidate = 300; // cache for 5 minutes (optional)

export async function GET() {
  const r = await fetch('https://global.gcping.com/api/endpoints', {
    // Avoid sending your site's cookies, keep it clean
    cache: 'no-store',
  });
  if (!r.ok) {
    return NextResponse.json({ error: 'failed to fetch endpoints' }, { status: 502 });
  }
  const data = await r.json();
  return NextResponse.json(data, {
    // CORS headers optional (same-origin fetch from your app doesn’t need these)
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
