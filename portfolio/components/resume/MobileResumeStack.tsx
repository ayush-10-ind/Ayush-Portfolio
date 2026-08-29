"use client";

import React from "react";
import { RESUME_SECTIONS, ResumeSectionId } from "./types";
import ResumeSheet from "./ResumeSheet";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface MobileResumeStackProps {
  activeId: ResumeSectionId;
  onSelectSection: (id: ResumeSectionId) => void;
}

export default function MobileResumeStack({
  activeId,
  onSelectSection,
}: MobileResumeStackProps) {
  const shouldReduceMotion = useReducedMotion();
  const activeIndex = RESUME_SECTIONS.findIndex((s) => s.id === activeId);

  const nextSection = () => {
    const nextIdx = (activeIndex + 1) % RESUME_SECTIONS.length;
    onSelectSection(RESUME_SECTIONS[nextIdx].id);
  };

  const prevSection = () => {
    const prevIdx = (activeIndex - 1 + RESUME_SECTIONS.length) % RESUME_SECTIONS.length;
    onSelectSection(RESUME_SECTIONS[prevIdx].id);
  };

  return (
    <div className="w-full space-y-4">
      {/* Mobile Active Card Display */}
      <div className="relative min-h-[480px] w-full border border-[var(--color-accent)] bg-[#141414] p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <ResumeSheet sectionId={activeId} isFocused={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Touch Navigation Controls */}
      <div className="flex items-center justify-between gap-3 pt-2 font-mono text-xs">
        <button
          onClick={prevSection}
          aria-label="Previous resume section"
          className="flex-1 py-3 px-4 border border-[var(--color-border)] bg-[#141414] hover:border-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-center transition-colors uppercase tracking-wider"
        >
          ← Previous
        </button>
        <span className="text-[var(--color-text-tertiary)] text-[11px] px-2 shrink-0">
          {activeIndex + 1} / {RESUME_SECTIONS.length}
        </span>
        <button
          onClick={nextSection}
          aria-label="Next resume section"
          className="flex-1 py-3 px-4 border border-[var(--color-border)] bg-[#141414] hover:border-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-center transition-colors uppercase tracking-wider"
        >
          Next →
        </button>
      </div>
    </div>
  );
}