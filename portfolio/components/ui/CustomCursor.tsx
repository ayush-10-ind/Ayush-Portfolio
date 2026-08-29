"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null;
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, shouldReduceMotion]);

  if (shouldReduceMotion || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <div
        className={`rounded-full transition-all duration-150 ${
          isPointer
            ? "w-7 h-7 bg-[rgba(200,107,60,0.2)] border border-[#C86B3C]"
            : "w-3 h-3 bg-[#29483A]"
        }`}
      />
    </div>
  );
}