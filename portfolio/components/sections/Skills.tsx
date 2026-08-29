// components/sections/Skills.tsx
// Typographic craft & skills matrix for Ayush Trivedi (No percentage bars)
import { getAllSkillGroups } from "@/lib/data/skills";

export default function Skills() {
  const skillGroups = getAllSkillGroups();

  return (
    <section
      id="skills"
      aria-label="Skills & Technical Craft"
      className="py-24 px-[var(--gutter)] border-b border-[var(--color-border)]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline gap-6 mb-16 border-b border-[var(--color-border)] pb-6">
          <span
            className="font-display text-[var(--color-accent)] italic text-4xl tablet:text-5xl font-light"
            aria-hidden="true"
          >
            05
          </span>
          <div>
            <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
              Technical Competencies
            </span>
            <h2
              className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
              style={{ fontSize: "var(--text-heading-lg)" }}
            >
              Craft & Engineering Stack.
            </h2>
          </div>
        </div>

        {/* 4-Column Domain Grid */}
        <div className="grid tablet:grid-cols-2 laptop:grid-cols-4 gap-8">
          {skillGroups.map((group, gIdx) => (
            <div
              key={gIdx}
              className="border border-[var(--color-border)] p-6 bg-[#141414]/40 flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-baseline justify-between border-b border-[var(--color-border)] pb-3 mb-4">
                  <h3 className="font-display text-base text-[var(--color-text-primary)] font-medium">
                    {group.domain}
                  </h3>
                  <span className="font-mono text-[10px] text-[var(--color-accent)]">
                    0{gIdx + 1}
                  </span>
                </div>

                <ul className="space-y-3 font-mono text-xs">
                  {group.skills.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="flex items-center justify-between text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                        <span>{skill.name}</span>
                      </span>
                      <span className="text-[10px] uppercase text-[var(--color-text-tertiary)]">
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)]/40 font-mono text-[10px] text-[var(--color-text-tertiary)]">
                VERIFIED COMPETENCY
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}