"use client";

import React, { useState } from "react";
import { RESUME_SECTIONS, ResumeSectionId } from "@/components/resume/types";
import ResumeSheet from "@/components/resume/ResumeSheet";

interface SceneProps {
  progress: number;
}

export default function ResumeStudioScene({ progress }: SceneProps) {
  // Active window: 26% -> 46%
  if (progress < 0.24 || progress > 0.48) return null;

  const [activeSectionId, setActiveSectionId] = useState<ResumeSectionId>("identity");

  // Fade calculation
  let opacity = 1;
  if (progress < 0.30) {
    opacity = (progress - 0.24) / 0.06;
  } else if (progress > 0.42) {
    opacity = Math.max(0, 1 - (progress - 0.42) / 0.06);
  }

  const activeIndex = RESUME_SECTIONS.findIndex((s) => s.id === activeSectionId);
  const activeMeta = RESUME_SECTIONS[activeIndex] || RESUME_SECTIONS[0];

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-150 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 font-mono text-[11px] text-[var(--color-text-secondary)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-accent)] font-medium">INDEX 02 / 3D RESUME STUDIO</span>
          <span className="text-[var(--color-border-strong)]">·</span>
          <span>ARCHITECTURAL DRAFTING ARCHIVE</span>
        </div>
        <div className="flex items-center gap-3">
          <span>SHEET {activeMeta.number} OF 06</span>
          <a
            href="/Ayush_Trivedi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-primary)] px-3 py-1 text-[10px] uppercase font-medium transition-colors shadow-xs"
          >
            PDF Resume ↗
          </a>
        </div>
      </div>

      {/* Center 3D Spatial Canvas Viewport */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-3">
          {RESUME_SECTIONS.map((sec) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`font-mono text-xs px-3.5 py-1.5 uppercase tracking-wider border transition-all ${
                  isActive
                    ? "border-[var(--color-pitch-green)] bg-[var(--color-pitch-green)] text-[#FFFDF7] font-medium shadow-sm"
                    : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]"
                }`}
              >
                {sec.number} · {sec.title}
              </button>
            );
          })}
        </div>

        {/* 3D Physical Sheet Container */}
        <div className="relative w-full min-h-[460px] tablet:min-h-[500px] paper-sheet p-4 flex items-center justify-center">
          <div className="w-full h-full">
            <ResumeSheet sectionId={activeSectionId} isFocused={true} />
          </div>
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-border)] pt-4 flex justify-between font-mono text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest">
        <span>ARCHITECTURAL DOCUMENT ENVIRONMENT</span>
        <span className="text-[var(--color-accent)] font-medium">SCROLL TO ENTER AGNIPRESS ARCHITECTURE →</span>
      </div>
    </div>
  );
}