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
  const zPush = sceneProgress * 750;
  const doorRotateY = sceneProgress * 80;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-[var(--color-sketch-line)] pb-4 font-mono text-[11px] text-[var(--color-ink-secondary)] uppercase tracking-widest relative z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[var(--color-terracotta)]">STAGE 01 //</span>
          <span>WHERE CREATIVITY MEETS CODE »</span>
        </div>
        <span className="text-[var(--color-ink-primary)] font-medium hidden tablet:inline">
          GREATER NOIDA, INDIA · COORD: 28.4744° N, 77.5040° E
        </span>
      </div>

      {/* Sketched Hand-Drawn Background Elements (Tree & Lamp) */}
      <div className="absolute inset-0 pointer-events-none flex justify-between items-end px-4 tablet:px-16 pb-12 z-0 opacity-40">
        {/* Sketched Tree (Left) */}
        <svg className="w-48 tablet:w-72 h-64 tablet:h-96 text-[var(--color-ink-primary)]" viewBox="0 0 200 300" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M100 280 L100 160 M100 200 L70 140 M100 170 L130 120 M70 140 L50 110 M130 120 L150 90" strokeWidth="2.5" />
          <path d="M40 100 C30 70, 70 30, 100 40 C130 20, 170 60, 160 100 C180 130, 140 170, 100 160 C60 170, 20 130, 40 100 Z" strokeDasharray="3 3" />
        </svg>

        {/* Sketched Street Lamp (Right) */}
        <svg className="hidden tablet:block w-24 h-80 text-[var(--color-ink-primary)]" viewBox="0 0 100 300" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M50 280 L50 40 M35 40 L65 40 M30 30 L70 30 L60 50 L40 50 Z" strokeWidth="2" />
          <circle cx="50" cy="40" r="8" fill="var(--color-amber-lantern)" fillOpacity="0.4" />
        </svg>
      </div>

      {/* Center 3D House Facade & Doorway */}
      <div
        className="my-auto max-w-2xl mx-auto w-full text-center space-y-6 relative z-10"
        style={{
          transform: `perspective(1000px) translateZ(${zPush}px)`,
        }}
      >
        <div className="space-y-1">
          <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-[0.25em] block font-bold">
            WELCOME TO THE STUDIO
          </span>
          <h1 className="font-display text-[var(--text-display-lg)] text-[var(--color-ink-primary)] font-normal tracking-tight">
            Ayush Trivedi
          </h1>
          <p className="font-mono text-xs tablet:text-sm text-[var(--color-wano-green)] font-semibold">
            Software Engineer · Computer Science (NIET &apos;28) · 8.4 CGPA
          </p>
        </div>

        {/* Hand-Drawn Doorway Visual Frame */}
        <div className="relative w-64 tablet:w-76 h-76 tablet:h-84 mx-auto sketch-door p-4 flex flex-col justify-between items-center shadow-lg">
          {/* Top Arch Doorplate */}
          <div className="border-b-2 border-[var(--color-ink-primary)] pb-2 w-full font-mono text-[11px] text-[var(--color-ink-primary)] font-bold uppercase tracking-wider">
            PROFILE // ENTRANCE
          </div>

          {/* Center Double Doors that swing open with scroll */}
          <div className="relative w-full flex-1 flex my-2">
            {/* Left Door */}
            <div
              className="w-1/2 h-full bg-[#FFFDF8] border-2 border-[var(--color-ink-primary)] border-r-0 origin-left flex items-center justify-end pr-2.5 transition-transform duration-75"
              style={{
                transform: `perspective(600px) rotateY(-${doorRotateY}deg)`,
              }}
            >
              <div className="w-3 h-3 rounded-full bg-[var(--color-amber-lantern)] border-2 border-[var(--color-ink-primary)] shadow-sm" />
            </div>

            {/* Right Door */}
            <div
              className="w-1/2 h-full bg-[#FFFDF8] border-2 border-[var(--color-ink-primary)] border-l-0 origin-right flex items-center justify-start pl-2.5 transition-transform duration-75"
              style={{
                transform: `perspective(600px) rotateY(${doorRotateY}deg)`,
              }}
            >
              <div className="w-3 h-3 rounded-full bg-[var(--color-amber-lantern)] border-2 border-[var(--color-ink-primary)] shadow-sm" />
            </div>
          </div>

          <div className="font-mono text-[9px] text-[var(--color-ink-secondary)] font-semibold uppercase tracking-wider">
            PUSH TO ENTER CORRIDOR
          </div>
        </div>
      </div>

      {/* Bottom Guidance */}
      <div className="flex justify-between items-end border-t border-[var(--color-sketch-line)] pt-4 font-mono text-xs text-[var(--color-ink-secondary)] relative z-20">
        <div>JAVA 21 · SPRING BOOT 3 · PYTHON · XAI</div>
        <div className="text-[var(--color-terracotta)] font-bold uppercase tracking-widest text-[11px] animate-pulse">
          SCROLL TO WALK INSIDE ↓
        </div>
      </div>
    </div>
  );
}