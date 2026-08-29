"use client";
// components/sections/Navigation.tsx
// Fixed navigation: scroll progress bar, dot section indicators (desktop),
// full-screen overlay menu (mobile).

import { useState, useEffect } from "react";

const sections = [
  { id: "hero",       label: "Home",       number: "00" },
  { id: "about",      label: "About",      number: "01" },
  { id: "projects",   label: "Work",       number: "02" },
  { id: "experience", label: "Experience", number: "03" },
  { id: "skills",     label: "Craft",      number: "04" },
  { id: "contact",    label: "Contact",    number: "05" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress line */}
      <div
        aria-hidden="true"
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-px bg-[var(--color-accent)] z-50 transition-all duration-75"
      />

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-[var(--gutter)] py-5">
        <button
          onClick={() => scrollToSection("hero")}
          aria-label="Return to top"
          className="font-mono text-[var(--color-text-primary)] text-sm tracking-widest uppercase hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-fast)]"
        >
          AT
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="tablet:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block w-6 h-px bg-[var(--color-text-primary)] transition-all duration-[var(--dur-normal)] ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[var(--color-text-primary)] transition-all duration-[var(--dur-normal)] ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[var(--color-text-primary)] transition-all duration-[var(--dur-normal)] ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </header>

      {/* Desktop: vertical dot progress (right edge) */}
      <nav
        aria-label="Section navigation"
        className="hidden tablet:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4"
      >
        {sections.map(({ id, label, number }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            aria-label={`Go to ${label}`}
            aria-current={activeSection === id ? "true" : undefined}
            className="group flex items-center gap-3 justify-end"
          >
            <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--dur-fast)] tracking-wider">
              {number}
            </span>
            <span
              className={`block rounded-full transition-all duration-[var(--dur-normal)] ${
                activeSection === id
                  ? "w-2 h-2 bg-[var(--color-accent)]"
                  : "w-1.5 h-1.5 bg-[var(--color-border)] group-hover:bg-[var(--color-text-tertiary)]"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Mobile: full-screen overlay */}
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`fixed inset-0 z-30 bg-[var(--color-bg)] flex flex-col items-center justify-center gap-8 transition-all duration-[var(--dur-medium)] tablet:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {sections.map(({ id, label, number }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group flex items-center gap-4"
          >
            <span className="font-mono text-[var(--color-text-tertiary)] text-sm">
              {number}
            </span>
            <span
              className={`font-display text-3xl transition-colors duration-[var(--dur-fast)] ${
                activeSection === id
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
