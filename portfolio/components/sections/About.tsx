"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import { educationList } from "@/lib/data/experience";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";

export default function About() {
  const btech = educationList[0];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About Ayush Trivedi"
      className="py-24 px-[var(--gutter)] border-b border-[var(--color-border)]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="flex items-baseline gap-6 mb-16 border-b border-[var(--color-border)] pb-6">
            <span
              className="font-display text-[var(--color-accent)] italic text-4xl tablet:text-5xl font-light"
              aria-hidden="true"
            >
              01
            </span>
            <div>
              <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
                Background & Engineering Focus
              </span>
              <h2
                className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
                style={{ fontSize: "var(--text-heading-lg)" }}
              >
                Engineering Narrative.
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Editorial Grid */}
        <div className="grid laptop:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative with Scroll Reveals */}
          <div className="laptop:col-span-7 space-y-8">
            <ScrollReveal direction="up" distance={20} delay={0.1}>
              <p
                className="font-body text-[var(--color-text-primary)] leading-relaxed"
                style={{ fontSize: "var(--text-body-lg)" }}
              >
                I am a Computer Science and Engineering student at{" "}
                <strong className="text-[var(--color-accent)] font-medium">
                  Noida Institute of Engineering and Technology (NIET, Gr. Noida)
                </strong>
                , maintaining an <strong className="text-[var(--color-text-primary)] font-medium">8.4 CGPA</strong>.
                My work spans full-stack web systems in Java & Spring Boot, machine learning research in Explainable AI (XAI), and foundational algorithms.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} delay={0.2}>
              <div className="space-y-3 pt-2">
                <h3 className="font-display text-xl text-[var(--color-text-primary)] font-normal">
                  Algorithmic Problem Solving & Continuous Learning
                </h3>
                <p className="font-body text-[var(--color-text-secondary)] leading-relaxed text-sm tablet:text-base">
                  Engineering software begins with foundational data structures and deterministic algorithmic reasoning.
                  I actively solve Data Structures and Algorithms (DSA) challenges on LeetCode, participate in competitive programming, and attend technical workshops to deepen my computational velocity and debugging rigor.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} delay={0.3}>
              <div className="space-y-3 pt-2">
                <h3 className="font-display text-xl text-[var(--color-text-primary)] font-normal">
                  Discipline On & Off the Pitch
                </h3>
                <p className="font-body text-[var(--color-text-secondary)] leading-relaxed text-sm tablet:text-base">
                  Beyond code, I am an active football player. Competitive athletics demands clear on-field communication, collective tactical discipline, and adaptability under pressure—principles that translate directly to collaborative software development and high-ownership engineering.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Architectural Fact Cards with Staggered Entrance */}
          <div className="laptop:col-span-5 space-y-4 font-mono text-xs">
            <StaggerContainer staggerDelay={0.1} delayChildren={0.2}>
              <StaggerItem>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="border border-[var(--color-border)] p-6 bg-[#141414]/50 space-y-4 transition-colors duration-200 hover:border-[var(--color-accent)]"
                >
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                    <span className="text-[var(--color-text-tertiary)] uppercase tracking-wider">
                      Academic Degree
                    </span>
                    <span className="text-[var(--color-accent)] font-medium">
                      {btech.grade}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-primary)] block font-medium">
                      {btech.degree}
                    </span>
                    <span className="text-[var(--color-text-secondary)] text-[11px] block mt-1">
                      {btech.institution} · {btech.period}
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="border border-[var(--color-border)] p-6 bg-[#141414]/50 space-y-3 transition-colors duration-200 hover:border-[var(--color-accent)] mt-4"
                >
                  <span className="text-[var(--color-text-tertiary)] uppercase tracking-wider block border-b border-[var(--color-border)] pb-2">
                    Core Competencies
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Java (Core & OOP)", "Python", "JavaScript", "React.js", "Spring Boot", "Oracle DBMS", "Git / GitHub", "DSA / LeetCode"].map((skill) => (
                      <span
                        key={skill}
                        className="border border-[var(--color-border)] bg-[#1C1C1C] text-[var(--color-text-secondary)] px-2.5 py-1 text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="border border-[var(--color-border)] p-6 bg-[#141414]/50 space-y-3 transition-colors duration-200 hover:border-[var(--color-accent)] mt-4"
                >
                  <span className="text-[var(--color-text-tertiary)] uppercase tracking-wider block border-b border-[var(--color-border)] pb-2">
                    Location & Availability
                  </span>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[var(--color-text-tertiary)]">Location:</span>
                      <span className="text-[var(--color-text-primary)]">{profile.location}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[var(--color-text-tertiary)]">Objective:</span>
                      <span className="text-[var(--color-accent)]">Open for Software Internships</span>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}