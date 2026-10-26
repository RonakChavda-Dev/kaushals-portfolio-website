import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="not-found container">
      <Logo size={56} />
      <p className="kicker">Error 404</p>
      <h1 className="section-title">
        Bed <span className="neon">broken</span>
      </h1>
      <p className="section-lead">This page doesn&rsquo;t exist, or it got blown up. Let&rsquo;s respawn you somewhere safe.</p>
      <Link className="btn btn-primary" href="/">
        Respawn on the home page
      </Link>
    </main>
  );
}
