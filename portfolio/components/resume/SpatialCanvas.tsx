"use client";

import React, { useState, useEffect } from "react";
import { RESUME_SECTIONS, ResumeSectionId } from "./types";
import ResumeSheet from "./ResumeSheet";
import { motion, useReducedMotion } from "framer-motion";

interface SpatialCanvasProps {
  activeId: ResumeSectionId;
  onSelectSection: (id: ResumeSectionId) => void;
}

export default function SpatialCanvas({
  activeId,
  onSelectSection,
}: SpatialCanvasProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Passive mouse perspective tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 6; // Max 3 deg tilt
      const y = (e.clientY / innerHeight - 0.5) * -6;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const activeIndex = RESUME_SECTIONS.findIndex((s) => s.id === activeId);

  return (
    <div className="relative w-full h-[640px] tablet:h-[680px] flex items-center justify-center overflow-hidden border border-[var(--color-border)] bg-[#0A0A0A] architectural-grid">
      {/* Studio Radial Ambient Spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,83,0.06)_0%,transparent_75%)] pointer-events-none"
      />

      {/* 3D Perspective Viewport */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: shouldReduceMotion ? "none" : "1400px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Spatial Axis Anchor */}
        <div
          className="relative w-[340px] tablet:w-[480px] laptop:w-[560px] h-[540px] tablet:h-[560px] transition-transform duration-300 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: shouldReduceMotion
              ? "none"
              : `rotateY(${mouseOffset.x}deg) rotateX(${mouseOffset.y}deg)`,
          }}
        >
          {RESUME_SECTIONS.map((section, idx) => {
            const offset = idx - activeIndex;
            const isFocused = idx === activeIndex;

            // 3D coordinate space calculations
            const translateX = shouldReduceMotion ? 0 : offset * 64;
            const translateZ = shouldReduceMotion ? 0 : isFocused ? 50 : -Math.abs(offset) * 140;
            const rotateY = shouldReduceMotion ? 0 : offset * -15;
            const opacity = isFocused ? 1 : Math.max(0.18, 1 - Math.abs(offset) * 0.38);
            const scale = isFocused ? 1 : Math.max(0.82, 1 - Math.abs(offset) * 0.09);

            return (
              <motion.div
                key={section.id}
                onClick={() => onSelectSection(section.id)}
                layout
                animate={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: isFocused ? 30 : 20 - Math.abs(offset),
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`absolute inset-0 cursor-pointer rounded-sm border drafting-corner transition-all duration-300 ${
                  isFocused
                    ? "border-[var(--color-accent)] bg-[#141414] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-[var(--color-accent)]/40"
                    : "border-[var(--color-border)] bg-[#0E0E0E]/95 hover:border-[var(--color-text-tertiary)]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Active Indicator Top Strip */}
                {isFocused && (
                  <div
                    aria-hidden="true"
                    className="absolute -top-[1px] left-0 right-0 h-[2px] bg-[var(--color-accent)]"
                  />
                )}

                {/* Sheet Content Body */}
                <div
                  className={`w-full h-full transition-opacity duration-200 ${
                    isFocused ? "opacity-100" : "opacity-35 pointer-events-none"
                  }`}
                >
                  <ResumeSheet sectionId={section.id} isFocused={isFocused} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Ambient Coordinates & Controls Footer */}
      <div className="absolute bottom-4 left-6 right-6 flex flex-col tablet:flex-row justify-between items-center gap-2 font-mono text-[10px] text-[var(--color-text-tertiary)] pointer-events-none border-t border-[var(--color-border)]/50 pt-2 tracking-widest uppercase">
        <span>ARCHITECTURAL CANVAS · PERSPECTIVE INTERPOLATION</span>
        <span>CLICK BACKGROUND SHEETS OR USE TABS / ARROW KEYS</span>
      </div>
    </div>
  );
}