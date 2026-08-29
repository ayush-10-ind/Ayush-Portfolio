// components/sections/Experience.tsx
// Editorial timeline — company names as large type, not cards.

import { getAllExperiences } from "@/lib/data/experience";

export default function Experience() {
  const experiences = getAllExperiences();

  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className="py-[var(--space-9)] px-[var(--gutter)]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="flex items-start gap-[var(--space-6)] mb-[var(--space-7)]">
          <span
            className="font-display text-[var(--color-border)] leading-none flex-shrink-0 hidden tablet:block"
            style={{ fontSize: "var(--text-display-lg)" }}
            aria-hidden="true"
          >
            03
          </span>
          <h2
            className="font-display text-[var(--color-text-primary)]"
            style={{ fontSize: "var(--text-heading-lg)" }}
          >
            Experience
          </h2>
        </div>

        {experiences.length === 0 ? (
          <p className="font-mono text-[var(--color-text-tertiary)] text-sm">
            Experience coming soon — populate lib/data/experience.ts
          </p>
        ) : (
          <ol className="relative border-l border-[var(--color-border)] space-y-[var(--space-7)] pl-[var(--space-6)]">
            {experiences.map((exp) => (
              <li key={exp.id} className="relative">
                {/* Timeline dot */}
                <div
                  className="absolute -left-[calc(var(--space-6)+4px)] top-2 w-2 h-2 rounded-full bg-[var(--color-border)]"
                  aria-hidden="true"
                />

                {/* Company name — large editorial type */}
                <h3
                  className="font-display text-[var(--color-text-primary)] mb-1"
                  style={{ fontSize: "var(--text-heading-md)" }}
                >
                  {exp.company}
                </h3>

                <div className="flex flex-wrap items-center gap-x-[var(--space-3)] gap-y-1 mb-[var(--space-3)]">
                  <span className="font-body text-[var(--color-accent)]">{exp.role}</span>
                  <span className="text-[var(--color-border)]">·</span>
                  <span className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)]">
                    {exp.period.start} – {exp.period.end}
                  </span>
                  <span className="text-[var(--color-border)]">·</span>
                  <span className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)]">
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-1 mb-[var(--space-3)]">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="font-body text-[var(--color-text-secondary)] text-sm flex gap-2">
                      <span className="text-[var(--color-text-tertiary)] flex-shrink-0">—</span>
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] border border-[var(--color-border)] px-2 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
