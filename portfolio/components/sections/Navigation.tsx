"use client";

import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "forge", label: "The Forge", number: "00" },
  { id: "mindset", label: "Mindset", number: "01" },
  { id: "archive", label: "Archive", number: "02" },
  { id: "engine", label: "The Engine", number: "03" },
  { id: "lens", label: "The Lens", number: "04" },
  { id: "path", label: "The Path", number: "05" },
  { id: "arsenal", label: "Arsenal", number: "06" },
  { id: "horizon", label: "The Horizon", number: "07" },
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
    if (scrollProgress < 13) return 0;
    if (scrollProgress < 26) return 1;
    if (scrollProgress < 42) return 2;
    if (scrollProgress < 56) return 3;
    if (scrollProgress < 70) return 4;
    if (scrollProgress < 84) return 5;
    if (scrollProgress < 94) return 6;
    return 7;
  };

  const activeIndex = getActiveIndex();

  const handleNavClick = (idx: number) => {
    setIsMobileMenuOpen(false);
    const targetFraction = idx / 7;
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
        className="fixed top-0 left-0 right-0 z-40 bg-[#080B10]/90 backdrop-blur-md border-b border-[var(--color-cut-line)]"
      >
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)] h-16 flex items-center justify-between">
          {/* Brand Monogram */}
          <button
            onClick={() => handleNavClick(0)}
            className="flex items-center gap-3 text-left group focus-visible:outline-none"
          >
            <span className="font-display text-lg text-[var(--color-steel-white)] font-normal tracking-tight">
              Ayush Trivedi
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-blade-crimson)] font-medium">
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
                      ? "text-[var(--color-blade-crimson)] font-medium"
                      : "text-[var(--color-mist-gray)] hover:text-[var(--color-steel-white)]"
                  }`}
                >
                  <span className="text-[10px] opacity-50">{item.number}</span>
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
              className="hidden tablet:inline-block font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border border-[var(--color-cut-strong)] hover:border-[var(--color-blade-crimson)] hover:text-[var(--color-blade-crimson)] text-[var(--color-steel-white)] bg-[var(--color-slate-steel)] transition-colors"
            >
              Resume PDF ↗
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMobileMenuOpen}
              className="laptop:hidden font-mono text-xs uppercase px-3 py-1.5 border border-[var(--color-cut-strong)] text-[var(--color-steel-white)] bg-[var(--color-slate-steel)]"
            >
              {isMobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Global Progress Line (Blade Crimson) */}
        <div
          className="h-[2px] bg-[var(--color-blade-crimson)] shadow-[0_0_8px_var(--color-blade-crimson)] transition-all duration-75 origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080B10] flex flex-col justify-between p-8 pt-24 laptop:hidden">
          <nav className="space-y-5">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(idx)}
                className="flex items-baseline gap-4 text-left w-full border-b border-[var(--color-cut-line)] pb-2.5"
              >
                <span className="font-mono text-xs text-[var(--color-blade-crimson)] font-medium">
                  {item.number}
                </span>
                <span className="font-display text-2xl text-[var(--color-steel-white)] font-normal">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="font-mono text-xs text-[var(--color-mist-gray)] space-y-1">
            <div>AYUSH TRIVEDI · NIET GREATER NOIDA</div>
            <div>B.TECH CSE &apos;28 · 8.4 CGPA</div>
          </div>
        </div>
      )}
    </>
  );
}