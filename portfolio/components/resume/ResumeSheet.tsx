"use client";

import React from "react";
import { ResumeSectionId } from "./types";
import { profile } from "@/lib/data/profile";
import { getAllExperiences, educationList, certifications } from "@/lib/data/experience";
import { getAllSkillGroups } from "@/lib/data/skills";

interface ResumeSheetProps {
  sectionId: ResumeSectionId;
  isFocused?: boolean;
}

export default function ResumeSheet({ sectionId }: ResumeSheetProps) {
  const experiences = getAllExperiences();
  const skillGroups = getAllSkillGroups();

  switch (sectionId) {
    case "identity":
      return (
        <div className="space-y-6 text-[var(--color-ink-primary)] p-4 tablet:p-6 bg-[#FFFDF8]">
          <div className="border-b-2 border-[var(--color-ink-primary)] pb-4 space-y-1">
            <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-widest block font-bold">
              SHEET 01 // PROFILE &amp; IDENTITY
            </span>
            <h3 className="font-display text-2xl tablet:text-3xl font-normal">
              {profile.name}
            </h3>
            <p className="font-mono text-xs text-[var(--color-wano-green)] font-semibold">
              {profile.title} · B.Tech CSE &apos;28
            </p>
          </div>

          <p className="font-body text-xs tablet:text-sm text-[var(--color-ink-secondary)] leading-relaxed">
            {profile.bio}
          </p>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 font-mono text-xs pt-2">
            <div>
              <span className="text-[var(--color-ink-faint)] block text-[10px] uppercase font-semibold">Location</span>
              <span className="text-[var(--color-ink-primary)] font-medium">{profile.location}</span>
            </div>
            <div>
              <span className="text-[var(--color-ink-faint)] block text-[10px] uppercase font-semibold">Direct Email</span>
              <a href={`mailto:${profile.email}`} className="text-[var(--color-terracotta)] hover:underline font-semibold">
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      );

    case "education":
      return (
        <div className="space-y-6 text-[var(--color-ink-primary)] p-4 tablet:p-6 bg-[#FFFDF8]">
          <div className="border-b-2 border-[var(--color-ink-primary)] pb-3 space-y-1">
            <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-widest block font-bold">
              SHEET 02 // ACADEMIC FORMATION
            </span>
            <h3 className="font-display text-2xl font-normal">Formal Education</h3>
          </div>

          <div className="space-y-4">
            {educationList.map((edu) => (
              <div key={edu.id} className="border-b border-[var(--color-sketch-line)] pb-3 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display text-base text-[var(--color-ink-primary)] font-medium">
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
          </div>
        </div>
      );

    case "experience":
      return (
        <div className="space-y-6 text-[var(--color-ink-primary)] p-4 tablet:p-6 bg-[#FFFDF8]">
          <div className="border-b-2 border-[var(--color-ink-primary)] pb-3 space-y-1">
            <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-widest block font-bold">
              SHEET 03 // INDUSTRY ROLES
            </span>
            <h3 className="font-display text-2xl font-normal">Technical Experience</h3>
          </div>

          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h4 className="font-display text-base text-[var(--color-ink-primary)] font-medium">
                  {exp.role} · <span className="text-[var(--color-terracotta)] font-semibold">{exp.company}</span>
                </h4>
                <span className="font-mono text-[10px] text-[var(--color-ink-faint)]">
                  {exp.period.start} – {exp.period.end}
                </span>
              </div>

              <ul className="space-y-1.5 font-body text-xs text-[var(--color-ink-secondary)]">
                {exp.responsibilities.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[var(--color-terracotta)] font-mono shrink-0 font-bold">—</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "skills":
      return (
        <div className="space-y-6 text-[var(--color-ink-primary)] p-4 tablet:p-6 bg-[#FFFDF8]">
          <div className="border-b-2 border-[var(--color-ink-primary)] pb-3 space-y-1">
            <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-widest block font-bold">
              SHEET 04 // CRAFT &amp; DISCIPLINE
            </span>
            <h3 className="font-display text-2xl font-normal">Technical Arsenal</h3>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 font-mono text-xs">
            {skillGroups.map((group, idx) => (
              <div key={idx} className="space-y-1.5 border-b border-[var(--color-sketch-line)] pb-2">
                <span className="text-[var(--color-wano-green)] text-[10px] uppercase font-bold block">
                  {group.domain}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s, sIdx) => (
                    <span key={sIdx} className="bg-[var(--color-paper-alt)] px-2 py-0.5 text-[11px] text-[var(--color-ink-primary)] border border-[var(--color-sketch-line)] font-medium">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "certifications":
      return (
        <div className="space-y-6 text-[var(--color-ink-primary)] p-4 tablet:p-6 bg-[#FFFDF8]">
          <div className="border-b-2 border-[var(--color-ink-primary)] pb-3 space-y-1">
            <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-widest block font-bold">
              SHEET 05 // VERIFIED CREDENTIALS
            </span>
            <h3 className="font-display text-2xl font-normal">Certifications</h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {certifications.map((cert, idx) => (
              <div key={idx} className="border-b border-[var(--color-sketch-line)] pb-2 flex justify-between items-center">
                <div>
                  <span className="text-[var(--color-ink-primary)] font-medium block">{cert.title}</span>
                  <span className="text-[var(--color-ink-faint)] text-[10px]">{cert.issuer}</span>
                </div>
                <span className="text-[var(--color-wano-green)] text-[9px] uppercase font-bold bg-[#EAF2ED] px-2 py-0.5 border border-[var(--color-wano-green)]">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case "extracurricular":
      return (
        <div className="space-y-6 text-[var(--color-ink-primary)] p-4 tablet:p-6 bg-[#FFFDF8]">
          <div className="border-b-2 border-[var(--color-ink-primary)] pb-3 space-y-1">
            <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-widest block font-bold">
              SHEET 06 // ATHLETICS &amp; PROBLEM SOLVING
            </span>
            <h3 className="font-display text-2xl font-normal">Discipline &amp; Leadership</h3>
          </div>

          <div className="space-y-3 font-body text-xs text-[var(--color-ink-secondary)]">
            <p>
              <strong className="text-[var(--color-ink-primary)]">Competitive Football:</strong> Cultivates tactical execution, team synchrony, leadership, and composed decision-making in high-pressure match scenarios.
            </p>
            <p>
              <strong className="text-[var(--color-ink-primary)]">Daily DSA Problem-Solving:</strong> Consistent algorithmic practice on LeetCode covering graph traversals, dynamic programming, trees, and system logic.
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}