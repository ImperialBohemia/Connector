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
    slug: "crm-for-real-estate-agents-in-brno",
    keyword: "CRM pro makléře Brno",
    title: "Best CRM for Real Estate Agents in Brno (2026 Review)",
    description: "Compare the top CRM systems for real estate professionals in Brno.",
    intro_text: "If you are working in real estate in Brno, you need a CRM that handles local nuances.",
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
  },
  {
    slug: "ai-video-generators",
    keyword: "AI Video Generators",
    title: "Top AI Video Generators vs Human Editors",
    description: "Synthesia vs HeyGen vs Murf - which one wins?",
    intro_text: "Video production is changing. Here is how AI tools stack up.",
    affiliate_link: "#",
    products: [
       {
        name: "Starter Tool",
        price: "$29/mo",
        features: ["5 mins video", "10 avatars"],
        link: "#"
      },
      {
        name: "Pro Suite (Best Value)",
        price: "$99/mo",
        features: ["Unlimited video", "Custom Avatar", "4K Export"],
        isBestValue: true,
        link: "#"
      },
      {
        name: "Agency Plan",
        price: "$499/mo",
        features: ["API Access", "SSO", "Priority Support"],
        link: "#"
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
