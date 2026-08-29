"use client";

import React from "react";
import { projects } from "@/lib/data/projects";

interface SceneProps {
  progress: number;
}

export default function AgniPressScene({ progress }: SceneProps) {
  // Strict lifecycle: 42% -> 62%
  if (progress < 0.40 || progress > 0.62) return null;

  const agni = projects.find((p) => p.id === "agnipress") || projects[0];

  let opacity = 1;
  if (progress < 0.45) {
    opacity = (progress - 0.40) / 0.05;
  } else if (progress > 0.57) {
    opacity = Math.max(0, 1 - (progress - 0.57) / 0.05);
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-12 laptop:p-16 transition-opacity duration-100 pointer-events-auto overflow-y-auto"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-3 border-b border-[var(--color-cut-line)] pb-4 font-mono text-[11px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-blade-crimson)] font-medium">INDEX 03 // THE ENGINE</span>
          <span className="text-[var(--color-cut-line)]">|</span>
          <span>FULL-STACK WEB SYSTEMS</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-wano-jade)] font-medium">JAVA 21 · SPRING BOOT 3 · JPA</span>
          {agni.links?.github && (
            <a
              href={agni.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--color-cut-strong)] bg-[var(--color-slate-steel)] hover:border-[var(--color-blade-crimson)] hover:text-[var(--color-blade-crimson)] text-[var(--color-steel-white)] px-3 py-1 text-[10px] uppercase font-medium transition-colors"
            >
              GitHub Repo ↗
            </a>
          )}
        </div>
      </div>

      {/* Main Dossier Content */}
      <div className="my-auto max-w-5xl mx-auto w-full space-y-6">
        <div className="space-y-2 border-b border-[var(--color-cut-line)] pb-4">
          <span className="font-mono text-xs text-[var(--color-blade-crimson)] uppercase tracking-widest block font-medium">
            {agni.type} · {agni.period}
          </span>
          <h2 className="font-display text-3xl tablet:text-5xl text-[var(--color-steel-white)] font-normal">
            {agni.name}
          </h2>
          <p className="font-body text-xs tablet:text-sm text-[var(--color-mist-gray)] leading-relaxed max-w-4xl">
            {agni.tagline}
          </p>
        </div>

        {/* Conceptual Architecture Machine Diagram */}
        <div className="steel-panel p-6 space-y-4">
          <span className="font-mono text-[10px] text-[var(--color-blade-crimson)] uppercase tracking-widest block font-medium">
            CONCEPTUAL BACKEND ARCHITECTURE PIPELINE
          </span>

          <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-6 gap-2.5 font-mono text-[11px] text-center">
            <div className="border border-[var(--color-cut-line)] p-3 bg-[#161C26] space-y-1">
              <span className="text-[var(--color-blade-crimson)] text-[10px] block font-medium">01 INGEST</span>
              <span className="text-[var(--color-steel-white)] block font-medium">News APIs</span>
            </div>

            <div className="border border-[var(--color-cut-line)] p-3 bg-[#161C26] space-y-1">
              <span className="text-[var(--color-blade-crimson)] text-[10px] block font-medium">02 CLIENT</span>
              <span className="text-[var(--color-steel-white)] block font-medium">WebClient</span>
            </div>

            <div className="border border-[var(--color-cut-line)] p-3 bg-[#161C26] space-y-1">
              <span className="text-[var(--color-blade-crimson)] text-[10px] block font-medium">03 CRON</span>
              <span className="text-[var(--color-steel-white)] block font-medium">Scheduler</span>
            </div>

            <div className="border border-[var(--color-cut-line)] p-3 bg-[#161C26] space-y-1">
              <span className="text-[var(--color-blade-crimson)] text-[10px] block font-medium">04 MAPPER</span>
              <span className="text-[var(--color-steel-white)] block font-medium">Service DTO</span>
            </div>

            <div className="border border-[var(--color-cut-line)] p-3 bg-[#161C26] space-y-1">
              <span className="text-[var(--color-wano-jade)] text-[10px] block font-medium">05 ORM</span>
              <span className="text-[var(--color-steel-white)] block font-medium">Spring JPA</span>
            </div>

            <div className="border border-[var(--color-wano-jade)] p-3 bg-[#12241A] space-y-1">
              <span className="text-[var(--color-wano-jade)] text-[10px] block font-medium">06 STORAGE</span>
              <span className="text-[var(--color-steel-white)] block font-medium">Relational DB</span>
            </div>
          </div>
        </div>

        {/* Problem & Approach Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 font-body text-xs">
          <div className="steel-panel p-5 space-y-2">
            <span className="font-mono text-[10px] text-[var(--color-blade-crimson)] uppercase block font-medium">
              01 / PROBLEM SPECIFICATION
            </span>
            <p className="text-[var(--color-mist-gray)] leading-relaxed">
              {agni.problem}
            </p>
          </div>

          <div className="steel-panel p-5 space-y-2">
            <span className="font-mono text-[10px] text-[var(--color-wano-jade)] uppercase block font-medium">
              02 / ENGINEERING SOLUTION
            </span>
            <p className="text-[var(--color-mist-gray)] leading-relaxed">
              {agni.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation Cue */}
      <div className="border-t border-[var(--color-cut-line)] pt-4 flex justify-between font-mono text-[10px] text-[var(--color-mist-gray)] uppercase tracking-widest">
        <span>ENTERPRISE BACKEND ARCHITECTURE MACHINE</span>
        <span className="text-[var(--color-blade-crimson)] font-medium">SCROLL TO MORPH INTO EXPLAINABLE AI →</span>
      </div>
    </div>
  );
}