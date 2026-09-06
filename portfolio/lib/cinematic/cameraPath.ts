// lib/cinematic/cameraPath.ts
// Camera keyframes + Catmull-Rom spline sampling, per responsive variant.
// Tune the DESKTOP keyframes to match the reference; tablet/mobile derive
// from them via a small transform (not scale:0.5).

export interface CameraKeyframe {
  t: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}

export interface CameraPose {
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}

// One continuous dolly through the chambers along −Z.
const DESKTOP: CameraKeyframe[] = [
  { t: 0.0,   pos: [0, 1.5, 4],      look: [0, 1.5, -22],     fov: 55 },
  { t: 0.07,  pos: [0, 1.62, -7],    look: [0, 1.56, -27],    fov: 55 }, // approach gate
  { t: 0.1,   pos: [0, 1.7, -21],    look: [0, 1.5, -42],     fov: 63 }, // through the door
  { t: 0.235, pos: [1.15, 1.78, -53], look: [-0.2, 1.5, -76], fov: 55 }, // study → drift right
  { t: 0.27,  pos: [0, 1.72, -67],   look: [0, 1.5, -90],     fov: 59 }, // corridor
  { t: 0.4,   pos: [-0.9, 1.8, -103], look: [0, 1.52, -126],  fov: 55 }, // workshop
  { t: 0.435, pos: [0, 1.62, -116],  look: [0, 1.55, -133],   fov: 55 }, // approach the word
  { t: 0.545, pos: [0, 1.55, -149],  look: [0, 1.5, -171],    fov: 58 }, // engine
  { t: 0.58,  pos: [0, 1.5, -171],   look: [0, 1.45, -192],   fov: 65 }, // into the core
  { t: 0.685, pos: [0, 1.82, -213],  look: [0, 1.6, -236],    fov: 57 }, // observatory
  { t: 0.715, pos: [0, 1.7, -231],   look: [0, 1.55, -252],   fov: 55 }, // dossier desk
  { t: 0.805, pos: [0, 1.7, -259],   look: [0, 1.5, -280],    fov: 55 }, // ledger
  { t: 0.84,  pos: [0, 1.66, -275],  look: [0, 1.5, -300],    fov: 58 }, // horizon opening
  { t: 1.0,   pos: [0, 2.6, -330],   look: [0, 2.2, -420],    fov: 61 }, // lift to horizon
];

function transform(
  kfs: CameraKeyframe[],
  opts: { xScale: number; yShift: number; fovAdd: number }
): CameraKeyframe[] {
  return kfs.map((k) => ({
    t: k.t,
    pos: [k.pos[0] * opts.xScale, k.pos[1] + opts.yShift, k.pos[2]],
    look: [k.look[0] * opts.xScale, k.look[1] + opts.yShift, k.look[2]],
    fov: k.fov + opts.fovAdd,
  }));
}

const KEYFRAMES: Record<"desktop" | "tablet" | "mobile", CameraKeyframe[]> = {
  desktop: DESKTOP,
  tablet: transform(DESKTOP, { xScale: 0.6, yShift: 0.18, fovAdd: 6 }),
  mobile: transform(DESKTOP, { xScale: 0.3, yShift: 0.32, fovAdd: 13 }),
};

function catmullRom(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
}

type Axis = 0 | 1 | 2;

function sampleField(
  kfs: CameraKeyframe[],
  t: number,
  axis: Axis,
  field: "pos" | "look"
): number {
  if (kfs.length === 0) return 0;
  if (t <= kfs[0].t) return kfs[0][field][axis];
  if (t >= kfs[kfs.length - 1].t) return kfs[kfs.length - 1][field][axis];

  let i = 0;
  while (i < kfs.length - 1 && kfs[i + 1].t < t) i++;

  const p0 = kfs[Math.max(0, i - 1)][field][axis];
  const p1 = kfs[i][field][axis];
  const p2 = kfs[i + 1][field][axis];
  const p3 = kfs[Math.min(kfs.length - 1, i + 2)][field][axis];
  const seg = (t - kfs[i].t) / (kfs[i + 1].t - kfs[i].t || 1);
  return catmullRom(p0, p1, p2, p3, seg);
}

function sampleFov(kfs: CameraKeyframe[], t: number): number {
  if (t <= kfs[0].t) return kfs[0].fov;
  if (t >= kfs[kfs.length - 1].t) return kfs[kfs.length - 1].fov;
  let i = 0;
  while (i < kfs.length - 1 && kfs[i + 1].t < t) i++;
  const seg = (t - kfs[i].t) / (kfs[i + 1].t - kfs[i].t || 1);
  return kfs[i].fov + (kfs[i + 1].fov - kfs[i].fov) * seg;
}

export function sampleCameraPath(
  variant: "desktop" | "tablet" | "mobile",
  progress: number
): CameraPose {
  const kfs = KEYFRAMES[variant] ?? KEYFRAMES.desktop;
  const p = Math.min(1, Math.max(0, progress));
  const pos: [number, number, number] = [0, 1, 2].map((a) =>
    sampleField(kfs, p, a as Axis, "pos")
  ) as [number, number, number];
  const look: [number, number, number] = [0, 1, 2].map((a) =>
    sampleField(kfs, p, a as Axis, "look")
  ) as [number, number, number];
  return { pos, look, fov: sampleFov(kfs, p) };
}
