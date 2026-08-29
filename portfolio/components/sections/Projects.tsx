"use client";

import { useState } from "react";
import { getAllProjects } from "@/lib/data/projects";
import type { Project } from "@/types/portfolio";

export default function Projects() {
  const projects = getAllProjects();
  const [activeProjectId, setActiveProjectId] = useState<string>("agnipress");

  return (
    <section
      id="projects"
      aria-label="Featured Engineering Case Studies"
      className="py-24 px-[var(--gutter)] border-b border-[var(--color-border)]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col tablet:flex-row tablet:items-baseline justify-between gap-4 mb-16 border-b border-[var(--color-border)] pb-6">
          <div className="flex items-baseline gap-6">
            <span
              className="font-display text-[var(--color-accent)] italic text-4xl tablet:text-5xl font-light"
              aria-hidden="true"
            >
              03
            </span>
            <div>
              <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
                Featured Engineering & Research
              </span>
              <h2
                className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
                style={{ fontSize: "var(--text-heading-lg)" }}
              >
                Case Studies.
              </h2>
            </div>
          </div>

          <div className="font-mono text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] px-3 py-1 bg-[#141414]/60 self-start tablet:self-auto">
            <span>2 FEATURED WORKS</span>
          </div>
        </div>

        {/* Project Selector Tabs / Quick Navigation */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mb-8">
          {projects.map((project, idx) => {
            const isActive = activeProjectId === project.id;
            const num = String(idx + 1).padStart(2, "0");

            return (
              <button
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                aria-pressed={isActive}
                className={`text-left p-6 border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                  isActive
                    ? "border-[var(--color-accent)] bg-[#141414] ring-1 ring-[var(--color-accent)]"
                    : "border-[var(--color-border)] bg-[#101010]/60 hover:border-[var(--color-text-tertiary)]"
                }`}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-xs text-[var(--color-accent)] font-medium">
                    CASE STUDY {num}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider">
                    {project.type}
                  </span>
                </div>
                <h3 className="font-display text-xl text-[var(--color-text-primary)] font-medium mb-1">
                  {project.name}
                </h3>
                <p className="font-body text-xs text-[var(--color-text-secondary)] line-clamp-2">
                  {project.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Featured Case Study Deep-Dive View */}
        {projects.map((project) => {
          if (project.id !== activeProjectId) return null;

          return (
            <article
              key={project.id}
              className="border border-[var(--color-accent)] bg-[#121212] p-6 tablet:p-10 space-y-10"
            >
              {/* Case Study Header Banner */}
              <div className="border-b border-[var(--color-border)] pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest">
                    DETAILED ENGINEERING BREAKDOWN
                  </span>
                  <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                    {project.period}
                  </span>
                </div>
                <h3
                  className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
                  style={{ fontSize: "var(--text-heading-md)" }}
                >
                  {project.name}
                </h3>
                <p className="font-body text-base text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
                  {project.tagline}
                </p>
              </div>

              {/* Problem Space & Solution Dual Columns */}
              <div className="grid laptop:grid-cols-2 gap-8">
                <div className="border border-[var(--color-border)] p-6 bg-[#161616]/60 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>01 / The Problem & Core Motivation</span>
                  </div>
                  <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="border border-[var(--color-border)] p-6 bg-[#161616]/60 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>02 / Architecture & Implemented Solution</span>
                  </div>
                  <p className="font-body text-sm text-[var(--color-text-primary)] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Architecture & Data Flow Callout */}
              <div className="border-l-2 border-[var(--color-accent)] bg-[#181818] p-6 space-y-2">
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                  System Architecture & Data Flow
                </span>
                <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {project.architecture}
                </p>
              </div>

              {/* Key Technical Decisions Matrix */}
              {project.decisions.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider">
                      Technical Decisions & Tradeoffs
                    </span>
                    <span className="font-mono text-[10px] text-[var(--color-accent)]">
                      {project.decisions.length} ARCHITECTURAL CHOICES
                    </span>
                  </div>

                  <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-4">
                    {project.decisions.map((decision, dIdx) => (
                      <div
                        key={dIdx}
                        className="border border-[var(--color-border)] p-5 bg-[#161616]/40 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <h4 className="font-display text-sm text-[var(--color-text-primary)] font-medium leading-snug">
                            {decision.question}
                          </h4>
                          <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
                            {decision.answer}
                          </p>
                        </div>
                        {decision.alternativesConsidered && (
                          <div className="pt-2 border-t border-[var(--color-border)]/40 font-mono text-[10px] text-[var(--color-text-tertiary)]">
                            <span className="text-[var(--color-accent)]">Tradeoff: </span>
                            {decision.alternativesConsidered}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Challenges & Outcome */}
              <div className="grid laptop:grid-cols-12 gap-6 items-start">
                <div className="laptop:col-span-7 border border-[var(--color-border)] p-6 bg-[#161616]/40 space-y-3">
                  <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                    Engineering Challenges Solved
                  </span>
                  <ul className="space-y-2 font-body text-xs text-[var(--color-text-secondary)]">
                    {project.challenges.map((challenge, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5">
                        <span className="text-[var(--color-accent)] font-mono shrink-0">·</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="laptop:col-span-5 border border-[var(--color-border)] p-6 bg-[#181818] space-y-3">
                  <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider block">
                    Verified Outcome
                  </span>
                  <p className="font-body text-xs text-[var(--color-text-primary)] leading-relaxed">
                    {project.outcome}
                  </p>
                </div>
              </div>

              {/* Technologies & External Repositories */}
              <div className="flex flex-col tablet:flex-row justify-between items-start tablet:items-center gap-6 pt-6 border-t border-[var(--color-border)]">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                    Verified Technologies Used
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] bg-[#181818] px-3 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[var(--color-accent)] border border-[var(--color-accent)] px-4 py-2 tracking-wider uppercase hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors"
                    >
                      GitHub Repository ↗
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[var(--color-text-primary)] border border-[var(--color-border)] px-4 py-2 tracking-wider uppercase hover:border-[var(--color-text-primary)] transition-colors"
                    >
                      Demo / Video ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}