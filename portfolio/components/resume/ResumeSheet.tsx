"use client";

import React from "react";
import type { ResumeSectionId } from "./types";
import { profile } from "@/lib/data/profile";
import { educationList, getAllExperiences, certifications } from "@/lib/data/experience";
import { getAllSkillGroups } from "@/lib/data/skills";

interface ResumeSheetProps {
  sectionId: ResumeSectionId;
  isFocused?: boolean;
}

export default function ResumeSheet({ sectionId }: ResumeSheetProps) {
  const experiences = getAllExperiences();
  const skillGroups = getAllSkillGroups();

  return (
    <div className="w-full h-full p-6 tablet:p-8 flex flex-col justify-between space-y-6 font-body text-xs tablet:text-sm">
      {/* 01: IDENTITY SHEET */}
      {sectionId === "identity" && (
        <div className="space-y-6">
          <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block">
              IDENTITY & CONTACT SPECIFICATION
            </span>
            <h4 className="font-display text-2xl tablet:text-3xl text-[var(--color-text-primary)] font-normal">
              Ayush Trivedi
            </h4>
            <p className="font-mono text-xs text-[var(--color-text-secondary)]">
              {profile.title} · {profile.location}
            </p>
          </div>

          <div className="space-y-3 font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
            <p>{profile.bio}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono text-[11px] border-t border-[var(--color-border)] pt-4">
            <div>
              <span className="text-[var(--color-text-tertiary)] block uppercase">Email</span>
              <span className="text-[var(--color-text-primary)] break-all">{profile.email}</span>
            </div>
            <div>
              <span className="text-[var(--color-text-tertiary)] block uppercase">Phone</span>
              <span className="text-[var(--color-text-primary)]">+91 8303155683</span>
            </div>
          </div>
        </div>
      )}

      {/* 02: EDUCATION SHEET */}
      {sectionId === "education" && (
        <div className="space-y-6">
          <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block">
              ACADEMIC BACKGROUND & DEGREES
            </span>
            <h4 className="font-display text-2xl tablet:text-3xl text-[var(--color-text-primary)] font-normal">
              Formal Education
            </h4>
          </div>

          <div className="space-y-4">
            {educationList.map((edu) => (
              <div
                key={edu.id}
                className="border border-[var(--color-border)] p-4 bg-[#181818]/60 space-y-1.5"
              >
                <div className="flex justify-between items-baseline">
                  <h5 className="font-display text-sm text-[var(--color-text-primary)] font-medium">
                    {edu.degree}
                  </h5>
                  <span className="font-mono text-xs text-[var(--color-accent)] font-medium">
                    {edu.grade}
                  </span>
                </div>
                <p className="font-body text-xs text-[var(--color-text-secondary)]">
                  {edu.institution}
                </p>
                <div className="flex justify-between font-mono text-[10px] text-[var(--color-text-tertiary)] pt-1 border-t border-[var(--color-border)]/40">
                  <span>{edu.location}</span>
                  <span>{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 03: EXPERIENCE SHEET */}
      {sectionId === "experience" && (
        <div className="space-y-6">
          <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block">
              INDUSTRY INTERNSHIP RECORD
            </span>
            <h4 className="font-display text-2xl tablet:text-3xl text-[var(--color-text-primary)] font-normal">
              AICTE Code Technologies
            </h4>
            <span className="font-mono text-xs text-[var(--color-accent)] block">
              Python Developer Intern · June 2025 – July 2025
            </span>
          </div>

          <ul className="space-y-2 font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {experiences[0]?.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] shrink-0 font-mono">—</span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--color-border)] font-mono text-[10px]">
            {experiences[0]?.technologies.map((t) => (
              <span
                key={t}
                className="border border-[var(--color-border)] px-2 py-0.5 text-[var(--color-text-tertiary)] bg-[#181818]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 04: SKILLS SHEET */}
      {sectionId === "skills" && (
        <div className="space-y-6">
          <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block">
              VERIFIED TECHNICAL COMPETENCIES
            </span>
            <h4 className="font-display text-2xl tablet:text-3xl text-[var(--color-text-primary)] font-normal">
              Technical Stack
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            {skillGroups.map((group, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="text-[var(--color-text-tertiary)] uppercase text-[10px] block border-b border-[var(--color-border)]/40 pb-1">
                  {group.domain}
                </span>
                <ul className="space-y-1 text-[11px] text-[var(--color-text-secondary)]">
                  {group.skills.map((s, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                      <span>{s.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 05: CERTIFICATIONS SHEET */}
      {sectionId === "certifications" && (
        <div className="space-y-6">
          <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block">
              PROFESSIONAL CREDENTIALS
            </span>
            <h4 className="font-display text-2xl tablet:text-3xl text-[var(--color-text-primary)] font-normal">
              Verified Certifications
            </h4>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {certifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                className="flex items-center justify-between p-3 border border-[var(--color-border)] bg-[#161616]/60"
              >
                <div>
                  <span className="text-[var(--color-text-primary)] block font-medium">
                    {cert.title}
                  </span>
                  <span className="text-[var(--color-text-tertiary)] text-[10px]">
                    {cert.issuer}
                  </span>
                </div>
                <span className="text-[var(--color-accent)] text-[10px] uppercase border border-[var(--color-accent)]/40 px-2 py-0.5">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 06: EXTRACURRICULAR SHEET */}
      {sectionId === "extracurricular" && (
        <div className="space-y-6">
          <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block">
              ATHLETICS & COMPETITIVE PROBLEM SOLVING
            </span>
            <h4 className="font-display text-2xl tablet:text-3xl text-[var(--color-text-primary)] font-normal">
              Extracurricular Discipline
            </h4>
          </div>

          <div className="space-y-4 font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
            <div className="border border-[var(--color-border)] p-4 bg-[#161616]/60 space-y-2">
              <span className="font-mono text-xs text-[var(--color-accent)] font-medium uppercase block">
                Competitive Football
              </span>
              <p>
                Active football player cultivating high-pressure collective decision-making, tactical discipline, and teamwork.
              </p>
            </div>

            <div className="border border-[var(--color-border)] p-4 bg-[#161616]/60 space-y-2">
              <span className="font-mono text-xs text-[var(--color-accent)] font-medium uppercase block">
                DSA & Competitive Programming
              </span>
              <p>
                Continuous algorithmic problem-solving on LeetCode and participation in technical coding challenges.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Annotation */}
      <div className="pt-4 border-t border-[var(--color-border)] flex justify-between items-center font-mono text-[10px] text-[var(--color-text-tertiary)]">
        <span>AUTHENTIC RESUME SOURCE</span>
        <span>AYUSH TRIVEDI · VERIFIED</span>
      </div>
    </div>
  );
}