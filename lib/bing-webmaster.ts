export interface BingPerformanceData {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

export interface KeywordStats {
  keyword: string;
  clicks: number;
  impressions: number;
}

/**
 * THE ANALYST: Connects to Bing Webmaster API to get "Truth" Data.
 * Documentation: https://learn.microsoft.com/en-us/bingwebmaster/getting-access
 */
export async function getPerformanceData(siteUrl: string, apiKey: string): Promise<BingPerformanceData[]> {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/GetSearchNetworkStats?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;

  try {
    const response = await fetch(endpoint, { method: 'GET' });

    if (!response.ok) {
        console.error(`Bing API Error: ${response.statusText}`);
        return [];
    }

    const data = await response.json();
    // Transform Bing's response format to our interface
    // Note: Actual Bing API response shape handling would go here.
    // We return a mock structure if the API fails or is empty for this demo, 
    // as we don't have a live API key in this sandbox.
    
    if (data && data.d) {
        return data.d.map((item: any) => ({
            date: item.Date,
            impressions: item.Impressions,
            clicks: item.Clicks,
            ctr: (item.Clicks / item.Impressions) * 100,
            position: item.AveragePosition
        }));
    }

    return [];

  } catch (error) {
    console.error("Bing Webmaster Connection Failed:", error);
    return [];
  }
}

/**
 * MOCK ANALYST (For Sandbox Simulation)
 * Returns simulated data to prove the "Self-Healing" loop works without a real API key.
 */
export async function getMockPerformanceData(): Promise<BingPerformanceData[]> {
    return [
        { date: "2024-05-01", impressions: 1500, clicks: 12, ctr: 0.8, position: 12 }, // Low CTR! Needs Optimization.
        { date: "2024-05-02", impressions: 1200, clicks: 45, ctr: 3.75, position: 4 }, // Good.
    ];
}
