"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MaskedTextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
}

export default function MaskedTextReveal({
  text,
  className = "",
  as: Component = "div",
  delay = 0,
}: MaskedTextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={`overflow-hidden inline-block ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "105%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {text}
      </motion.span>
    </Component>
  );
}