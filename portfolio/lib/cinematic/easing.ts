// lib/cinematic/easing.ts
// Central easing vocabulary — deliberately NOT "ease-in-out on everything".
// Tune here to match the reference's motion character.

export const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Fast out, long tail — primary content reveal. */
export const easeOutExpo = (t: number): number =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

/** Editorial reveal — quick anticipation, smooth settle (matches docs' curve). */
export const easeOutQuint = (t: number): number => 1 - Math.pow(1 - t, 5);

/** The signature editorial curve 0.16,1,0.3,1 expressed as a cubic bezier. */
export function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

/** Bezier with slight overshoot for content settle (subtle "caught" feel). */
export function easeOutBackSoft(t: number): number {
  const c1 = 1.2;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

/** In-out sine for FOV breath and slow environmental drift. */
export const easeInOutSine = (t: number): number =>
  -(Math.cos(Math.PI * t) - 1) / 2;

/** Smooth in for entrances that shouldn't pop. */
export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Map local progress `x` through a "reveal window" with soft head and tail.
 * Used to gate overlay opacity so content fades in at the head and out at the
 * tail of its OWN exclusive window (never crossfading with a neighbour).
 */
export function windowEase(x: number, fadeIn = 0.16, fadeOut = 0.16): number {
  const t = clamp01(x);
  if (t <= 0 || t >= 1) return 0;
  const head = clamp01(t / fadeIn);
  const tail = clamp01((1 - t) / fadeOut);
  return Math.min(1, easeInOutCubic(head), easeInOutCubic(tail));
}

/** Linear remap of x from [a,b] to [0,1]. */
export function range(x: number, a: number, b: number): number {
  return clamp01((x - a) / (b - a));
}

/** Parallax translate derived from local progress: -1..1 across the window. */
export function parallaxOffset(x: number): number {
  return clamp01(x) * 2 - 1;
}

/**
 * Bell-shaped prominence 0→1→0 across [a,b] with soft ramps of width `soft`.
 * Used for light intensity + chamber visibility gating.
 */
export function prominence(x: number, a: number, b: number, soft = 0.04): number {
  const head = clamp01((x - a) / soft);
  const tail = clamp01((b - x) / soft);
  return Math.min(1, head, tail);
}
