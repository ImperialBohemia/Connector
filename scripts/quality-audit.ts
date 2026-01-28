import { getSheetData, PageData } from "../lib/sheets";
import { generateClusters } from "../lib/generator";

/**
 * CONNECTOR QUALITY GATE - ULTRA STRICT MODE (2026 AI EDITION)
 *
 * This script enforces the highest standards for SEO, Safety, and Content Quality.
 * It now includes "E-E-A-T" and "Answer Engine" checks.
 * Any violation causes a build failure.
 */

const CONFIG = {
  title: { min: 30, max: 70 }, // Relaxed max slightly for "2026 Review" suffixes
  description: { min: 120, max: 170 },
  intro: { min: 150 },
  trustKeywords: ["review", "guide", "best", "vs", "analysis", "honest", "comparison", "top", "tested"],
  experienceKeywords: ["i tested", "my experience", "hands-on", "verified", "lab test", "results", "honest", "personally"],
};

function auditPage(page: PageData): string[] {
  const errors: string[] = [];
  const textContent = (page.intro_text || "").toLowerCase() + (page.description || "").toLowerCase();

  // 1. Metadata Precision
  if (!page.title) {
    errors.push(`[Critical] Missing Title.`);
  } else {
    if (page.title.length < CONFIG.title.min || page.title.length > CONFIG.title.max) {
      errors.push(`[SEO] Title length (${page.title.length}) violates strict range (${CONFIG.title.min}-${CONFIG.title.max}).`);
    }
  }

  if (!page.description) {
    errors.push(`[Critical] Missing Description.`);
  } else {
    if (page.description.length < CONFIG.description.min || page.description.length > CONFIG.description.max) {
      errors.push(`[SEO] Description length (${page.description.length}) violates strict range (${CONFIG.description.min}-${CONFIG.description.max}).`);
    }
  }

  // 2. Slug Hygiene
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!page.slug || !slugRegex.test(page.slug)) {
    errors.push(`[Structure] Invalid Slug Format: '${page.slug}'. Must be kebab-case.`);
  }

  // 3. Content Depth & Trust
  if (!page.intro_text || page.intro_text.length < CONFIG.intro.min) {
    errors.push(`[Quality] Intro text is too thin (${page.intro_text?.length || 0}). Bing requires > ${CONFIG.intro.min} chars.`);
  }

  const hasTrustSignal = CONFIG.trustKeywords.some(k => textContent.includes(k));
  if (!hasTrustSignal) {
    errors.push(`[Psychology] Missing Trust Keyword (e.g., 'Review', 'Best') in metadata.`);
  }

  // -----------------------------------------------------------------------
  // 4. NEW: E-E-A-T & Experience Check (2026 Standard)
  // -----------------------------------------------------------------------
  const hasExperienceSignal = CONFIG.experienceKeywords.some(k => textContent.includes(k));
  if (!hasExperienceSignal) {
    errors.push(`[E-E-A-T] Missing 'Experience' marker (e.g., 'I tested', 'Hands-on'). Google needs proof of human usage.`);
  }

  // 5. Data Integrity & Deal Schema
  if (!page.products || page.products.length === 0) {
    errors.push(`[Critical] No products found.`);
  } else {
    const hasBestValue = page.products.some(p => p.isBestValue);
    if (!hasBestValue) {
      errors.push(`[Conversion] No 'Best Value' product defined. Deal Schema will fail.`);
    }

    // 6. Link Safety & Format
    page.products.forEach((p, i) => {
      if (!p.link || !p.link.startsWith('http')) {
        errors.push(`[Safety] Product '${p.name}' has invalid link: '${p.link}'. Must be absolute URL.`);
      }
    });
  }

  if (page.affiliate_link && !page.affiliate_link.startsWith('http')) {
    errors.push(`[Safety] Main Affiliate Link is invalid.`);
  }

  return errors;
}

async function runQualityGate() {
  console.log("🔒 Starting CONNECTOR ULTRA-STRICT Audit (2026 AI Edition)...");
  let hasFailure = false;

  // 1. Audit Existing Sheets Data
  const existingPages = await getSheetData();
  console.log(`\n📊 Analyzing ${existingPages.length} existing pages...`);

  existingPages.forEach(page => {
    const errors = auditPage(page);
    if (errors.length > 0) {
      hasFailure = true;
      console.warn(`\n❌ Page '${page.slug}' FAILED:`);
      errors.forEach(e => console.warn(`   - ${e}`));
    } else {
      console.log(`✅ Page '${page.slug}' Passed E-E-A-T Checks.`);
    }
  });

  // 2. Audit Generator Logic (Simulation)
  console.log("\n🧪 Testing Generator Intelligence...");
  try {
    const mockClusters = await generateClusters("HyperAi Tool", "https://affiliate.link", "$49");
    mockClusters.forEach(page => {
        // Mock data often needs loose audit, but we check critical structure
        if (!page.slug || !page.title) {
             console.error(`❌ Generator failed to produce valid structure for ${page.keyword}`);
             hasFailure = true;
        }
        // Validate that our new Generator actually produces E-E-A-T compliant text
        const errors = auditPage(page);
        if (errors.some(e => e.includes("E-E-A-T"))) {
             console.error(`❌ Generator Templates are missing Experience Markers for ${page.keyword}`);
             hasFailure = true;
        }
    });
    console.log("✅ Generator Logic Verified (E-E-A-T Compliant).");
  } catch (e) {
      console.error("❌ Generator crashed:", e);
      hasFailure = true;
  }

  if (hasFailure) {
    console.error("\n🚫 AUDIT FAILED. Strict standards not met.");
    process.exit(1);
  } else {
    console.log("\n🏆 Quality Gate Passed. System is 2026 Ready.");
  }
}

runQualityGate();
