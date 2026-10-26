"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { nav } from "@/content/site";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.current?.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Highlights the link for whichever section crosses the middle of the screen.
  useEffect(() => {
    const sections = nav.map((n) => document.querySelector<HTMLElement>(n.href)).filter((s): s is HTMLElement => !!s);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const close = () => window.innerWidth > 860 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <header className="header" data-scrolled={scrolled || open}>
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Kaushal Devarasetty, back to top">
          <Logo size={34} className="brand-logo" />
          <span className="brand-name">Kaushal</span>
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
            {nav.map((item, i) => (
              <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={item.href} aria-current={active === item.href ? "true" : undefined} onClick={() => setOpen(false)}>
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
      <span className="progress" ref={bar} aria-hidden="true" />
    </header>
  );
}
