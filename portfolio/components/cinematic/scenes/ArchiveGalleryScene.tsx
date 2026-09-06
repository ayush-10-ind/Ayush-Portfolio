"use client";

import React, { useState } from "react";
import { RESUME_SECTIONS, ResumeSectionId } from "@/components/resume/types";
import ResumeSheet from "@/components/resume/ResumeSheet";

interface SceneProps {
  progress: number;
}

export default function ArchiveGalleryScene({ progress }: SceneProps) {
  // Active window: 25% -> 45%
  if (progress < 0.24 || progress > 0.46) return null;

  const [activeSectionId, setActiveSectionId] = useState<ResumeSectionId>("identity");

  let opacity = 1;
  if (progress < 0.28) {
    opacity = (progress - 0.24) / 0.04;
  } else if (progress > 0.41) {
    opacity = Math.max(0, 1 - (progress - 0.41) / 0.04);
  }

  const activeIndex = RESUME_SECTIONS.findIndex((s) => s.id === activeSectionId);
  const activeMeta = RESUME_SECTIONS[activeIndex] || RESUME_SECTIONS[0];

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-sketch-line)] pb-4 font-mono text-[11px] text-[var(--color-ink-secondary)] uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--color-terracotta)]">STAGE 03 //</span>
          <span>THE INTERACTIVE ARCHIVE GALLERY</span>
        </div>
        <div className="flex items-center gap-3">
          <span>SHEET {activeMeta.number} OF 06</span>
          <a
            href="/Ayush_Trivedi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[var(--color-ink-primary)] bg-[var(--color-paper-card)] hover:bg-[var(--color-terracotta)] hover:text-white text-[var(--color-ink-primary)] px-3 py-1 text-[10px] uppercase font-semibold transition-colors shadow-xs"
          >
            PDF Resume ↗
          </a>
        </div>
      </div>

      {/* Center Console & 3D Interactive Drafted Sheets */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        {/* Navigation Selector Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-[var(--color-sketch-line)] pb-3">
          {RESUME_SECTIONS.map((sec) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`font-mono text-xs px-3.5 py-1.5 uppercase tracking-wider border-2 transition-all ${
                  isActive
                    ? "border-[var(--color-ink-primary)] bg-[var(--color-terracotta)] text-white font-semibold shadow-[3px_3px_0px_0px_rgba(26,29,32,0.9)]"
                    : "border-[var(--color-sketch-line)] text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] bg-[var(--color-paper-card)]"
                }`}
              >
                {sec.number} · {sec.title}
              </button>
            );
          })}
        </div>

        {/* Sketched Archive Display Console */}
        <div className="relative w-full min-h-[460px] tablet:min-h-[500px] sketch-frame p-4 flex items-center justify-center">
          <div className="w-full h-full">
            <ResumeSheet sectionId={activeSectionId} isFocused={true} />
          </div>
        </div>
      </div>

      {/* Footer Guidance */}
      <div className="flex justify-between border-t border-[var(--color-sketch-line)] pt-4 font-mono text-[10px] text-[var(--color-ink-secondary)] uppercase tracking-widest">
        <span>APPROACHING THE ENGINEERING WORKSHOP</span>
        <span className="text-[var(--color-terracotta)] font-medium">SCROLL TO ADVANCE →</span>
      </div>
    </div>
  );
}