import { getSheetData } from "@/lib/sheets";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getSheetData();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://connector-live.vercel.app";

  // The slug that is being served as the Homepage (Root)
  // We must exclude it from the sub-pages list to avoid Duplicate Content (SEO Cannibalization)
  // because its content is already served at "/"
  const HOME_BASE_SLUG = "best-wireless-headphones-2026";

  const entries: MetadataRoute.Sitemap = pages
    .filter(page => page.slug !== HOME_BASE_SLUG)
    .map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    }));

  // Add homepage (Priority 1.0)
  entries.unshift({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  return entries;
}
