"use client";

import React from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function About() {
  return (
    <section
      id="about"
      aria-label="About & Philosophy"
      className="py-28 px-[var(--gutter)] border-b border-[var(--color-border)] bg-[#0C0C0C] relative"
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
                01
              </span>
              <div>
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
                  Background &amp; Discipline
                </span>
                <h2
                  className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
                  style={{ fontSize: "var(--text-heading-lg)" }}
                >
                  Architectural Mindset.
                </h2>
              </div>
            </div>

            <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest">
              SYSTEMS · DATA · ATHLETICS
            </span>
          </div>
        </ScrollReveal>

        {/* Asymmetric Narrative Grid */}
        <div className="grid grid-cols-1 laptop:grid-cols-12 gap-12 items-start">
          {/* Left Column: Big Philosophy Statement */}
          <div className="laptop:col-span-5 space-y-6">
            <ScrollReveal direction="up" distance={20} delay={0.1}>
              <h3 className="font-display text-2xl tablet:text-3xl text-[var(--color-text-primary)] font-normal leading-snug">
                Building resilient software by pairing rigorous backend architecture with transparent analytical reasoning.
              </h3>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} delay={0.15}>
              <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Currently pursuing a B.Tech in Computer Science and Engineering at Noida Institute of Engineering and Technology (NIET, Greater Noida) with a verified 8.4 CGPA.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Detailed Architectural Pillars */}
          <div className="laptop:col-span-7 space-y-8 laptop:border-l laptop:border-[var(--color-border)] laptop:pl-12">
            {/* Pillar 1: Backend Systems */}
            <ScrollReveal direction="up" distance={20} delay={0.2}>
              <div className="border border-[var(--color-border)] p-6 bg-[#141414] drafting-corner space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display text-lg text-[var(--color-text-primary)] font-medium">
                    Full-Stack &amp; Enterprise Backend
                  </h4>
                  <span className="font-mono text-xs text-[var(--color-accent)] uppercase">
                    Java 21 · Spring Boot 3
                  </span>
                </div>
                <p className="font-body text-xs tablet:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Focusing on statically typed backend design, relational database modeling (Oracle/MySQL), declarative transaction boundaries with Spring Data JPA, and secure OAuth2 authentication filter chains.
                </p>
              </div>
            </ScrollReveal>

            {/* Pillar 2: Machine Learning & XAI */}
            <ScrollReveal direction="up" distance={20} delay={0.25}>
              <div className="border border-[var(--color-border)] p-6 bg-[#141414] drafting-corner space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display text-lg text-[var(--color-text-primary)] font-medium">
                    Explainable AI Research
                  </h4>
                  <span className="font-mono text-xs text-[var(--color-accent)] uppercase">
                    Python · Interpretability
                  </span>
                </div>
                <p className="font-body text-xs tablet:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Investigating model interpretability mechanisms, post-hoc feature attribution algorithms, and decision auditing pipelines in Python to transform black-box machine learning predictions into human-verifiable explanations.
                </p>
              </div>
            </ScrollReveal>

            {/* Pillar 3: Athletics & Problem Solving */}
            <ScrollReveal direction="up" distance={20} delay={0.3}>
              <div className="border border-[var(--color-border)] p-6 bg-[#141414] drafting-corner space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-display text-lg text-[var(--color-text-primary)] font-medium">
                    Physical Discipline &amp; Algorithms
                  </h4>
                  <span className="font-mono text-xs text-[var(--color-accent)] uppercase">
                    Football · LeetCode DSA
                  </span>
                </div>
                <p className="font-body text-xs tablet:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Active competitive football player cultivating tactical discipline, collective decision-making under pressure, and daily algorithmic problem-solving on LeetCode.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}