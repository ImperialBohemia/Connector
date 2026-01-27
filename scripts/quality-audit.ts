import { getSheetData, PageData } from "../lib/sheets";
import { generateClusters } from "../lib/generator";

// The "Quality Gate" - Strict rules for Bing/AI dominance
function auditPage(page: PageData): string[] {
  const errors: string[] = [];

  // 1. Title Hygiene
  if (page.title.length < 30 || page.title.length > 70) {
    errors.push(`[SEO] Title length (${page.title.length}) is non-optimal. Target 30-70 chars.`);
  }

   // 2. Content Depth (Description/Subtitle)
   if ((page.description?.length || 0) < 50) {
     errors.push(`[Content] Description is too thin. Bing loves depth.`);
  }

  // 3. Trust Signals (Keyword Check)
  const trustKeywords = ["review", "guide", "best", "vs", "analysis", "honest"];
  const hasTrustSignal = trustKeywords.some(k => page.title.toLowerCase().includes(k) || page.description.toLowerCase().includes(k));
  if (!hasTrustSignal) {
    errors.push(`[Psychology] Missing trust/intent keyword in metadata.`);
  }

  // 4. Deal Schema Readiness
  const hasBestValue = page.products.some(p => p.isBestValue);
  if (!hasBestValue) {
    errors.push(`[Conversion] No 'Best Value' product defined. Deal Schema will fail.`);
  }

  return errors;
}

async function runQualityGate() {
  console.log("🔒 Starting Connector Quality Gate Audit...");

  // 1. Audit Existing Sheets Data
  const existingPages = await getSheetData();
  console.log(`Analyzing ${existingPages.length} existing pages...`);

  existingPages.forEach(page => {
    const errors = auditPage(page);
    if (errors.length > 0) {
      console.warn(`❌ Page '${page.slug}' Failed:`);
      errors.forEach(e => console.warn(`   - ${e}`));
    } else {
      console.log(`✅ Page '${page.slug}' Passed.`);
    }
  });

  // 2. Audit Generator Logic (Simulation)
  console.log("\n🧪 Testing Generator Intelligence...");
  const mockClusters = generateClusters("HyperAi Tool", "https://affiliate.link", "$49");

  mockClusters.forEach(page => {
    const errors = auditPage(page);
    if (errors.length > 0) {
      console.error(`❌ Generated Cluster '${page.slug}' Failed Quality Gate!`);
      errors.forEach(e => console.error(`   - ${e}`));
      process.exit(1); // Fail the build/script if generator is broken
    } else {
      console.log(`✅ Generated Cluster '${page.slug}' Passed.`);
    }
  });

  console.log("\n🏆 Quality Gate Complete. System is Ready for Bing.");
}

runQualityGate();
