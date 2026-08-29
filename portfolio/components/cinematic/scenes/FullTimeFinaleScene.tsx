"use client";

import React from "react";
import { profile } from "@/lib/data/profile";

interface SceneProps {
  progress: number;
}

export default function FullTimeFinaleScene({ progress }: SceneProps) {
  // Strict lifecycle: 90% -> 100%
  if (progress < 0.90) return null;

  const opacity = Math.min(1, (progress - 0.90) / 0.05);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-cut-line)] pb-4 font-mono text-[11px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-blade-crimson)] font-medium">FINAL WHISTLE // THE HORIZON</span>
          <span className="text-[var(--color-cut-line)]">|</span>
          <span>INITIATE COLLABORATION</span>
        </div>
        <span className="text-[var(--color-wano-jade)] font-medium">GREATER NOIDA · UTC+5:30</span>
      </div>

      {/* Main Finale Display */}
      <div className="my-auto max-w-4xl mx-auto w-full space-y-8 text-center tablet:text-left">
        <div className="space-y-3">
          <span className="font-mono text-xs text-[var(--color-blade-crimson)] uppercase tracking-[0.25em] block font-medium">
            JOURNEY COMPLETE
          </span>
          <h2 className="font-display text-4xl tablet:text-6xl laptop:text-7xl text-[var(--color-steel-white)] font-normal leading-tight">
            Full Time.
            <br />
            <span>Let&apos;s build something</span>
            <span className="text-[var(--color-blade-crimson)]">.</span>
          </h2>
        </div>

        <p className="font-body text-sm tablet:text-base text-[var(--color-mist-gray)] leading-relaxed max-w-2xl">
          Seeking software engineering roles, backend engineering opportunities, and machine learning research collaborations.
        </p>

        {/* Direct Actions Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 pt-4 font-mono text-xs">
          <div className="steel-panel p-5 text-left space-y-1">
            <span className="text-[var(--color-dim-gray)] text-[10px] uppercase block font-medium">
              Direct Email
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="text-[var(--color-blade-crimson)] hover:underline break-all text-xs font-medium"
            >
              {profile.email}
            </a>
          </div>

          <div className="steel-panel p-5 text-left space-y-1">
            <span className="text-[var(--color-dim-gray)] text-[10px] uppercase block font-medium">
              Direct Phone
            </span>
            <span className="text-[var(--color-steel-white)] block text-xs font-medium">
              +91 8303155683
            </span>
          </div>

          <div className="steel-panel p-5 text-left space-y-1">
            <span className="text-[var(--color-dim-gray)] text-[10px] uppercase block font-medium">
              Verified Profiles
            </span>
            <div className="flex gap-4 text-xs font-medium pt-0.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-steel-white)] hover:text-[var(--color-blade-crimson)]"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-steel-white)] hover:text-[var(--color-blade-crimson)]"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--color-cut-line)] pt-4 flex flex-col tablet:flex-row justify-between items-center gap-2 font-mono text-[10px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <span>© {new Date().getFullYear()} AYUSH TRIVEDI · CINEMATIC 3D STUDIO</span>
        <span>NIET GREATER NOIDA · CSE &apos;28</span>
      </div>
    </div>
  );
}