"use client";

import React from "react";
import { projects } from "@/lib/data/projects";

interface SceneProps {
  progress: number;
}

export default function XaiAnalyticsScene({ progress }: SceneProps) {
  // Active window: 58% -> 76%
  if (progress < 0.56 || progress > 0.78) return null;

  const xai = projects.find((p) => p.id === "explainable-ai-research") || projects[1];

  // Fade calculation
  let opacity = 1;
  if (progress < 0.62) {
    opacity = (progress - 0.56) / 0.06;
  } else if (progress > 0.72) {
    opacity = Math.max(0, 1 - (progress - 0.72) / 0.06);
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-150 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 font-mono text-[11px] text-[var(--color-text-secondary)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-accent)] font-medium">INDEX 04 / FEATURED CASE STUDY 02</span>
          <span className="text-[var(--color-border-strong)]">·</span>
          <span>MACHINE LEARNING &amp; XAI</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-pitch-green)] font-medium">PYTHON · FEATURE ATTRIBUTION</span>
          {xai.links?.github && (
            <a
              href={xai.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-primary)] px-3 py-1 text-[10px] uppercase font-medium transition-colors shadow-xs"
            >
              GitHub ↗
            </a>
          )}
          {xai.links?.live && (
            <a
              href={xai.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-primary)] px-3 py-1 text-[10px] uppercase font-medium transition-colors shadow-xs"
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>

      {/* Main Dossier Content */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2 border-b border-[var(--color-border)] pb-4">
          <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block font-medium">
            {xai.type} · {xai.period}
          </span>
          <h2 className="font-display text-3xl tablet:text-5xl text-[var(--color-text-primary)] font-normal">
            {xai.name}
          </h2>
          <p className="font-body text-xs tablet:text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-4xl">
            {xai.tagline}
          </p>
        </div>

        {/* Analytical Flow Diagram */}
        <div className="paper-sheet p-6 space-y-4">
          <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block font-medium">
            MODEL INTERPRETABILITY ANALYTICAL PIPELINE
          </span>

          <div className="grid grid-cols-2 tablet:grid-cols-5 gap-2.5 font-mono text-[11px] text-center">
            <div className="border border-[var(--color-border)] p-3 bg-[var(--color-surface)] space-y-1">
              <span className="text-[var(--color-accent)] text-[10px] block font-medium">01 INPUT</span>
              <span className="text-[var(--color-text-primary)] block font-medium">Feature Vectors</span>
            </div>

            <div className="border border-[var(--color-border)] p-3 bg-[var(--color-surface)] space-y-1">
              <span className="text-[var(--color-accent)] text-[10px] block font-medium">02 INFERENCE</span>
              <span className="text-[var(--color-text-primary)] block font-medium">Black-Box ML</span>
            </div>

            <div className="border border-[var(--color-border)] p-3 bg-[var(--color-surface)] space-y-1">
              <span className="text-[var(--color-accent)] text-[10px] block font-medium">03 OUTPUT</span>
              <span className="text-[var(--color-text-primary)] block font-medium">Prediction</span>
            </div>

            <div className="border border-[var(--color-border)] p-3 bg-[var(--color-surface)] space-y-1">
              <span className="text-[var(--color-pitch-green)] text-[10px] block font-medium">04 AUDIT</span>
              <span className="text-[var(--color-text-primary)] block font-medium">Attribution</span>
            </div>

            <div className="border border-[var(--color-pitch-green)] p-3 bg-[var(--color-bg-paper)] space-y-1">
              <span className="text-[var(--color-pitch-green)] text-[10px] block font-medium">05 EXPLANATION</span>
              <span className="text-[var(--color-text-primary)] block font-medium">Transparency</span>
            </div>
          </div>
        </div>

        {/* Problem & Approach Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 font-body text-xs">
          <div className="paper-sheet p-5 space-y-2">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase block font-medium">
              01 / RESEARCH PROBLEM
            </span>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {xai.problem}
            </p>
          </div>

          <div className="paper-sheet p-5 space-y-2">
            <span className="font-mono text-[10px] text-[var(--color-pitch-green)] uppercase block font-medium">
              02 / RESEARCH METHODOLOGY
            </span>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {xai.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-border)] pt-4 flex justify-between font-mono text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest">
        <span>EXPLAINABLE AI RESEARCH EXHIBIT</span>
        <span className="text-[var(--color-accent)] font-medium">SCROLL TO ADVANCE TO EXPERIENCE →</span>
      </div>
    </div>
  );
}