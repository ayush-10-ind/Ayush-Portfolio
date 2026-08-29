"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.1, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Introduction & Studio Overview"
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-[var(--gutter)] border-b border-[var(--color-border)] architectural-grid overflow-hidden"
    >
      {/* Ambient Radial Studio Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] tablet:w-[900px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(212,168,83,0.05)_0%,transparent_70%)] pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[var(--max-width)] mx-auto w-full flex-1 flex flex-col justify-between space-y-16"
      >
        {/* Top Exhibition Metadata Strip */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-4 font-mono text-[11px] text-[var(--color-text-tertiary)] border-b border-[var(--color-border)] pb-4 tracking-widest uppercase"
        >
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-accent)] font-medium">INDEX 00 / OPENING</span>
            <span className="text-[var(--color-border)]">|</span>
            <span>DIGITAL ARCHITECTURAL STUDIO</span>
          </div>

          <div className="flex items-center gap-4">
            <span>COORD: 28.4744° N · 77.5040° E</span>
            <span className="hidden tablet:inline text-[var(--color-border)]">|</span>
            <span className="text-[var(--color-text-secondary)] hidden tablet:inline">
              GREATER NOIDA, INDIA
            </span>
          </div>
        </motion.div>

        {/* Hero Title & Identity Presentation */}
        <div className="grid grid-cols-1 laptop:grid-cols-12 gap-8 items-end">
          {/* Main Display Headline with Masked Reveal */}
          <div className="laptop:col-span-8 space-y-4">
            <div className="overflow-hidden">
              <motion.h1
                variants={itemVariants}
                className="font-display text-[var(--text-display-xl)] text-[var(--color-text-primary)] font-normal tracking-tight leading-[0.95]"
              >
                Ayush
                <br />
                <span className="text-[var(--color-text-primary)]">Trivedi</span>
                <span className="text-[var(--color-accent)]">.</span>
              </motion.h1>
            </div>

            <motion.div variants={itemVariants} className="pt-2">
              <span className="font-mono text-xs tablet:text-sm text-[var(--color-accent)] uppercase tracking-[0.25em] block">
                Software Engineer · CS Undergraduate (NIET &apos;28)
              </span>
            </motion.div>
          </div>

          {/* Asymmetric Technical Abstract */}
          <motion.div
            variants={itemVariants}
            className="laptop:col-span-4 space-y-6 laptop:border-l laptop:border-[var(--color-border)] laptop:pl-8"
          >
            <p className="font-body text-sm tablet:text-base text-[var(--color-text-secondary)] leading-relaxed">
              Engineering deterministic full-stack web platforms, backend systems in Java &amp; Spring Boot, and analytical research in Explainable AI (XAI) interpretability.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#resume-studio"
                className="font-mono text-xs uppercase tracking-wider px-5 py-3 border border-[var(--color-accent)] bg-[var(--color-accent)] text-[#0A0A0A] font-medium hover:bg-transparent hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                3D Resume Studio ↓
              </a>

              <a
                href="#case-studies"
                className="font-mono text-xs uppercase tracking-wider px-5 py-3 border border-[var(--color-border)] bg-[#121212] text-[var(--color-text-primary)] hover:border-[var(--color-text-tertiary)] transition-colors duration-200"
              >
                Case Studies ↓
              </a>
            </div>
          </motion.div>
        </div>

        {/* Architectural Metadata Grid with Corner Ticks */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 tablet:grid-cols-4 gap-4 tablet:gap-6 border-t border-[var(--color-border)] pt-8 font-mono text-xs"
        >
          <div className="border border-[var(--color-border)] p-4 bg-[#121212]/80 drafting-corner space-y-1">
            <span className="text-[var(--color-text-tertiary)] text-[10px] uppercase tracking-wider block">
              ACADEMIC STANDING
            </span>
            <div className="text-[var(--color-text-primary)] text-sm font-medium">
              8.4 CGPA
            </div>
            <span className="text-[var(--color-text-tertiary)] text-[10px] block">
              NIET Greater Noida · CSE
            </span>
          </div>

          <div className="border border-[var(--color-border)] p-4 bg-[#121212]/80 drafting-corner space-y-1">
            <span className="text-[var(--color-text-tertiary)] text-[10px] uppercase tracking-wider block">
              CORE DISCIPLINES
            </span>
            <div className="text-[var(--color-text-primary)] text-sm font-medium">
              Java &amp; Python
            </div>
            <span className="text-[var(--color-text-tertiary)] text-[10px] block">
              Spring Boot 3 · JPA · XAI
            </span>
          </div>

          <div className="border border-[var(--color-border)] p-4 bg-[#121212]/80 drafting-corner space-y-1">
            <span className="text-[var(--color-text-tertiary)] text-[10px] uppercase tracking-wider block">
              FLAGSHIP WORK
            </span>
            <div className="text-[var(--color-text-primary)] text-sm font-medium">
              AgniPress &amp; XAI
            </div>
            <span className="text-[var(--color-text-tertiary)] text-[10px] block">
              2 Verified Case Studies
            </span>
          </div>

          <div className="border border-[var(--color-border)] p-4 bg-[#121212]/80 drafting-corner space-y-1">
            <span className="text-[var(--color-text-tertiary)] text-[10px] uppercase tracking-wider block">
              AVAILABILITY
            </span>
            <div className="text-[var(--color-accent)] text-sm font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span>Seeking Roles</span>
            </div>
            <span className="text-[var(--color-text-tertiary)] text-[10px] block">
              SWE &amp; Backend Internships
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Bottom Guide Rule */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-[1px] bg-[var(--color-border)] absolute bottom-0 left-0 origin-left"
      />
    </section>
  );
}