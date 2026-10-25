"use client";

import { useState } from "react";

// Bare-hand break times in seconds (Minecraft Java Edition: hardness × 1.5, or × 5 when the block needs a pickaxe).
const blocks = {
  wool: { name: "Wool", seconds: 1.2, fill: "#3d82ff" },
  wood: { name: "Wood planks", seconds: 3, fill: "#a87b45" },
  terracotta: { name: "Terracotta", seconds: 6.25, fill: "#4f6188" },
  endstone: { name: "End stone", seconds: 15, fill: "#dcd9a2" },
  glass: { name: "Glass", seconds: 0.45, fill: "#b9dcef" },
  obsidian: { name: "Obsidian", seconds: 250, fill: "#1b1626" },
} as const;

type BlockId = keyof typeof blocks;
const order = Object.keys(blocks) as BlockId[];

const layers = [
  { id: "outer", label: "Outer layer" },
  { id: "middle", label: "Middle layer" },
  { id: "inner", label: "Inner layer" },
] as const;
type LayerId = (typeof layers)[number]["id"];

// Cells of a side-on cross-section, 10 wide and 4 tall; the bed fills columns 4 and 5 of the bottom row.
const C = 40;
const shell: Record<LayerId, [number, number][]> = {
  inner: [[3, 3], [6, 3], [4, 2], [5, 2]],
  middle: [[2, 3], [7, 3], [3, 2], [6, 2], [4, 1], [5, 1]],
  outer: [[1, 3], [8, 3], [2, 2], [7, 2], [3, 1], [6, 1], [4, 0], [5, 0]],
};

function format(s: number) {
  if (s >= 60) {
    const m = Math.floor(s / 60);
    const rest = Math.round(s - m * 60);
    return `${m} min ${rest} s`;
  }
  return `${Number(s.toFixed(2))} s`;
}

export default function BedDefence() {
  const [pick, setPick] = useState<Record<LayerId, BlockId>>({ outer: "wool", middle: "wood", inner: "endstone" });
  const total = layers.reduce((sum, l) => sum + blocks[pick[l.id]].seconds, 0);

  return (
    <div className="bed">
      <h3 className="bed-title">Build a bed defence</h3>
      <p className="bed-intro">
        Every Bedwars game starts the same way: wrap your bed in blocks before someone comes for it. Pick three layers and
        see how long a player would need to dig through by hand.
      </p>

      <svg
        className="bed-art"
        viewBox={`0 0 ${10 * C} ${5 * C}`}
        role="img"
        aria-label={`Bed defence, outside in: ${blocks[pick.outer].name}, ${blocks[pick.middle].name}, ${blocks[pick.inner].name}, around a blue bed`}
        shapeRendering="crispEdges"
      >
        <rect x="0" y={4 * C} width={10 * C} height={C} fill="#1c2436" />
        {(Object.keys(shell) as LayerId[]).map((layer) =>
          shell[layer].map(([x, y]) => {
            const b = blocks[pick[layer]];
            return (
              <rect
                key={`${layer}-${x}-${y}-${pick[layer]}`}
                className="bed-cell"
                x={x * C}
                y={y * C}
                width={C}
                height={C}
                fill={b.fill}
                fillOpacity={pick[layer] === "glass" ? 0.55 : 1}
                stroke="#0a0d14"
                strokeWidth="2"
              />
            );
          }),
        )}
        <rect x={4 * C} y={3 * C + 18} width={2 * C} height={C - 18} fill="#3d82ff" />
        <rect x={4 * C} y={3 * C + 18} width={30} height={C - 18} fill="#e9edf3" />
      </svg>

      <div className="bed-controls">
        {layers.map((layer) => (
          <fieldset key={layer.id} className="bed-layer">
            <legend>{layer.label}</legend>
            <div className="bed-options">
              {order.map((id) => (
                <label key={id} className="bed-option">
                  <input
                    type="radio"
                    name={layer.id}
                    value={id}
                    checked={pick[layer.id] === id}
                    onChange={() => setPick((p) => ({ ...p, [layer.id]: id }))}
                  />
                  <span>
                    <i style={{ background: blocks[id].fill }} aria-hidden="true" />
                    {blocks[id].name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <p className="bed-result" aria-live="polite">
        <strong className="bed-time">{format(total)}</strong>
        is roughly how long it takes to dig from the top down to the bed with an empty hand ({layers.map((l) => format(blocks[pick[l.id]].seconds)).join(" + ")}). Java Edition break times; real
        players bring tools.
      </p>
    </div>
  );
}
