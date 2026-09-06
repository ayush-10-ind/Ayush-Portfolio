// lib/cinematic/scrollController.ts
// Holds the Lenis instance and exposes timeline-aware scrollTo for nav.

import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(l: Lenis | null): void {
  lenis = l;
}

export function scrollToProgress(p: number): void {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const target = Math.max(0, Math.min(1, p)) * max;
  if (lenis) {
    lenis.scrollTo(target, {
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
