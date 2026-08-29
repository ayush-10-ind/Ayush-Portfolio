"use client";

import React, { useState } from "react";
import { projects } from "@/lib/data/projects";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string>("agnipress");

  const currentProject =
    projects.find((p) => p.id === activeProjectId) || projects[0];

  return (
    <section
      id="case-studies"
      aria-label="Engineering Case Studies"
      className="py-28 px-[var(--gutter)] border-b border-[var(--color-border)] bg-[#0C0C0C] relative"
    >
      <div className="max-w-[var(--max-width)] mx-auto space-y-12">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-col tablet:flex-row tablet:items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-6">
            <div className="flex items-baseline gap-6">
              <span
                className="font-display text-[var(--color-accent)] italic text-4xl tablet:text-5xl font-light"
                aria-hidden="true"
              >
                03
              </span>
              <div>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
                  Tactical Engineering Playbook
                </span>
                <h2
                  className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
                  style={{ fontSize: "var(--text-heading-lg)" }}
                >
                  Featured Case Studies.
                </h2>
              </div>
            </div>

            <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest">
              2 VERIFIED FLAGSHIP EXHIBITS
            </span>
          </div>
        </ScrollReveal>

        {/* Project Selector Tabs */}
        <ScrollReveal direction="up" distance={16} delay={0.1}>
          <div className="flex flex-wrap gap-3 border-b border-[var(--color-border)] pb-4">
            {projects.map((proj, idx) => {
              const isActive = proj.id === activeProjectId;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectId(proj.id)}
                  aria-pressed={isActive}
                  className={`font-mono text-xs px-5 py-3 transition-all uppercase tracking-wider border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] ${
                    isActive
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#0A0A0A] font-medium shadow-md"
                      : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[#121212] hover:border-[var(--color-text-tertiary)]"
                  }`}
                >
                  0{idx + 1} · {proj.name}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Engineering Dossier Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Dossier Header Card */}
            <div className="border border-[var(--color-border)] p-8 tablet:p-10 bg-[#121212] drafting-corner space-y-6">
              <div className="flex flex-col laptop:flex-row laptop:items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-6">
                <div>
                  <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block mb-1">
                    {currentProject.type} · {currentProject.period}
                  </span>
                  <h3 className="font-display text-3xl tablet:text-4xl text-[var(--color-text-primary)] font-normal">
                    {currentProject.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {currentProject.links?.github && (
                    <a
                      href={currentProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-wider px-4 py-2 border border-[var(--color-border)] bg-[#181818] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-primary)] transition-colors"
                    >
                      GitHub Repo ↗
                    </a>
                  )}
                  {currentProject.links?.live && (
                    <a
                      href={currentProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-wider px-4 py-2 border border-[var(--color-border)] bg-[#181818] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-primary)] transition-colors"
                    >
                      Technical Demo ↗
                    </a>
                  )}
                </div>
              </div>

              <p className="font-body text-sm tablet:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-4xl">
                {currentProject.tagline}
              </p>

              {/* Verified Tactical Architecture Flowchart */}
              <div className="border border-[var(--color-border)]/80 p-5 bg-[#0E0E0E] space-y-3">
                <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest block">
                  TACTICAL SYSTEM FLOW DIAGRAM
                </span>
                
                {currentProject.id === "agnipress" ? (
                  <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-6 gap-2 font-mono text-[11px] text-center">
                    <div className="p-2 border border-[var(--color-border)] bg-[#141414] text-[var(--color-text-primary)]">
                      1. News APIs
                    </div>
                    <div className="p-2 border border-[var(--color-border)] bg-[#141414] text-[var(--color-text-primary)]">
                      2. WebClient
                    </div>
                    <div className="p-2 border border-[var(--color-border)] bg-[#141414] text-[var(--color-text-primary)]">
                      3. Schedulers
                    </div>
                    <div className="p-2 border border-[var(--color-border)] bg-[#141414] text-[var(--color-text-primary)]">
                      4. Service DTO
                    </div>
                    <div className="p-2 border border-[var(--color-border)] bg-[#141414] text-[var(--color-text-primary)]">
                      5. Spring JPA
                    </div>
                    <div className="p-2 border border-[var(--color-accent)]/60 bg-[#161616] text-[var(--color-accent)] font-medium">
                      6. Relational DB
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 tablet:grid-cols-5 gap-2 font-mono text-[11px] text-center">
                    <div className="p-2 border border-[var(--color-border)] bg-[#141414] text-[var(--color-text-primary)]">
                      1. Input Features
                    </div>
                    <div className="p-2 border border-[var(--color-border)] bg-[#141414] text-[var(--color-text-primary)]">
                      2. Black-Box ML
                    </div>
                    <div className="p-2 border border-[var(--color-border)] bg-[#141414] text-[var(--color-text-primary)]">
                      3. Prediction
                    </div>
                    <div className="p-2 border border-[var(--color-border)] bg-[#141414] text-[var(--color-text-primary)]">
                      4. Attribution
                    </div>
                    <div className="p-2 border border-[var(--color-accent)]/60 bg-[#161616] text-[var(--color-accent)] font-medium">
                      5. Explanation
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies Tag Array */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 border border-[var(--color-border)] bg-[#161616] text-[var(--color-text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deep Technical Architectural Breakdowns */}
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6">
              {/* Problem Breakdown */}
              <div className="border border-[var(--color-border)] p-6 tablet:p-8 bg-[#121212] drafting-corner space-y-3">
                <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider block">
                  01 / PROBLEM SPECIFICATION
                </span>
                <h4 className="font-display text-xl text-[var(--color-text-primary)] font-medium">
                  The Core Challenge
                </h4>
                <p className="font-body text-xs tablet:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {currentProject.problem}
                </p>
              </div>

              {/* Architecture & Engineering Solution */}
              <div className="border border-[var(--color-border)] p-6 tablet:p-8 bg-[#121212] drafting-corner space-y-3">
                <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider block">
                  02 / ARCHITECTURAL APPROACH
                </span>
                <h4 className="font-display text-xl text-[var(--color-text-primary)] font-medium">
                  System Design &amp; Pipeline
                </h4>
                <p className="font-body text-xs tablet:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {currentProject.solution}
                </p>
              </div>
            </div>

            {/* Key Technical Decisions */}
            {currentProject.decisions && currentProject.decisions.length > 0 && (
              <div className="border border-[var(--color-border)] p-6 tablet:p-8 bg-[#121212] drafting-corner space-y-4">
                <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider block">
                  03 / VERIFIED ENGINEERING DECISIONS
                </span>
                <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4 font-body text-xs tablet:text-sm">
                  {currentProject.decisions.map((dec, idx) => (
                    <div
                      key={idx}
                      className="border border-[var(--color-border)] p-4 bg-[#161616]/70 space-y-1.5"
                    >
                      <span className="font-mono text-[11px] text-[var(--color-accent)] font-medium">
                        DECISION 0{idx + 1}
                      </span>
                      <h5 className="font-display text-sm text-[var(--color-text-primary)] font-medium">
                        {dec.question}
                      </h5>
                      <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                        {dec.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}