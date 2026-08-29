"use client";

import React from "react";
import { getAllSkillGroups } from "@/lib/data/skills";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Skills() {
  const skillGroups = getAllSkillGroups();

  return (
    <section
      id="skills"
      aria-label="Technical Craft & Stack"
      className="py-28 px-[var(--gutter)] border-b border-[var(--color-border)] bg-[#0A0A0A] architectural-grid"
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
                05
              </span>
              <div>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
                  Technical Matrix
                </span>
                <h2
                  className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
                  style={{ fontSize: "var(--text-heading-lg)" }}
                >
                  Craft &amp; Disciplines.
                </h2>
              </div>
            </div>

            <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest">
              FOUNDATIONS &amp; SYSTEMS
            </span>
          </div>
        </ScrollReveal>

        {/* Craft Matrix Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-6">
          {skillGroups.map((group, idx) => (
            <ScrollReveal key={idx} direction="up" distance={20} delay={idx * 0.08}>
              <div className="border border-[var(--color-border)] p-6 bg-[#121212] drafting-corner space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="border-b border-[var(--color-border)] pb-3">
                    <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block">
                      DOMAIN 0{idx + 1}
                    </span>
                    <h3 className="font-display text-lg text-[var(--color-text-primary)] font-medium">
                      {group.domain}
                    </h3>
                  </div>

                  <ul className="space-y-2.5 font-mono text-xs">
                    {group.skills.map((skill, sIdx) => (
                      <li
                        key={sIdx}
                        className="flex items-center justify-between text-[var(--color-text-secondary)] border-b border-[var(--color-border)]/30 pb-1.5"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                          <span>{skill.name}</span>
                        </span>
                        <span className="text-[var(--color-text-tertiary)] text-[10px] uppercase">
                          {skill.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)]/50 font-mono text-[10px] text-[var(--color-text-tertiary)]">
                  ACTIVE COMPETENCY
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}