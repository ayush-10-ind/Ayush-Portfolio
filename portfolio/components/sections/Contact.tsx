"use client";

import React from "react";
import { profile } from "@/lib/data/profile";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Direct Communication & Inquiries"
      className="py-32 px-[var(--gutter)] bg-[#0C0C0C] relative"
    >
      <div className="max-w-[var(--max-width)] mx-auto space-y-16">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-col tablet:flex-row tablet:items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-6">
            <div className="flex items-baseline gap-6">
              <span
                className="font-display text-[var(--color-accent)] italic text-4xl tablet:text-5xl font-light"
                aria-hidden="true"
              >
                06
              </span>
              <div>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
                  Communication Channels
                </span>
                <h2
                  className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
                  style={{ fontSize: "var(--text-heading-lg)" }}
                >
                  Direct Inquiry.
                </h2>
              </div>
            </div>

            <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest">
              GREATER NOIDA · UTC+5:30
            </span>
          </div>
        </ScrollReveal>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 laptop:grid-cols-12 gap-12 items-start">
          {/* Main Direct Action */}
          <div className="laptop:col-span-7 space-y-6">
            <h3 className="font-display text-2xl tablet:text-3xl text-[var(--color-text-primary)] font-normal leading-snug">
              Open for software engineering opportunities, backend development roles, and research collaborations.
            </h3>

            <div className="pt-4">
              <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-2">
                Primary Direct Channel:
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="font-display text-2xl tablet:text-3xl text-[var(--color-accent)] hover:underline break-all"
              >
                {profile.email}
              </a>
            </div>
          </div>

          {/* Detailed Coordinate & Channel Grid */}
          <div className="laptop:col-span-5 space-y-4 laptop:border-l laptop:border-[var(--color-border)] laptop:pl-10 font-mono text-xs">
            <div className="border border-[var(--color-border)] p-4 bg-[#121212] drafting-corner space-y-1">
              <span className="text-[var(--color-text-tertiary)] text-[10px] uppercase">
                Telephone (India)
              </span>
              <div className="text-[var(--color-text-primary)] text-sm">
                +91 8303155683
              </div>
            </div>

            <div className="border border-[var(--color-border)] p-4 bg-[#121212] drafting-corner space-y-1">
              <span className="text-[var(--color-text-tertiary)] text-[10px] uppercase">
                Geographic Location
              </span>
              <div className="text-[var(--color-text-primary)] text-sm">
                {profile.location}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[var(--color-border)] p-3 bg-[#121212] text-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors uppercase tracking-wider"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[var(--color-border)] p-3 bg-[#121212] text-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors uppercase tracking-wider"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        {/* Architectural Footer */}
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col tablet:flex-row justify-between items-center gap-4 font-mono text-xs text-[var(--color-text-tertiary)]">
          <div>
            © {new Date().getFullYear()} AYUSH TRIVEDI · ARCHITECTURAL STUDIO
          </div>
          <div>
            NIET GREATER NOIDA · CSE &apos;28
          </div>
        </div>
      </div>
    </section>
  );
}