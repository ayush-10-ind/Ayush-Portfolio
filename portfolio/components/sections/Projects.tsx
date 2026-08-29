"use client";
// components/sections/Projects.tsx
// Numbered project list — NOT a card grid.
// Click expands to full case study view.

import { useState } from "react";
import { getAllProjects } from "@/lib/data/projects";
import type { Project } from "@/types/portfolio";

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const projects = getAllProjects();

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-[var(--space-9)] px-[var(--gutter)]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="flex items-start gap-[var(--space-6)] mb-[var(--space-7)]">
          <span
            className="font-display text-[var(--color-border)] leading-none flex-shrink-0 hidden tablet:block"
            style={{ fontSize: "var(--text-display-lg)" }}
            aria-hidden="true"
          >
            02
          </span>
          <h2
            className="font-display text-[var(--color-text-primary)]"
            style={{ fontSize: "var(--text-heading-lg)" }}
          >
            Work
          </h2>
        </div>

        {/* Project list */}
        <ol className="space-y-0 border-t border-[var(--color-border)]">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index + 1}
              isExpanded={expandedId === project.id}
              onToggle={() => toggle(project.id)}
            />
          ))}
        </ol>

        {projects.length === 0 && (
          <p className="font-mono text-[var(--color-text-tertiary)] text-sm py-[var(--space-6)]">
            Projects coming soon — populate lib/data/projects.ts
          </p>
        )}
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="border-b border-[var(--color-border)]">
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full text-left group flex items-start justify-between gap-[var(--space-4)] py-[var(--space-5)] hover:bg-[var(--color-surface)] transition-colors duration-[var(--dur-fast)] px-[var(--space-3)] -mx-[var(--space-3)]"
      >
        <div className="flex items-start gap-[var(--space-4)]">
          <span className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] mt-1 w-6 flex-shrink-0">
            {String(index).padStart(2, "0")}
          </span>
          <div>
            <h3
              className="font-display text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-fast)]"
              style={{ fontSize: "var(--text-heading-md)" }}
            >
              {project.name}
            </h3>
            <p className="font-body text-[var(--color-text-tertiary)] text-sm mt-1">
              {project.tagline}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[var(--space-3)] flex-shrink-0 mt-1">
          <span className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] hidden tablet:block">
            {project.period}
          </span>
          <span
            className={`text-[var(--color-accent)] transition-transform duration-[var(--dur-normal)] ${
              isExpanded ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </div>
      </button>

      {/* Expanded case study */}
      {isExpanded && (
        <div className="pl-10 pb-[var(--space-6)] space-y-[var(--space-5)]">
          <CaseStudy project={project} />
        </div>
      )}
    </li>
  );
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <article>
      <div className="grid tablet:grid-cols-3 gap-[var(--space-6)] mb-[var(--space-6)]">
        <div className="tablet:col-span-2 space-y-[var(--space-4)]">
          <div>
            <h4 className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-widest uppercase mb-2">
              Problem
            </h4>
            <p className="font-body text-[var(--color-text-secondary)]">{project.problem}</p>
          </div>
          <div>
            <h4 className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-widest uppercase mb-2">
              Solution
            </h4>
            <p className="font-body text-[var(--color-text-secondary)]">{project.solution}</p>
          </div>
          <div>
            <h4 className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-widest uppercase mb-2">
              Architecture
            </h4>
            <p className="font-body text-[var(--color-text-secondary)]">{project.architecture}</p>
          </div>
        </div>

        <div className="space-y-[var(--space-4)]">
          <div>
            <h4 className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-widest uppercase mb-2">
              Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] border border-[var(--color-border)] px-2 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-[var(--space-3)]">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[var(--color-accent)] text-[var(--text-mono-sm)] tracking-wider uppercase hover:underline"
              >
                GitHub →
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[var(--color-accent)] text-[var(--text-mono-sm)] tracking-wider uppercase hover:underline"
              >
                Live →
              </a>
            )}
          </div>
        </div>
      </div>

      {project.decisions.length > 0 && (
        <div className="mb-[var(--space-4)]">
          <h4 className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-widest uppercase mb-3">
            Key Decisions
          </h4>
          <div className="space-y-3">
            {project.decisions.map((d, i) => (
              <details key={i} className="group border-l-2 border-[var(--color-border)] pl-4">
                <summary className="font-body text-[var(--color-text-primary)] cursor-pointer list-none flex justify-between items-start gap-4 hover:text-[var(--color-accent)] transition-colors">
                  {d.question}
                  <span className="text-[var(--color-text-tertiary)] group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="font-body text-[var(--color-text-secondary)] mt-2 text-sm">{d.answer}</p>
                {d.alternativesConsidered && (
                  <p className="font-mono text-[var(--color-text-tertiary)] text-xs mt-1">
                    Considered: {d.alternativesConsidered}
                  </p>
                )}
              </details>
            ))}
          </div>
        </div>
      )}

      {project.outcome && (
        <div>
          <h4 className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-widest uppercase mb-2">
            Outcome
          </h4>
          <p className="font-body text-[var(--color-text-secondary)]">{project.outcome}</p>
        </div>
      )}
    </article>
  );
}
