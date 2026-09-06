// lib/cinematic/responsive.ts
// Device variant detection for the responsive camera system.
// desktop / tablet / mobile — three REAL camera configurations, not scale:0.5.

export type Variant = "desktop" | "tablet" | "mobile";

export function detectVariant(width: number): Variant {
  if (width < 700) return "mobile";
  if (width < 1100) return "tablet";
  return "desktop";
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

export function devicePixelCap(variant: Variant): number {
  if (variant === "mobile") return 1.5;
  if (variant === "tablet") return 1.75;
  return 2;
}

/** Scroll runway (vh) per variant. Portrait needs more room per beat. */
export function scrollRunway(variant: Variant): number {
  if (variant === "mobile") return 2400;
  if (variant === "tablet") return 2000;
  return 1600;
}
