"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import MaskedTextReveal from "@/components/animations/MaskedTextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      aria-label="Introduction and Identity"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-[var(--gutter)] border-b border-[var(--color-border)]"
    >
      {/* Top Architectural Drafting Metadata Grid */}
      <ScrollReveal direction="down" distance={16} duration={0.6}>
        <div className="max-w-[var(--max-width)] mx-auto w-full grid grid-cols-2 laptop:grid-cols-4 gap-4 font-mono text-[11px] text-[var(--color-text-tertiary)] border-b border-[var(--color-border)] pb-6 tracking-wider">
          <div className="transition-colors duration-200 hover:text-[var(--color-text-primary)]">
            <span className="block text-[var(--color-text-secondary)] uppercase">Profile / Identity</span>
            <span>Ayush Trivedi</span>
          </div>
          <div className="transition-colors duration-200 hover:text-[var(--color-text-primary)]">
            <span className="block text-[var(--color-text-secondary)] uppercase">Academic Standing</span>
            <span>NIET Gr. Noida · 8.4 CGPA</span>
          </div>
          <div className="transition-colors duration-200 hover:text-[var(--color-text-primary)]">
            <span className="block text-[var(--color-text-secondary)] uppercase">Primary Focus</span>
            <span>Java · Python · XAI · Full-Stack</span>
          </div>
          <div className="text-right tablet:text-left transition-colors duration-200 hover:text-[var(--color-text-primary)]">
            <span className="block text-[var(--color-text-secondary)] uppercase">Location</span>
            <span>Gr. Noida, India</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Editorial Display Name & Headline */}
      <div className="max-w-[var(--max-width)] mx-auto w-full my-auto py-12">
        <ScrollReveal delay={0.1} direction="up" distance={16}>
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span>Software Engineer & Computer Science Student</span>
          </div>
        </ScrollReveal>

        <h1
          className="font-display text-[var(--color-text-primary)] font-normal leading-[0.92] tracking-tight mb-8"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          <MaskedTextReveal text="Ayush" delay={0.15} as="span" className="block" />
          <MaskedTextReveal
            text="Trivedi."
            delay={0.25}
            as="span"
            className="block text-[var(--color-text-secondary)] italic tablet:pl-[8vw]"
          />
        </h1>

        <div className="grid tablet:grid-cols-12 gap-6 items-end">
          <ScrollReveal delay={0.35} direction="up" distance={20} className="tablet:col-span-8">
            <p
              className="font-body text-[var(--color-text-secondary)] leading-relaxed max-w-2xl"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {profile.bio}
            </p>
          </ScrollReveal>

          {/* Action CTAs with smooth tactile hover */}
          <ScrollReveal delay={0.45} direction="up" distance={20} className="tablet:col-span-4 flex flex-wrap tablet:flex-col items-start gap-3 pt-4 tablet:pt-0">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => scrollTo("projects")}
              className="font-mono text-xs text-[var(--color-bg)] bg-[var(--color-accent)] hover:bg-[var(--color-text-primary)] px-5 py-3 tracking-widest uppercase font-medium transition-colors duration-200"
            >
              Explore Case Studies ↓
            </motion.button>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => scrollTo("contact")}
              className="font-mono text-xs text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] px-5 py-3 tracking-widest uppercase transition-colors duration-200"
            >
              Direct Contact →
            </motion.button>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Drafting Annotation Strip */}
      <ScrollReveal direction="up" distance={12} delay={0.5}>
        <div className="max-w-[var(--max-width)] mx-auto w-full flex flex-col tablet:flex-row justify-between items-start tablet:items-center gap-4 pt-6 border-t border-[var(--color-border)] font-mono text-[11px] text-[var(--color-text-tertiary)]">
          <div className="flex items-center gap-4">
            <span>COORDINATES: 28.4744° N, 77.5040° E</span>
            <span className="hidden tablet:inline">·</span>
            <span className="hidden tablet:inline">SPEC: V2.3 (AGNIPRESS + XAI)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>SCROLL TO EXPLORE WORK</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}