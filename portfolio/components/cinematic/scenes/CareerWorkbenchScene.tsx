"use client";

import React from "react";
import { getAllExperiences, educationList, certifications } from "@/lib/data/experience";
import { getAllSkillGroups } from "@/lib/data/skills";

interface SceneProps {
  progress: number;
}

export default function CareerWorkbenchScene({ progress }: SceneProps) {
  // Active window: 75% -> 89%
  if (progress < 0.74 || progress > 0.89) return null;

  const experiences = getAllExperiences();
  const exp = experiences[0];
  const skillGroups = getAllSkillGroups();

  let opacity = 1;
  if (progress < 0.78) {
    opacity = (progress - 0.74) / 0.04;
  } else if (progress > 0.85) {
    opacity = Math.max(0, 1 - (progress - 0.85) / 0.04);
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto sketch-floor"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-sketch-line)] pb-4 font-mono text-[11px] text-[var(--color-ink-secondary)] uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--color-terracotta)]">STAGE 06 //</span>
          <span>THE CAREER PATHWAY &amp; CRAFT BENCH</span>
        </div>
        <span className="text-[var(--color-wano-green)] font-medium">AICTE &amp; NIET GREATER NOIDA</span>
      </div>

      {/* Main Content */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-widest block font-medium">
            CAREER FORMATION &amp; ARSENAL
          </span>
          <h2 className="font-display text-3xl tablet:text-4xl text-[var(--color-ink-primary)] font-normal">
            Verified Industry Roles &amp; Competencies.
          </h2>
        </div>

        <div className="grid grid-cols-1 laptop:grid-cols-12 gap-6 items-start">
          {/* Left Column: Industry Internship */}
          <div className="laptop:col-span-7 sketch-box p-6 space-y-4">
            <div className="flex flex-col tablet:flex-row tablet:items-baseline justify-between gap-2 border-b border-[var(--color-sketch-line)] pb-3">
              <div>
                <h3 className="font-display text-lg text-[var(--color-ink-primary)] font-medium">
                  {exp.role}
                </h3>
                <span className="font-mono text-xs text-[var(--color-terracotta)] font-semibold">
                  {exp.company}
                </span>
              </div>
              <span className="font-mono text-xs text-[var(--color-ink-secondary)]">
                {exp.period.start} – {exp.period.end}
              </span>
            </div>

            <ul className="space-y-2 font-body text-xs text-[var(--color-ink-secondary)]">
              {exp.responsibilities.map((resp, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2">
                  <span className="text-[var(--color-terracotta)] font-mono shrink-0 font-bold">—</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--color-sketch-line)]">
              {exp.technologies.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2.5 py-0.5 bg-[var(--color-paper-alt)] text-[var(--color-ink-primary)] font-medium border border-[var(--color-sketch-line)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Skills & Academics */}
          <div className="laptop:col-span-5 space-y-4">
            {educationList.map((edu) => (
              <div
                key={edu.id}
                className="sketch-box-subtle p-4 space-y-1.5"
              >
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display text-sm text-[var(--color-ink-primary)] font-medium">
                    {edu.degree}
                  </h4>
                  <span className="font-mono text-xs text-[var(--color-wano-green)] font-semibold">
                    {edu.grade}
                  </span>
                </div>
                <p className="font-body text-xs text-[var(--color-ink-secondary)]">
                  {edu.institution}
                </p>
                <span className="font-mono text-[10px] text-[var(--color-ink-faint)] block">
                  {edu.period} · {edu.location}
                </span>
              </div>
            ))}

            {/* Sketched Tool Rack */}
            <div className="sketch-box-subtle p-4 space-y-2">
              <span className="font-mono text-[10px] text-[var(--color-terracotta)] uppercase tracking-wider block font-semibold">
                CRAFT TOOL RACK
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {skillGroups.flatMap((g) => g.skills).slice(0, 8).map((s, idx) => (
                  <span key={idx} className="bg-[var(--color-paper-alt)] px-2 py-0.5 text-[11px] text-[var(--color-ink-primary)] border border-[var(--color-sketch-line)] font-medium">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Guidance */}
      <div className="flex justify-between border-t border-[var(--color-sketch-line)] pt-4 font-mono text-[10px] text-[var(--color-ink-secondary)] uppercase tracking-widest">
        <span>APPROACHING FINAL CONTACT DOORWAY</span>
        <span className="text-[var(--color-terracotta)] font-medium">SCROLL TO ENTER CODE TERMINAL →</span>
      </div>
    </div>
  );
}