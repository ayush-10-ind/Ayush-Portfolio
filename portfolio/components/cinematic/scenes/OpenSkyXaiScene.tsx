"use client";

import React from "react";
import { projects } from "@/lib/data/projects";

interface SceneProps {
  progress: number;
}

export default function OpenSkyXaiScene({ progress }: SceneProps) {
  // Active window: 60% -> 77%
  if (progress < 0.58 || progress > 0.77) return null;

  const xai = projects.find((p) => p.id === "explainable-ai-research") || projects[1];

  let opacity = 1;
  if (progress < 0.63) {
    opacity = (progress - 0.58) / 0.05;
  } else if (progress > 0.72) {
    opacity = Math.max(0, 1 - (progress - 0.72) / 0.05);
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-sketch-line)] pb-4 font-mono text-[11px] text-[var(--color-ink-secondary)] uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--color-terracotta)]">STAGE 05 //</span>
          <span>THE OPEN SKY VISTA · EXPLAINABLE AI</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-wano-green)] font-medium">PYTHON · FEATURE ATTRIBUTION</span>
          {xai.links?.github && (
            <a
              href={xai.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[var(--color-ink-primary)] bg-[var(--color-paper-card)] hover:bg-[var(--color-terracotta)] hover:text-white text-[var(--color-ink-primary)] px-3 py-1 text-[10px] uppercase font-semibold transition-colors shadow-xs"
            >
              GitHub ↗
            </a>
          )}
          {xai.links?.live && (
            <a
              href={xai.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[var(--color-ink-primary)] bg-[var(--color-paper-card)] hover:bg-[var(--color-terracotta)] hover:text-white text-[var(--color-ink-primary)] px-3 py-1 text-[10px] uppercase font-semibold transition-colors shadow-xs"
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>

      {/* Main Dossier Content */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2 border-b border-[var(--color-sketch-line)] pb-4">
          <span className="font-mono text-xs text-[var(--color-terracotta)] uppercase tracking-widest block font-medium">
            {xai.type} · {xai.period}
          </span>
          <h2 className="font-display text-3xl tablet:text-5xl text-[var(--color-ink-primary)] font-normal">
            {xai.name}
          </h2>
          <p className="font-body text-xs tablet:text-sm text-[var(--color-ink-secondary)] leading-relaxed max-w-4xl">
            {xai.tagline}
          </p>
        </div>

        {/* Sketched Cloudscape Interpretability Flow */}
        <div className="sketch-box p-6 space-y-4">
          <div className="flex justify-between items-baseline border-b border-[var(--color-sketch-line)] pb-2 font-mono text-[10px] uppercase tracking-widest">
            <span className="text-[var(--color-terracotta)] font-semibold">MODEL INTERPRETABILITY LENS</span>
            <span className="text-[var(--color-ink-secondary)]">FEATURE ATTRIBUTION AUDIT</span>
          </div>

          <div className="grid grid-cols-2 tablet:grid-cols-5 gap-2.5 font-mono text-[11px] text-center">
            <div className="border border-[var(--color-ink-primary)] p-3 bg-[var(--color-paper-card)] space-y-1">
              <span className="text-[var(--color-terracotta)] text-[10px] block font-semibold">01 INPUT</span>
              <span className="text-[var(--color-ink-primary)] block font-medium">Feature Vectors</span>
            </div>

            <div className="border border-[var(--color-ink-primary)] p-3 bg-[var(--color-paper-card)] space-y-1">
              <span className="text-[var(--color-terracotta)] text-[10px] block font-semibold">02 INFERENCE</span>
              <span className="text-[var(--color-ink-primary)] block font-medium">Black-Box ML</span>
            </div>

            <div className="border border-[var(--color-ink-primary)] p-3 bg-[var(--color-paper-card)] space-y-1">
              <span className="text-[var(--color-terracotta)] text-[10px] block font-semibold">03 OUTPUT</span>
              <span className="text-[var(--color-ink-primary)] block font-medium">Prediction</span>
            </div>

            <div className="border border-[var(--color-ink-primary)] p-3 bg-[var(--color-paper-card)] space-y-1">
              <span className="text-[var(--color-wano-green)] text-[10px] block font-semibold">04 AUDIT</span>
              <span className="text-[var(--color-ink-primary)] block font-medium">Attribution</span>
            </div>

            <div className="border-2 border-[var(--color-wano-green)] p-3 bg-[#EAF2ED] space-y-1">
              <span className="text-[var(--color-wano-green)] text-[10px] block font-semibold">05 OUTPUT</span>
              <span className="text-[var(--color-ink-primary)] block font-medium">Explanation</span>
            </div>
          </div>
        </div>

        {/* Problem & Approach Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 font-body text-xs">
          <div className="sketch-box-subtle p-5 space-y-2">
            <span className="font-mono text-[10px] text-[var(--color-terracotta)] uppercase block font-semibold">
              01 / RESEARCH CHALLENGE
            </span>
            <p className="text-[var(--color-ink-secondary)] leading-relaxed">
              {xai.problem}
            </p>
          </div>

          <div className="sketch-box-subtle p-5 space-y-2">
            <span className="font-mono text-[10px] text-[var(--color-wano-green)] uppercase block font-semibold">
              02 / RESEARCH METHODOLOGY
            </span>
            <p className="text-[var(--color-ink-secondary)] leading-relaxed">
              {xai.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Guidance */}
      <div className="flex justify-between border-t border-[var(--color-sketch-line)] pt-4 font-mono text-[10px] text-[var(--color-ink-secondary)] uppercase tracking-widest">
        <span>DESCENDING BACK INTO CAREER EXHIBITION HALL</span>
        <span className="text-[var(--color-terracotta)] font-medium">SCROLL TO ADVANCE →</span>
      </div>
    </div>
  );
}