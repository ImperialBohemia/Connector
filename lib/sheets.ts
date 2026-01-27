import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export interface ProductData {
  name: string;
  price: string;
  rating: number; // 1-5
  description: string;
  features: string[];
  imageUrl: string;
  affiliateLink: string;
  isBestValue?: boolean;
}

export interface VerdictData {
  summary: string;
  score: number;
  pros: string[];
  cons: string[];
}

export interface PageData {
  slug: string;
  keyword: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  date: string;
  heroImage: string;
  verdict: VerdictData;
  content: string; // HTML or Markdown
  faq: { question: string; answer: string }[];
  products: ProductData[];
  affiliate_link: string;
}

// Mock data for development or fallback
const MOCK_DATA: PageData[] = [
  {
    slug: "best-wireless-headphones-2026",
    keyword: "Best Wireless Headphones",
    title: "Best Wireless Headphones 2026: Sony vs Bose vs Apple",
    subtitle: "We tested 30+ headphones to find the absolute best noise cancellation, sound quality, and comfort for every budget.",
    description: "The definitive guide to the best wireless headphones in 2026. We test Sony, Apple, Bose, and more.",
    author: "Jules Connector",
    date: "February 2026",
    heroImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1920&auto=format&fit=crop",
    verdict: {
      score: 9.4,
      summary: "The Sony WH-1000XM5 remains the king of the hill in 2026. While the AirPods Max offers slightly better build quality, the Sony XM5 delivers 98% of the performance for nearly half the price, making it the undeniable 'Goldilocks' choice for most people.",
      pros: ["Industry-leading Noise Cancellation", "Incredible 30-hour battery life", "Lightweight and comfortable for long flights", "Multi-point connection works flawlessly"],
      cons: ["Plastic build feels less premium than Apple", "Non-foldable design takes up more bag space"]
    },
    content: `
      <p>Finding the perfect pair of wireless headphones has never been harder—or better. In 2026, the gap between "good" and "great" is narrowing, but a few standouts still rise above the noise.</p>
      <p>We spent the last three months testing the latest flagship models from Sony, Bose, Apple, and Sennheiser in real-world conditions: crowded subways, noisy open-plan offices, and long-haul flights.</p>
      <h3>How We Tested</h3>
      <p>Our testing criteria focuses on three pillars: <strong>Sound Quality</strong> (clarity, bass response), <strong>ANC Performance</strong> (low-frequency rumble vs high-pitched chatter), and <strong>Comfort</strong> (clamping force and heat build-up).</p>
    `,
    faq: [
      { question: "Is noise cancelling worth the extra money?", answer: "Absolutely. If you commute, travel, or work in an office, active noise cancellation (ANC) protects your hearing by allowing you to listen at lower volumes while blocking out distractions." },
      { question: "Do these headphones work with Android and iPhone?", answer: "Yes, all headphones on this list are Bluetooth 5.3 compatible and work seamlessly with both iOS and Android devices." }
    ],
    affiliate_link: "https://amazon.com/s?k=wireless+headphones&tag=connector-20",
    products: [
      {
        name: "Sony WH-1000XM5",
        price: "$348.00",
        rating: 4.8,
        description: "The best all-around headphones you can buy. Incredible silence, fantastic sound, and all-day comfort.",
        imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
        features: ["Industry-Leading ANC", "Crystal Clear Calls", "30-Hour Battery"],
        isBestValue: true,
        affiliateLink: "https://amazon.com/sony-xm5"
      },
      {
        name: "Apple AirPods Max",
        price: "$549.00",
        rating: 4.6,
        description: "The ultimate luxury choice for Apple users. Heavy, premium materials and cinema-like spatial audio.",
        imageUrl: "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=1000&auto=format&fit=crop",
        features: ["Computational Audio", "Stainless Steel Frame", "Spatial Audio"],
        affiliateLink: "https://amazon.com/airpods-max"
      },
      {
        name: "Anker Soundcore Q45",
        price: "$149.99",
        rating: 4.3,
        description: "The budget king. Delivers 80% of the Sony experience for a fraction of the price. Great for students.",
        imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
        features: ["98% Noise Reduction", "50-Hour Battery", "Hi-Res Audio LDAC"],
        affiliateLink: "https://amazon.com/anker-q45"
      }
    ]
  },
  {
    slug: "crm-for-real-estate-agents-in-brno",
    keyword: "CRM pro makléře Brno",
    title: "Best CRM for Real Estate Agents in Brno (2026 Review)",
    subtitle: "Find the perfect CRM to manage your Brno property portfolio.",
    description: "Compare the top CRM systems for real estate professionals in Brno.",
    author: "Jan Novak",
    date: "January 2026",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920&auto=format&fit=crop",
    verdict: {
      score: 8.9,
      summary: "For agents in Brno, local integration matters. That's why RealBrno Pro takes the top spot despite being smaller than Salesforce.",
      pros: ["Czech Language Support", "Direct connection to Sreality.cz", "Automated invoicing (Faktury)"],
      cons: ["Mobile app is clunky", "Limited API integrations"]
    },
    content: "<p>Real estate in Brno requires specific tools...</p>",
    faq: [{ question: "Is it in Czech?", answer: "Yes." }],
    affiliate_link: "https://example.com/affiliate",
    products: [
      {
        name: "RealBrno Pro (Top Pick)",
        price: "1200 CZK/mo",
        rating: 4.7,
        description: "Designed specifically for the Czech market with direct exports to major portals.",
        imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
        features: ["Sreality Export", "Czech Support", "Katastr Integration"],
        isBestValue: true,
        affiliateLink: "https://example.com/value"
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
        subtitle: row.get('subtitle') || "Expert Review",
        description: row.get('description'),
        author: row.get('author') || "Connector Team",
        date: row.get('date') || new Date().getFullYear().toString(),
        heroImage: row.get('hero_image') || "",
        verdict: {
            score: parseFloat(row.get('score')) || 9.0,
            summary: row.get('verdict_summary') || "Excellent choice.",
            pros: (row.get('pros') || "").split('\n'),
            cons: (row.get('cons') || "").split('\n')
        },
        content: row.get('content') || "",
        faq: [], // TODO: Add column for JSON FAQ
        products: products,
        affiliate_link: row.get('affiliate_link'),
      };
    });
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return MOCK_DATA; // Fallback on error
  }
}
