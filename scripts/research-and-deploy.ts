import { generateClusters } from "../lib/generator";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

/**
 * THE COMMANDER: Orchestrates Research, Generation, and Deployment
 * Usage: tsx scripts/research-and-deploy.ts <ProductName> <AffiliateLink> <Price> <Mode>
 * Mode: "landing" (Single Page) or "blog" (Full Cluster)
 */

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error("Usage: tsx scripts/research-and-deploy.ts <ProductName> <AffiliateLink> <Price> [Mode]");
    process.exit(1);
  }

  const [productName, affiliateLink, price, modeArg] = args;
  const isBlogMode = modeArg === "blog";

  console.log(`\n🤖 COMMANDER INITIATED`);
  console.log(`🎯 Target: ${productName}`);
  console.log(`💰 Price: ${price}`);
  console.log(`🚀 Mode: ${isBlogMode ? "FULL BLOG CLUSTER" : "SINGLE LANDING PAGE"}`);
  console.log("-----------------------------------");

  // 1. Research & Generate (The Scout + The Brain)
  console.log("\n📡 Phase 1: Research & Generation...");
  const pages = await generateClusters(productName, affiliateLink, price, isBlogMode);

  if (pages.length === 0) {
    console.error("❌ Generation Failed. No pages produced.");
    process.exit(1);
  }

  console.log(`✅ Generated ${pages.length} Optimized Pages.`);

  // 2. Persist Data (The Memory)
  // In a real app, this goes to Google Sheets. Here we save to a local JSON for the build to pick up.
  // We'll mock the sheet data by writing to a local file that lib/sheets.ts could theoretically read if adapted,
  // but for now, we just log success as the "Sheet" update simulation.
  console.log("\n💾 Phase 2: Updating CMS (Simulation)...");
  const dataPath = path.join(process.cwd(), "lib", "local-data.json");
  // fs.writeFileSync(dataPath, JSON.stringify(pages, null, 2)); // Logic to actually use this would be in lib/sheets.ts
  console.log(`   (Data would be pushed to Google Sheets here)`);

  // 3. Quality Audit (The Shield)
  console.log("\n🛡️ Phase 3: Quality Audit...");
  try {
    execSync("npm run audit", { stdio: "inherit" });
  } catch (e) {
    console.error("❌ Quality Gate Failed. Aborting Deployment.");
    process.exit(1);
  }

  // 4. Deployment (The Launch)
  console.log("\n🚀 Phase 4: Auto-Deployment...");
  try {
    // We pass the "Commander" flag to the deploy script if needed, or just run it.
    execSync("npm run deploy", { stdio: "inherit" });
  } catch (e) {
    console.error("❌ Deployment Failed.");
    process.exit(1);
  }

  console.log("\n🏆 MISSION COMPLETE. System is Live.");
}

main();
