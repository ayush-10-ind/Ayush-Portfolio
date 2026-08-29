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

  // Subtle mouse perspective tracking (Desktop only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 8; // Max 4 deg tilt
      const y = (e.clientY / innerHeight - 0.5) * -8;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const activeIndex = RESUME_SECTIONS.findIndex((s) => s.id === activeId);

  return (
    <div className="relative w-full h-[620px] tablet:h-[660px] flex items-center justify-center overflow-hidden border border-[var(--color-border)] bg-[#0E0E0E]">
      {/* 3D Perspective Studio Container */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: shouldReduceMotion ? "none" : "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Spatial World with mouse tilt */}
        <div
          className="relative w-[340px] tablet:w-[480px] laptop:w-[540px] h-[520px] tablet:h-[540px] transition-transform duration-300 ease-out"
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

            // Compute 3D coordinate transformation based on offset
            const translateX = shouldReduceMotion ? 0 : offset * 60;
            const translateZ = shouldReduceMotion ? 0 : isFocused ? 40 : -Math.abs(offset) * 120;
            const rotateY = shouldReduceMotion ? 0 : offset * -14;
            const opacity = isFocused ? 1 : Math.max(0.2, 1 - Math.abs(offset) * 0.35);
            const scale = isFocused ? 1 : Math.max(0.85, 1 - Math.abs(offset) * 0.08);

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
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`absolute inset-0 cursor-pointer rounded-sm border transition-shadow duration-300 ${
                  isFocused
                    ? "border-[var(--color-accent)] bg-[#141414] shadow-2xl shadow-black/80 ring-1 ring-[var(--color-accent)]/50"
                    : "border-[var(--color-border)] bg-[#101010]/90 hover:border-[var(--color-text-tertiary)]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Active Indicator Strip */}
                {isFocused && (
                  <div
                    aria-hidden="true"
                    className="absolute -top-[1px] left-0 right-0 h-[2px] bg-[var(--color-accent)]"
                  />
                )}

                {/* Sheet Content */}
                <div
                  className={`w-full h-full transition-opacity duration-200 ${
                    isFocused ? "opacity-100" : "opacity-40 pointer-events-none"
                  }`}
                >
                  <ResumeSheet sectionId={section.id} isFocused={isFocused} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Spatial Studio Bottom Ambient Legend */}
      <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center font-mono text-[10px] text-[var(--color-text-tertiary)] pointer-events-none border-t border-[var(--color-border)]/40 pt-2">
        <span>PERSPECTIVE: 3D SPATIAL DRAFTING CANVAS</span>
        <span>CLICK ADJACENT SHEETS OR USE TABS TO NAVIGATE</span>
      </div>
    </div>
  );
}