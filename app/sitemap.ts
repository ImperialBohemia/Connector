import { getSheetData } from "@/lib/sheets";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getSheetData();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://connector-app-flame.vercel.app";

  const entries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Add homepage
  entries.unshift({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  return entries;
}
