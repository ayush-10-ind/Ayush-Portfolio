// components/cinematic/CinematicExperience.tsx
// The film. Lenis smooth scroll → master timeline → WebGL camera + DOM overlays.

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { runtime } from "@/lib/cinematic/runtime";
import {
  detectVariant,
  prefersReducedMotion,
  scrollRunway,
  type Variant,
} from "@/lib/cinematic/responsive";
import { setLenis, scrollToProgress } from "@/lib/cinematic/scrollController";
import { SCENES, sceneAnchor } from "@/lib/cinematic/timeline";

import SceneRail from "./navigation/SceneRail";
import ArchivePanel from "./archive/ArchivePanel";
import DebugHUD from "./debug/DebugHUD";
import SceneOverlay from "./overlays/SceneOverlay";
import ArrivalContent from "./overlays/content/ArrivalContent";
import StudyContent from "./overlays/content/StudyContent";
import WorkshopContent from "./overlays/content/WorkshopContent";
import EngineContent from "./overlays/content/EngineContent";
import ObservatoryContent from "./overlays/content/ObservatoryContent";
import LedgerContent from "./overlays/content/LedgerContent";
import HorizonContent from "./overlays/content/HorizonContent";

const CinematicCanvas = dynamic(() => import("./world/CinematicCanvas"), {
  ssr: false,
});

const W = SCENES.map((s) => s.window);

export default function CinematicExperience() {
  const [variant, setVariant] = useState<Variant>("desktop");
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    runtime.reducedMotion = reduced;

    const applyVariant = () => {
      const v = detectVariant(window.innerWidth);
      runtime.variant = v;
      setVariant(v);
    };
    applyVariant();
    window.addEventListener("resize", applyVariant);
    window.addEventListener("orientationchange", applyVariant);

    let lenis: Lenis | null = null;
    if (!reduced) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4,
      });
      setLenis(lenis);
      let rafId = 0;
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      // cleanup handled below via lenis.destroy; keep rafId for safety
      (lenis as unknown as { _rafId?: number })._rafId = rafId;
    }

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      runtime.progress = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const idx = runtime.sceneIndex < 0 ? 0 : runtime.sceneIndex;
      let target = -1;
      if (e.key === "ArrowDown" || e.key === "PageDown")
        target = Math.min(SCENES.length - 1, idx + 1);
      else if (e.key === "ArrowUp" || e.key === "PageUp")
        target = Math.max(0, idx - 1);
      else if (e.key === "Home") target = 0;
      else if (e.key === "End") target = SCENES.length - 1;
      if (target >= 0) {
        e.preventDefault();
        scrollToProgress(sceneAnchor(target));
      }
    };
    window.addEventListener("keydown", onKey);

    let hintRaf = 0;
    const tickHint = () => {
      if (hintRef.current) {
        hintRef.current.style.opacity = String(
          Math.max(0, 1 - runtime.progress / 0.03)
        );
      }
      hintRaf = requestAnimationFrame(tickHint);
    };
    hintRaf = requestAnimationFrame(tickHint);

    runtime.ready = true;

    return () => {
      window.removeEventListener("resize", applyVariant);
      window.removeEventListener("orientationchange", applyVariant);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(hintRaf);
      if (lenis) {
        const id = (lenis as unknown as { _rafId?: number })._rafId;
        if (id) cancelAnimationFrame(id);
        lenis.destroy();
      }
      setLenis(null);
    };
  }, []);

  return (
    <main id="main-content">
      <div style={{ height: `${scrollRunway(variant)}vh` }}>
        <div className="cinematic-stage">
          <CinematicCanvas />

          {/* readable content, gated to exclusive timeline windows */}
          <SceneOverlay window={W[0]} align="center" fadeIn={0.01} fadeOut={0.3}>
            <ArrivalContent />
          </SceneOverlay>
          <SceneOverlay window={W[1]} align="left">
            <StudyContent />
          </SceneOverlay>
          <SceneOverlay window={W[2]} align="left">
            <WorkshopContent />
          </SceneOverlay>
          <SceneOverlay window={W[3]} align="right">
            <EngineContent />
          </SceneOverlay>
          <SceneOverlay window={W[4]} align="right">
            <ObservatoryContent />
          </SceneOverlay>
          <SceneOverlay window={W[5]} align="left">
            <LedgerContent />
          </SceneOverlay>
          <SceneOverlay window={W[6]} align="center">
            <HorizonContent />
          </SceneOverlay>

          {/* scroll hint (first beat only) */}
          <div className="scroll-hint" ref={hintRef} aria-hidden="true">
            <span>SCROLL</span>
            <i />
          </div>

          {/* filmic treatments */}
          <div className="film-vignette" aria-hidden="true" />
          <div className="film-grain" aria-hidden="true" />

          <SceneRail />
          <ArchivePanel />
          <DebugHUD />
        </div>
      </div>
    </main>
  );
}
