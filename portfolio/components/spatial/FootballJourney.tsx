"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function FootballJourney() {
  const shouldReduceMotion = useReducedMotion();
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
      
      // Continuous rotation based on movement
      rotationRef.current += deltaY * 0.38;
      setRotation(rotationRef.current);

      if (isDesktop) {
        // Desktop natural tactical curve
        let targetX = 50;
        if (progress < 0.14) {
          // Kickoff: Starts near center spot (50%)
          const t = progress / 0.14;
          targetX = 50 - t * 22; // 50 -> 28
        } else if (progress < 0.32) {
          // About: Curves toward left margin
          const t = (progress - 0.14) / 0.18;
          targetX = 28 - t * 10; // 28 -> 18
        } else if (progress < 0.50) {
          // Resume: Sweeps to right flank
          const t = (progress - 0.32) / 0.18;
          targetX = 18 + t * 64; // 18 -> 82
        } else if (progress < 0.68) {
          // AgniPress: Weaves to center-left
          const t = (progress - 0.50) / 0.18;
          targetX = 82 - t * 56; // 82 -> 26
        } else if (progress < 0.84) {
          // Experience: Sweeps to center-right
          const t = (progress - 0.68) / 0.16;
          targetX = 26 + t * 48; // 26 -> 74
        } else if (progress < 0.94) {
          // Craft: Centers toward final third
          const t = (progress - 0.84) / 0.10;
          targetX = 74 - t * 24; // 74 -> 50
        } else {
          // Full Time: Settles inside final center circle
          targetX = 50;
        }
        setBallPos({ x: targetX, y: window.innerHeight * 0.48 });
      } else {
        // Mobile: Vertical right-edge guide
        setBallPos({ x: 90, y: window.innerHeight * 0.45 });
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
      {/* Hand-Drawn Tactical Chalk Line (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="parchmentChalk" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C86B3C" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#29483A" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#29483A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C86B3C" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {isDesktop ? (
          <path
            d="M 50% 0 C 35% 10%, 20% 20%, 18% 32% C 16% 42%, 82% 40%, 82% 50% C 82% 60%, 26% 58%, 26% 68% C 26% 78%, 74% 76%, 74% 84% C 74% 92%, 50% 95%, 50% 100%"
            fill="none"
            stroke="url(#parchmentChalk)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="opacity-60"
          />
        ) : (
          <line
            x1="90%"
            y1="0"
            x2="90%"
            y2="100%"
            stroke="url(#parchmentChalk)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="opacity-45"
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
        {/* Soft Tactile Shadow */}
        <div className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(32,37,34,0.12)_0%,transparent_70%)] blur-xs" />

        {/* Hand-Crafted Football Vector Graphic */}
        <div
          className="relative w-10 h-10 tablet:w-11 tablet:h-11 rounded-full border border-[rgba(32,37,34,0.2)] shadow-md bg-[#FFFDF7] flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.05s linear",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Base Leather Circle */}
            <circle cx="50" cy="50" r="48" fill="#FFFDF7" stroke="#202522" strokeWidth="1.5" strokeOpacity="0.7" />
            
            {/* Center Pentagonal Pitch Green Patch */}
            <polygon
              points="50,28 69,42 62,64 38,64 31,42"
              fill="#29483A"
              stroke="#202522"
              strokeWidth="1.5"
            />

            {/* Stitch Lines */}
            <line x1="50" y1="28" x2="50" y2="4" stroke="#202522" strokeWidth="1.2" strokeOpacity="0.7" />
            <line x1="69" y1="42" x2="94" y2="35" stroke="#202522" strokeWidth="1.2" strokeOpacity="0.7" />
            <line x1="62" y1="64" x2="80" y2="92" stroke="#202522" strokeWidth="1.2" strokeOpacity="0.7" />
            <line x1="38" y1="64" x2="20" y2="92" stroke="#202522" strokeWidth="1.2" strokeOpacity="0.7" />
            <line x1="31" y1="42" x2="6" y2="35" stroke="#202522" strokeWidth="1.2" strokeOpacity="0.7" />

            {/* Subtle Terracotta Accent on Stitch Intersection */}
            <circle cx="50" cy="50" r="3" fill="#C86B3C" />
          </svg>
        </div>
      </div>
    </div>
  );
}