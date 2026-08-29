"use client";

import React from "react";
import { getAllSkillGroups } from "@/lib/data/skills";

interface SceneProps {
  progress: number;
}

export default function CraftWorkbenchScene({ progress }: SceneProps) {
  // Active window: 84% -> 96%
  if (progress < 0.82 || progress > 0.96) return null;

  const skillGroups = getAllSkillGroups();

  // Fade calculation
  let opacity = 1;
  if (progress < 0.86) {
    opacity = (progress - 0.82) / 0.04;
  } else if (progress > 0.92) {
    opacity = Math.max(0, 1 - (progress - 0.92) / 0.04);
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-150 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-border)]/60 pb-4 font-mono text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-accent)] font-medium">INDEX 06 / CRAFT WORKBENCH</span>
          <span className="text-[var(--color-border)]">|</span>
          <span>DISCIPLINES &amp; COMPETENCIES</span>
        </div>
        <span>TRAINING GROUND MATRIX</span>
      </div>

      {/* Main Content */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block">
            TECHNICAL ARSENAL
          </span>
          <h2 className="font-display text-3xl tablet:text-4xl text-[var(--color-text-primary)] font-normal">
            Engineering Competencies &amp; Craft.
          </h2>
        </div>

        {/* 4 Domain Cards Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-4">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className="border border-[var(--color-border)] p-5 bg-[#121212] drafting-corner space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="border-b border-[var(--color-border)]/40 pb-2">
                  <span className="font-mono text-[9px] text-[var(--color-accent)] uppercase tracking-widest block">
                    DOMAIN 0{idx + 1}
                  </span>
                  <h3 className="font-display text-base text-[var(--color-text-primary)] font-medium">
                    {group.domain}
                  </h3>
                </div>

                <ul className="space-y-1.5 font-mono text-xs text-[var(--color-text-secondary)]">
                  {group.skills.map((s, sIdx) => (
                    <li key={sIdx} className="flex items-center justify-between border-b border-[var(--color-border)]/20 pb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                        <span>{s.name}</span>
                      </span>
                      <span className="text-[var(--color-text-tertiary)] text-[9px] uppercase">
                        {s.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <span className="font-mono text-[9px] text-[var(--color-text-tertiary)] pt-2 border-t border-[var(--color-border)]/40 block">
                VERIFIED SKILL
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-border)]/60 pt-4 flex justify-between font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-widest">
        <span>TECHNICAL WORKBENCH</span>
        <span>SCROLL TO ENTER FULL TIME FINALE →</span>
      </div>
    </div>
  );
}