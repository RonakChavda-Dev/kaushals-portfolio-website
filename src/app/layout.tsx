import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Kaushal Devarasetty · linga676767",
  description:
    "Kaushal Devarasetty plays Minecraft Bedwars as linga676767, made the top 10 of ArchMC's 4v4 leaderboard, and is learning front-end development.",
};

export const viewport: Viewport = {
  themeColor: "#0a0d14",
  colorScheme: "dark",
};

// Marks the page as scripted before first paint so reveal styles can hide content. If the reveal script has not
// started within 3s (hydration failed), the flag is dropped and everything shows.
const jsFlag = `(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('reveal-ready'))d.classList.remove('js')},3000)})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
