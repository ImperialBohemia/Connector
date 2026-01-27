import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }

  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'SERP API Key missing' }, { status: 500 });
  }

  // Basic security check: Require a secret header
  const authHeader = request.headers.get('x-connector-secret');
  if (authHeader !== process.env.JULES_API_KEY) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}&engine=bing`); // Using Bing engine as requested
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('SERP Error:', error);
    return NextResponse.json({ error: 'Failed to fetch SERP data' }, { status: 500 });
  }
}
