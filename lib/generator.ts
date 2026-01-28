import { PageData, ProductData } from "./sheets";
import { checkKeywordCompetition } from "./bing-research";

// Standard Templates (Mass Market)
const INTENT_TEMPLATES = [
  {
    suffix: "Review",
    titleTemplate: "{Product} Review 2026: I Tested It for 30 Days (Honest Results)",
    intent: "Commercial Investigation",
    introTemplate: "Is {Product} actually worth the hype in {Year}? I spent the last month testing every feature, button, and claim to reveal the truth. Before you spend a dime, read my unfiltered verdict on whether this is a game-changer or a waste of money."
  },
  // ... other templates would be here in a full file, but simplified for clarity in this focused update
];

// Luxury Templates (High Ticket > £1000)
const LUXURY_TEMPLATES = [
  {
    suffix: "Review",
    titleTemplate: "{Product} Review 2026: An Uncompromising Masterpiece? (My Experience)",
    intent: "Luxury Investigation",
    introTemplate: "True luxury isn't about price; it's about the feeling of absolute perfection. I welcomed the {Product} into my home to see if it lives up to its elite reputation. This isn't just a review; it's an exploration of engineering art. Does it transform your daily ritual into a sensory event?"
  }
];

// The Brain: Generates high-quality pages from 1 Product Input with Real-Time Research
export async function generateClusters(productName: string, affiliateLink: string, basePrice: string, isBlogMode: boolean = false): Promise<PageData[]> {
  const clusters: PageData[] = [];
  const currentYear = new Date().getFullYear();

  // Price Analysis for Luxury Mode
  // Remove currency symbols and parse float
  const numericPrice = parseFloat(basePrice.replace(/[^0-9.]/g, ''));
  const isLuxury = !isNaN(numericPrice) && numericPrice > 1000;

  if (isLuxury) {
    console.log(`💎 LUXURY MODE ACTIVATED (Price: ${basePrice}). Switching to Elite Content Strategy.`);
  }

  // Select Strategy
  let activeTemplates = isLuxury ? LUXURY_TEMPLATES : INTENT_TEMPLATES;

  // If in Landing Mode, we just take the first template (Review)
  if (!isBlogMode) {
      activeTemplates = [activeTemplates[0]];
  } else if (isLuxury) {
      // If Luxury Blog, we might want different clusters, but for now we stick to the main review
      // or we could add "vs Competitors" but comparing only against other elite brands.
      // Keeping it simple for this iteration.
      activeTemplates = [LUXURY_TEMPLATES[0]];
  }

  for (const template of activeTemplates) {
    const targetKeyword = `${productName} ${template.suffix}`;

    // 🔍 THE SCOUT: Check if we can win this keyword
    const research = await checkKeywordCompetition(targetKeyword);
    let finalKeyword = targetKeyword;

    if (research.verdict === "STOP" || research.score < 40) {
      console.log(`⚠️ Competition too high for "${targetKeyword}". Pivoting to Long-Tail...`);
      finalKeyword = `${targetKeyword} for connoisseurs`;
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

    // Product Data
    const products: ProductData[] = [
      {
        name: productName,
        price: basePrice,
        features: isLuxury
            ? ["Hand-Assembled Precision", "Heirloom Quality Materials", "Concierge-Level Support"]
            : ["Verified Performance", "Best in Class Support", "2026 Editor's Choice"],
        isBestValue: true, // In luxury context, this means "Best Investment"
        link: affiliateLink
      },
      // Comparison: Against a generic high-end competitor
      {
        name: isLuxury ? "Mass-Market Premium" : "Generic Competitor A",
        price: isLuxury ? "£2,500" : "$High",
        features: ["Plasticky Finish", "Lacks Soul", "Mass Produced"],
        link: "#"
      },
      {
        name: isLuxury ? "Entry-Level Luxury" : "Budget Alternative B",
        price: isLuxury ? "£4,000" : "$Low",
        features: ["Good, but not Great", "Compromised Design", "Standard Warranty"],
        link: "#"
      }
    ];

    clusters.push({
      slug,
      keyword: finalKeyword,
      title,
      description: isLuxury
        ? `A deep dive into the ${productName}. Is this £${numericPrice} masterpiece worth the investment? Read my hands-on experience with this pinnacle of engineering.`
        : `Read our honest ${title}. We test features, pricing, and pros/cons. Updated for ${currentYear}.`,
      intro_text: intro,
      products,
      affiliate_link: affiliateLink
    });
  }

  return clusters;
}
