// components/sections/Skills.tsx
// Grouped typographic list — no progress bars, no percentage meters.

import { getAllSkillGroups } from "@/lib/data/skills";

export default function Skills() {
  const groups = getAllSkillGroups();

  return (
    <section
      id="skills"
      aria-label="Skills and Technologies"
      className="py-[var(--space-9)] px-[var(--gutter)]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="flex items-start gap-[var(--space-6)] mb-[var(--space-7)]">
          <span
            className="font-display text-[var(--color-border)] leading-none flex-shrink-0 hidden tablet:block"
            style={{ fontSize: "var(--text-display-lg)" }}
            aria-hidden="true"
          >
            04
          </span>
          <h2
            className="font-display text-[var(--color-text-primary)]"
            style={{ fontSize: "var(--text-heading-lg)" }}
          >
            Craft
          </h2>
        </div>

        <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-x-[var(--space-7)] gap-y-[var(--space-6)]">
          {groups.map((group) => (
            <div key={group.domain}>
              <h3 className="font-display text-[var(--color-text-primary)] mb-[var(--space-3)]"
                style={{ fontSize: "var(--text-heading-md)" }}>
                {group.domain}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3">
                    <span className="font-mono text-[var(--color-text-secondary)]">
                      {skill.name}
                    </span>
                    {skill.level === "primary" && (
                      <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" aria-label="Primary skill" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
