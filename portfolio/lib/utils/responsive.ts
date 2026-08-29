// lib/utils/responsive.ts
// Responsive breakpoint utilities

export const BREAKPOINTS = {
  mobile:  375,
  tablet:  768,
  laptop:  1024,
  desktop: 1280,
  wide:    1600,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export function isAboveBreakpoint(bp: Breakpoint): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= BREAKPOINTS[bp];
}

export function mediaQuery(bp: Breakpoint): string {
  return `(min-width: ${BREAKPOINTS[bp]}px)`;
}
