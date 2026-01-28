import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export interface ProductData {
  name: string;
  price: string;
  features: string[];
  isBestValue?: boolean;
  link?: string;
}

export interface PageData {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  intro_text: string;
  products: ProductData[];
  affiliate_link: string;
}

// Mock data for development or fallback
const MOCK_DATA: PageData[] = [
  {
    slug: "best-wireless-headphones-2026",
    keyword: "Best Wireless Headphones",
    title: "Best Wireless Headphones 2026: Sony vs Bose vs Apple Review",
    description: "I tested the top noise-cancelling headphones. See why the Sony WH-1000XM5 wins for value, while Apple dominates effectively. Honest results inside.",
    intro_text: "Finding the perfect pair of wireless headphones is difficult with so many options. I personally tested the market leaders to bring you the absolute best choices for noise cancellation, sound quality, and comfort in 2026 based on my hands-on experience.",
    affiliate_link: "https://amazon.com/s?k=wireless+headphones&tag=connector-20",
    products: [
      {
        name: "Anker Soundcore Q45",
        price: "$149.99",
        features: ["98% Noise Reduction", "50-Hour Battery", "Hi-Res Audio", "Budget Friendly"],
        link: "https://amazon.com/anker-q45"
      },
      {
        name: "Sony WH-1000XM5",
        price: "$348.00",
        features: ["Industry-Leading ANC", "Crystal Clear Calls", "30-Hour Battery", "Lightweight Design"],
        isBestValue: true,
        link: "https://amazon.com/sony-xm5"
      },
      {
        name: "Apple AirPods Max",
        price: "$549.00",
        features: ["Computational Audio", "Premium Build", "Spatial Audio", "Seamless Ecosystem"],
        link: "https://amazon.com/airpods-max"
      }
    ]
  },
  {
    slug: "crm-for-real-estate-agents-in-brno",
    keyword: "CRM pro makléře Brno",
    title: "Best CRM for Real Estate Agents in Brno (2026 Review)",
    description: "Compare the top CRM systems for real estate professionals in Brno. I tested features, pricing, and localization to help you choose the best platform for 2026.",
    intro_text: "If you are working in real estate in Brno, you need a CRM that handles local nuances. I tested the top local and international providers to find the perfect match for independent agents and large brokerages based on hands-on usage.",
    affiliate_link: "https://example.com/affiliate",
    products: [
      {
        name: "Budget CRM",
        price: "$$",
        features: ["Basic Contact Mgmt", "Email Integration", "Mobile App"],
        link: "https://example.com/budget"
      },
      {
        name: "Value CRM (Top Pick)",
        price: "$$$",
        features: ["Advanced Pipelines", "Brno Map Integration", "Auto-Dialer", "Czech Support"],
        isBestValue: true,
        link: "https://example.com/value"
      },
      {
        name: "Premium Enterprise",
        price: "$$$$",
        features: ["AI Analytics", "Full Automation", "Dedicated Account Manager"],
        link: "https://example.com/premium"
      }
    ]
  }
];

export async function getSheetData(): Promise<PageData[]> {
  // If credentials are missing, return mock data to prevent build failure
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.warn("Missing Google Sheets credentials. Serving mock data.");
    return MOCK_DATA;
  }

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    return rows.map(row => {
      let products: ProductData[] = [];
      try {
        products = JSON.parse(row.get('json_data') || '[]');
      } catch (e) {
        console.error(`Failed to parse JSON for slug ${row.get('slug')}`, e);
      }

      return {
        slug: row.get('slug'),
        keyword: row.get('keyword'),
        title: row.get('title'),
        description: row.get('description'),
        intro_text: row.get('intro_text'),
        products: products,
        affiliate_link: row.get('affiliate_link'),
      };
    });
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return MOCK_DATA; // Fallback on error
  }
}
