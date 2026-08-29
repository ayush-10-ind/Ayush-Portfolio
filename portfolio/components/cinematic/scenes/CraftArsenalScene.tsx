"use client";

import React from "react";
import { getAllSkillGroups } from "@/lib/data/skills";

interface SceneProps {
  progress: number;
}

export default function CraftArsenalScene({ progress }: SceneProps) {
  // Strict lifecycle: 84% -> 96%
  if (progress < 0.82 || progress > 0.96) return null;

  const skillGroups = getAllSkillGroups();

  let opacity = 1;
  if (progress < 0.86) {
    opacity = (progress - 0.82) / 0.04;
  } else if (progress > 0.92) {
    opacity = Math.max(0, 1 - (progress - 0.92) / 0.04);
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-cut-line)] pb-4 font-mono text-[11px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-blade-crimson)] font-medium">INDEX 06 // THE ARSENAL</span>
          <span className="text-[var(--color-cut-line)]">|</span>
          <span>DISCIPLINES &amp; COMPETENCIES</span>
        </div>
        <span className="text-[var(--color-steel-white)] font-medium">TECHNICAL WORKBENCH</span>
      </div>

      {/* Main Content */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-[var(--color-blade-crimson)] uppercase tracking-widest block font-medium">
            TECHNICAL ARSENAL
          </span>
          <h2 className="font-display text-3xl tablet:text-4xl text-[var(--color-steel-white)] font-normal">
            Engineering Competencies &amp; Craft.
          </h2>
        </div>

        {/* 4 Domain Clusters Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-4">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className="steel-panel p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="border-b border-[var(--color-cut-line)] pb-2">
                  <span className="font-mono text-[9px] text-[var(--color-blade-crimson)] uppercase tracking-widest block font-medium">
                    CLUSTER 0{idx + 1}
                  </span>
                  <h3 className="font-display text-base text-[var(--color-steel-white)] font-medium">
                    {group.domain}
                  </h3>
                </div>

                <ul className="space-y-1.5 font-mono text-xs text-[var(--color-mist-gray)]">
                  {group.skills.map((s, sIdx) => (
                    <li key={sIdx} className="flex items-center justify-between border-b border-[var(--color-cut-line)] pb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blade-crimson)]" />
                        <span className="text-[var(--color-steel-white)] font-medium">{s.name}</span>
                      </span>
                      <span className="text-[var(--color-dim-gray)] text-[9px] uppercase">
                        {s.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <span className="font-mono text-[9px] text-[var(--color-dim-gray)] pt-2 border-t border-[var(--color-cut-line)] block">
                VERIFIED DOMAIN
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-cut-line)] pt-4 flex justify-between font-mono text-[10px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <span>TECHNICAL WORKBENCH</span>
        <span className="text-[var(--color-blade-crimson)] font-medium">SCROLL TO ENTER FULL TIME HORIZON →</span>
      </div>
    </div>
  );
}