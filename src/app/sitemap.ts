import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Rendered once at build time into a plain file (required by the static export).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
