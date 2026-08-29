"use client";

import React, { useEffect, useState, useRef } from "react";
import KickoffScene from "./scenes/KickoffScene";
import SystemsMindsetScene from "./scenes/SystemsMindsetScene";
import SpatialResumeScene from "./scenes/SpatialResumeScene";
import AgniPressScene from "./scenes/AgniPressScene";
import XaiResearchScene from "./scenes/XaiResearchScene";
import CareerPathScene from "./scenes/CareerPathScene";
import CraftArsenalScene from "./scenes/CraftArsenalScene";
import FullTimeFinaleScene from "./scenes/FullTimeFinaleScene";
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
      className="relative w-full bg-[var(--color-void-deep)] text-[var(--color-steel-white)]"
      style={{
        height: shouldReduceMotion ? "auto" : "700vh",
      }}
    >
      {/* Sticky 100vh Spatial Camera Frustum */}
      <div className={`${shouldReduceMotion ? "relative min-h-screen" : "sticky top-0 h-screen w-full overflow-hidden"}`}>
        {/* Continuous Spatial Scenes Layer */}
        <div className="relative w-full h-full spatial-canvas-3d">
          <KickoffScene progress={scrollProgress} />
          <SystemsMindsetScene progress={scrollProgress} />
          <SpatialResumeScene progress={scrollProgress} />
          <AgniPressScene progress={scrollProgress} />
          <XaiResearchScene progress={scrollProgress} />
          <CareerPathScene progress={scrollProgress} />
          <CraftArsenalScene progress={scrollProgress} />
          <FullTimeFinaleScene progress={scrollProgress} />
        </div>
      </div>
    </div>
  );
}