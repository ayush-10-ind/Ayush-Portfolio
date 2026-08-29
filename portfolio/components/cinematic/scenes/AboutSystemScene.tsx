"use client";

import React from "react";

interface SceneProps {
  progress: number;
}

export default function AboutSystemScene({ progress }: SceneProps) {
  // Active window: 12% -> 30%
  if (progress < 0.10 || progress > 0.32) return null;

  // Fade calculation
  let opacity = 1;
  if (progress < 0.16) {
    opacity = (progress - 0.10) / 0.06;
  } else if (progress > 0.26) {
    opacity = Math.max(0, 1 - (progress - 0.26) / 0.06);
  }

  const localProgress = Math.min(1, Math.max(0, (progress - 0.12) / 0.16));
  const zShift = (localProgress - 0.5) * 160;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-150 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex justify-between items-baseline border-b border-[var(--color-border)] pb-4 font-mono text-[11px] text-[var(--color-text-secondary)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-accent)] font-medium">INDEX 01 / ARCHITECTURAL MINDSET</span>
          <span className="text-[var(--color-border-strong)]">·</span>
          <span>SYSTEMS · REASONING · DISCIPLINE</span>
        </div>
        <span className="text-[var(--color-pitch-green)] font-medium">8.4 CGPA · NIET CSE</span>
      </div>

      {/* Center Cinematic Typographic World */}
      <div
        className="my-auto max-w-5xl mx-auto w-full space-y-8"
        style={{
          transform: `perspective(1200px) translateZ(${zShift}px)`,
        }}
      >
        <div className="space-y-3">
          <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-[0.2em] block font-medium">
            CORE PHILOSOPHY
          </span>
          <h2 className="font-display text-3xl tablet:text-5xl laptop:text-6xl text-[var(--color-text-primary)] font-normal leading-tight">
            &ldquo;I think in systems.&rdquo;
          </h2>
        </div>

        {/* 3 Physical Paper Sheet Pillars */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 pt-4 font-body">
          {/* Pillar 1: Backend Systems */}
          <div className="paper-sheet p-6 space-y-2 rounded-xs">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-wider block font-medium">
              01 / ARCHITECTURE
            </span>
            <h3 className="font-display text-lg text-[var(--color-text-primary)] font-medium">
              Backend Systems
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Engineering with Java 21, Spring Boot 3, declarative JPA persistence, and secure OAuth2 authorization boundaries.
            </p>
          </div>

          {/* Pillar 2: Explainability */}
          <div className="paper-sheet p-6 space-y-2 rounded-xs">
            <span className="font-mono text-[10px] text-[var(--color-pitch-green)] uppercase tracking-wider block font-medium">
              02 / ANALYTICS
            </span>
            <h3 className="font-display text-lg text-[var(--color-text-primary)] font-medium">
              Explainable AI
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Researching model interpretability and post-hoc feature attribution scoring in Python to audit ML decision boundaries.
            </p>
          </div>

          {/* Pillar 3: Athletics & Problem Solving */}
          <div className="paper-sheet p-6 space-y-2 rounded-xs">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-wider block font-medium">
              03 / DISCIPLINE
            </span>
            <h3 className="font-display text-lg text-[var(--color-text-primary)] font-medium">
              Athletics &amp; DSA
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Competitive football player cultivating high-pressure teamwork and tactical adaptability, paired with daily LeetCode DSA problem-solving.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-border)] pt-4 flex justify-between font-mono text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest">
        <span>CONTINUING TO SPATIAL RESUME STUDIO</span>
        <span className="text-[var(--color-accent)] font-medium">SCROLL TO ADVANCE →</span>
      </div>
    </div>
  );
}