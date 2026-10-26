"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { shots } from "@/content/site";

// Screenshot grid; each tile opens the full picture in a native <dialog> (focus trap, Esc and backdrop close).
export default function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const shot = shots[index];

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i + d + shots.length) % shots.length);

  return (
    <>
      <ul className="gallery">
        {shots.map((s, i) => (
          <li key={s.src + s.label} className={`shot shot-${i + 1}`} data-reveal="scale" style={{ "--i": i % 3 } as React.CSSProperties}>
            <button type="button" className="shot-btn" onClick={() => open(i)} aria-label={`Open screenshot: ${s.label}`}>
              <Image src={s.src} alt={s.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              <span className="shot-label">{s.label}</span>
              <span className="shot-zoom" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M4 10V4h6M20 14v6h-6M4 4l6 6M20 20l-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`Screenshot: ${shot.label}`}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        <figure className="lightbox-inner">
          <Image key={shot.src + index} src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="90vw" />
          <figcaption>
            <span className="lightbox-count">
              {String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
            </span>
            {shot.label}
          </figcaption>
        </figure>
        <div className="lightbox-controls">
          <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous screenshot">
            ←
          </button>
          <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next screenshot">
            →
          </button>
          <button type="button" className="icon-btn" onClick={() => dialog.current?.close()} aria-label="Close" autoFocus>
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}
