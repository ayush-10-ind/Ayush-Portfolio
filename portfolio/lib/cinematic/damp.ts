// lib/cinematic/damp.ts
// Physical camera smoothing — critically-damped exponential + a light spring
// for heading settle. No per-frame allocation; all math in place.

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Critically-damped exponential approach (frame-rate independent). */
export function damp(
  current: number,
  target: number,
  lambda: number,
  dt: number
): number {
  return target + (current - target) * Math.exp(-lambda * dt);
}

export function damp3(
  current: Vec3,
  target: Vec3,
  lambda: number,
  dt: number
): Vec3 {
  const f = Math.exp(-lambda * dt);
  current.x = target.x + (current.x - target.x) * f;
  current.y = target.y + (current.y - target.y) * f;
  current.z = target.z + (current.z - target.z) * f;
  return current;
}

/**
 * Lightly-springy damp (for heading / small settle). Returns updated value and
 * velocity. Gives the "subtle overshoot then settle" without jitter.
 */
export function spring(
  current: number,
  velocity: number,
  target: number,
  stiffness: number,
  damping: number,
  dt: number
): [number, number] {
  const accel = (target - current) * stiffness;
  const v = (velocity + accel * dt) * damping;
  const x = current + v * dt;
  return [x, v];
}
