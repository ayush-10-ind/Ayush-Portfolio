"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "hero", label: "Kickoff", number: "00" },
  { id: "about", label: "About", number: "01" },
  { id: "resume-studio", label: "Resume", number: "02" },
  { id: "case-studies", label: "Case Studies", number: "03" },
  { id: "experience", label: "Experience", number: "04" },
  { id: "skills", label: "Craft", number: "05" },
  { id: "contact", label: "Contact", number: "06" },
];

export default function Navigation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getActiveIndex = () => {
    if (scrollProgress < 14) return 0;
    if (scrollProgress < 28) return 1;
    if (scrollProgress < 44) return 2;
    if (scrollProgress < 60) return 3;
    if (scrollProgress < 74) return 4;
    if (scrollProgress < 88) return 5;
    return 6;
  };

  const activeIndex = getActiveIndex();

  const handleNavClick = (idx: number) => {
    setIsMobileMenuOpen(false);
    const targetFraction = idx / 6;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetFraction * docHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-40 bg-[#F4F0E6]/90 backdrop-blur-md border-b border-[var(--color-border)]"
      >
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)] h-16 flex items-center justify-between">
          {/* Brand Wordmark */}
          <button
            onClick={() => handleNavClick(0)}
            className="flex items-center gap-3 text-left group focus-visible:outline-none"
          >
            <span className="font-display text-lg text-[var(--color-text-primary)] font-normal tracking-tight">
              Ayush Trivedi
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-medium">
              CS &apos;28
            </span>
          </button>

          {/* Desktop Match Progression Navigation */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden laptop:flex items-center gap-6 font-mono text-xs"
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(idx)}
                  className={`flex items-center gap-1.5 py-1 transition-colors uppercase tracking-wider ${
                    isActive
                      ? "text-[var(--color-accent)] font-medium"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <span className="text-[10px] opacity-60">{item.number}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <a
              href="/Ayush_Trivedi_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden tablet:inline-block font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border border-[var(--color-border-strong)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-primary)] bg-[var(--color-surface)] transition-colors shadow-xs"
            >
              Resume PDF ↗
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMobileMenuOpen}
              className="laptop:hidden font-mono text-xs uppercase px-3 py-1.5 border border-[var(--color-border-strong)] text-[var(--color-text-primary)] bg-[var(--color-surface)]"
            >
              {isMobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Global Progress Line (Terracotta) */}
        <div
          className="h-[2px] bg-[var(--color-accent)] transition-all duration-75 origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#F4F0E6] flex flex-col justify-between p-8 pt-24 laptop:hidden">
          <nav className="space-y-6">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(idx)}
                className="flex items-baseline gap-4 text-left w-full border-b border-[var(--color-border)] pb-3"
              >
                <span className="font-mono text-xs text-[var(--color-accent)] font-medium">
                  {item.number}
                </span>
                <span className="font-display text-2xl text-[var(--color-text-primary)] font-normal">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="font-mono text-xs text-[var(--color-text-secondary)] space-y-2">
            <div>AYUSH TRIVEDI · NIET GREATER NOIDA</div>
            <div>B.TECH CSE &apos;28 · 8.4 CGPA</div>
          </div>
        </div>
      )}
    </>
  );
}