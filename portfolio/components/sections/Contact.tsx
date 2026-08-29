// components/sections/Contact.tsx
// Verified contact details & communication channels for Ayush Trivedi
import { profile } from "@/lib/data/profile";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Direct Contact & Channels"
      className="py-24 px-[var(--gutter)] bg-[#0A0A0A]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline gap-6 mb-16 border-b border-[var(--color-border)] pb-6">
          <span
            className="font-display text-[var(--color-accent)] italic text-4xl tablet:text-5xl font-light"
            aria-hidden="true"
          >
            06
          </span>
          <div>
            <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
              Communication & Inquiries
            </span>
            <h2
              className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
              style={{ fontSize: "var(--text-heading-lg)" }}
            >
              Initiate Contact.
            </h2>
          </div>
        </div>

        <div className="grid laptop:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Call to Action */}
          <div className="laptop:col-span-7 space-y-6">
            <p className="font-body text-base tablet:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
              Available for software engineering internships, technical collaborations, and full-stack development opportunities. Feel free to reach out directly.
            </p>

            {/* Large Clickable Email */}
            <div className="pt-4">
              <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-2">
                Primary Email Channel
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="font-display text-2xl tablet:text-4xl text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors break-all underline decoration-1 decoration-[var(--color-border)] hover:decoration-[var(--color-accent)] underline-offset-8"
              >
                {profile.email}
              </a>
            </div>

            {/* Direct Phone */}
            <div className="pt-2">
              <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-1">
                Direct Phone
              </span>
              <a
                href="tel:+918303155683"
                className="font-mono text-lg text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                +91 8303155683
              </a>
            </div>
          </div>

          {/* Right Column: Channel Cards & Verification */}
          <div className="laptop:col-span-5 space-y-4 font-mono text-xs">
            <div className="border border-[var(--color-border)] p-6 bg-[#141414]/50 space-y-4">
              <span className="text-[var(--color-text-tertiary)] uppercase tracking-wider block border-b border-[var(--color-border)] pb-2">
                Professional Channels
              </span>

              <div className="space-y-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border border-[var(--color-border)] bg-[#181818] hover:border-[var(--color-accent)] transition-colors group"
                >
                  <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
                    LinkedIn Profile
                  </span>
                  <span className="text-[var(--color-accent)]">↗</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border border-[var(--color-border)] bg-[#181818] hover:border-[var(--color-accent)] transition-colors group"
                >
                  <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
                    GitHub Repositories
                  </span>
                  <span className="text-[var(--color-accent)]">↗</span>
                </a>
              </div>
            </div>

            <div className="border border-[var(--color-border)] p-6 bg-[#141414]/50 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--color-text-tertiary)]">Location:</span>
                <span className="text-[var(--color-text-primary)]">{profile.location}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--color-text-tertiary)]">Status:</span>
                <span className="text-[var(--color-success)]">{profile.availability}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Footer */}
        <div className="mt-20 pt-8 border-t border-[var(--color-border)] flex flex-col tablet:flex-row justify-between items-start tablet:items-center gap-4 font-mono text-[11px] text-[var(--color-text-tertiary)]">
          <div>
            <span>AYUSH TRIVEDI · COMPUTER SCIENCE & ENGINEERING</span>
          </div>
          <div>
            <span>ALL RIGHTS RESERVED © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}