"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getAllExperiences, educationList, certifications } from "@/lib/data/experience";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Experience() {
  const experiences = getAllExperiences();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      aria-label="Professional Experience & Education"
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
              04
            </span>
            <div>
              <span className="font-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] block mb-1">
                Work History & Credentials
              </span>
              <h2
                className="font-display text-[var(--color-text-primary)] font-normal tracking-tight"
                style={{ fontSize: "var(--text-heading-lg)" }}
              >
                Experience & Education.
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid laptop:grid-cols-12 gap-12">
          {/* Left Column: Work Experience Timeline */}
          <ScrollReveal direction="up" distance={20} delay={0.1} className="laptop:col-span-7 space-y-12">
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider block border-b border-[var(--color-border)] pb-2">
              Work History & Internships
            </span>

            <div className="relative pl-6 border-l border-[var(--color-border)] space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] ring-4 ring-[#0C0C0C] group-hover:scale-125 transition-transform duration-200"
                    aria-hidden="true"
                  />

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3
                        className="font-display text-[var(--color-text-primary)] font-normal"
                        style={{ fontSize: "var(--text-heading-md)" }}
                      >
                        {exp.company}
                      </h3>
                      <span className="font-mono text-xs text-[var(--color-accent)]">
                        {exp.period.start} – {exp.period.end}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-tertiary)]">
                      <span className="text-[var(--color-text-secondary)]">{exp.role}</span>
                      <span>·</span>
                      <span>{exp.location}</span>
                    </div>

                    <ul className="space-y-2 pt-2">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li
                          key={rIdx}
                          className="font-body text-xs tablet:text-sm text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-[var(--color-text-tertiary)] shrink-0 mt-1">—</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-3">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] text-[var(--color-text-tertiary)] border border-[var(--color-border)] px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Column: Education & Certifications */}
          <div className="laptop:col-span-5 space-y-10">
            {/* Education */}
            <ScrollReveal direction="up" distance={20} delay={0.2} className="space-y-4">
              <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider block border-b border-[var(--color-border)] pb-2">
                Formal Education
              </span>

              <div className="space-y-4">
                {educationList.map((edu) => (
                  <motion.div
                    key={edu.id}
                    whileHover={shouldReduceMotion ? {} : { y: -2 }}
                    className="border border-[var(--color-border)] p-5 bg-[#141414]/40 space-y-1.5 transition-colors duration-200 hover:border-[var(--color-accent)]"
                  >
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-display text-sm text-[var(--color-text-primary)] font-medium">
                        {edu.degree}
                      </h4>
                      <span className="font-mono text-xs text-[var(--color-accent)] font-medium">
                        {edu.grade}
                      </span>
                    </div>
                    <p className="font-body text-xs text-[var(--color-text-secondary)]">
                      {edu.institution}
                    </p>
                    <div className="flex justify-between font-mono text-[11px] text-[var(--color-text-tertiary)] pt-1">
                      <span>{edu.location}</span>
                      <span>{edu.period}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Certifications */}
            <ScrollReveal direction="up" distance={20} delay={0.3} className="space-y-4">
              <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider block border-b border-[var(--color-border)] pb-2">
                Verified Certifications
              </span>

              <div className="space-y-2.5">
                {certifications.map((cert, cIdx) => (
                  <motion.div
                    key={cIdx}
                    whileHover={shouldReduceMotion ? {} : { x: 3 }}
                    className="flex items-center justify-between p-3.5 border border-[var(--color-border)] bg-[#141414]/30 font-mono text-xs transition-colors duration-200 hover:border-[var(--color-accent)]"
                  >
                    <div>
                      <span className="text-[var(--color-text-primary)] block">
                        {cert.title}
                      </span>
                      <span className="text-[var(--color-text-tertiary)] text-[10px]">
                        {cert.issuer}
                      </span>
                    </div>
                    <span className="text-[var(--color-accent)] text-[10px] uppercase tracking-wider border border-[var(--color-border)] px-2 py-0.5">
                      Verified
                    </span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}