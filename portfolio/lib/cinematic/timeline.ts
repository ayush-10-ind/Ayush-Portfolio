// lib/cinematic/timeline.ts
// THE single source of truth for the film's timeline windows.
// Content bands are EXCLUSIVE and separated by transition gaps — the
// anti-ghosting guarantee. Tune windows here.

export interface SceneDef {
  id: string;
  index: number; // 0-based
  label: string;
  number: string; // "00".."06"
  window: [number, number]; // timeline [start, end]
}

export interface TransitionDef {
  id: string;
  name: string;
  window: [number, number];
  from: string;
  to: string;
}

export const SCENES: SceneDef[] = [
  { id: "arrival",     index: 0, label: "Arrival",      number: "00", window: [0.0, 0.07] },
  { id: "study",       index: 1, label: "The Study",    number: "01", window: [0.1, 0.235] },
  { id: "workshop",    index: 2, label: "The Workshop", number: "02", window: [0.27, 0.4] },
  { id: "engine",      index: 3, label: "The Engine",   number: "03", window: [0.435, 0.545] },
  { id: "observatory", index: 4, label: "The Observatory", number: "04", window: [0.58, 0.685] },
  { id: "ledger",      index: 5, label: "The Ledger",   number: "05", window: [0.715, 0.805] },
  { id: "horizon",     index: 6, label: "The Horizon",  number: "06", window: [0.84, 1.0] },
];

export const TRANSITIONS: TransitionDef[] = [
  { id: "door",       name: "The Door",           window: [0.07, 0.1],   from: "arrival", to: "study" },
  { id: "corridor",   name: "The Corridor",       window: [0.235, 0.27], from: "study", to: "workshop" },
  { id: "portal",     name: "The Word",           window: [0.4, 0.435],  from: "workshop", to: "engine" },
  { id: "core",       name: "The Core",           window: [0.545, 0.58], from: "engine", to: "observatory" },
  { id: "dossier",    name: "The Dossier",        window: [0.685, 0.715], from: "observatory", to: "ledger" },
  { id: "horizon",    name: "The Opening",        window: [0.805, 0.84], from: "ledger", to: "horizon" },
];

export function getSceneByIndex(index: number): SceneDef | undefined {
  return SCENES.find((s) => s.index === index);
}

export function getSceneAtProgress(p: number): SceneDef | null {
  for (const s of SCENES) {
    if (p >= s.window[0] && p < s.window[1]) return s;
  }
  return null;
}

export function getSceneIndexAtProgress(p: number): number {
  const s = getSceneAtProgress(p);
  return s ? s.index : -1;
}

/** Progress position that centers a scene (for nav jumps). */
export function sceneAnchor(index: number): number {
  const s = getSceneByIndex(index);
  if (!s) return 0;
  return (s.window[0] + s.window[1]) / 2;
}

/** World-space Z of each scene's focal slab — shared with the 3D world. */
export const WORLD_Z: Record<string, { center: number; depth: number }> = {
  arrival:     { center: -4,   depth: 14 },
  study:       { center: -40,  depth: 26 },
  workshop:    { center: -96,  depth: 30 },
  engine:      { center: -146, depth: 26 },
  observatory: { center: -202, depth: 26 },
  ledger:      { center: -252, depth: 24 },
  horizon:     { center: -320, depth: 60 },
};

/** Boundary markers (where transition objects live), in world Z. */
export const BOUNDARIES: Record<string, number> = {
  gate: -16,      // arrival -> study
  corridor: -64,  // study -> workshop
  portal: -118,   // workshop -> engine
  core: -176,     // engine -> observatory
  dossier: -226,  // observatory -> ledger
  horizon: -278,  // ledger -> horizon
};
