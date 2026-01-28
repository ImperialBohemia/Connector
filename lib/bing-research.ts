import * as cheerio from 'cheerio';

export interface ResearchResult {
  keyword: string;
  score: number; // 0-100 (100 = Easy Win)
  weakCompetitors: number;
  exactMatchDomains: number;
  verdict: "GO" | "CAUTION" | "STOP";
}

/**
 * THE SCOUT: Analyzes Bing SERP for Keyword Viability
 * Simulates a "Headless Browser" check to find gaps in the market.
 */
export async function checkKeywordCompetition(keyword: string): Promise<ResearchResult> {
  console.log(`🔎 [Scout] Analyzing Bing for: "${keyword}"...`);

  // Simulate a real user agent to avoid basic blocking
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
  };

  try {
    const query = encodeURIComponent(keyword);
    // Note: In a real production environment, we would use a rotating proxy or SERP API.
    // For this prototype, we query Bing directly with caution.
    const response = await fetch(`https://www.bing.com/search?q=${query}`, { headers });
    const html = await response.text();
    const $ = cheerio.load(html);

    let weakCompetitors = 0;
    let exactMatchDomains = 0;
    let totalResults = 0;

    // Analyze Search Results (b_algo is Bing's standard result container)
    $('.b_algo').each((i, el) => {
      if (i >= 10) return; // Only check Page 1
      totalResults++;

      const title = $(el).find('h2').text().toLowerCase();
      const url = $(el).find('cite').text().toLowerCase();

      // 1. Check for Weak Competitors (User Generated Content)
      // If Reddit/Quora is on Page 1, it's a HUGE opportunity (Green Light)
      if (url.includes('reddit.com') || url.includes('quora.com') || url.includes('forum') || url.includes('pinterest.com')) {
        weakCompetitors++;
      }

      // 2. Check for Exact Match (Is the keyword exactly in the title?)
      if (title.includes(keyword.toLowerCase())) {
        exactMatchDomains++;
      }
    });

    // ---------------------------------------------------------
    // SCORING ALGORITHM (The "Winnable Battle" Logic)
    // ---------------------------------------------------------
    let score = 50; // Start Neutral

    // Bonus: Weak Competitors means the giants aren't targeting this.
    score += (weakCompetitors * 15);

    // Penalty: Exact Match means someone is specifically trying to rank for this.
    score -= (exactMatchDomains * 10);

    // Normalize
    score = Math.max(0, Math.min(100, score));

    let verdict: ResearchResult['verdict'] = "CAUTION";
    if (score >= 70) verdict = "GO";
    if (score <= 30) verdict = "STOP";

    console.log(`   📊 Score: ${score}/100 | Weak: ${weakCompetitors} | Exact: ${exactMatchDomains} | Verdict: ${verdict}`);

    return {
      keyword,
      score,
      weakCompetitors,
      exactMatchDomains,
      verdict
    };

  } catch (error) {
    console.error("   ❌ [Scout] Connection Failed:", error);
    // Fail safe: Assume it's hard if we can't see it
    return { keyword, score: 0, weakCompetitors: 0, exactMatchDomains: 0, verdict: "STOP" };
  }
}
