import { NextResponse } from 'next/server';
// We import the logic from the script essentially, or trigger it.
// Since Vercel Cron hits an endpoint, we need to run the logic here.
import { getSheetData } from '@/lib/sheets';

export async function GET(request: Request) {
  // Security check: Verify Vercel Cron signature or just use a secret query param if strictly private
  // Vercel handles this via CRON_SECRET usually, but for simplicity:
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return new NextResponse('Missing INDEXNOW_KEY', { status: 500 });
  }

  try {
    const pages = await getSheetData();
    // Use the host from the request or env
    const host = request.headers.get('host') || 'connector-app-flame.vercel.app';

    const urlList = pages.map(page => `https://${host}/${page.slug}`);

    const payload = {
      host: host,
      key: key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: urlList
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
        return new NextResponse(JSON.stringify({ success: true, count: urlList.length }), { status: 200 });
    } else {
        const errorText = await response.text();
        return new NextResponse(`IndexNow Error: ${errorText}`, { status: response.status });
    }

  } catch (error) {
    return new NextResponse(`Internal Error: ${error}`, { status: 500 });
  }
}
