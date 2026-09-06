"use client";

import React from "react";

interface SceneProps {
  progress: number;
}

export default function PerspectiveCorridorScene({ progress }: SceneProps) {
  // Active window: 11% -> 27%
  if (progress < 0.10 || progress > 0.28) return null;

  let opacity = 1;
  if (progress < 0.14) {
    opacity = (progress - 0.10) / 0.04;
  } else if (progress > 0.24) {
    opacity = Math.max(0, 1 - (progress - 0.24) / 0.04);
  }

  const localProgress = Math.min(1, Math.max(0, (progress - 0.12) / 0.14));
  const zShift = (localProgress - 0.5) * 200;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto sketch-floor"
      style={{ opacity }}
    >
      {/* Top Header Tag */}
      <div className="flex justify-between items-center border-b border-[var(--color-sketch-line)] pb-4 font-mono text-[11px] text-[var(--color-ink-secondary)] uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--color-terracotta)]">STAGE 02 //</span>
          <span>THE PERSPECTIVE CORRIDOR</span>
        </div>
        <span className="text-[var(--color-wano-green)] font-medium">8.4 CGPA · NIET CSE</span>
      </div>

      {/* Hallway with Left & Right Framed Artworks */}
      <div
        className="my-auto max-w-5xl mx-auto w-full space-y-8"
        style={{
          transform: `perspective(1200px) translateZ(${zShift}px)`,
        }}
      >
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-[0.2em] block font-medium">
            MINDSET &amp; PHILOSOPHY
          </span>
          <h2 className="font-display text-3xl tablet:text-5xl text-[var(--color-ink-primary)] font-normal">
            &ldquo;I think in systems.&rdquo;
          </h2>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 pt-4">
          {/* Left Wall Frame */}
          <div className="sketch-frame p-6 space-y-3">
            <div className="border-b-2 border-[var(--color-ink-primary)] pb-2 flex justify-between items-baseline font-mono text-xs">
              <span className="text-[var(--color-terracotta)] font-semibold">FRAME 01 // ARCHITECTURE</span>
              <span className="text-[var(--color-ink-secondary)]">SYSTEMS</span>
            </div>
            <h3 className="font-display text-xl text-[var(--color-ink-primary)] font-medium">
              Backend Engineering &amp; Web Systems
            </h3>
            <p className="font-body text-xs text-[var(--color-ink-secondary)] leading-relaxed">
              Engineering modular applications with Java 21, Spring Boot 3, declarative JPA persistence, and secure OAuth2 authorization boundaries.
            </p>
          </div>

          {/* Right Wall Frame */}
          <div className="sketch-frame p-6 space-y-3">
            <div className="border-b-2 border-[var(--color-ink-primary)] pb-2 flex justify-between items-baseline font-mono text-xs">
              <span className="text-[var(--color-wano-green)] font-semibold">FRAME 02 // RIGOR</span>
              <span className="text-[var(--color-ink-secondary)]">DISCIPLINE</span>
            </div>
            <h3 className="font-display text-xl text-[var(--color-ink-primary)] font-medium">
              Explainable AI &amp; Athletics
            </h3>
            <p className="font-body text-xs text-[var(--color-ink-secondary)] leading-relaxed">
              Researching post-hoc feature attribution scoring in Python to audit ML decision boundaries, paired with competitive football teamwork and daily LeetCode DSA problem-solving.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Guidance */}
      <div className="flex justify-between border-t border-[var(--color-sketch-line)] pt-4 font-mono text-[10px] text-[var(--color-ink-secondary)] uppercase tracking-widest">
        <span>APPROACHING ARCHIVE GALLERY</span>
        <span className="text-[var(--color-terracotta)] font-medium">SCROLL TO ADVANCE →</span>
      </div>
    </div>
  );
}