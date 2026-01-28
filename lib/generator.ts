import { PageData, ProductData } from "./sheets";
import { checkKeywordCompetition } from "./bing-research";

// Templates for Long-Tail Keyword Clustering with "Hypnotic" Copy + E-E-A-T (2026 Standards)
const INTENT_TEMPLATES = [
  {
    suffix: "Review",
    titleTemplate: "{Product} Review 2026: I Tested It for 30 Days (Honest Results)",
    intent: "Commercial Investigation",
    introTemplate: "Is {Product} actually worth the hype in {Year}? I spent the last month testing every feature, button, and claim to reveal the truth. Before you spend a dime, read my unfiltered verdict on whether this is a game-changer or a waste of money."
  },
  {
    suffix: "Discount Code",
    titleTemplate: "Exclusive {Product} Discount Codes & Deals (Verified Active)",
    intent: "Transaction",
    introTemplate: "Stop paying full price! I've personally verified these active deals for {Product}. Lock in the lowest possible rate today with our verified 'Best Value' pricing strategy."
  },
  {
    suffix: "Alternative",
    titleTemplate: "Top 5 {Product} Alternatives Better Than The Original?",
    intent: "Comparison",
    introTemplate: "Thinking about {Product}? It's good, but is it the *best*? I compared it side-by-side against top competitors to see which tool actually delivers more bang for your buck in {Year}."
  },
  {
    suffix: "for Beginners",
    titleTemplate: "{Product} for Beginners: The Ultimate Crash Course",
    intent: "Informational",
    introTemplate: "Overwhelmed by {Product}? You shouldn't be. My hands-on guide breaks down exactly how to get started, avoid common rookie mistakes, and master the platform in minutes based on real-world usage."
  },
  {
    suffix: "vs Competitors",
    titleTemplate: "{Product} vs The Competition: The Clear Winner Revealed",
    intent: "Comparison",
    introTemplate: "The market is crowded. We pitted {Product} against its fiercest rivals in a head-to-head showdown. The results from our lab tests were surprising—find out which tool dominates the {Year} rankings."
  }
];

// The Brain: Generates high-quality pages from 1 Product Input with Real-Time Research
export async function generateClusters(productName: string, affiliateLink: string, basePrice: string, isBlogMode: boolean = false): Promise<PageData[]> {
  const clusters: PageData[] = [];
  const currentYear = new Date().getFullYear();

  // If NOT in Blog Mode (Landing Page Mode), we only want the main review.
  // If in Blog Mode, we want the full topical map.
  const activeTemplates = isBlogMode ? INTENT_TEMPLATES : [INTENT_TEMPLATES[0]]; // Default to just Review for Landing

  for (const template of activeTemplates) {
    const targetKeyword = `${productName} ${template.suffix}`;

    // 🔍 THE SCOUT: Check if we can win this keyword
    const research = await checkKeywordCompetition(targetKeyword);
    let finalKeyword = targetKeyword;

    if (research.verdict === "STOP" || research.score < 40) {
      console.log(`⚠️ Competition too high for "${targetKeyword}". Pivoting to Long-Tail...`);
      // Pivot Strategy: Add specific modifiers to find a gap
      finalKeyword = `${targetKeyword} for small business`;
    }

    // Generate a SEO-optimized slug
    const slug = finalKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Dynamic Title
    const title = template.titleTemplate
      .replace("{Product}", productName)
      .replace("{Year}", currentYear.toString());

    // Context-aware "Hypnotic" Intro with E-E-A-T signals
    const intro = template.introTemplate
      .replace("{Product}", productName)
      .replace("{Year}", currentYear.toString());

    // Product Data (The "Winner" is always our input product)
    const products: ProductData[] = [
      {
        name: productName,
        price: basePrice,
        features: ["Verified Performance", "Best in Class Support", "2026 Editor's Choice"],
        isBestValue: true,
        link: affiliateLink
      },
      // We add generic competitors for comparison context (simulated)
      {
        name: "Generic Competitor A",
        price: "$High",
        features: ["Good features", "Expensive", "Legacy Tech"],
        link: "#"
      },
      {
        name: "Budget Alternative B",
        price: "$Low",
        features: ["Basic features", "Unreliable", "Limited Support"],
        link: "#"
      }
    ];

    clusters.push({
      slug,
      keyword: finalKeyword,
      title,
      description: `Read our honest ${title}. We test features, pricing, and pros/cons. Updated for ${currentYear}.`,
      intro_text: intro,
      products,
      affiliate_link: affiliateLink
    });
  }

  return clusters;
}
