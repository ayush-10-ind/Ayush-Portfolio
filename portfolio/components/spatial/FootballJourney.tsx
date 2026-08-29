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
  const velocityRef = useRef(0);

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
      
      // Calculate velocity with smooth dampening
      velocityRef.current = deltaY;
      rotationRef.current += deltaY * 0.42;

      setScrollProgress(progress);
      setRotation(rotationRef.current);

      if (isDesktop) {
        // Desktop S-curve tactical weave through the sections
        let targetX = 50;
        if (progress < 0.14) {
          // 00 / Kickoff: Starts at center spot (50%) and weaves slightly left
          const t = progress / 0.14;
          targetX = 50 - t * 24; // 50 -> 26
        } else if (progress < 0.32) {
          // 01 / About: Left margin anchor
          const t = (progress - 0.14) / 0.18;
          targetX = 26 - t * 10; // 26 -> 16
        } else if (progress < 0.50) {
          // 02 / 3D Resume Studio: Sweeps to right flank
          const t = (progress - 0.32) / 0.18;
          targetX = 16 + t * 68; // 16 -> 84
        } else if (progress < 0.68) {
          // 03 / Case Studies: Weaves across to center-left
          const t = (progress - 0.50) / 0.18;
          targetX = 84 - t * 60; // 84 -> 24
        } else if (progress < 0.84) {
          // 04 / Experience: Sweeps to center-right
          const t = (progress - 0.68) / 0.16;
          targetX = 24 + t * 52; // 24 -> 76
        } else if (progress < 0.94) {
          // 05 / Craft Training Ground: Centers toward final third
          const t = (progress - 0.84) / 0.10;
          targetX = 76 - t * 26; // 76 -> 50
        } else {
          // 06 / Contact (Full Time): Settles inside the final center circle
          targetX = 50;
        }
        setBallPos({ x: targetX, y: window.innerHeight * 0.48 });
      } else {
        // Mobile: Clean right-edge tactical chalk line
        setBallPos({ x: 91, y: window.innerHeight * 0.44 });
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
          <linearGradient id="chalkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4A853" stopOpacity="0.45" />
            <stop offset="30%" stopColor="#F4F1E8" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#F4F1E8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#D4A853" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Global Tactical Guide Path */}
        {isDesktop ? (
          <path
            d="M 50% 0 C 35% 10%, 18% 20%, 16% 32% C 14% 42%, 84% 40%, 84% 50% C 84% 60%, 24% 58%, 24% 68% C 24% 78%, 76% 76%, 76% 84% C 76% 92%, 50% 95%, 50% 100%"
            fill="none"
            stroke="url(#chalkGradient)"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            className="opacity-45"
          />
        ) : (
          <line
            x1="91%"
            y1="0"
            x2="91%"
            y2="100%"
            stroke="url(#chalkGradient)"
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
        {/* Subtle Ambient Ground Shadow */}
        <div className="absolute -inset-2.5 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.2)_0%,transparent_70%)] blur-sm" />

        {/* Rotating Football Vector Geometry */}
        <div
          className="relative w-10 h-10 tablet:w-12 tablet:h-12 rounded-full border border-[var(--color-accent)] shadow-[0_12px_32px_rgba(0,0,0,0.9)] bg-[#121212] flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.05s linear",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Outer Leather Base */}
            <circle cx="50" cy="50" r="48" fill="#141414" stroke="#F4F1E8" strokeWidth="1.5" strokeOpacity="0.45" />
            
            {/* Center Pentagonal Patch */}
            <polygon
              points="50,28 69,42 62,64 38,64 31,42"
              fill="#D4A853"
              fillOpacity="0.88"
              stroke="#F4F1E8"
              strokeWidth="1.5"
            />

            {/* Connecting Seam Stitch Rules */}
            <line x1="50" y1="28" x2="50" y2="4" stroke="#F4F1E8" strokeWidth="1.2" strokeOpacity="0.65" />
            <line x1="69" y1="42" x2="94" y2="35" stroke="#F4F1E8" strokeWidth="1.2" strokeOpacity="0.65" />
            <line x1="62" y1="64" x2="80" y2="92" stroke="#F4F1E8" strokeWidth="1.2" strokeOpacity="0.65" />
            <line x1="38" y1="64" x2="20" y2="92" stroke="#F4F1E8" strokeWidth="1.2" strokeOpacity="0.65" />
            <line x1="31" y1="42" x2="6" y2="35" stroke="#F4F1E8" strokeWidth="1.2" strokeOpacity="0.65" />

            {/* Perimeter Leather Patches */}
            <polygon points="50,4 35,0 65,0" fill="#222222" stroke="#F4F1E8" strokeWidth="1" strokeOpacity="0.45" />
            <polygon points="94,35 100,50 96,20" fill="#222222" stroke="#F4F1E8" strokeWidth="1" strokeOpacity="0.45" />
            <polygon points="80,92 90,100 65,100" fill="#222222" stroke="#F4F1E8" strokeWidth="1" strokeOpacity="0.45" />
            <polygon points="20,92 35,100 10,100" fill="#222222" stroke="#F4F1E8" strokeWidth="1" strokeOpacity="0.45" />
            <polygon points="6,35 4,20 0,50" fill="#222222" stroke="#F4F1E8" strokeWidth="1" strokeOpacity="0.45" />
          </svg>
        </div>

        {/* Tactical Annotation Tooltip (Desktop only) */}
        {isDesktop && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-mono text-[9px] text-[var(--color-accent)] uppercase tracking-widest bg-[#0C0C0C]/95 px-2 py-0.5 border border-[var(--color-accent)]/30 backdrop-blur-xs">
            MATCH {Math.round(scrollProgress * 90)}&apos; · POS {Math.round(scrollProgress * 100)}%
          </div>
        )}
      </div>
    </div>
  );
}