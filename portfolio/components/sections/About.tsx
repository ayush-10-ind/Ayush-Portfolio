// components/sections/About.tsx
// Identity section — editorial asymmetric layout.
// Authentic content, not a generic "passion" paragraph.

import { profile } from "@/lib/data/profile";

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Ayush"
      className="py-[var(--space-9)] px-[var(--gutter)]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        {/* Section marker */}
        <div className="flex items-start gap-[var(--space-6)] mb-[var(--space-7)]">
          <span
            className="font-display text-[var(--color-border)] leading-none flex-shrink-0 hidden tablet:block"
            style={{ fontSize: "var(--text-display-lg)" }}
            aria-hidden="true"
          >
            01
          </span>

          <div className="flex-1">
            <h2
              className="font-display text-[var(--color-text-primary)] mb-[var(--space-5)]"
              style={{ fontSize: "var(--text-heading-lg)" }}
            >
              About
            </h2>

            <div className="grid tablet:grid-cols-2 gap-[var(--space-7)]">
              {/* Primary bio */}
              <div>
                <p
                  className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-[var(--space-4)]"
                  style={{ fontSize: "var(--text-body-lg)" }}
                >
                  {profile.bio ||
                    "Bio not yet configured. Update docs/knowledge.md and lib/data/profile.ts."}
                </p>
              </div>

              {/* Facts column */}
              <div className="space-y-[var(--space-4)]">
                {profile.location && (
                  <div>
                    <dt className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-widest uppercase mb-1">
                      Location
                    </dt>
                    <dd className="font-body text-[var(--color-text-primary)]">
                      {profile.location}
                    </dd>
                  </div>
                )}
                {profile.availability && (
                  <div>
                    <dt className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-widest uppercase mb-1">
                      Status
                    </dt>
                    <dd className="font-body text-[var(--color-accent)]">
                      {profile.availability}
                    </dd>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
