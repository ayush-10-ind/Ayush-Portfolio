// components/cinematic/world/kit.tsx
// Shared 3D kit: materials, canvas-texture typography, chamber scaffolding.
// Geometries/materials are created once and reused — no per-frame allocation.

"use client";

import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { runtime } from "@/lib/cinematic/runtime";
import { prominence } from "@/lib/cinematic/easing";


/* ──────────────────────────  Palette  ────────────────────────── */

export const PALETTE = {
  ink: "#0a0b0d",
  wall: "#191815",
  wallDark: "#12110e",
  floor: "#0e0d0b",
  paper: "#e6ddc9",
  paperDim: "#b7ad96",
  gold: "#d4a853",
  brass: "#8a6a33",
  steel: "#2a2824",
  chalk: "#f0ede8",
  cool: "#7f9bb0",
  coolDeep: "#1a2430",
  sun: "#e9c88a",
};

/* ──────────────────────────  Materials  ────────────────────────── */

export const MAT = {
  ink: new THREE.MeshStandardMaterial({ color: PALETTE.ink, roughness: 0.95 }),
  wall: new THREE.MeshStandardMaterial({ color: PALETTE.wall, roughness: 0.92 }),
  wallDark: new THREE.MeshStandardMaterial({
    color: PALETTE.wallDark,
    roughness: 0.95,
  }),
  floor: new THREE.MeshStandardMaterial({
    color: PALETTE.floor,
    roughness: 0.9,
    metalness: 0.05,
  }),
  paper: new THREE.MeshStandardMaterial({
    color: PALETTE.paper,
    roughness: 0.85,
  }),
  paperDim: new THREE.MeshStandardMaterial({
    color: PALETTE.paperDim,
    roughness: 0.85,
  }),
  gold: new THREE.MeshStandardMaterial({
    color: PALETTE.gold,
    roughness: 0.35,
    metalness: 0.7,
  }),
  brass: new THREE.MeshStandardMaterial({
    color: PALETTE.brass,
    roughness: 0.5,
    metalness: 0.6,
  }),
  steel: new THREE.MeshStandardMaterial({
    color: PALETTE.steel,
    roughness: 0.6,
    metalness: 0.5,
  }),
  cool: new THREE.MeshStandardMaterial({
    color: PALETTE.cool,
    roughness: 0.7,
    metalness: 0.3,
  }),
  coolDeep: new THREE.MeshStandardMaterial({
    color: PALETTE.coolDeep,
    roughness: 0.9,
  }),
  sun: new THREE.MeshBasicMaterial({
    color: PALETTE.sun,
    fog: false,
  }),
  black: new THREE.MeshBasicMaterial({ color: "#050506" }),
};

/* ──────────────────────  Seeded PRNG (deterministic particles)  ────────────────────── */

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ──────────────────────  Canvas texture typography  ────────────────────── */

export interface TextTexture {
  texture: THREE.CanvasTexture;
  width: number;
  height: number;
}

export function makeTextTexture(
  text: string,
  opts: {
    font?: string;
    color?: string;
    background?: string;
    fontSize?: number;
    padding?: number;
    maxWidth?: number;
    letterSpacing?: number;
    align?: CanvasTextAlign;
  } = {}
): TextTexture {
  const {
    font = "700 96px 'Playfair Display', Georgia, serif",
    color = "#f0ede8",
    background = "rgba(0,0,0,0)",
    fontSize = 96,
    padding = 48,
    maxWidth = 1024,
    letterSpacing = 0,
    align = "center",
  } = opts;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // measure
  ctx.font = font;
  const lines = text.split("\n");
  let textWidth = 0;
  for (const line of lines) {
    textWidth = Math.max(
      textWidth,
      measureLine(ctx, line, letterSpacing, maxWidth)
    );
  }
  const lineHeight = fontSize * 1.25;
  const width = Math.ceil(Math.min(maxWidth, textWidth) + padding * 2);
  const height = Math.ceil(lines.length * lineHeight + padding * 2);

  canvas.width = width;
  canvas.height = height;
  ctx.font = font;
  ctx.textBaseline = "middle";
  ctx.textAlign = align;
  if (background !== "rgba(0,0,0,0)") {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.fillStyle = color;

  lines.forEach((line, i) => {
    const y = padding + lineHeight * i + lineHeight / 2;
    if (letterSpacing > 0) {
      drawSpaced(ctx, line, width / 2, y, letterSpacing);
    } else {
      ctx.fillText(line, align === "center" ? width / 2 : padding, y);
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  return { texture, width, height };
}

function measureLine(
  ctx: CanvasRenderingContext2D,
  line: string,
  spacing: number,
  maxWidth: number
): number {
  if (spacing > 0) {
    const base = ctx.measureText(line).width;
    return Math.min(maxWidth, base + (line.length - 1) * spacing);
  }
  return ctx.measureText(line).width;
}

function drawSpaced(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  spacing: number
): void {
  const total = measureLine(ctx, text, spacing, 1e6);
  let x = centerX - total / 2;
  for (const ch of text) {
    ctx.fillText(ch, x, y);
    x += ctx.measureText(ch).width + spacing;
  }
}

/** Subtle drafting grid for the continuous floor. */
export function makeGridTexture(scale = 1): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#0e0d0b";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(212,168,83,0.10)";
  ctx.lineWidth = 1;
  const step = 64 / scale;
  for (let i = 0; i <= size; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(24 / scale, 24 / scale);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* ──────────────────────  Chamber scaffolding  ────────────────────── */

export interface BayProps {
  width: number; // interior width
  depth: number; // along Z
  zCenter: number;
  sideWalls?: boolean;
  topBand?: boolean;
  children?: React.ReactNode;
}

/** A vaulted bay: side walls + optional top band. Floor is global (see WorldScene). */
export function Bay({
  width,
  depth,
  zCenter,
  sideWalls = true,
  topBand = true,
  children,
}: BayProps) {
  const half = width / 2;
  return (
    <group position={[0, 0, zCenter]}>
      {sideWalls && (
        <>
          <mesh position={[-half, 1.5, -depth / 2]} material={MAT.wall}>
            <boxGeometry args={[0.3, 6.4, depth + 0.5]} />
          </mesh>
          <mesh position={[half, 1.5, -depth / 2]} material={MAT.wall}>
            <boxGeometry args={[0.3, 6.4, depth + 0.5]} />
          </mesh>
        </>
      )}
      {topBand && (
        <mesh position={[0, 4.7, -depth / 2]} material={MAT.wallDark}>
          <boxGeometry args={[width + 1, 0.4, depth + 0.5]} />
        </mesh>
      )}
      {children}
    </group>
  );
}

/* ──────────────────────  Wall with doorway opening  ────────────────────── */

export interface WallWithOpeningProps {
  width: number;
  opening?: number; // opening width
  openingTop?: number; // opening height (from floor)
  position: [number, number, number];
  color?: string;
  children?: React.ReactNode;
}

/** A back wall with a central doorway — the physical frame between chambers. */
export function WallWithOpening({
  width,
  opening = 5.5,
  openingTop = 2.2,
  position,
  color = "#191815",
  children,
}: WallWithOpeningProps) {
  const wallBottom = -1.5;
  const wallTop = 4.5;
  const leftW = (width - opening) / 2;
  const h = wallTop - wallBottom;
  const yCenter = (wallBottom + wallTop) / 2;
  return (
    <group position={position}>
      {/* left panel */}
      <mesh position={[-(opening + leftW) / 2, yCenter, 0]}>
        <boxGeometry args={[leftW + 0.02, h, 0.26]} />
        <meshStandardMaterial color={color} roughness={0.92} />
      </mesh>
      {/* right panel */}
      <mesh position={[(opening + leftW) / 2, yCenter, 0]}>
        <boxGeometry args={[leftW + 0.02, h, 0.26]} />
        <meshStandardMaterial color={color} roughness={0.92} />
      </mesh>
      {/* lintel */}
      <mesh position={[0, (openingTop + wallTop) / 2, 0]}>
        <boxGeometry args={[opening, wallTop - openingTop, 0.26]} />
        <meshStandardMaterial color={color} roughness={0.92} />
      </mesh>
      {children}
    </group>
  );
}

/* ──────────────────────  Engraved plaque  ────────────────────── */

export interface PlaqueProps {
  text: string;
  sub?: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  subSize?: number;
  accent?: string;
  facing?: number; // rotation.y applied
}

/** An engraved wall plaque: paper face + gold frame + text texture. */
export function Plaque({
  text,
  sub,
  position,
  rotation = [0, 0, 0],
  width = 2.4,
  subSize = 16,
  accent = PALETTE.paperDim,
  facing = 0,
}: PlaqueProps) {
  const main = useMemo(
    () =>
      makeTextTexture(text.toUpperCase(), {
        fontSize: 52,
        font: "600 52px 'JetBrains Mono', monospace",
        color: "#191815",
        padding: 24,
        maxWidth: 1200,
      }),
    [text]
  );
  const subTex = useMemo(
    () =>
      sub
        ? makeTextTexture(sub.toUpperCase(), {
            fontSize: subSize,
            font: `500 ${subSize}px 'JetBrains Mono', monospace`,
            color: "#6a624f",
            padding: 14,
            maxWidth: 1200,
          })
        : null,
    [sub, subSize]
  );

  const aspect = main.width / main.height;
  const height = width / aspect;
  const subH = subTex ? (subTex.width / subTex.height) * (width * 0.72) : 0;

  return (
    <group position={position} rotation={rotation}>
      {/* paper face */}
      <mesh material={MAT.paper} rotation={[0, facing, 0]}>
        <boxGeometry args={[width + 0.08, height + subH + 0.18, 0.05]} />
      </mesh>
      {/* frame */}
      <mesh material={MAT.gold} position={[0, 0, 0.045]} rotation={[0, facing, 0]}>
        <boxGeometry args={[width + 0.22, 0.05, 0.06]} />
      </mesh>
      <mesh material={MAT.gold} position={[0, -(height + subH + 0.13), 0.045]} rotation={[0, facing, 0]}>
        <boxGeometry args={[width + 0.22, 0.05, 0.06]} />
      </mesh>
      <mesh material={MAT.gold} position={[-(width + 0.15) / 2, -(height + subH + 0.13) / 2, 0.045]} rotation={[0, facing, 0]}>
        <boxGeometry args={[0.05, height + subH + 0.26, 0.06]} />
      </mesh>
      <mesh material={MAT.gold} position={[(width + 0.15) / 2, -(height + subH + 0.13) / 2, 0.045]} rotation={[0, facing, 0]}>
        <boxGeometry args={[0.05, height + subH + 0.26, 0.06]} />
      </mesh>
      {/* main text */}
      <mesh position={[0, -height / 2 + 0.02, 0.07]} rotation={[0, facing, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={main.texture} transparent toneMapped={false} />
      </mesh>
      {/* sub text */}
      {subTex && (
        <mesh position={[0, -height - 0.02 - subH / 2, 0.07]} rotation={[0, facing, 0]}>
          <planeGeometry args={[width * 0.72, subH]} />
          <meshBasicMaterial
            map={subTex.texture}
            transparent
            toneMapped={false}
          />
        </mesh>
      )}
      {accent && (
        <mesh position={[0, -height - subH - 0.1, 0.065]} rotation={[0, facing, 0]}>
          <boxGeometry args={[width * 0.4, 0.02, 0.02]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      )}
    </group>
  );
}

/** Simple world-space label on a slim bar (for skills / nodes). */
export function Tag({
  text,
  position,
  rotation = [0, 0, 0],
  color = PALETTE.paper,
  fontSize = 28,
}: {
  text: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  fontSize?: number;
}) {
  const tex = useMemo(
    () =>
      makeTextTexture(text.toUpperCase(), {
        fontSize,
        font: `500 ${fontSize}px 'JetBrains Mono', monospace`,
        color,
        padding: 10,
        maxWidth: 800,
      }),
    [text, color, fontSize]
  );
  const aspect = tex.width / tex.height;
  const h = 0.32;
  const w = h * aspect;
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex.texture} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}



/* ──────────────────────  Timeline-driven helpers  ────────────────────── */

/** Visibility gate: group renders while progress is in [a,b] ± margin. */
export function Chamber({
  window: w,
  children,
}: {
  window: [number, number];
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    const margin = 0.025;
    const on =
      runtime.progress >= w[0] - margin &&
      runtime.progress <= w[1] + margin;
    if (group.current.visible !== on) group.current.visible = on;
  });
  return (
    <group ref={group} visible={false}>
      {children}
    </group>
  );
}

/** A point light whose intensity follows a timeline window (bell curve). */
export function WindowPointLight({
  position,
  color,
  intensity,
  distance,
  window: w,
}: {
  position: [number, number, number];
  color: string;
  intensity: number;
  distance: number;
  window: [number, number];
}) {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (!ref.current) return;
    const k = prominence(runtime.progress, w[0], w[1], 0.05);
    ref.current.intensity = intensity * k;
  });
  return (
    <pointLight
      ref={ref}
      position={position}
      color={color}
      intensity={0}
      distance={distance}
      decay={1.7}
    />
  );
}

/** Sparse drifting dust motes (foreground parallax + atmosphere). */
export function Dust({
  count = 60,
  spread: [sx, sy, sz] = [12, 5, 20],
  center = [0, 1.5, 0] as [number, number, number],
  color = "#cbb37f",
  size = 0.02,
  speed = 0.2,
}: {
  count?: number;
  spread?: [number, number, number];
  center?: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(0x5eed + count);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = center[0] + (rand() - 0.5) * sx;
      arr[i * 3 + 1] = center[1] + (rand() - 0.5) * sy;
      arr[i * 3 + 2] = center[2] + (rand() - 0.5) * sz;
    }
    return arr;
  }, [count, sx, sy, sz, center]);

  useFrame(() => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = performance.now() * 0.001 * speed;
    for (let i = 0; i < count; i++) {
      const y = arr[i * 3 + 1] + Math.sin(t + i) * 0.0006 * speed * 3;
      arr[i * 3 + 1] = y;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
