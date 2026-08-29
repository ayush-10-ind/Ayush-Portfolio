"use client";

import React from "react";
import { getAllExperiences, educationList, certifications } from "@/lib/data/experience";

interface SceneProps {
  progress: number;
}

export default function ExperienceTimelineScene({ progress }: SceneProps) {
  // Active window: 72% -> 88%
  if (progress < 0.70 || progress > 0.90) return null;

  const experiences = getAllExperiences();
  const exp = experiences[0];

  // Fade calculation
  let opacity = 1;
  if (progress < 0.76) {
    opacity = (progress - 0.70) / 0.06;
  } else if (progress > 0.84) {
    opacity = Math.max(0, 1 - (progress - 0.84) / 0.06);
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-150 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 font-mono text-[11px] text-[var(--color-text-secondary)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-accent)] font-medium">INDEX 05 / CHRONOLOGICAL PATH</span>
          <span className="text-[var(--color-border-strong)]">·</span>
          <span>INTERNSHIP · EDUCATION · CREDENTIALS</span>
        </div>
        <span className="text-[var(--color-pitch-green)] font-medium">AICTE &amp; NIET GREATER NOIDA</span>
      </div>

      {/* Main Content */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block font-medium">
            CAREER FORMATION
          </span>
          <h2 className="font-display text-3xl tablet:text-4xl text-[var(--color-text-primary)] font-normal">
            Verified Industry &amp; Academic Timeline.
          </h2>
        </div>

        <div className="grid grid-cols-1 laptop:grid-cols-12 gap-6 items-start">
          {/* Left Column: Industry Internship */}
          <div className="laptop:col-span-7 paper-sheet p-6 space-y-4">
            <div className="flex flex-col tablet:flex-row tablet:items-baseline justify-between gap-2 border-b border-[var(--color-border)] pb-3">
              <div>
                <h3 className="font-display text-lg text-[var(--color-text-primary)] font-medium">
                  {exp.role}
                </h3>
                <span className="font-mono text-xs text-[var(--color-accent)] font-medium">
                  {exp.company}
                </span>
              </div>
              <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                {exp.period.start} – {exp.period.end}
              </span>
            </div>

            <ul className="space-y-2 font-body text-xs text-[var(--color-text-secondary)]">
              {exp.responsibilities.map((resp, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2">
                  <span className="text-[var(--color-accent)] font-mono shrink-0 font-medium">—</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--color-border)]">
              {exp.technologies.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2.5 py-0.5 bg-[var(--color-bg-paper)] text-[var(--color-text-primary)] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Certifications */}
          <div className="laptop:col-span-5 space-y-4">
            {educationList.map((edu) => (
              <div
                key={edu.id}
                className="paper-sheet p-4 space-y-1.5"
              >
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display text-sm text-[var(--color-text-primary)] font-medium">
                    {edu.degree}
                  </h4>
                  <span className="font-mono text-xs text-[var(--color-pitch-green)] font-medium">
                    {edu.grade}
                  </span>
                </div>
                <p className="font-body text-xs text-[var(--color-text-secondary)]">
                  {edu.institution}
                </p>
                <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] block">
                  {edu.period} · {edu.location}
                </span>
              </div>
            ))}

            <div className="paper-sheet p-4 space-y-2">
              <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-wider block font-medium">
                VERIFIED CREDENTIALS
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                {certifications.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-1">
                    <span>{c.title}</span>
                    <span className="text-[var(--color-pitch-green)] text-[9px] uppercase font-medium bg-[var(--color-accent-subtle)] px-2 py-0.5">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-border)] pt-4 flex justify-between font-mono text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest">
        <span>EXPERIENCE TIMELINE</span>
        <span className="text-[var(--color-accent)] font-medium">SCROLL TO ADVANCE TO CRAFT WORKBENCH →</span>
      </div>
    </div>
  );
}