import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://connector-live.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/dashboard/", "/admin/"],
      },
      // Explicitly invite AI Search Agents for "Answer Engine Optimization" (AEO)
      {
        userAgent: ["GPTBot", "Bingbot", "Google-Extended", "Applebot-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
