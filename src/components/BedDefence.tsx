"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  blockIds,
  blocks,
  formatTime,
  handTime,
  planTnt,
  TNT_FUSE,
  tierIds,
  tiers,
  toolFor,
  toolTime,
  type BlockId,
  type TierId,
} from "@/lib/bedwars";

const C = 40; // one block in the drawing
const MAX_LAYERS = 5;
const STEP_MS = 1100; // the animation's sped-up fuse

type Blast = { step: number; phase: "fuse" | "boom" } | null;

export default function BedDefence() {
  // Outer layer first.
  const [layers, setLayers] = useState<BlockId[]>(["wool", "wood", "endstone"]);
  const [tier, setTier] = useState<TierId>("diamond");
  const [eff, setEff] = useState(0);
  const [blastState, setBlast] = useState<Blast>(null);
  const [cleared, setCleared] = useState<number[]>([]);
  const timers = useRef<number[]>([]);

  const defs = layers.map((id) => blocks[id]);
  const plan = useMemo(() => planTnt(layers.map((id) => blocks[id])), [layers]);
  const hand = defs.reduce((s, b) => s + handTime(b), 0);
  const tool = defs.reduce((s, b) => s + toolTime(b, tier, eff), 0);
  const tntCount = plan.steps.length + (plan.stuckAt !== null ? 1 : 0);

  const stopBlast = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setBlast(null);
    setCleared([]);
  };
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const edit = (fn: (l: BlockId[]) => BlockId[]) => {
    stopBlast();
    setLayers(fn);
  };

  const playBlast = () => {
    stopBlast();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const all = [...plan.steps, ...(plan.stuckAt !== null ? [[] as number[]] : [])];
    if (reduce) {
      setCleared(plan.steps.flat());
      setBlast({ step: all.length - 1, phase: "boom" });
      return;
    }
    let t = 0;
    all.forEach((layersHit, i) => {
      timers.current.push(window.setTimeout(() => setBlast({ step: i, phase: "fuse" }), t));
      t += STEP_MS;
      timers.current.push(
        window.setTimeout(() => {
          setBlast({ step: i, phase: "boom" });
          setCleared((c) => [...c, ...layersHit]);
        }, t),
      );
      t += 450;
    });
  };

  // Drawing: n layers wrap a bed; layer k (1 = inner) is an arch k blocks out from it.
  const n = layers.length;
  const W = 2 * n + 4;
  const H = n + 3;
  const b0 = n + 1;
  const floor = n + 1;
  const cells: { x: number; y: number; outer: number }[] = [];
  for (let k = 1; k <= n; k++) {
    const outer = n - k; // index in `layers`
    for (let j = 0; j < k; j++) {
      cells.push({ x: b0 - k + j, y: floor - j, outer }, { x: b0 + 1 + k - j, y: floor - j, outer });
    }
    cells.push({ x: b0, y: floor - k, outer }, { x: b0 + 1, y: floor - k, outer });
  }
  // The TNT sits on top of the outermost layer still standing.
  const nextLayer = blastState ? (plan.steps[blastState.step]?.[0] ?? plan.stuckAt ?? 0) : 0;
  const tntY = floor - (n - nextLayer) - 1;
  const stuckShake = blastState?.phase === "boom" && plan.stuckAt !== null && blastState.step === plan.steps.length;

  return (
    <div className="lab">
      <div className="lab-stage">
        <div className="lab-screen">
          <svg
            className="lab-art"
            viewBox={`0 0 ${W * C} ${H * C}`}
            role="img"
            aria-label={`Bed defence, outside in: ${defs.map((b) => b.name).join(", ")}, around a bed`}
            shapeRendering="crispEdges"
          >
            <defs>
              <pattern id="lab-grid" width={C} height={C} patternUnits="userSpaceOnUse">
                <path d={`M ${C} 0 L 0 0 0 ${C}`} fill="none" stroke="rgb(34 211 255 / 0.07)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width={W * C} height={H * C} fill="url(#lab-grid)" />
            <rect x="0" y={(floor + 1) * C} width={W * C} height={C} fill="#0d1526" />
            <rect x="0" y={(floor + 1) * C} width={W * C} height="3" fill="#22d3ff" opacity="0.5" />
            {cells.map(({ x, y, outer }) => {
              const b = defs[outer];
              const gone = cleared.includes(outer);
              const blocked = stuckShake && outer === plan.stuckAt;
              return (
                <g
                  key={`${x}-${y}-${layers[outer]}-${outer}`}
                  className={`lab-cell${gone ? " is-gone" : ""}${blocked ? " is-blocked" : ""}`}
                  style={{ "--d": `${(Math.abs(x - b0 - 0.5) + (floor - y)) * 30}ms` } as React.CSSProperties}
                >
                  <rect x={x * C} y={y * C} width={C} height={C} fill={b.fill} fillOpacity={b.tool === "none" ? 0.6 : 1} />
                  <rect x={x * C} y={y * C} width={C} height="6" fill={b.top} fillOpacity={b.tool === "none" ? 0.7 : 1} />
                  <rect x={x * C + 1} y={y * C + 1} width={C - 2} height={C - 2} fill="none" stroke="#05070d" strokeWidth="2" />
                </g>
              );
            })}
            {/* bed */}
            <rect x={b0 * C} y={floor * C + 18} width={2 * C} height={C - 18} fill="#2f7bff" />
            <rect x={b0 * C} y={floor * C + 14} width={30} height={C - 14} fill="#e9f4ff" />
            <rect x={b0 * C} y={floor * C + 34} width={2 * C} height={6} fill="#6b4a2a" />
            {blastState && (
              <g className={`lab-tnt is-${blastState.phase}`} key={`${blastState.step}-${blastState.phase}`}>
                {blastState.phase === "fuse" ? (
                  <>
                    <rect x={b0 * C + C / 2} y={tntY * C} width={C} height={C} fill="#e0332b" />
                    <rect x={b0 * C + C / 2} y={tntY * C + 14} width={C} height={12} fill="#f4f1ea" />
                    <text x={b0 * C + C} y={tntY * C + 24} textAnchor="middle" fontSize="10" fontWeight="800" fill="#1a1a1a">
                      TNT
                    </text>
                  </>
                ) : (
                  <circle cx={b0 * C + C} cy={tntY * C + C / 2} r={C * 1.6} fill="url(#lab-boom)" />
                )}
              </g>
            )}
            <defs>
              <radialGradient id="lab-boom">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.35" stopColor="#7ff3ff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#22d3ff" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
          <div className="lab-screen-bar">
            <span>Cross-section · {n} {n === 1 ? "layer" : "layers"}</span>
            <button type="button" className="btn btn-primary btn-small" onClick={blastState ? stopBlast : playBlast}>
              {blastState ? "Rebuild" : "Blast it"}
            </button>
          </div>
        </div>

        <dl className="lab-results" aria-live="polite">
          <div className="lab-result">
            <dt>Bare hands</dt>
            <dd className="lab-big">{formatTime(hand)}</dd>
            <dd className="lab-small">Punching straight down, one block per layer</dd>
          </div>
          <div className="lab-result">
            <dt>With tools</dt>
            <dd className="lab-big">{formatTime(tool)}</dd>
            <dd className="lab-small">
              {tiers[tier].name} tier{eff ? `, Efficiency ${["I", "II", "III", "IV", "V"][eff - 1]}` : ", no enchants"}, best tool per block
            </dd>
          </div>
          <div className={`lab-result${plan.stuckAt !== null ? " is-stuck" : ""}`}>
            <dt>TNT</dt>
            {plan.stuckAt === null ? (
              <>
                <dd className="lab-big">
                  {tntCount} TNT
                </dd>
                <dd className="lab-small">
                  {formatTime(tntCount * TNT_FUSE)} of fuses ({TNT_FUSE} s each), one after another
                </dd>
              </>
            ) : (
              <>
                <dd className="lab-big">Can&rsquo;t break</dd>
                <dd className="lab-small">
                  {plan.steps.length
                    ? `${plan.steps.length} TNT (${formatTime(plan.steps.length * TNT_FUSE)}) clears the outer ${plan.steps.flat().length === 1 ? "layer" : `${plan.steps.flat().length} layers`}, then `
                    : ""}
                  {defs[plan.stuckAt].name} stops every blast. Dig it out with a tool.
                </dd>
              </>
            )}
          </div>
        </dl>
      </div>

      <div className="lab-controls">
        <div className="lab-layers">
          {layers.map((id, i) => (
            <fieldset key={i} className="lab-layer">
              <legend>
                <span className="lab-layer-num">{String(i + 1).padStart(2, "0")}</span>
                {i === 0 ? "Outer layer" : i === n - 1 ? "Inner layer (touching the bed)" : "Middle layer"}
              </legend>
              <div className="lab-options">
                {blockIds.map((bid) => (
                  <label key={bid} className="lab-option" title={blocks[bid].note}>
                    <input
                      type="radio"
                      name={`layer-${i}`}
                      value={bid}
                      checked={id === bid}
                      onChange={() => edit((l) => l.map((x, j) => (j === i ? bid : x)))}
                    />
                    <span>
                      <i style={{ background: blocks[bid].fill }} aria-hidden="true" />
                      {blocks[bid].name}
                    </span>
                  </label>
                ))}
              </div>
              <p className="lab-layer-stats">
                <span>Hand {formatTime(handTime(blocks[id]))}</span>
                <span>
                  {toolFor(blocks[id], tier)} {formatTime(toolTime(blocks[id], tier, eff))}
                </span>
                <span>
                  {blocks[id].resistance === Infinity ? "Blast-proof" : `Blast resistance ${blocks[id].resistance}`}
                </span>
              </p>
            </fieldset>
          ))}
          <div className="lab-layer-actions">
            <button
              type="button"
              className="btn btn-ghost btn-small"
              disabled={n >= MAX_LAYERS}
              onClick={() => edit((l) => (l.length < MAX_LAYERS ? ["wool", ...l] : l))}
            >
              + Add outer layer
            </button>
            <button type="button" className="btn btn-ghost btn-small" disabled={n <= 1} onClick={() => edit((l) => (l.length > 1 ? l.slice(1) : l))}>
              − Remove outer layer
            </button>
          </div>
        </div>

        <div className="lab-tools">
          <fieldset className="lab-layer">
            <legend>Tool tier (pickaxe and axe)</legend>
            <div className="lab-options">
              {tierIds.map((t) => (
                <label key={t} className="lab-option">
                  <input type="radio" name="tier" value={t} checked={tier === t} onChange={() => setTier(t)} />
                  <span>{tiers[t].name}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="lab-layer">
            <legend>Efficiency enchant</legend>
            <div className="lab-options">
              {["None", "I", "II", "III", "IV", "V"].map((label, lvl) => (
                <label key={label} className="lab-option">
                  <input type="radio" name="eff" value={lvl} checked={eff === lvl} onChange={() => setEff(lvl)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="lab-fine">
            Vanilla Java Edition numbers: block hardness and blast resistance, a 4 second TNT fuse, and an average-strength
            blast placed right against the defence. Shears are used on wool. ArchMC can tweak enchants and explosions, so
            treat it as a guide, not gospel.
          </p>
        </div>
      </div>
    </div>
  );
}
