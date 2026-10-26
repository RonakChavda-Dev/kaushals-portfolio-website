import { useId } from "react";

// Kaushal's mark: a K cut from a stem and a chevron, with a single block for a full stop. Same drawing as src/app/icon.svg.
export default function Logo({ size = 36, className }: { size?: number; className?: string }) {
  const id = `k${useId().replace(/[^\w-]/g, "")}`; // plain characters so url(#id) resolves everywhere
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5ff4ff" />
          <stop offset="1" stopColor="#2f6bff" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="16" fill="#070b14" stroke={`url(#${id})`} strokeWidth="3" />
      <path d="M18.5 17v30" stroke={`url(#${id})`} strokeWidth="7" />
      <path d="M38 17 25.5 32 38 47" fill="none" stroke={`url(#${id})`} strokeWidth="7" strokeLinejoin="miter" />
      <rect x="43" y="38" width="9" height="9" fill="#5ff4ff" />
    </svg>
  );
}
