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
        <div className="space-y-6 text-[var(--color-text-primary)] p-4 tablet:p-6">
          <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block font-medium">
              SHEET 01 / PROFILE &amp; IDENTITY
            </span>
            <h3 className="font-display text-2xl tablet:text-3xl font-normal">
              {profile.name}
            </h3>
            <p className="font-mono text-xs text-[var(--color-pitch-green)] font-medium">
              {profile.title} · B.Tech CSE &apos;28
            </p>
          </div>

          <p className="font-body text-xs tablet:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {profile.bio}
          </p>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 font-mono text-xs pt-2">
            <div>
              <span className="text-[var(--color-text-tertiary)] block text-[10px] uppercase">Location</span>
              <span className="text-[var(--color-text-primary)] font-medium">{profile.location}</span>
            </div>
            <div>
              <span className="text-[var(--color-text-tertiary)] block text-[10px] uppercase">Direct Email</span>
              <a href={`mailto:${profile.email}`} className="text-[var(--color-accent)] hover:underline font-medium">
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      );

    case "education":
      return (
        <div className="space-y-6 text-[var(--color-text-primary)] p-4 tablet:p-6">
          <div className="border-b border-[var(--color-border)] pb-3 space-y-1">
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block font-medium">
              SHEET 02 / ACADEMIC FORMATION
            </span>
            <h3 className="font-display text-2xl font-normal">Formal Education</h3>
          </div>

          <div className="space-y-4">
            {educationList.map((edu) => (
              <div key={edu.id} className="border-b border-[var(--color-border)] pb-3 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display text-base text-[var(--color-text-primary)] font-medium">
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
          </div>
        </div>
      );

    case "experience":
      return (
        <div className="space-y-6 text-[var(--color-text-primary)] p-4 tablet:p-6">
          <div className="border-b border-[var(--color-border)] pb-3 space-y-1">
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block font-medium">
              SHEET 03 / INDUSTRY EXPERIENCE
            </span>
            <h3 className="font-display text-2xl font-normal">Technical Roles</h3>
          </div>

          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h4 className="font-display text-base text-[var(--color-text-primary)] font-medium">
                  {exp.role} · <span className="text-[var(--color-accent)]">{exp.company}</span>
                </h4>
                <span className="font-mono text-[10px] text-[var(--color-text-tertiary)]">
                  {exp.period.start} – {exp.period.end}
                </span>
              </div>

              <ul className="space-y-1.5 font-body text-xs text-[var(--color-text-secondary)]">
                {exp.responsibilities.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] font-mono shrink-0">—</span>
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
        <div className="space-y-6 text-[var(--color-text-primary)] p-4 tablet:p-6">
          <div className="border-b border-[var(--color-border)] pb-3 space-y-1">
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block font-medium">
              SHEET 04 / TECHNICAL ARSENAL
            </span>
            <h3 className="font-display text-2xl font-normal">Craft &amp; Disciplines</h3>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 font-mono text-xs">
            {skillGroups.map((group, idx) => (
              <div key={idx} className="space-y-1.5 border-b border-[var(--color-border)] pb-2">
                <span className="text-[var(--color-pitch-green)] text-[10px] uppercase font-medium block">
                  {group.domain}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s, sIdx) => (
                    <span key={sIdx} className="bg-[var(--color-bg-paper)] px-2 py-0.5 text-[11px] text-[var(--color-text-primary)]">
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
        <div className="space-y-6 text-[var(--color-text-primary)] p-4 tablet:p-6">
          <div className="border-b border-[var(--color-border)] pb-3 space-y-1">
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block font-medium">
              SHEET 05 / VERIFIED CREDENTIALS
            </span>
            <h3 className="font-display text-2xl font-normal">Certifications</h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {certifications.map((cert, idx) => (
              <div key={idx} className="border-b border-[var(--color-border)] pb-2 flex justify-between items-center">
                <div>
                  <span className="text-[var(--color-text-primary)] font-medium block">{cert.title}</span>
                  <span className="text-[var(--color-text-tertiary)] text-[10px]">{cert.issuer}</span>
                </div>
                <span className="text-[var(--color-pitch-green)] text-[9px] uppercase font-medium bg-[var(--color-accent-subtle)] px-2 py-0.5">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case "extracurricular":
      return (
        <div className="space-y-6 text-[var(--color-text-primary)] p-4 tablet:p-6">
          <div className="border-b border-[var(--color-border)] pb-3 space-y-1">
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block font-medium">
              SHEET 06 / ATHLETICS &amp; PROBLEM SOLVING
            </span>
            <h3 className="font-display text-2xl font-normal">Discipline &amp; Leadership</h3>
          </div>

          <div className="space-y-3 font-body text-xs text-[var(--color-text-secondary)]">
            <p>
              <strong className="text-[var(--color-text-primary)]">Competitive Football:</strong> Cultivates tactical execution, team synchrony, leadership, and composed decision-making in high-pressure match scenarios.
            </p>
            <p>
              <strong className="text-[var(--color-text-primary)]">Daily DSA Problem-Solving:</strong> Consistent algorithmic practice on LeetCode covering graph traversals, dynamic programming, trees, and system logic.
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}