// Bed defence maths, using vanilla Minecraft Java Edition block stats and formulas.
// Servers like ArchMC can change these (enchants, explosion rules), so the site labels the results as a guide.

export type ToolKind = "pickaxe" | "axe" | "shears" | "none";

export type Block = {
  name: string;
  hardness: number;
  /** Blast resistance. Infinity for blocks explosions never break. */
  resistance: number;
  tool: ToolKind;
  /** True when breaking it without the right tool is slower (the "needs a tool to drop" rule). */
  needsTool: boolean;
  /** Lowest tier level of the right tool that harvests it properly: 0 wood/gold, 1 stone, 2 iron, 3 diamond. */
  tierLevel: number;
  fill: string;
  top: string;
  note?: string;
};

const blockData = {
  wool: { name: "Wool", hardness: 0.8, resistance: 0.8, tool: "shears", needsTool: false, tierLevel: 0, fill: "#2f7bff", top: "#5fb4ff" },
  wood: { name: "Oak planks", hardness: 2, resistance: 3, tool: "axe", needsTool: false, tierLevel: 0, fill: "#a87b45", top: "#c39557" },
  terracotta: { name: "Terracotta", hardness: 1.25, resistance: 4.2, tool: "pickaxe", needsTool: true, tierLevel: 0, fill: "#4f6188", top: "#6578a3" },
  endstone: { name: "End stone", hardness: 3, resistance: 9, tool: "pickaxe", needsTool: true, tierLevel: 0, fill: "#dcd9a2", top: "#ecebc4" },
  glass: { name: "Glass", hardness: 0.3, resistance: 0.3, tool: "none", needsTool: false, tierLevel: 0, fill: "#9fdcf2", top: "#d4f3ff" },
  blastglass: {
    name: "Blast-proof glass",
    hardness: 0.3,
    resistance: Infinity,
    tool: "none",
    needsTool: false,
    tierLevel: 0,
    fill: "#6fe9ff",
    top: "#c8f8ff",
    note: "Bedwars shop block: breaks like glass, but explosions can't touch it",
  },
  obsidian: { name: "Obsidian", hardness: 50, resistance: 1200, tool: "pickaxe", needsTool: true, tierLevel: 3, fill: "#2b2142", top: "#4a3a70" },
} satisfies Record<string, Block>;

export type BlockId = keyof typeof blockData;
export const blocks: Record<BlockId, Block> = blockData;
export const blockIds = Object.keys(blocks) as BlockId[];

export const tiers = {
  wooden: { name: "Wooden", speed: 2, level: 0 },
  stone: { name: "Stone", speed: 4, level: 1 },
  iron: { name: "Iron", speed: 6, level: 2 },
  golden: { name: "Golden", speed: 12, level: 0 },
  diamond: { name: "Diamond", speed: 8, level: 3 },
} as const;

export type TierId = keyof typeof tiers;
export const tierIds = Object.keys(tiers) as TierId[];

const SHEARS_SPEED = 5;
const TICK = 1 / 20;

/** Seconds to break one block. Java's rule: progress per tick = speed / hardness / (30 if harvestable, else 100). */
function breakSeconds(block: Block, speed: number, harvestable: boolean) {
  const perTick = speed / block.hardness / (harvestable ? 30 : 100);
  if (perTick >= 1) return 0; // instant break
  return Math.ceil(1 / perTick - 1e-9) * TICK;
}

export function handTime(block: Block) {
  return breakSeconds(block, 1, !block.needsTool);
}

export function toolFor(block: Block, tier: TierId) {
  if (block.tool === "none") return "Hand (no tool helps)";
  if (block.tool === "shears") return "Shears";
  return `${tiers[tier].name} ${block.tool}`;
}

export function toolTime(block: Block, tier: TierId, efficiency: number) {
  if (block.tool === "none") return handTime(block);
  let speed = block.tool === "shears" ? SHEARS_SPEED : tiers[tier].speed;
  if (efficiency > 0) speed += efficiency * efficiency + 1;
  const harvestable = !block.needsTool || block.tool === "shears" || tiers[tier].level >= block.tierLevel;
  return breakSeconds(block, speed, harvestable);
}

export const TNT_FUSE = 4; // seconds (80 ticks)
const TNT_POWER = 4;

/**
 * One TNT placed right against the first remaining layer, following Java's explosion ray straight in.
 * The ray starts at power × 1.0 (the average of the random 0.7–1.3 roll), loses 0.225 every 0.3 blocks,
 * and each block it enters costs (resistance + 0.3) × 0.3. A block breaks while the ray still has strength.
 * Returns how many layers, counted from the front, the blast clears.
 */
function blast(resistances: number[], strength = TNT_POWER) {
  let f = strength;
  let broken = 0;
  for (let i = 0; f > 0; i++, f -= 0.225) {
    const layer = Math.floor(i * 0.3 - 0.5 + 1e-9); // the TNT's own block is air, layers start 0.5 blocks out
    if (layer < 0) continue;
    if (layer >= resistances.length) break; // reached the bed
    f -= (resistances[layer] + 0.3) * 0.3;
    if (f > 0) broken = Math.max(broken, layer + 1);
  }
  return broken;
}

export type TntPlan = {
  /** Layers (outer first) each TNT clears. */
  steps: number[][];
  /** Index (outer first) of a layer TNT can't break, if any. */
  stuckAt: number | null;
};

/** `outerFirst` lists the defence from the outside in. */
export function planTnt(outerFirst: Block[]): TntPlan {
  const steps: number[][] = [];
  let at = 0;
  while (at < outerFirst.length) {
    const cleared = blast(outerFirst.slice(at).map((b) => b.resistance));
    if (cleared === 0) return { steps, stuckAt: at };
    steps.push(Array.from({ length: cleared }, (_, k) => at + k));
    at += cleared;
  }
  return { steps, stuckAt: null };
}

export function formatTime(s: number) {
  if (s === 0) return "Instant";
  if (s >= 60) {
    const m = Math.floor(s / 60);
    const rest = Math.round((s - m * 60) * 10) / 10;
    return rest ? `${m} min ${rest} s` : `${m} min`;
  }
  return `${Number(s.toFixed(2))} s`;
}
