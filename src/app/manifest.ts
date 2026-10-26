import type { MetadataRoute } from "next";
import { person, seo } from "@/content/site";

// Rendered once at build time into a plain file (required by the static export).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.title,
    short_name: person.firstName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#04060c",
    theme_color: "#04060c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
