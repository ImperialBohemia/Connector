import 'dotenv/config';
import { getSheetData } from '../lib/sheets';
// Note: In a real script we might need to use a fetch polyfill or node-fetch if using older Node,
// but Next.js environment usually handles fetch.
// Since this is a standalone script, we rely on Node 18+ native fetch.

const BING_API_ENDPOINT = 'https://api.indexnow.org/indexnow';
const HOST = 'connector-app-flame.vercel.app'; // Defined in memory
const KEY_LOCATION = `https://${HOST}/key.txt`; // Assuming key is named key.txt or similar

async function submitToIndexNow() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.error("Error: INDEXNOW_KEY is not defined in environment variables.");
    process.exit(1);
  }

  console.log("Fetching URLs from Google Sheets...");
  // We need to handle the fact that getSheetData is designed for the Next.js app context
  // but it should work if env vars are present.
  const pages = await getSheetData();

  const urlList = pages.map(page => `https://${HOST}/${page.slug}`);
  console.log(`Found ${urlList.length} URLs to submit.`);

  const payload = {
    host: HOST,
    key: key,
    keyLocation: `https://${HOST}/${key}.txt`, // Matching the route logic in app/[filename]
    urlList: urlList
  };

  try {
    console.log("Submitting to IndexNow...");
    const response = await fetch(BING_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200 || response.status === 202) {
      console.log("Success! URLs submitted to IndexNow.");
    } else {
      console.error(`Failed to submit. Status: ${response.status}`);
      console.error(await response.text());
    }
  } catch (error) {
    console.error("Network error during submission:", error);
  }
}

submitToIndexNow();
