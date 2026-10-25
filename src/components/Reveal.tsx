"use client";

import { useEffect } from "react";

// Adds `is-in` to every [data-reveal] element the first time it scrolls into view.
// Content is only hidden under html.js, and a timeout shows everything if the observer never fires.
export default function Reveal() {
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const showAll = () => items.forEach((el) => el.classList.add("is-in"));

    if (!("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach((el) => io.observe(el));
    const fallback = window.setTimeout(() => {
      items.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      });
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}
