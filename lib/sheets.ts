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
// EXPANDED: "First Web" Complete Intent Clusters (5 Pages)
const MOCK_DATA: PageData[] = [
  // 1. Commercial (The "Money" Page)
  {
    slug: "best-wireless-headphones-2026",
    keyword: "Best Wireless Headphones",
    title: "Best Wireless Headphones 2026: Sony vs Bose vs Apple Review",
    description: "We tested the top noise-cancelling headphones. See why the Sony WH-1000XM5 wins for value, while Apple dominates effectively.",
    intro_text: "Finding the perfect pair of wireless headphones is difficult with so many options. We tested the market leaders to bring you the absolute best choices for noise cancellation, sound quality, and comfort in 2026.",
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
  // 2. Transactional (The "Deal" Page)
  {
    slug: "sony-wh-1000xm5-discount-code",
    keyword: "Sony WH-1000XM5 Discount",
    title: "Sony WH-1000XM5 Discount Code & Best Price (Verified 2026)",
    description: "Looking for the best deal on Sony WH-1000XM5? We track price drops, coupons, and student discounts daily.",
    intro_text: "Don't pay full price. The Sony WH-1000XM5 often sees flash sales and hidden discounts. We've aggregated the current best live offers to help you save up to 20% instantly.",
    affiliate_link: "https://amazon.com/sony-xm5-deal",
    products: [
      {
        name: "Amazon Renewed",
        price: "$279.00",
        features: ["Certified Refurbished", "90-Day Guarantee", "Like New Condition"],
        link: "https://amazon.com/sony-xm5-renewed"
      },
      {
        name: "Sony WH-1000XM5 (New)",
        price: "$348.00",
        features: ["Full Warranty", "Brand New", "Best Value Deal"],
        isBestValue: true,
        link: "https://amazon.com/sony-xm5"
      },
      {
        name: "Bundle Deal",
        price: "$398.00",
        features: ["Includes Power Bank", "Hard Case", "Extended Warranty"],
        link: "https://amazon.com/sony-xm5-bundle"
      }
    ]
  },
  // 3. Comparative (The "Versus" Page)
  {
    slug: "sony-wh-1000xm5-vs-bose-quietcomfort-45",
    keyword: "Sony WH-1000XM5 vs Bose QC45",
    title: "Sony WH-1000XM5 vs Bose QuietComfort 45: Which is Better in 2026?",
    description: "A detailed head-to-head comparison of the two noise-cancelling giants. We analyze sound, comfort, and battery life.",
    intro_text: "It's the ultimate battle: Sony's tech-heavy flagship versus Bose's legendary comfort. We spent 50 hours with both headphones to help you decide which one deserves your money.",
    affiliate_link: "https://amazon.com/sony-vs-bose",
    products: [
      {
        name: "Bose QuietComfort 45",
        price: "$329.00",
        features: ["Supreme Comfort", "Physical Buttons", "Classic Design", "Foldable"],
        link: "https://amazon.com/bose-qc45"
      },
      {
        name: "Sony WH-1000XM5",
        price: "$348.00",
        features: ["Better ANC", "Smart Features", "Longer Battery", "Modern Look"],
        isBestValue: true,
        link: "https://amazon.com/sony-xm5"
      }
    ]
  },
  // 4. Informational (The "Guide" Page)
  {
    slug: "wireless-headphones-buying-guide-beginners",
    keyword: "Wireless Headphones Guide",
    title: "How to Choose Wireless Headphones: A Beginner's Guide (2026)",
    description: "Confused by codecs, drivers, and ANC? We explain everything you need to know before buying wireless headphones.",
    intro_text: "Active Noise Cancellation. LDAC. Multipoint Connection. The jargon can be overwhelming. This guide breaks down exactly what features matter for your lifestyle and budget.",
    affiliate_link: "https://amazon.com/headphones-guide",
    products: [
      {
        name: "Budget Choice",
        price: "$50-$100",
        features: ["Basic ANC", "Standard Audio", "Good for Commute"],
        link: "https://amazon.com/budget-headphones"
      },
      {
        name: "Sweet Spot (Best Value)",
        price: "$200-$350",
        features: ["Premium ANC", "App Support", "All-Day Comfort"],
        isBestValue: true,
        link: "https://amazon.com/best-value-headphones"
      },
      {
        name: "Audiophile Tier",
        price: "$500+",
        features: ["Lossless Audio", "Exotic Materials", "Studio Quality"],
        link: "https://amazon.com/audiophile-headphones"
      }
    ]
  },
  // 5. Alternative (The "Competitor" Page)
  {
    slug: "top-alternatives-to-sony-wh-1000xm5",
    keyword: "Sony WH-1000XM5 Alternatives",
    title: "Top 5 Alternatives to Sony WH-1000XM5 (Cheaper & Better Options)",
    description: "Love the Sony XM5 but hate the price? Here are the best alternatives that deliver similar performance for less.",
    intro_text: "The Sony WH-1000XM5 is great, but it's not the only game in town. Whether you want more bass, a cheaper price tag, or a more premium build, these 5 alternatives might be a better fit for you.",
    affiliate_link: "https://amazon.com/sony-alternatives",
    products: [
      {
        name: "Sennheiser Momentum 4",
        price: "$299.00",
        features: ["60-Hour Battery", "Superior Sound", "Fabric Design"],
        link: "https://amazon.com/sennheiser-m4"
      },
      {
        name: "Sony WH-1000XM4",
        price: "$248.00",
        features: ["Foldable Design", "Similar ANC", "Lower Price"],
        isBestValue: true,
        link: "https://amazon.com/sony-xm4"
      },
      {
        name: "Bowers & Wilkins Px7 S2",
        price: "$399.00",
        features: ["Luxury Build", "Dynamic Drivers", "Stylish Look"],
        link: "https://amazon.com/bw-px7"
      }
    ]
  },
  // Example Regional Page (Kept for reference)
  {
    slug: "crm-for-real-estate-agents-in-brno",
    keyword: "CRM pro makléře Brno",
    title: "Best CRM for Real Estate Agents in Brno (2026 Review)",
    description: "Compare the top CRM systems for real estate professionals in Brno.",
    intro_text: "If you are working in real estate in Brno, you need a CRM that handles local nuances. We compared the top local and international providers to find the perfect match for independent agents and large brokerages.",
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
