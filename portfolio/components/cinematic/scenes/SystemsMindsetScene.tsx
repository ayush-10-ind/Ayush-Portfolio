"use client";

import React from "react";

interface SceneProps {
  progress: number;
}

export default function SystemsMindsetScene({ progress }: SceneProps) {
  // Strict lifecycle: 13% -> 29%
  if (progress < 0.12 || progress > 0.30) return null;

  let opacity = 1;
  if (progress < 0.16) {
    opacity = (progress - 0.12) / 0.04;
  } else if (progress > 0.25) {
    opacity = Math.max(0, 1 - (progress - 0.25) / 0.04);
  }

  const localProgress = Math.min(1, Math.max(0, (progress - 0.14) / 0.14));
  const zShift = (localProgress - 0.5) * 180;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex justify-between items-baseline border-b border-[var(--color-cut-line)] pb-4 font-mono text-[11px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-blade-crimson)] font-medium">INDEX 01 // THE MINDSET</span>
          <span className="text-[var(--color-cut-line)]">|</span>
          <span>SANTORYU · SYSTEMS · DISCIPLINE</span>
        </div>
        <span className="text-[var(--color-steel-white)] font-medium">8.4 CGPA · NIET CSE</span>
      </div>

      {/* Center Cinematic Monument */}
      <div
        className="my-auto max-w-5xl mx-auto w-full space-y-8"
        style={{
          transform: `perspective(1200px) translateZ(${zShift}px)`,
        }}
      >
        <div className="space-y-3">
          <span className="font-mono text-xs text-[var(--color-blade-crimson)] uppercase tracking-[0.25em] block font-medium">
            CORE DOCTRINE
          </span>
          <h2 className="font-display text-3xl tablet:text-5xl laptop:text-6xl text-[var(--color-steel-white)] font-normal leading-tight">
            &ldquo;I think in systems.&rdquo;
          </h2>
        </div>

        {/* Santoryu 3-Pillar Depth Array */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 pt-4 font-body">
          {/* Pillar 1: Backend Systems */}
          <div className="steel-panel p-6 space-y-2 rounded-xs">
            <span className="font-mono text-[10px] text-[var(--color-blade-crimson)] uppercase tracking-wider block font-medium">
              01 / ARCHITECTURE
            </span>
            <h3 className="font-display text-lg text-[var(--color-steel-white)] font-medium">
              Backend Systems
            </h3>
            <p className="text-xs text-[var(--color-mist-gray)] leading-relaxed">
              Engineering with Java 21, Spring Boot 3, declarative JPA persistence, and secure OAuth2 authorization boundaries.
            </p>
          </div>

          {/* Pillar 2: Explainability */}
          <div className="steel-panel p-6 space-y-2 rounded-xs">
            <span className="font-mono text-[10px] text-[var(--color-wano-jade)] uppercase tracking-wider block font-medium">
              02 / ANALYTICS
            </span>
            <h3 className="font-display text-lg text-[var(--color-steel-white)] font-medium">
              Explainable AI
            </h3>
            <p className="text-xs text-[var(--color-mist-gray)] leading-relaxed">
              Researching model interpretability and post-hoc feature attribution scoring in Python to audit black-box decisions.
            </p>
          </div>

          {/* Pillar 3: Athletics & Problem Solving */}
          <div className="steel-panel p-6 space-y-2 rounded-xs">
            <span className="font-mono text-[10px] text-[var(--color-blade-crimson)] uppercase tracking-wider block font-medium">
              03 / DISCIPLINE
            </span>
            <h3 className="font-display text-lg text-[var(--color-steel-white)] font-medium">
              Athletics &amp; DSA
            </h3>
            <p className="text-xs text-[var(--color-mist-gray)] leading-relaxed">
              Competitive football player cultivating high-pressure leadership and tactical adaptability, paired with daily LeetCode DSA problem-solving.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-cut-line)] pt-4 flex justify-between font-mono text-[10px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <span>CONTINUING TO SPATIAL DRAFTING ARCHIVE</span>
        <span className="text-[var(--color-blade-crimson)] font-medium">SCROLL TO ADVANCE →</span>
      </div>
    </div>
  );
}