"use client";

import React, { useEffect, useState, useRef } from "react";
import EntranceFacadeScene from "./scenes/EntranceFacadeScene";
import PerspectiveCorridorScene from "./scenes/PerspectiveCorridorScene";
import ArchiveGalleryScene from "./scenes/ArchiveGalleryScene";
import AgniPressWorkshopScene from "./scenes/AgniPressWorkshopScene";
import OpenSkyXaiScene from "./scenes/OpenSkyXaiScene";
import CareerWorkbenchScene from "./scenes/CareerWorkbenchScene";
import CodeTerminalFinaleScene from "./scenes/CodeTerminalFinaleScene";
import { useReducedMotion } from "framer-motion";

export default function CinematicStage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let rafId: number = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[var(--color-paper-base)] text-[var(--color-ink-primary)]"
      style={{
        height: shouldReduceMotion ? "auto" : "700vh",
      }}
    >
      {/* Sticky 100vh Viewport Frustum */}
      <div className={`${shouldReduceMotion ? "relative min-h-screen" : "sticky top-0 h-screen w-full overflow-hidden"}`}>
        {/* Continuous Storyboard Scenes Layer */}
        <div className="relative w-full h-full">
          <EntranceFacadeScene progress={scrollProgress} />
          <PerspectiveCorridorScene progress={scrollProgress} />
          <ArchiveGalleryScene progress={scrollProgress} />
          <AgniPressWorkshopScene progress={scrollProgress} />
          <OpenSkyXaiScene progress={scrollProgress} />
          <CareerWorkbenchScene progress={scrollProgress} />
          <CodeTerminalFinaleScene progress={scrollProgress} />
        </div>
      </div>
    </div>
  );
}