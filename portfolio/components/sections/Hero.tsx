"use client";
// components/sections/Hero.tsx
// Full-viewport hero. Ayush's name as primary visual element.
// Large display serif, asymmetric, editorial.

import { profile } from "@/lib/data/profile";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-end pb-[var(--space-9)] px-[var(--gutter)]"
    >
      {/* Main hero content — bottom-left anchor */}
      <div className="max-w-[var(--max-width)] mx-auto w-full">
        {/* Eyebrow */}
        <p className="font-mono text-[var(--color-text-tertiary)] text-[var(--text-mono-sm)] tracking-[0.2em] uppercase mb-[var(--space-3)]">
          Software Engineer
        </p>

        {/* Name — primary visual element */}
        <h1
          className="font-display text-[var(--color-text-primary)] leading-[0.92] mb-[var(--space-5)]"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          {/* Line 1 */}
          <span className="block">Ayush</span>
          {/* Line 2 — offset for editorial feel */}
          <span className="block tablet:pl-[10vw] text-[var(--color-text-secondary)]">
            Trivedi
          </span>
        </h1>

        {/* Bio / tagline — fill from profile data */}
        {profile.tagline && (
          <p
            className="font-body text-[var(--color-text-secondary)] max-w-xl mb-[var(--space-6)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {profile.tagline}
          </p>
        )}

        {/* CTAs */}
        <div className="flex items-center gap-[var(--space-4)]">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-mono text-[var(--color-accent)] text-[var(--text-mono-sm)] tracking-[0.15em] uppercase border border-[var(--color-accent)] px-[var(--space-4)] py-[var(--space-2)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-[var(--dur-normal)]"
          >
            View Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-mono text-[var(--color-text-secondary)] text-[var(--text-mono-sm)] tracking-[0.15em] uppercase hover:text-[var(--color-text-primary)] transition-colors duration-[var(--dur-fast)]"
          >
            Contact →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 right-[var(--gutter)] flex flex-col items-center gap-2 opacity-40"
      >
        <span className="font-mono text-[var(--color-text-tertiary)] text-[10px] tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <div className="w-px h-12 bg-[var(--color-border)]" />
      </div>
    </section>
  );
}
