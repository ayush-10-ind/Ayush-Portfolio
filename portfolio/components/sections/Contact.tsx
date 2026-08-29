// components/sections/Contact.tsx
// Minimal contact section — large email link, social icons.

import { profile } from "@/lib/data/profile";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-[var(--space-9)] px-[var(--gutter)] border-t border-[var(--color-border)]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="flex items-start gap-[var(--space-6)] mb-[var(--space-7)]">
          <span
            className="font-display text-[var(--color-border)] leading-none flex-shrink-0 hidden tablet:block"
            style={{ fontSize: "var(--text-display-lg)" }}
            aria-hidden="true"
          >
            05
          </span>
          <div className="flex-1">
            <h2
              className="font-display text-[var(--color-text-primary)] mb-[var(--space-3)]"
              style={{ fontSize: "var(--text-heading-lg)" }}
            >
              Let&apos;s talk.
            </h2>

            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="block font-display text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-normal)] mb-[var(--space-6)]"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                {profile.email}
              </a>
            ) : (
              <p className="font-mono text-[var(--color-text-tertiary)] text-sm mb-[var(--space-6)]">
                Email not configured — update lib/data/profile.ts
              </p>
            )}

            {/* Social links */}
            {profile.socials.length > 0 && (
              <nav aria-label="Social links" className="flex flex-wrap gap-[var(--space-4)]">
                {profile.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-widest uppercase hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-fast)]"
                  >
                    {social.platform}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>

        {/* Footer line */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-[var(--space-6)] border-t border-[var(--color-border)]">
          <span className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)]">
            Ayush Trivedi · {new Date().getFullYear()}
          </span>
          {profile.availability && (
            <span className="font-mono text-[var(--color-accent)] text-[var(--text-mono-sm)]">
              {profile.availability}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
