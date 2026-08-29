"use client";

import React from "react";
import { getAllExperiences, educationList, certifications } from "@/lib/data/experience";

interface SceneProps {
  progress: number;
}

export default function CareerPathScene({ progress }: SceneProps) {
  // Strict lifecycle: 72% -> 88%
  if (progress < 0.70 || progress > 0.88) return null;

  const experiences = getAllExperiences();
  const exp = experiences[0];

  let opacity = 1;
  if (progress < 0.75) {
    opacity = (progress - 0.70) / 0.05;
  } else if (progress > 0.83) {
    opacity = Math.max(0, 1 - (progress - 0.83) / 0.05);
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-cut-line)] pb-4 font-mono text-[11px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-blade-crimson)] font-medium">INDEX 05 // THE PATH</span>
          <span className="text-[var(--color-cut-line)]">|</span>
          <span>CHRONOLOGICAL MILESTONES</span>
        </div>
        <span className="text-[var(--color-steel-white)] font-medium">AICTE &amp; NIET GREATER NOIDA</span>
      </div>

      {/* Main Content */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-[var(--color-blade-crimson)] uppercase tracking-widest block font-medium">
            CAREER FORMATION
          </span>
          <h2 className="font-display text-3xl tablet:text-4xl text-[var(--color-steel-white)] font-normal">
            Verified Industry &amp; Academic Timeline.
          </h2>
        </div>

        <div className="grid grid-cols-1 laptop:grid-cols-12 gap-6 items-start">
          {/* Left Column: Industry Internship */}
          <div className="laptop:col-span-7 steel-panel p-6 space-y-4">
            <div className="flex flex-col tablet:flex-row tablet:items-baseline justify-between gap-2 border-b border-[var(--color-cut-line)] pb-3">
              <div>
                <h3 className="font-display text-lg text-[var(--color-steel-white)] font-medium">
                  {exp.role}
                </h3>
                <span className="font-mono text-xs text-[var(--color-blade-crimson)] font-medium">
                  {exp.company}
                </span>
              </div>
              <span className="font-mono text-xs text-[var(--color-mist-gray)]">
                {exp.period.start} – {exp.period.end}
              </span>
            </div>

            <ul className="space-y-2 font-body text-xs text-[var(--color-mist-gray)]">
              {exp.responsibilities.map((resp, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2">
                  <span className="text-[var(--color-blade-crimson)] font-mono shrink-0 font-medium">—</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--color-cut-line)]">
              {exp.technologies.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2.5 py-0.5 bg-[#161C26] text-[var(--color-steel-white)] font-medium border border-[var(--color-cut-line)]"
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
                className="steel-panel p-4 space-y-1.5"
              >
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display text-sm text-[var(--color-steel-white)] font-medium">
                    {edu.degree}
                  </h4>
                  <span className="font-mono text-xs text-[var(--color-wano-jade)] font-medium">
                    {edu.grade}
                  </span>
                </div>
                <p className="font-body text-xs text-[var(--color-mist-gray)]">
                  {edu.institution}
                </p>
                <span className="font-mono text-[10px] text-[var(--color-dim-gray)] block">
                  {edu.period} · {edu.location}
                </span>
              </div>
            ))}

            <div className="steel-panel p-4 space-y-2">
              <span className="font-mono text-[10px] text-[var(--color-blade-crimson)] uppercase tracking-wider block font-medium">
                VERIFIED CREDENTIALS
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                {certifications.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[var(--color-mist-gray)] border-b border-[var(--color-cut-line)] pb-1">
                    <span>{c.title}</span>
                    <span className="text-[var(--color-wano-jade)] text-[9px] uppercase font-medium bg-[#12241A] px-2 py-0.5 border border-[var(--color-wano-jade)]/40">
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
      <div className="border-t border-[var(--color-cut-line)] pt-4 flex justify-between font-mono text-[10px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <span>EXPERIENCE TIMELINE</span>
        <span className="text-[var(--color-blade-crimson)] font-medium">SCROLL TO ADVANCE TO CRAFT ARSENAL →</span>
      </div>
    </div>
  );
}