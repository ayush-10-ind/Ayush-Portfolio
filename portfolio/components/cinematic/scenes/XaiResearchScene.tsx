"use client";

import React from "react";
import { projects } from "@/lib/data/projects";

interface SceneProps {
  progress: number;
}

export default function XaiResearchScene({ progress }: SceneProps) {
  // Strict lifecycle: 58% -> 76%
  if (progress < 0.56 || progress > 0.76) return null;

  const xai = projects.find((p) => p.id === "explainable-ai-research") || projects[1];

  let opacity = 1;
  if (progress < 0.61) {
    opacity = (progress - 0.56) / 0.05;
  } else if (progress > 0.71) {
    opacity = Math.max(0, 1 - (progress - 0.71) / 0.05);
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-cut-line)] pb-4 font-mono text-[11px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-blade-crimson)] font-medium">INDEX 04 // THE LENS</span>
          <span className="text-[var(--color-cut-line)]">|</span>
          <span>MACHINE LEARNING &amp; XAI</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-wano-jade)] font-medium">PYTHON · ATTRIBUTION AUDIT</span>
          {xai.links?.github && (
            <a
              href={xai.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--color-cut-strong)] bg-[var(--color-slate-steel)] hover:border-[var(--color-blade-crimson)] hover:text-[var(--color-blade-crimson)] text-[var(--color-steel-white)] px-3 py-1 text-[10px] uppercase font-medium transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {xai.links?.live && (
            <a
              href={xai.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--color-cut-strong)] bg-[var(--color-slate-steel)] hover:border-[var(--color-blade-crimson)] hover:text-[var(--color-blade-crimson)] text-[var(--color-steel-white)] px-3 py-1 text-[10px] uppercase font-medium transition-colors"
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2 border-b border-[var(--color-cut-line)] pb-4">
          <span className="font-mono text-xs text-[var(--color-blade-crimson)] uppercase tracking-widest block font-medium">
            {xai.type} · {xai.period}
          </span>
          <h2 className="font-display text-3xl tablet:text-5xl text-[var(--color-steel-white)] font-normal">
            {xai.name}
          </h2>
          <p className="font-body text-xs tablet:text-sm text-[var(--color-mist-gray)] leading-relaxed max-w-4xl">
            {xai.tagline}
          </p>
        </div>

        {/* Model Interpretability Flow Diagram */}
        <div className="steel-panel p-6 space-y-4">
          <span className="font-mono text-[10px] text-[var(--color-blade-crimson)] uppercase tracking-widest block font-medium">
            MODEL INTERPRETABILITY ANALYTICAL PIPELINE
          </span>

          <div className="grid grid-cols-2 tablet:grid-cols-5 gap-2.5 font-mono text-[11px] text-center">
            <div className="border border-[var(--color-cut-line)] p-3 bg-[#161C26] space-y-1">
              <span className="text-[var(--color-blade-crimson)] text-[10px] block font-medium">01 INPUT</span>
              <span className="text-[var(--color-steel-white)] block font-medium">Feature Vectors</span>
            </div>

            <div className="border border-[var(--color-cut-line)] p-3 bg-[#161C26] space-y-1">
              <span className="text-[var(--color-blade-crimson)] text-[10px] block font-medium">02 INFERENCE</span>
              <span className="text-[var(--color-steel-white)] block font-medium">Black-Box ML</span>
            </div>

            <div className="border border-[var(--color-cut-line)] p-3 bg-[#161C26] space-y-1">
              <span className="text-[var(--color-blade-crimson)] text-[10px] block font-medium">03 OUTPUT</span>
              <span className="text-[var(--color-steel-white)] block font-medium">Prediction</span>
            </div>

            <div className="border border-[var(--color-cut-line)] p-3 bg-[#161C26] space-y-1">
              <span className="text-[var(--color-wano-jade)] text-[10px] block font-medium">04 AUDIT</span>
              <span className="text-[var(--color-steel-white)] block font-medium">Attribution</span>
            </div>

            <div className="border border-[var(--color-wano-jade)] p-3 bg-[#12241A] space-y-1">
              <span className="text-[var(--color-wano-jade)] text-[10px] block font-medium">05 EXPLANATION</span>
              <span className="text-[var(--color-steel-white)] block font-medium">Transparency</span>
            </div>
          </div>
        </div>

        {/* Problem & Approach Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 font-body text-xs">
          <div className="steel-panel p-5 space-y-2">
            <span className="font-mono text-[10px] text-[var(--color-blade-crimson)] uppercase block font-medium">
              01 / RESEARCH PROBLEM
            </span>
            <p className="text-[var(--color-mist-gray)] leading-relaxed">
              {xai.problem}
            </p>
          </div>

          <div className="steel-panel p-5 space-y-2">
            <span className="font-mono text-[10px] text-[var(--color-wano-jade)] uppercase block font-medium">
              02 / RESEARCH METHODOLOGY
            </span>
            <p className="text-[var(--color-mist-gray)] leading-relaxed">
              {xai.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-cut-line)] pt-4 flex justify-between font-mono text-[10px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <span>EXPLAINABLE AI RESEARCH EXHIBIT</span>
        <span className="text-[var(--color-blade-crimson)] font-medium">SCROLL TO ADVANCE TO EXPERIENCE →</span>
      </div>
    </div>
  );
}