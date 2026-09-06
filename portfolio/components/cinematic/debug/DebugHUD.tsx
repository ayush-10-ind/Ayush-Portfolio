// components/cinematic/debug/DebugHUD.tsx
// Development-only cinematic debug overlay. Enable with ?debug=1 or
// NEXT_PUBLIC_DEBUG=1. Hidden in production.

"use client";

import { useEffect, useRef, useState } from "react";
import { runtime } from "@/lib/cinematic/runtime";
import { getSceneAtProgress } from "@/lib/cinematic/timeline";

function useDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const fromQuery = new URLSearchParams(window.location.search).has("debug");
  const fromEnv = process.env.NEXT_PUBLIC_DEBUG === "1";
  return fromQuery || fromEnv;
}

export default function DebugHUD() {
  const enabled = useDebugEnabled();
  const [snap, setSnap] = useState(() => ({
    progress: 0,
    scene: "-",
    pos: [0, 0, 0],
    look: [0, 0, 0],
    fov: 0,
    fps: 60,
    variant: "desktop",
  }));
  const frames = useRef(0);
  const lastFps = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    if (!lastFps.current) lastFps.current = performance.now();
    const tick = () => {
      frames.current++;
      const now = performance.now();
      if (now - lastFps.current >= 500) {
        const fps = Math.round((frames.current * 1000) / (now - lastFps.current));
        frames.current = 0;
        lastFps.current = now;
        const scene = getSceneAtProgress(runtime.progress);
        setSnap({
          progress: runtime.progress,
          scene: scene ? `${scene.number} ${scene.label}` : "—transition—",
          pos: [
            +runtime.camera.pos[0].toFixed(2),
            +runtime.camera.pos[1].toFixed(2),
            +runtime.camera.pos[2].toFixed(2),
          ],
          look: [
            +runtime.camera.look[0].toFixed(2),
            +runtime.camera.look[1].toFixed(2),
            +runtime.camera.look[2].toFixed(2),
          ],
          fov: +runtime.camera.fov.toFixed(1),
          fps,
          variant: runtime.variant,
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="debug-hud">
      <div>progress {snap.progress.toFixed(3)}</div>
      <div>scene {snap.scene}</div>
      <div>
        cam {snap.pos.join(", ")}
      </div>
      <div>look {snap.look.join(", ")}</div>
      <div>fov {snap.fov} · fps {snap.fps} · {snap.variant}</div>
    </div>
  );
}
