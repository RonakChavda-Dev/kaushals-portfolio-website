"use client";

import { useEffect } from "react";

// All the page's ambient motion in one place, so the page itself stays server-rendered:
// - `is-in` on every [data-reveal] element the first time it scrolls into view
// - [data-count] numbers count up once when they appear
// - [data-spot] cards get --mx/--my for a pointer-following light; [data-tilt] cards lean toward the pointer
// - --scroll on <html> (0 → 1 over the first screen) for the hero's parallax
// Content is only hidden under html.js, and a timeout shows everything if the observer never fires.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const cleanups: (() => void)[] = [];

    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      if (reduce || !Number.isFinite(target)) return;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1100);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      el.textContent = "0";
      requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            if (el.dataset.count !== undefined) countUp(el);
            else el.classList.add("is-in");
            io.unobserve(el);
          }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      items.forEach((el) => io.observe(el));
      counters.forEach((el) => io.observe(el));
      const fallback = window.setTimeout(() => {
        items.forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
        });
      }, 2500);
      cleanups.push(() => {
        io.disconnect();
        window.clearTimeout(fallback);
      });
    } else {
      items.forEach((el) => el.classList.add("is-in"));
    }

    if (!reduce) {
      let frame = 0;
      const onScroll = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          root.style.setProperty("--scroll", Math.min(1, window.scrollY / window.innerHeight).toFixed(3));
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    if (fine) {
      const onMove = (e: PointerEvent) => {
        const target = e.target as Element | null;
        const spot = target?.closest<HTMLElement>("[data-spot]");
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
          spot.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
        const tilt = !reduce && target?.closest<HTMLElement>("[data-tilt]");
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          tilt.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
          tilt.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
        }
      };
      const onLeave = (e: PointerEvent) => {
        const el = (e.target as Element | null)?.closest<HTMLElement>("[data-tilt]");
        if (el && !el.contains(e.relatedTarget as Node | null)) {
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        }
      };
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onLeave, { passive: true });
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerout", onLeave);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
