"use client";

import React, { useEffect, useState, useRef } from "react";
import KickoffScene from "./scenes/KickoffScene";
import AboutSystemScene from "./scenes/AboutSystemScene";
import ResumeStudioScene from "./scenes/ResumeStudioScene";
import AgniPressPipelineScene from "./scenes/AgniPressPipelineScene";
import XaiAnalyticsScene from "./scenes/XaiAnalyticsScene";
import ExperienceTimelineScene from "./scenes/ExperienceTimelineScene";
import CraftWorkbenchScene from "./scenes/CraftWorkbenchScene";
import FullTimeFinaleScene from "./scenes/FullTimeFinaleScene";
import FootballJourney from "@/components/spatial/FootballJourney";
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
      className="relative w-full bg-[#0A0A0A] text-[var(--color-text-primary)]"
      style={{
        height: shouldReduceMotion ? "auto" : "700vh",
      }}
    >
      {/* Sticky 100vh Viewport Stage */}
      <div className={`${shouldReduceMotion ? "relative min-h-screen" : "sticky top-0 h-screen w-full overflow-hidden"}`}>
        {/* Persistent Spatial Football Kinematics */}
        <FootballJourney />

        {/* Cinematic Scenes Layer */}
        <div className="relative w-full h-full architectural-grid">
          <KickoffScene progress={scrollProgress} />
          <AboutSystemScene progress={scrollProgress} />
          <ResumeStudioScene progress={scrollProgress} />
          <AgniPressPipelineScene progress={scrollProgress} />
          <XaiAnalyticsScene progress={scrollProgress} />
          <ExperienceTimelineScene progress={scrollProgress} />
          <CraftWorkbenchScene progress={scrollProgress} />
          <FullTimeFinaleScene progress={scrollProgress} />
        </div>
      </div>
    </div>
  );
}