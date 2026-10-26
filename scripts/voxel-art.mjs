// Draws the site's isometric voxel artwork as SVG files in public/images/art/.
// Run with `node scripts/voxel-art.mjs` after changing a scene. No dependencies.
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../public/images/art/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount)),
  );
  return "#" + ch.map((c) => c.toString(16).padStart(2, "0")).join("");
}

// A box is { x, y, z, w, d, h, color, top?, left?, right?, edges? } in block units. The viewer looks from +x, +y, +z.
function render(boxes, { unit = 40, pad = 60, glow = true, bounds, extras = () => "" } = {}) {
  const project = (x, y, z) => [(x - y) * COS * unit, (x + y) * SIN * unit - z * unit];
  const polys = [];
  const sorted = [...boxes].sort(
    (a, b) => a.x + a.w / 2 + a.y + a.d / 2 + a.z + a.h / 2 - (b.x + b.w / 2 + b.y + b.d / 2 + b.z + b.h / 2) || a.z - b.z,
  );
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const b of sorted) {
    const { x, y, z, w, d, h } = b;
    const faces = [
      { pts: [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], fill: b.left ?? shade(b.color, -0.18) },
      { pts: [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], fill: b.right ?? shade(b.color, -0.42) },
      { pts: [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], fill: b.top ?? shade(b.color, 0.1) },
    ];
    for (const f of faces) {
      const pts = f.pts.map((p) => project(...p));
      for (const [px, py] of pts) {
        minX = Math.min(minX, px); maxX = Math.max(maxX, px);
        minY = Math.min(minY, py); maxY = Math.max(maxY, py);
      }
      const edge = b.edges === false ? "" : ` stroke="${f.fill}" stroke-width="0.6" stroke-linejoin="round"`;
      polys.push(`<polygon points="${pts.map(([a, c]) => `${a.toFixed(1)},${c.toFixed(1)}`).join(" ")}" fill="${f.fill}"${edge}/>`);
    }
  }
  if (bounds) {
    // A fixed frame, so a set of icons shares one scale whatever each object's size.
    const [bx, by, bz, bw, bd, bh] = bounds;
    const corners = [];
    for (const cx of [bx, bx + bw]) for (const cy of [by, by + bd]) for (const cz of [bz, bz + bh]) corners.push(project(cx, cy, cz));
    minX = Math.min(...corners.map((c) => c[0])); maxX = Math.max(...corners.map((c) => c[0]));
    minY = Math.min(...corners.map((c) => c[1])); maxY = Math.max(...corners.map((c) => c[1]));
  }
  const vb = [minX - pad, minY - pad, maxX - minX + pad * 2, maxY - minY + pad * 2];
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const glowSvg = glow
    ? `<defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#22d3ff" stop-opacity="0.45"/><stop offset="0.55" stop-color="#22d3ff" stop-opacity="0.12"/><stop offset="1" stop-color="#22d3ff" stop-opacity="0"/></radialGradient></defs><ellipse cx="${cx}" cy="${cy}" rx="${(maxX - minX) * 0.62}" ry="${(maxY - minY) * 0.62}" fill="url(#g)"/>`
    : "";
  return {
    project,
    svg: (extra = "") =>
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map((v) => v.toFixed(1)).join(" ")}" width="${Math.round(vb[2])}" height="${Math.round(vb[3])}">${glowSvg}${polys.join("")}${extras(project)}${extra}</svg>\n`,
  };
}

const box = (x, y, z, w, d, h, color, more = {}) => ({ x, y, z, w, d, h, color, ...more });

// Seeded random so the island keeps its shape between runs.
let seed = 42;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// ---------- Hero: a floating Bedwars island, a blue bed and a faceless player ----------
function island(size = 8) {
  const boxes = [];
  const insets = [0, 0, 1, 1, 2, 3];
  for (let layer = 0; layer < insets.length; layer++) {
    const inset = insets[layer];
    for (let x = inset; x < size - inset; x++) {
      for (let y = inset; y < size - inset; y++) {
        const edge = x === inset || y === inset || x === size - inset - 1 || y === size - inset - 1;
        if (layer > 1 && edge && rand() < 0.4) continue;
        if (layer === 0 && (x + y === 0 || (x === size - 1 && y === size - 1) || (x === size - 1 && y === 0))) continue;
        const z = -layer;
        if (layer === 0) {
          const tone = (x + y) % 2 ? "#33426a" : "#2e3c61";
          boxes.push(box(x, y, z, 1, 1, 1, "#24304a", { top: tone }));
        } else {
          boxes.push(box(x, y, z, 1, 1, 1, ["#182033", "#1b2438", "#161d2e", "#1e2840"][Math.floor(rand() * 4)]));
        }
      }
    }
  }
  return boxes;
}

{
  seed = 42;
  const B = "#2f7bff";
  const W = { top: "#5fb4ff" };
  const boxes = [
    ...island(6),
    // defence wall of blue wool and end stone behind the bed
    box(0, 3, 1, 1, 1, 1, B, W),
    box(1, 3, 1, 1, 1, 1, "#dcd9a2", { top: "#ecebc4" }),
    box(2, 3, 1, 1, 1, 1, B, W),
    box(0, 3, 2, 1, 1, 1, B, W),
    // the bed, long side towards the viewer: pillow end, then blanket
    box(0.4, 4.3, 1, 0.55, 1, 0.56, "#e9edf3", { top: "#ffffff" }),
    box(0.95, 4.3, 1, 1.45, 1, 0.56, B, { top: "#4fa3ff" }),
    box(0.4, 4.3, 1, 2, 1, 0.12, "#6b4a2a"),
    // player, Minecraft proportions, facing the viewer's left
    box(3.5, 2.4, 1, 0.5, 0.5, 1.5, "#141b2c"),
    box(4, 2.4, 1, 0.5, 0.5, 1.5, "#141b2c"),
    box(3, 2.4, 2.5, 0.5, 0.5, 1.5, "#1f2a44", { top: "#31406a" }),
    box(3.5, 2.4, 2.5, 1, 0.5, 1.5, "#1f2a44", { top: "#31406a" }),
    box(4.5, 2.4, 2.5, 0.5, 0.5, 1.5, "#1f2a44", { top: "#31406a" }),
    box(3.5, 2.15, 4, 1, 1, 1, "#26324f", { top: "#3a4a6e" }),
    // visor across the face: masked, no face reveal
    box(3.6, 3.15, 4.32, 0.8, 0.03, 0.26, B, { left: "#7fe9ff", edges: false }),
    // sword in the right hand
    box(4.68, 2.9, 2.2, 0.14, 0.14, 0.14, "#6b4a2a"),
    box(4.58, 2.8, 2.34, 0.34, 0.34, 0.08, "#2b3550"),
    box(4.68, 2.9, 2.42, 0.14, 0.14, 1.35, "#cfe0ff", { left: "#e6f0ff" }),
    // a small diamond generator island and loose blocks in the air
    box(7.6, -1.6, -0.6, 1, 1, 1, "#1e2840", { top: "#33426a" }),
    box(7.85, -1.35, 0.4, 0.5, 0.5, 0.5, "#4de0d0", { top: "#9af2e8" }),
    box(6.6, 4.8, 1.6, 0.7, 0.7, 0.7, B, W),
    box(-1.6, 0.6, 1.8, 0.6, 0.6, 0.6, "#dcd9a2", { top: "#ecebc4" }),
  ];
  const art = render(boxes, {
    unit: 44,
    pad: 40,
    extras: (project) => {
      const [hx, hy] = project(4, 2.65, 5.55);
      return `<g transform="translate(${hx.toFixed(1)} ${hy.toFixed(1)})"><rect x="-92" y="-22" width="184" height="40" rx="4" fill="#05070c" fill-opacity="0.72"/><text x="0" y="7" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="21" fill="#ffffff">linga676767</text></g>`;
    },
  });
  writeFileSync(new URL("kaushal-hero-placeholder.svg", OUT), art.svg());
}

// ---------- Interest icons, each object on a small plinth ----------
const plinth = () => [box(0, 0, 0, 3, 3, 0.6, "#1d2740", { top: "#2b3858" })];
const icons = {
  heritage: [
    ...plinth(),
    box(0.85, 0.85, 0.6, 1.3, 1.3, 0.22, "#9c5424", { top: "#b8662c" }),
    box(0.6, 0.6, 0.82, 1.8, 1.8, 0.38, "#b8662c", { top: "#d07b3a" }),
    box(2.4, 1.3, 0.86, 0.45, 0.4, 0.3, "#b8662c", { top: "#d07b3a" }),
    box(0.8, 0.8, 1.2, 1.4, 1.4, 0.02, "#4a2610", { edges: false }),
    box(2.49, 1.38, 1.16, 0.24, 0.24, 0.5, "#ff9a1f", { top: "#ffc45a" }),
    box(2.54, 1.43, 1.66, 0.14, 0.14, 0.38, "#ffe68a", { top: "#fff6cf" }),
  ],
  science: [
    ...plinth(),
    box(0.75, 0.75, 0.6, 1.5, 1.5, 0.7, "#2f7bff", { top: "#6fd8ff" }),
    box(0.75, 0.75, 1.3, 1.5, 1.5, 0.3, "#c4d8ff"),
    box(1.2, 1.2, 1.6, 0.6, 0.6, 0.9, "#d6e4ff"),
    box(1.1, 1.1, 2.5, 0.8, 0.8, 0.14, "#e9edf3"),
  ],
  badminton: [
    ...plinth(),
    box(1.1, 1.1, 0.6, 0.8, 0.8, 0.5, "#f2f2ee"),
    box(1.08, 1.08, 1.02, 0.84, 0.84, 0.12, "#2f7bff"),
    box(1.0, 1.0, 1.14, 1.0, 1.0, 0.32, "#e6e8ef"),
    box(0.85, 0.85, 1.46, 1.3, 1.3, 0.32, "#eef0f5"),
    box(0.7, 0.7, 1.78, 1.6, 1.6, 0.3, "#f6f7fa"),
  ],
  setup: [
    box(0, 0, 0, 3, 3, 0.6, "#3a352d", { top: "#6b6152" }),
    box(1.45, 2.35, 0.6, 0.1, 0.65, 0.05, "#0b0f19"),
    box(1.0, 0.65, 0.6, 1.0, 1.7, 0.32, "#232c42", { top: "#2e3852" }),
    box(1.05, 0.8, 0.92, 0.9, 1.4, 0.2, "#2e3852", { top: "#3e4b70" }),
    box(1.48, 1.6, 1.12, 0.04, 0.6, 0.01, "#121827", { edges: false }),
    box(1.42, 1.85, 1.12, 0.16, 0.24, 0.08, "#2f7bff", { top: "#5fb4ff" }),
  ],
  chess: [
    ...plinth(),
    box(0.8, 0.8, 0.6, 1.4, 1.4, 0.28, "#d9dde6"),
    box(1.0, 1.0, 0.88, 1.0, 1.0, 0.2, "#e4e7ee"),
    box(1.15, 1.15, 1.08, 0.7, 0.7, 0.9, "#eceff4"),
    box(1.0, 1.0, 1.98, 1.0, 1.0, 0.14, "#e4e7ee"),
    box(1.1, 1.1, 2.12, 0.8, 0.8, 0.72, "#f4f5f8"),
  ],
};
for (const [name, boxes] of Object.entries(icons)) {
  writeFileSync(new URL(`${name}.svg`, OUT), render(boxes, { unit: 52, pad: 30, bounds: [0, 0, 0, 3.2, 3.2, 3] }).svg());
}

// Favicon and header mark: a single blue wool block.
const wool = render([box(0, 0, 0, 1, 1, 1, "#2f7bff", { top: "#5fb4ff" })], { unit: 18, pad: 2, glow: false }).svg();
writeFileSync(new URL("../src/app/icon.svg", import.meta.url), wool);
writeFileSync(new URL("wool.svg", OUT), wool);
console.log("art written");
