import { PageData, ProductData } from "./sheets";

// Templates for Long-Tail Keyword Clustering with "Hypnotic" Copy
const INTENT_TEMPLATES = [
  {
    suffix: "Review",
    titleTemplate: "{Product} Review 2026: The Honest Truth (Don't Buy Yet)",
    intent: "Commercial Investigation",
    introTemplate: "Is {Product} actually worth the hype in {Year}? We tested every feature to reveal the truth. Before you spend a dime, read our unfiltered verdict on whether this is a game-changer or a waste of money."
  },
  {
    suffix: "Discount Code",
    titleTemplate: "Exclusive {Product} Discount Codes & Deals (Verified Active)",
    intent: "Transaction",
    introTemplate: "Stop paying full price! We've secured the best active deals for {Product}. Lock in the lowest possible rate today with our verified 'Best Value' pricing strategy."
  },
  {
    suffix: "Alternative",
    titleTemplate: "Top 5 {Product} Alternatives Better Than The Original?",
    intent: "Comparison",
    introTemplate: "Thinking about {Product}? It's good, but is it the *best*? We compared it against top competitors to see which tool actually delivers more bang for your buck in {Year}."
  },
  {
    suffix: "for Beginners",
    titleTemplate: "{Product} for Beginners: The Ultimate Crash Course",
    intent: "Informational",
    introTemplate: "Overwhelmed by {Product}? You shouldn't be. Our expert guide breaks down exactly how to get started, avoid common rookie mistakes, and master the platform in minutes."
  },
  {
    suffix: "vs Competitors",
    titleTemplate: "{Product} vs The Competition: The Clear Winner Revealed",
    intent: "Comparison",
    introTemplate: "The market is crowded. We pitted {Product} against its fiercest rivals in a head-to-head showdown. The results were surprising—find out which tool dominates the {Year} rankings."
  }
];

// The Brain: Generates 5 high-quality pages from 1 Product Input
export function generateClusters(productName: string, affiliateLink: string, basePrice: string): PageData[] {
  const clusters: PageData[] = [];
  const currentYear = new Date().getFullYear();

  INTENT_TEMPLATES.forEach(template => {
    // Generate a SEO-optimized slug
    const slug = `${productName.toLowerCase().replace(/\s+/g, '-')}-${template.suffix.toLowerCase().replace(/\s+/g, '-')}`;

    // Dynamic Title
    const title = template.titleTemplate
      .replace("{Product}", productName)
      .replace("{Year}", currentYear.toString());

    // Context-aware "Hypnotic" Intro
    const intro = template.introTemplate
      .replace("{Product}", productName)
      .replace("{Year}", currentYear.toString());

    // Product Data (The "Winner" is always our input product)
    const products: ProductData[] = [
      {
        name: productName,
        price: basePrice,
        rating: 4.8,
        description: `Our top pick for ${currentYear}. ${productName} offers the best balance of features and price.`,
        features: ["Verified Performance", "Best in Class Support", "2026 Editor's Choice"],
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60", // Generic product placeholder
        isBestValue: true,
        affiliateLink: affiliateLink
      },
      // We add generic competitors for comparison context (simulated)
      {
        name: "Generic Competitor A",
        price: "$High",
        rating: 3.5,
        description: "A solid option but overpriced for what you get.",
        features: ["Good features", "Expensive", "Legacy Tech"],
        imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60",
        affiliateLink: "#"
      },
      {
        name: "Budget Alternative B",
        price: "$Low",
        rating: 2.9,
        description: "Cheap, but you get what you pay for.",
        features: ["Basic features", "Unreliable", "Limited Support"],
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60",
        affiliateLink: "#"
      }
    ];

    clusters.push({
      slug,
      keyword: `${productName} ${template.suffix}`,
      title,
      subtitle: `The definitive guide to finding the best ${productName} deals and alternatives.`,
      description: `Read our honest ${title}. We test features, pricing, and pros/cons. Updated for ${currentYear}.`,
      author: "Connector AI",
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80",
      verdict: {
        score: 9.5,
        summary: `After extensive testing, ${productName} emerges as the clear winner due to its superior value proposition and reliability.`,
        pros: ["Excellent Value", "Reliable Performance", "Great Support"],
        cons: ["Minor learning curve", "Premium pricing"]
      },
      content: `<p>${intro}</p><p>We have tested this product thoroughly...</p>`,
      faq: [
        { question: `Is ${productName} worth it?`, answer: "Yes, based on our testing it provides excellent value." }
      ],
      products,
      affiliate_link: affiliateLink
    });
  });

  return clusters;
}
