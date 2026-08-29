"use client";

import { useState, useEffect, useCallback } from "react";

interface NavSection {
  id: string;
  label: string;
  number: string;
}

const sections: NavSection[] = [
  { id: "hero", label: "Identity", number: "00" },
  { id: "about", label: "About", number: "01" },
  { id: "resume-studio", label: "3D Resume", number: "02" },
  { id: "projects", label: "Case Studies", number: "03" },
  { id: "experience", label: "Experience", number: "04" },
  { id: "skills", label: "Craft", number: "05" },
  { id: "contact", label: "Contact", number: "06" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation & ESC handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    },
    [menuOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scroll Progress Line */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-[2px] bg-[var(--color-accent)] z-50 transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-[var(--gutter)] py-4 backdrop-blur-md bg-[#0C0C0C]/80 border-b border-[#2A2A2A]/40 transition-all duration-300">
        <div className="max-w-[var(--max-width)] mx-auto flex items-center justify-between">
          {/* Logo & Identity */}
          <button
            onClick={() => scrollToSection("hero")}
            aria-label="Ayush Trivedi — Return to top"
            className="group flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-sm"
          >
            <span className="font-mono text-xs tracking-widest text-[var(--color-accent)] border border-[var(--color-accent)] px-2 py-0.5 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg)] transition-colors duration-200">
              AT
            </span>
            <div className="flex flex-col">
              <span className="font-display text-sm text-[var(--color-text-primary)] font-medium tracking-wide">
                Ayush Trivedi
              </span>
              <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider hidden tablet:block">
                Software Engineer · NIET CSE
              </span>
            </div>
          </button>

          {/* Center / Status */}
          <div className="hidden laptop:flex items-center gap-2 font-mono text-[11px] text-[var(--color-text-secondary)] border border-[var(--color-border)] px-3 py-1 bg-[#141414]/60">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            <span>Open for Software Engineering Internships</span>
          </div>

          {/* Desktop Right Quick Actions */}
          <div className="hidden tablet:flex items-center gap-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="font-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] uppercase tracking-wider transition-colors"
            >
              Case Studies
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-mono text-xs text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] px-3 py-1 uppercase tracking-wider transition-all"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="tablet:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            <span
              className={`block w-6 h-[1.5px] bg-[var(--color-text-primary)] transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[var(--color-text-primary)] transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[var(--color-text-primary)] transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Desktop Vertical Dot Navigation (Right Edge) */}
      <nav
        aria-label="Page section indicators"
        className="hidden laptop:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-5 items-end"
      >
        {sections.map(({ id, label, number }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              aria-label={`Jump to section ${number}: ${label}`}
              aria-current={isActive ? "true" : undefined}
              className="group flex items-center gap-3 justify-end focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
            >
              <span className="font-mono text-[10px] tracking-widest text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 uppercase">
                {number} · {label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[var(--color-accent)] ring-4 ring-[var(--color-accent-subtle)]"
                    : "w-1.5 h-1.5 bg-[var(--color-border)] group-hover:bg-[var(--color-text-secondary)]"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Mobile Fullscreen Navigation Overlay */}
      <div
        role="dialog"
        aria-label="Mobile Navigation Menu"
        aria-modal="true"
        className={`fixed inset-0 z-30 bg-[#0C0C0C]/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-24 tablet:hidden transition-all duration-300 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-widest border-b border-[var(--color-border)] pb-2">
            Navigation Index
          </p>
          <div className="flex flex-col gap-4">
            {sections.map(({ id, label, number }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="group flex items-baseline gap-4 text-left"
              >
                <span className="font-mono text-xs text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)]">
                  {number}
                </span>
                <span
                  className={`font-display text-2xl tracking-wide transition-colors duration-150 ${
                    activeSection === id
                      ? "text-[var(--color-accent)] italic"
                      : "text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]"
                  }`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Footer */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col gap-2">
          <span className="font-mono text-[11px] text-[var(--color-text-tertiary)]">
            AYUSH TRIVEDI · NIET GR. NOIDA
          </span>
          <a
            href="mailto:ayushtrivediayushtrivedi2@gmail.com"
            className="font-mono text-xs text-[var(--color-accent)]"
          >
            ayushtrivediayushtrivedi2@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}