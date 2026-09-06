// lib/cinematic/runtime.ts
// Mutable singleton runtime — the single timeline shared by WebGL and DOM.
// Per-frame fields are mutated directly (no React re-render); discrete
// consumers (nav rail, debug HUD) subscribe and re-render on change.

import type { Variant } from "./responsive";

export interface Runtime {
  progress: number; // smoothed master timeline 0..1
  sceneIndex: number; // -1 during a transition gap
  variant: Variant;
  reducedMotion: boolean;
  ready: boolean;
  fps: number;
  camera: {
    pos: [number, number, number];
    look: [number, number, number];
    fov: number;
  };
}

type Listener = () => void;

class RuntimeStore implements Runtime {
  progress = 0;
  sceneIndex = 0;
  variant: Variant = "desktop";
  reducedMotion = false;
  ready = false;
  fps = 60;
  camera = {
    pos: [0, 1.5, 4] as [number, number, number],
    look: [0, 1.5, -22] as [number, number, number],
    fov: 55,
  };

  private listeners = new Set<Listener>();

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  /** Call on discrete changes only (scene index, variant, fps sample). */
  notify(): void {
    for (const fn of this.listeners) fn();
  }
}

export const runtime = new RuntimeStore();
