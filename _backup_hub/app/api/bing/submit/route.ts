import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Logic for IndexNow to Bing
    // This is the manual trigger endpoint
    const apiKey = process.env.BING_API_KEY;
    const host = process.env.NEXT_PUBLIC_APP_URL?.replace('https://', '').replace('http://', '');

    if (!apiKey || !host) {
      console.error('Missing Bing API Configuration');
      // For now, simulate success in dev
      return NextResponse.json({ message: 'Configuration missing, skipping IndexNow' }, { status: 200 });
    }

    const response = await fetch(`https://api.indexnow.org/indexnow?url=${url}&key=${apiKey}&keyLocation=https://${host}/${apiKey}.txt`, {
      method: 'POST',
    });

    if (response.ok) {
        return NextResponse.json({ message: 'Submitted to Bing IndexNow' });
    } else {
        return NextResponse.json({ error: 'Failed to submit to Bing' }, { status: response.status });
    }

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
