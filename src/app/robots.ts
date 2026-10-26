import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Rendered once at build time into a plain file (required by the static export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
