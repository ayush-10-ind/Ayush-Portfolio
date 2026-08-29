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
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-border)]/60 pb-4 font-mono text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-accent)] font-medium">INDEX 04 / FEATURED CASE STUDY 02</span>
          <span className="text-[var(--color-border)]">|</span>
          <span>MACHINE LEARNING &amp; XAI</span>
        </div>
        <div className="flex items-center gap-3">
          <span>PYTHON · FEATURE ATTRIBUTION</span>
          {xai.links?.github && (
            <a
              href={xai.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--color-border)] bg-[#141414] hover:border-[var(--color-accent)] text-[var(--color-text-primary)] px-2.5 py-1 text-[10px] uppercase transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {xai.links?.live && (
            <a
              href={xai.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--color-border)] bg-[#141414] hover:border-[var(--color-accent)] text-[var(--color-text-primary)] px-2.5 py-1 text-[10px] uppercase transition-colors"
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>

      {/* Main Dossier Content */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2 border-b border-[var(--color-border)]/50 pb-4">
          <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block">
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
        <div className="border border-[var(--color-border)] p-6 bg-[#121212] drafting-corner space-y-4">
          <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block">
            MODEL INTERPRETABILITY ANALYTICAL PIPELINE
          </span>

          <div className="grid grid-cols-2 tablet:grid-cols-5 gap-2.5 font-mono text-[11px] text-center">
            <div className="border border-[var(--color-border)] p-3 bg-[#161616] space-y-1">
              <span className="text-[var(--color-accent)] text-[10px] block">01 INPUT</span>
              <span className="text-[var(--color-text-primary)] block font-medium">Feature Vectors</span>
            </div>

            <div className="border border-[var(--color-border)] p-3 bg-[#161616] space-y-1">
              <span className="text-[var(--color-accent)] text-[10px] block">02 INFERENCE</span>
              <span className="text-[var(--color-text-primary)] block font-medium">Black-Box ML</span>
            </div>

            <div className="border border-[var(--color-border)] p-3 bg-[#161616] space-y-1">
              <span className="text-[var(--color-accent)] text-[10px] block">03 OUTPUT</span>
              <span className="text-[var(--color-text-primary)] block font-medium">Prediction</span>
            </div>

            <div className="border border-[var(--color-border)] p-3 bg-[#161616] space-y-1">
              <span className="text-[var(--color-accent)] text-[10px] block">04 AUDIT</span>
              <span className="text-[var(--color-text-primary)] block font-medium">Attribution</span>
            </div>

            <div className="border border-[var(--color-accent)]/70 p-3 bg-[#181818] space-y-1">
              <span className="text-[var(--color-accent)] text-[10px] block font-medium">05 OUTPUT</span>
              <span className="text-[var(--color-text-primary)] block font-medium">Explanation</span>
            </div>
          </div>
        </div>

        {/* Problem & Approach Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 font-body text-xs">
          <div className="border border-[var(--color-border)] p-5 bg-[#121212] drafting-corner space-y-2">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase block">
              01 / RESEARCH PROBLEM
            </span>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {xai.problem}
            </p>
          </div>

          <div className="border border-[var(--color-border)] p-5 bg-[#121212] drafting-corner space-y-2">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase block">
              02 / RESEARCH METHODOLOGY
            </span>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {xai.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-border)]/60 pt-4 flex justify-between font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-widest">
        <span>EXPLAINABLE AI RESEARCH EXHIBIT</span>
        <span>SCROLL TO ADVANCE TO EXPERIENCE →</span>
      </div>
    </div>
  );
}