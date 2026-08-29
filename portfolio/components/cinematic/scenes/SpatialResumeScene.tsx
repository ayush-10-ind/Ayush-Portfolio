"use client";

import React, { useState } from "react";
import { RESUME_SECTIONS, ResumeSectionId } from "@/components/resume/types";
import ResumeSheet from "@/components/resume/ResumeSheet";

interface SceneProps {
  progress: number;
}

export default function SpatialResumeScene({ progress }: SceneProps) {
  // Strict lifecycle: 26% -> 46%
  if (progress < 0.25 || progress > 0.46) return null;

  const [activeSectionId, setActiveSectionId] = useState<ResumeSectionId>("identity");

  let opacity = 1;
  if (progress < 0.29) {
    opacity = (progress - 0.25) / 0.04;
  } else if (progress > 0.42) {
    opacity = Math.max(0, 1 - (progress - 0.42) / 0.04);
  }

  const activeIndex = RESUME_SECTIONS.findIndex((s) => s.id === activeSectionId);
  const activeMeta = RESUME_SECTIONS[activeIndex] || RESUME_SECTIONS[0];

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-cut-line)] pb-4 font-mono text-[11px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-blade-crimson)] font-medium">INDEX 02 // 3D SPATIAL ARCHIVE</span>
          <span className="text-[var(--color-cut-line)]">|</span>
          <span>DRAFTING STUDIO &amp; CREDENTIALS</span>
        </div>
        <div className="flex items-center gap-3">
          <span>SHEET {activeMeta.number} OF 06</span>
          <a
            href="/Ayush_Trivedi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--color-cut-strong)] bg-[var(--color-slate-steel)] hover:border-[var(--color-blade-crimson)] hover:text-[var(--color-blade-crimson)] text-[var(--color-steel-white)] px-3 py-1 text-[10px] uppercase font-medium transition-colors"
          >
            PDF Resume ↗
          </a>
        </div>
      </div>

      {/* 3D Document Viewport */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[var(--color-cut-line)] pb-3">
          {RESUME_SECTIONS.map((sec) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`font-mono text-xs px-3.5 py-1.5 uppercase tracking-wider border transition-all ${
                  isActive
                    ? "border-[var(--color-blade-crimson)] bg-[var(--color-blade-crimson)] text-white font-medium shadow-[0_0_12px_rgba(230,57,70,0.5)]"
                    : "border-[var(--color-cut-line)] text-[var(--color-mist-gray)] hover:text-[var(--color-steel-white)] bg-[var(--color-slate-steel)] hover:border-[var(--color-cut-strong)]"
                }`}
              >
                {sec.number} · {sec.title}
              </button>
            );
          })}
        </div>

        {/* 3D Steel Monolith Document Container */}
        <div className="relative w-full min-h-[460px] tablet:min-h-[500px] steel-monolith p-4 flex items-center justify-center">
          <div className="w-full h-full">
            <ResumeSheet sectionId={activeSectionId} isFocused={true} />
          </div>
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-cut-line)] pt-4 flex justify-between font-mono text-[10px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <span>ARCHITECTURAL DOCUMENT ENVIRONMENT</span>
        <span className="text-[var(--color-blade-crimson)] font-medium">SCROLL TO ENTER AGNIPRESS ARCHITECTURE →</span>
      </div>
    </div>
  );
}