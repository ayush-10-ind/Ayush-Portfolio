"use client";

import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "entrance", label: "01 Entrance", number: "01" },
  { id: "corridor", label: "02 Corridor", number: "02" },
  { id: "gallery", label: "03 Gallery", number: "03" },
  { id: "workshop", label: "04 Workshop", number: "04" },
  { id: "vista", label: "05 Vista", number: "05" },
  { id: "career", label: "06 Career", number: "06" },
  { id: "terminal", label: "07 Code IDE", number: "07" },
];

export default function Navigation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    if (scrollProgress < 62) return 3;
    if (scrollProgress < 76) return 4;
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
        className="fixed top-0 left-0 right-0 z-40 bg-[#F5F1E8]/90 backdrop-blur-md border-b border-[var(--color-sketch-line)]"
      >
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)] h-14 flex items-center justify-between">
          {/* Brand Header Banner */}
          <button
            onClick={() => handleNavClick(0)}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
          >
            <span className="font-display text-base text-[var(--color-ink-primary)] font-semibold tracking-tight">
              Ayush Trivedi
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-terracotta)] font-bold hidden sm:inline">
              Where Creativity Meets Code »
            </span>
          </button>

          {/* Desktop Storyboard Navigation */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden laptop:flex items-center gap-5 font-mono text-xs"
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(idx)}
                  className={`flex items-center gap-1 py-1 transition-colors uppercase tracking-wider ${
                    isActive
                      ? "text-[var(--color-terracotta)] font-bold"
                      : "text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]"
                  }`}
                >
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
              className="hidden tablet:inline-block font-mono text-xs uppercase tracking-wider px-3 py-1 border-2 border-[var(--color-ink-primary)] hover:bg-[var(--color-terracotta)] hover:text-white text-[var(--color-ink-primary)] bg-[var(--color-paper-card)] transition-colors font-semibold shadow-xs"
            >
              Resume PDF ↗
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMobileMenuOpen}
              className="laptop:hidden font-mono text-xs uppercase px-2.5 py-1 border-2 border-[var(--color-ink-primary)] text-[var(--color-ink-primary)] bg-[var(--color-paper-card)] font-bold"
            >
              {isMobileMenuOpen ? "Close" : "Stages"}
            </button>
          </div>
        </div>

        {/* Global Terracotta Progress Bar */}
        <div
          className="h-[2px] bg-[var(--color-terracotta)] transition-all duration-75 origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#F5F1E8] flex flex-col justify-between p-8 pt-20 laptop:hidden">
          <nav className="space-y-4">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(idx)}
                className="flex items-baseline gap-4 text-left w-full border-b border-[var(--color-sketch-line)] pb-2.5"
              >
                <span className="font-mono text-xs text-[var(--color-terracotta)] font-bold">
                  {item.number}
                </span>
                <span className="font-display text-xl text-[var(--color-ink-primary)] font-medium">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="font-mono text-xs text-[var(--color-ink-secondary)] space-y-1 border-t border-[var(--color-sketch-line)] pt-4">
            <div>AYUSH TRIVEDI · NIET GREATER NOIDA</div>
            <div>B.TECH CSE &apos;28 · 8.4 CGPA</div>
          </div>
        </div>
      )}
    </>
  );
}