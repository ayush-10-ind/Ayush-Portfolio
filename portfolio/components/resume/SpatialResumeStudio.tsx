"use client";

import React, { useState, useEffect, useCallback } from "react";
import { RESUME_SECTIONS, ResumeSectionId } from "./types";
import SpatialCanvas from "./SpatialCanvas";
import MobileResumeStack from "./MobileResumeStack";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function SpatialResumeStudio() {
  const [activeSectionId, setActiveSectionId] = useState<ResumeSectionId>("identity");
  const [isDesktop, setIsDesktop] = useState(true);

  // Responsive device breakpoint detection
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const activeIdx = RESUME_SECTIONS.findIndex((s) => s.id === activeSectionId);
      if (e.key === "ArrowRight") {
        const nextIdx = (activeIdx + 1) % RESUME_SECTIONS.length;
        setActiveSectionId(RESUME_SECTIONS[nextIdx].id);
      } else if (e.key === "ArrowLeft") {
        const prevIdx = (activeIdx - 1 + RESUME_SECTIONS.length) % RESUME_SECTIONS.length;
        setActiveSectionId(RESUME_SECTIONS[prevIdx].id);
      }
    },
    [activeSectionId]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activeMeta = RESUME_SECTIONS.find((s) => s.id === activeSectionId) || RESUME_SECTIONS[0];

  return (
    <section
      id="resume-studio"
      aria-label="3D Spatial Resume Studio"
      className="py-24 px-[var(--gutter)] border-b border-[var(--color-border)] bg-[#0A0A0A]"
    >
      <div className="max-w-[var(--max-width)] mx-auto space-y-10">
        {/* Studio Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-col tablet:flex-row tablet:items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-6">
            <div className="flex items-baseline gap-6">
              <span
                className="font-display text-[var(--color-accent)] italic text-4xl tablet:text-5xl font-light"
                aria-hidden="true"
              >
                02
              </span>
              <div>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
                  Spatial Architectural Environment
                </span>
                <h2
                  className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
                  style={{ fontSize: "var(--text-heading-lg)" }}
                >
                  3D Spatial Resume Studio.
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start tablet:self-auto font-mono text-xs">
              <span className="text-[var(--color-text-tertiary)] hidden tablet:inline">
                NAVIGATE: ARROW KEYS OR TABS
              </span>
              <a
                href="/Ayush_Trivedi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[var(--color-border)] bg-[#141414] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] px-3 py-1.5 uppercase tracking-wider text-[11px] text-[var(--color-text-primary)] transition-colors"
              >
                PDF Resume ↗
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Section Navigation Tabs */}
        <ScrollReveal direction="up" distance={16} delay={0.1}>
          <nav
            aria-label="Resume Section Tabs"
            className="flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-4"
          >
            {RESUME_SECTIONS.map((section) => {
              const isActive = activeSectionId === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  aria-pressed={isActive}
                  className={`font-mono text-xs px-3.5 py-2 transition-all uppercase tracking-wider border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] ${
                    isActive
                      ? "border-[var(--color-accent)] text-[var(--color-bg)] bg-[var(--color-accent)] font-medium shadow-sm"
                      : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[#121212] hover:border-[var(--color-text-tertiary)]"
                  }`}
                >
                  {section.number} · {section.title}
                </button>
              );
            })}
          </nav>
        </ScrollReveal>

        {/* Active Section Headline */}
        <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-2 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-accent)] uppercase tracking-widest font-medium">
              {activeMeta.category}
            </span>
            <span className="text-[var(--color-border)]">|</span>
            <span className="text-[var(--color-text-secondary)]">
              {activeMeta.tagline}
            </span>
          </div>
          <span className="text-[var(--color-text-tertiary)] text-[11px]">
            LAYER: {activeMeta.number} OF 06
          </span>
        </div>

        {/* Studio Viewport: Desktop 3D Spatial Canvas or Mobile Stack */}
        <ScrollReveal direction="up" distance={20} delay={0.15}>
          {isDesktop ? (
            <SpatialCanvas
              activeId={activeSectionId}
              onSelectSection={setActiveSectionId}
            />
          ) : (
            <MobileResumeStack
              activeId={activeSectionId}
              onSelectSection={setActiveSectionId}
            />
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}