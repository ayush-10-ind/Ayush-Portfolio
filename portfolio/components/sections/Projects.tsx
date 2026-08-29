"use client";

import { useState } from "react";
import { getAllProjects } from "@/lib/data/projects";
import type { Project } from "@/types/portfolio";

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>("agnipress");
  const projects = getAllProjects();

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="projects"
      aria-label="Featured Engineering Case Studies"
      className="py-24 px-[var(--gutter)] border-b border-[var(--color-border)]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline gap-6 mb-16 border-b border-[var(--color-border)] pb-6">
          <span
            className="font-display text-[var(--color-accent)] italic text-4xl tablet:text-5xl font-light"
            aria-hidden="true"
          >
            02
          </span>
          <div>
            <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
              Deep-Dive Engineering Work
            </span>
            <h2
              className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
              style={{ fontSize: "var(--text-heading-lg)" }}
            >
              Featured Case Studies.
            </h2>
          </div>
        </div>

        {/* Projects Accordion / Case Study List */}
        <div className="space-y-4">
          {projects.map((project, index) => {
            const isExpanded = expandedId === project.id;
            const itemNumber = String(index + 1).padStart(2, "0");

            return (
              <article
                key={project.id}
                className={`border transition-all duration-200 ${
                  isExpanded
                    ? "border-[var(--color-accent)] bg-[#141414]/90"
                    : "border-[var(--color-border)] bg-[#101010]/50 hover:border-[var(--color-text-tertiary)]"
                }`}
              >
                {/* Header Row / Toggle Button */}
                <button
                  onClick={() => toggle(project.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`case-study-${project.id}`}
                  className="w-full text-left p-6 tablet:p-8 flex flex-col tablet:flex-row tablet:items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                >
                  <div className="flex items-start gap-4 tablet:gap-6">
                    <span className="font-mono text-xs text-[var(--color-accent)] mt-1 w-6 shrink-0">
                      {itemNumber}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3
                          className="font-display text-[var(--color-text-primary)] font-normal"
                          style={{ fontSize: "var(--text-heading-md)" }}
                        >
                          {project.name}
                        </h3>
                        <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] border border-[var(--color-border)] px-2 py-0.5 uppercase tracking-wider">
                          {project.type}
                        </span>
                      </div>
                      <p className="font-body text-xs tablet:text-sm text-[var(--color-text-secondary)]">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between tablet:justify-end gap-4 shrink-0 pt-2 tablet:pt-0 border-t tablet:border-t-0 border-[var(--color-border)]/50">
                    <span className="font-mono text-xs text-[var(--color-text-tertiary)]">
                      {project.period}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`font-mono text-lg text-[var(--color-accent)] transition-transform duration-200 ${
                        isExpanded ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Expanded Deep-Dive Case Study Panel */}
                {isExpanded && (
                  <div
                    id={`case-study-${project.id}`}
                    className="p-6 tablet:p-8 pt-0 border-t border-[var(--color-border)]/60 space-y-8 animate-fadeIn"
                  >
                    {/* Problem & Solution Grid */}
                    <div className="grid laptop:grid-cols-2 gap-8 pt-6">
                      <div className="space-y-2">
                        <span className="font-mono text-[11px] text-[var(--color-accent)] uppercase tracking-wider block">
                          Problem Space
                        </span>
                        <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="font-mono text-[11px] text-[var(--color-accent)] uppercase tracking-wider block">
                          Engineering Approach & Solution
                        </span>
                        <p className="font-body text-sm text-[var(--color-text-primary)] leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Architecture Details */}
                    <div className="border-l-2 border-[var(--color-accent)] pl-4 py-1 space-y-1 bg-[#181818]/60 p-4">
                      <span className="font-mono text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                        Architecture & Data Flow
                      </span>
                      <p className="font-body text-sm text-[var(--color-text-secondary)]">
                        {project.architecture}
                      </p>
                    </div>

                    {/* Technical Decisions */}
                    {project.decisions.length > 0 && (
                      <div className="space-y-3">
                        <span className="font-mono text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                          Technical Decisions & Rationale
                        </span>
                        <div className="grid tablet:grid-cols-2 gap-4">
                          {project.decisions.map((decision, dIdx) => (
                            <div
                              key={dIdx}
                              className="border border-[var(--color-border)] p-4 bg-[#181818]/40 space-y-2"
                            >
                              <p className="font-display text-sm text-[var(--color-text-primary)] font-medium">
                                {decision.question}
                              </p>
                              <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                {decision.answer}
                              </p>
                              {decision.alternativesConsidered && (
                                <p className="font-mono text-[10px] text-[var(--color-text-tertiary)] pt-1 border-t border-[var(--color-border)]/40">
                                  Tradeoff: {decision.alternativesConsidered}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Challenges & Outcome */}
                    <div className="grid tablet:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <span className="font-mono text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                          Engineering Challenges Overcome
                        </span>
                        <ul className="space-y-1.5 font-body text-xs text-[var(--color-text-secondary)]">
                          {project.challenges.map((challenge, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-2">
                              <span className="text-[var(--color-accent)] shrink-0">·</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider block">
                          Outcome / Result
                        </span>
                        <p className="font-body text-xs text-[var(--color-text-primary)] leading-relaxed bg-[#1C1C1C] p-3 border border-[var(--color-border)]">
                          {project.outcome}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Tags & Actions */}
                    <div className="flex flex-col tablet:flex-row justify-between items-start tablet:items-center gap-4 pt-4 border-t border-[var(--color-border)]">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] text-[var(--color-text-secondary)] border border-[var(--color-border)] bg-[#181818] px-2.5 py-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-[var(--color-accent)] border border-[var(--color-accent)] px-3 py-1.5 tracking-wider uppercase hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors"
                          >
                            GitHub Repo ↗
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-[var(--color-text-primary)] border border-[var(--color-border)] px-3 py-1.5 tracking-wider uppercase hover:border-[var(--color-text-primary)] transition-colors"
                          >
                            Demo / Video ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}