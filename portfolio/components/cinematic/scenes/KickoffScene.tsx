"use client";

import React from "react";

interface SceneProps {
  progress: number;
}

export default function KickoffScene({ progress }: SceneProps) {
  // Strict lifecycle: Active between 0% and 16%
  if (progress > 0.16) return null;

  const sceneProgress = Math.min(1, progress / 0.13);
  const opacity = Math.max(0, 1 - sceneProgress * 1.6);
  const zPush = sceneProgress * 700;
  const scale = 1 + sceneProgress * 0.35;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-none"
      style={{ opacity }}
    >
      {/* Volumetric Center Spotlight */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] tablet:w-[600px] laptop:w-[800px] h-[360px] tablet:h-[600px] laptop:h-[800px] rounded-full border border-[var(--color-cut-line)] pointer-events-none flex items-center justify-center"
      >
        <div className="w-3 h-3 rounded-full bg-[var(--color-blade-crimson)] shadow-[0_0_20px_var(--color-blade-crimson)] animate-pulse" />
        <div className="absolute inset-12 rounded-full border border-dashed border-[var(--color-cut-line)] opacity-40" />
      </div>

      {/* Top Precision Metadata Strip */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 font-mono text-[11px] text-[var(--color-mist-gray)] border-b border-[var(--color-cut-line)] pb-4 tracking-widest uppercase relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-blade-crimson)] font-medium">INDEX 00 // THE FORGE</span>
          <span className="text-[var(--color-cut-line)]">|</span>
          <span>SANTORYU SYSTEMS &amp; ML</span>
        </div>
        <div className="flex items-center gap-4">
          <span>COORD: 28.4744° N · 77.5040° E</span>
          <span className="hidden tablet:inline text-[var(--color-cut-line)]">|</span>
          <span className="text-[var(--color-steel-white)] hidden tablet:inline font-medium">
            GREATER NOIDA, INDIA
          </span>
        </div>
      </div>

      {/* Monumental Display Headline with 3D Z-Surge */}
      <div
        className="my-auto space-y-4 relative z-10 origin-center"
        style={{
          transform: `perspective(1200px) translateZ(${zPush}px) scale(${scale})`,
        }}
      >
        <h1 className="font-display text-[var(--text-display-xl)] text-[var(--color-steel-white)] font-normal tracking-tight leading-[0.92]">
          Ayush
          <br />
          <span>Trivedi</span>
          <span className="text-[var(--color-blade-crimson)]">.</span>
        </h1>

        <div className="flex items-center gap-3 font-mono text-xs tablet:text-sm text-[var(--color-blade-crimson)] uppercase tracking-[0.25em] pt-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-[var(--color-blade-crimson)] animate-ping" />
          <span>Software Engineer · CS Undergraduate (NIET &apos;28)</span>
        </div>
      </div>

      {/* Bottom Guidance */}
      <div className="flex flex-col tablet:flex-row justify-between items-start tablet:items-end gap-4 border-t border-[var(--color-cut-line)] pt-6 font-mono text-xs text-[var(--color-mist-gray)] relative z-10">
        <div>
          <span className="text-[var(--color-steel-white)] font-medium block">8.4 CGPA · NIET CSE</span>
          <span>JAVA 21 · SPRING BOOT 3 · PYTHON · XAI</span>
        </div>
        <div className="text-[var(--color-blade-crimson)] uppercase tracking-widest text-[11px] font-medium animate-pulse">
          SCROLL TO INITIATE SEQUENCE ↓
        </div>
      </div>
    </div>
  );
}