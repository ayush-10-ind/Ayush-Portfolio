"use client";

import React from "react";

interface SceneProps {
  progress: number;
}

export default function KickoffScene({ progress }: SceneProps) {
  // Active window: 0% -> 18%
  if (progress > 0.18) return null;

  // Compute camera Z-push and fade out
  const sceneProgress = Math.min(1, progress / 0.14);
  const opacity = Math.max(0, 1 - sceneProgress * 1.5);
  const zPush = sceneProgress * 600;
  const scale = 1 + sceneProgress * 0.3;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-150 pointer-events-none"
      style={{ opacity }}
    >
      {/* Tactical Center Circle Backdrop */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] tablet:w-[560px] laptop:w-[720px] h-[340px] tablet:h-[560px] laptop:h-[720px] rounded-full border border-[var(--color-pitch-green)]/30 pointer-events-none flex items-center justify-center"
      >
        <div className="w-3 h-3 rounded-full bg-[var(--color-accent)] shadow-sm" />
        <div className="absolute inset-10 rounded-full border border-dashed border-[var(--color-border)]" />
      </div>

      {/* Top Metadata Strip */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 font-mono text-[11px] text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-4 tracking-widest uppercase relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-accent)] font-medium">INDEX 00 / KICKOFF</span>
          <span className="text-[var(--color-border-strong)]">·</span>
          <span>SYSTEMS &amp; MACHINE LEARNING</span>
        </div>
        <div className="flex items-center gap-4">
          <span>COORD: 28.4744° N · 77.5040° E</span>
          <span className="hidden tablet:inline text-[var(--color-border-strong)]">·</span>
          <span className="text-[var(--color-text-primary)] hidden tablet:inline font-medium">
            GREATER NOIDA, INDIA
          </span>
        </div>
      </div>

      {/* Main Display Headline with 3D Z-Push */}
      <div
        className="my-auto space-y-4 relative z-10 origin-center"
        style={{
          transform: `perspective(1000px) translateZ(${zPush}px) scale(${scale})`,
        }}
      >
        <h1 className="font-display text-[var(--text-display-xl)] text-[var(--color-text-primary)] font-normal tracking-tight leading-[0.92]">
          Ayush
          <br />
          <span>Trivedi</span>
          <span className="text-[var(--color-accent)]">.</span>
        </h1>

        <div className="flex items-center gap-3 font-mono text-xs tablet:text-sm text-[var(--color-pitch-green)] uppercase tracking-[0.25em] pt-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
          <span>Software Engineer · Computer Science (NIET &apos;28)</span>
        </div>
      </div>

      {/* Bottom Guidance */}
      <div className="flex flex-col tablet:flex-row justify-between items-start tablet:items-end gap-4 border-t border-[var(--color-border)] pt-6 font-mono text-xs text-[var(--color-text-secondary)] relative z-10">
        <div>
          <span className="text-[var(--color-text-primary)] font-medium block">8.4 CGPA · NIET CSE</span>
          <span>JAVA · SPRING BOOT 3 · PYTHON · XAI</span>
        </div>
        <div className="text-[var(--color-accent)] uppercase tracking-widest text-[11px] font-medium animate-pulse">
          SCROLL TO INITIATE JOURNEY ↓
        </div>
      </div>
    </div>
  );
}