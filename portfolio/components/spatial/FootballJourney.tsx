"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function FootballJourney() {
  const shouldReduceMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ballPos, setBallPos] = useState({ x: 50, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const prevScrollY = useRef(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let rafId: number = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      
      const deltaY = scrollY - prevScrollY.current;
      prevScrollY.current = scrollY;
      
      // Update continuous ball rotation based on scroll delta
      rotationRef.current += deltaY * 0.45;

      setScrollProgress(progress);
      setRotation(rotationRef.current);

      // Interpolate horizontal position based on progress and device mode
      if (isDesktop) {
        // Desktop S-curve tactical weave
        let targetX = 50;
        if (progress < 0.12) {
          // Hero Kickoff: Starts at center
          targetX = 50 - progress * 150; // 50 -> 32
        } else if (progress < 0.28) {
          // About Section: Curves left
          const t = (progress - 0.12) / 0.16;
          targetX = 32 - t * 16; // 32 -> 16
        } else if (progress < 0.45) {
          // 3D Resume Studio: Sweeps to right flank
          const t = (progress - 0.28) / 0.17;
          targetX = 16 + t * 68; // 16 -> 84
        } else if (progress < 0.62) {
          // Case Studies (AgniPress & XAI): Weaves to center-left
          const t = (progress - 0.45) / 0.17;
          targetX = 84 - t * 60; // 84 -> 24
        } else if (progress < 0.80) {
          // Experience & Academics: Sweeps to center-right
          const t = (progress - 0.62) / 0.18;
          targetX = 24 + t * 54; // 24 -> 78
        } else if (progress < 0.92) {
          // Craft Matrix: Weaves toward center
          const t = (progress - 0.80) / 0.12;
          targetX = 78 - t * 28; // 78 -> 50
        } else {
          // Contact (Full Time): Centers inside final circle
          targetX = 50;
        }
        setBallPos({ x: targetX, y: window.innerHeight * 0.48 });
      } else {
        // Mobile: Vertical right-edge tactical chalk line
        setBallPos({ x: 92, y: window.innerHeight * 0.45 });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
    >
      {/* Background SVG Tactical Chalk Path Container */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chalkFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4A853" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#F4F1E8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D4A853" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Global Tactical Guide Line (Mobile & Desktop) */}
        {isDesktop ? (
          <path
            d="M 50% 0 Q 20% 25%, 16% 30% T 84% 45% T 24% 62% T 78% 80% T 50% 100%"
            fill="none"
            stroke="url(#chalkFade)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="opacity-40"
          />
        ) : (
          <line
            x1="92%"
            y1="0"
            x2="92%"
            y2="100%"
            stroke="url(#chalkFade)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="opacity-35"
          />
        )}
      </svg>

      {/* Floating Football Entity */}
      <div
        className="absolute transition-transform duration-100 ease-out"
        style={{
          left: `${ballPos.x}%`,
          top: `${ballPos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Subtle Chalk Dust Shadow & Halo */}
        <div className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.18)_0%,transparent_70%)] blur-sm" />

        {/* Rotating Football Vector Graphic */}
        <div
          className="relative w-10 h-10 tablet:w-12 tablet:h-12 rounded-full border border-[var(--color-accent)] shadow-xl shadow-black/80 bg-[#121212] flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.05s linear",
          }}
        >
          {/* Classic Architectural Pentagonal Leather Geometry */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Base Leather Circle */}
            <circle cx="50" cy="50" r="48" fill="#141414" stroke="#F4F1E8" strokeWidth="1.5" strokeOpacity="0.4" />
            
            {/* Center Pentagonal Patch */}
            <polygon
              points="50,28 69,42 62,64 38,64 31,42"
              fill="#D4A853"
              fillOpacity="0.85"
              stroke="#F4F1E8"
              strokeWidth="1.5"
            />

            {/* Connecting Seam Stitch Rules */}
            <line x1="50" y1="28" x2="50" y2="4" stroke="#F4F1E8" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="69" y1="42" x2="94" y2="35" stroke="#F4F1E8" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="62" y1="64" x2="80" y2="92" stroke="#F4F1E8" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="38" y1="64" x2="20" y2="92" stroke="#F4F1E8" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="31" y1="42" x2="6" y2="35" stroke="#F4F1E8" strokeWidth="1.2" strokeOpacity="0.6" />

            {/* Perimeter Outer Patches */}
            <polygon points="50,4 35,0 65,0" fill="#202020" stroke="#F4F1E8" strokeWidth="1" strokeOpacity="0.4" />
            <polygon points="94,35 100,50 96,20" fill="#202020" stroke="#F4F1E8" strokeWidth="1" strokeOpacity="0.4" />
            <polygon points="80,92 90,100 65,100" fill="#202020" stroke="#F4F1E8" strokeWidth="1" strokeOpacity="0.4" />
            <polygon points="20,92 35,100 10,100" fill="#202020" stroke="#F4F1E8" strokeWidth="1" strokeOpacity="0.4" />
            <polygon points="6,35 4,20 0,50" fill="#202020" stroke="#F4F1E8" strokeWidth="1" strokeOpacity="0.4" />
          </svg>
        </div>

        {/* Tactical Annotation Tooltip (Desktop only) */}
        {isDesktop && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-mono text-[9px] text-[var(--color-accent)] uppercase tracking-widest bg-[#0C0C0C]/90 px-2 py-0.5 border border-[var(--color-accent)]/30 backdrop-blur-xs">
            POS {Math.round(scrollProgress * 100)}%
          </div>
        )}
      </div>
    </div>
  );
}