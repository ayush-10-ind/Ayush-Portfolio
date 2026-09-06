"use client";

import React from "react";

interface SceneProps {
  progress: number;
}

export default function EntranceFacadeScene({ progress }: SceneProps) {
  // Active window: 0% -> 14%
  if (progress > 0.14) return null;

  const sceneProgress = Math.min(1, progress / 0.11);
  const opacity = Math.max(0, 1 - sceneProgress * 1.5);
  const zPush = sceneProgress * 700;
  const doorRotateY = sceneProgress * 75;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-none"
      style={{ opacity }}
    >
      {/* Top Header Tag */}
      <div className="flex justify-between items-center border-b border-[var(--color-sketch-line)] pb-4 font-mono text-[11px] text-[var(--color-ink-secondary)] uppercase tracking-widest relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--color-terracotta)]">STAGE 01 //</span>
          <span>WHERE CREATIVITY MEETS CODE »</span>
        </div>
        <span className="text-[var(--color-ink-primary)] font-medium hidden tablet:inline">
          GREATER NOIDA, INDIA · COORD: 28.4744° N, 77.5040° E
        </span>
      </div>

      {/* Sketched House Entrance with 3D Door Open Effect */}
      <div
        className="my-auto max-w-2xl mx-auto w-full text-center space-y-6 relative z-10"
        style={{
          transform: `perspective(1000px) translateZ(${zPush}px)`,
        }}
      >
        <div className="space-y-2">
          <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-[0.25em] block font-medium">
            WELCOME TO THE STUDIO
          </span>
          <h1 className="font-display text-[var(--text-display-lg)] text-[var(--color-ink-primary)] font-normal tracking-tight">
            Ayush Trivedi
          </h1>
          <p className="font-mono text-xs tablet:text-sm text-[var(--color-wano-green)] font-medium">
            Software Engineer · Computer Science (NIET &apos;28) · 8.4 CGPA
          </p>
        </div>

        {/* Hand-Drawn Doorway Visual Frame */}
        <div className="relative w-64 tablet:w-72 h-72 tablet:h-80 mx-auto sketch-door p-4 flex flex-col justify-between items-center overflow-hidden">
          {/* Top Arch Doorplate */}
          <div className="border-b-2 border-[var(--color-ink-primary)] pb-2 w-full font-mono text-[10px] text-[var(--color-ink-primary)] font-semibold uppercase tracking-wider">
            PROFILE // ENTRANCE
          </div>

          {/* Center Double Doors that swing open with scroll */}
          <div className="relative w-full flex-1 flex my-2">
            {/* Left Door */}
            <div
              className="w-1/2 h-full bg-[#FFFDF8] border-2 border-[var(--color-ink-primary)] border-r-0 origin-left flex items-center justify-end pr-2 transition-transform duration-75"
              style={{
                transform: `perspective(600px) rotateY(-${doorRotateY}deg)`,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-amber-lantern)] border border-[var(--color-ink-primary)]" />
            </div>

            {/* Right Door */}
            <div
              className="w-1/2 h-full bg-[#FFFDF8] border-2 border-[var(--color-ink-primary)] border-l-0 origin-right flex items-center justify-start pl-2 transition-transform duration-75"
              style={{
                transform: `perspective(600px) rotateY(${doorRotateY}deg)`,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-amber-lantern)] border border-[var(--color-ink-primary)]" />
            </div>
          </div>

          <div className="font-mono text-[9px] text-[var(--color-ink-secondary)] uppercase">
            PUSH TO ENTER
          </div>
        </div>
      </div>

      {/* Bottom Guidance */}
      <div className="flex justify-between items-end border-t border-[var(--color-sketch-line)] pt-4 font-mono text-xs text-[var(--color-ink-secondary)] relative z-10">
        <div>JAVA 21 · SPRING BOOT 3 · PYTHON · XAI</div>
        <div className="text-[var(--color-terracotta)] font-medium uppercase tracking-widest text-[11px] animate-pulse">
          SCROLL TO WALK INSIDE ↓
        </div>
      </div>
    </div>
  );
}