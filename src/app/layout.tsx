import type { Metadata, Viewport } from "next";
import { Archivo, Pixelify_Sans } from "next/font/google";
import { person, seo, siteUrl } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

// Pixel type for small game-style labels only.
const pixel = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-pixelify",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s · ${person.name}` },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  applicationName: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: person.name,
    title: seo.title,
    description: seo.description,
    locale: "en_AU",
    firstName: "Kaushal",
    lastName: "Devarasetty",
    username: person.ign,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "portfolio",
};

export const viewport: Viewport = {
  themeColor: "#22e5ff", // also the accent stripe on Discord link embeds
  colorScheme: "dark",
};

// Marks the page as scripted before first paint so reveal styles can hide content. If the reveal script has not
// started within 3s (hydration failed), the flag is dropped and everything shows.
const jsFlag = `(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('reveal-ready'))d.classList.remove('js')},3000)})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${archivo.variable} ${pixel.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
