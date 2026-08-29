"use client";

import React from "react";
import { getAllExperiences, educationList, certifications } from "@/lib/data/experience";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Experience() {
  const experiences = getAllExperiences();

  return (
    <section
      id="experience"
      aria-label="Experience & Academics"
      className="py-28 px-[var(--gutter)] border-b border-[var(--color-border)] bg-[#0C0C0C]"
    >
      <div className="max-w-[var(--max-width)] mx-auto space-y-16">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-col tablet:flex-row tablet:items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-6">
            <div className="flex items-baseline gap-6">
              <span
                className="font-display text-[var(--color-accent)] italic text-4xl tablet:text-5xl font-light"
                aria-hidden="true"
              >
                04
              </span>
              <div>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
                  Chronological Record
                </span>
                <h2
                  className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
                  style={{ fontSize: "var(--text-heading-lg)" }}
                >
                  Experience &amp; Academics.
                </h2>
              </div>
            </div>

            <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest">
              AICTE INTERNSHIP · NIET CSE
            </span>
          </div>
        </ScrollReveal>

        {/* Experience Timeline & Education Grid */}
        <div className="grid grid-cols-1 laptop:grid-cols-12 gap-12">
          {/* Left Column: Industry Internship Timeline */}
          <div className="laptop:col-span-7 space-y-8">
            <h3 className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block border-b border-[var(--color-border)] pb-2">
              Industry Experience
            </h3>

            {experiences.map((exp) => (
              <ScrollReveal key={exp.id} direction="up" distance={20}>
                <div className="border border-[var(--color-border)] p-6 tablet:p-8 bg-[#121212] drafting-corner space-y-4">
                  <div className="flex flex-col tablet:flex-row tablet:items-baseline justify-between gap-2 border-b border-[var(--color-border)] pb-4">
                    <div>
                      <h4 className="font-display text-xl text-[var(--color-text-primary)] font-medium">
                        {exp.role}
                      </h4>
                      <span className="font-mono text-xs text-[var(--color-accent)]">
                        {exp.company}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                      {exp.period.start} – {exp.period.end} · {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-2 font-body text-xs tablet:text-sm text-[var(--color-text-secondary)]">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <span className="text-[var(--color-accent)] font-mono shrink-0">—</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--color-border)]">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] px-2.5 py-1 border border-[var(--color-border)] bg-[#161616] text-[var(--color-text-tertiary)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right Column: Education & Certifications */}
          <div className="laptop:col-span-5 space-y-10 laptop:border-l laptop:border-[var(--color-border)] laptop:pl-10">
            {/* Education */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block border-b border-[var(--color-border)] pb-2">
                Education
              </h3>

              {educationList.map((edu) => (
                <div
                  key={edu.id}
                  className="border border-[var(--color-border)] p-5 bg-[#121212] drafting-corner space-y-2"
                >
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-display text-base text-[var(--color-text-primary)] font-medium">
                      {edu.degree}
                    </h4>
                    <span className="font-mono text-xs text-[var(--color-accent)] font-medium">
                      {edu.grade}
                    </span>
                  </div>
                  <p className="font-body text-xs text-[var(--color-text-secondary)]">
                    {edu.institution}
                  </p>
                  <div className="flex justify-between font-mono text-[10px] text-[var(--color-text-tertiary)] pt-2 border-t border-[var(--color-border)]/40">
                    <span>{edu.location}</span>
                    <span>{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block border-b border-[var(--color-border)] pb-2">
                Credentials &amp; Certifications
              </h3>

              <div className="space-y-3">
                {certifications.map((cert, cIdx) => (
                  <div
                    key={cIdx}
                    className="border border-[var(--color-border)] p-4 bg-[#121212] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-display text-sm text-[var(--color-text-primary)] block font-medium">
                        {cert.title}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--color-text-tertiary)]">
                        {cert.issuer}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase border border-[var(--color-accent)]/40 px-2 py-0.5">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}