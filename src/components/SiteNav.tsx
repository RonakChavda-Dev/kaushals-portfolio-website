"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header" data-scrolled={scrolled || open}>
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Kaushal Devarasetty, back to top">
          <img src="/images/art/wool.svg" alt="" width="28" height="28" />
          <span>Kaushal</span>
        </a>
        <nav aria-label="Sections">
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-list"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="burger" data-open={open} aria-hidden="true" />
          </button>
          <ul id="nav-list" className="nav-list" data-open={open}>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-primary btn-small header-cta" href="#contact">
          Say hi
        </a>
      </div>
    </header>
  );
}
