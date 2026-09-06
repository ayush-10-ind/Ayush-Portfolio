// components/cinematic/world/transitions/Transitions.tsx
// Physical connective tissue between chambers. The camera passes THROUGH
// these — they are the wipes, never opacity fades.

"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Chamber, WindowPointLight, makeTextTexture } from "../kit";
import { runtime } from "@/lib/cinematic/runtime";
import { clamp01, easeInOutCubic } from "@/lib/cinematic/easing";

/* ── CORRIDOR (Study → Workshop): walls pinch, forward travel ── */
export function CorridorTransition() {
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const p = runtime.progress;
    const k = easeInOutCubic(clamp01((p - 0.235) / 0.035));
    if (left.current) left.current.position.x = -2.1 - k * 1.1;
    if (right.current) right.current.position.x = 2.1 + k * 1.1;
  });

  return (
    <Chamber window={[0.225, 0.285]}>
      <group position={[0, 0, -64]}>
        {/* corridor walls */}
        <mesh ref={left} position={[-2.1, 1.6, -6]}>
          <boxGeometry args={[0.3, 6.2, 16]} />
          <meshStandardMaterial color="#14130f" roughness={0.95} />
        </mesh>
        <mesh ref={right} position={[2.1, 1.6, -6]}>
          <boxGeometry args={[0.3, 6.2, 16]} />
          <meshStandardMaterial color="#14130f" roughness={0.95} />
        </mesh>
        <mesh position={[0, 4.75, -6]}>
          <boxGeometry args={[5, 0.4, 16]} />
          <meshStandardMaterial color="#0d0c0a" roughness={0.95} />
        </mesh>
        {/* light at the far end */}
        <mesh position={[0, 2, -13.6]}>
          <planeGeometry args={[3.6, 4.4]} />
          <meshBasicMaterial color="#e9c88a" transparent opacity={0.9} toneMapped={false} />
        </mesh>
        <WindowPointLight
          position={[0, 2, -14]}
          color="#e9c88a"
          intensity={26}
          distance={16}
          window={[0.235, 0.27]}
        />
      </group>
    </Chamber>
  );
}

/* ── TYPOGRAPHY PORTAL (Workshop → Engine): the word becomes a door ── */
const WORD = "AGNIPRESS".split("");

export function TypographyPortal() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const p = runtime.progress;
    const k = easeInOutCubic(clamp01((p - 0.4) / 0.04));
    group.current.children.forEach((child, i) => {
      const base = (i - (WORD.length - 1) / 2) * 1.9;
      const dir = base >= 0 ? 1 : -1;
      child.position.x = base + dir * k * 4.5;
      child.position.y = 0 + k * 0.4;
    });
  });

  return (
    <Chamber window={[0.39, 0.55]}>
      <group position={[0, 1.7, -122]}>
        <group ref={group}>
          {WORD.map((letter, i) => (
            <Letter key={`${letter}-${i}`} letter={letter} index={i} />
          ))}
        </group>
        {/* the door frame it sits in */}
        <mesh position={[0, 0.1, 0.3]}>
          <boxGeometry args={[24, 5.6, 0.2]} />
          <meshStandardMaterial color="#0a0a09" roughness={0.95} />
        </mesh>
      </group>
    </Chamber>
  );
}

function Letter({ letter, index }: { letter: string; index: number }) {
  const tex = useMemo(
    () =>
      makeTextTexture(letter, {
        fontSize: 200,
        font: "600 200px 'Playfair Display', Georgia, serif",
        color: "#d4a853",
        padding: 20,
        maxWidth: 400,
      }),
    [letter]
  );
  const aspect = tex.width / tex.height;
  const h = 3.2;
  const w = h * aspect;
  return (
    <group position={[(index - (WORD.length - 1) / 2) * 1.9, 0, 0]}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex.texture} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── ENGINE CORE (Engine → Observatory): spatial zoom into the machine ── */
export function EngineCore() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const t = performance.now() * 0.001;
    const p = runtime.progress;
    const k = clamp01((p - 0.545) / 0.035);
    group.current.rotation.z = t * 0.6;
    group.current.rotation.x = t * 0.3;
    const s = 1 + k * 0.5;
    group.current.scale.setScalar(s);
  });

  return (
    <Chamber window={[0.535, 0.62]}>
      <group position={[0, 1.5, -176]}>
        <group ref={group}>
          <mesh>
            <torusGeometry args={[2.2, 0.06, 12, 64]} />
            <meshStandardMaterial
              color="#d4a853"
              emissive="#d4a853"
              emissiveIntensity={0.6}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.7, 0.05, 12, 64]} />
            <meshStandardMaterial
              color="#8a6a33"
              emissive="#8a6a33"
              emissiveIntensity={0.5}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[1.3, 0.04, 12, 64]} />
            <meshStandardMaterial
              color="#cbb37f"
              emissive="#cbb37f"
              emissiveIntensity={0.5}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.5, 24, 24]} />
            <meshStandardMaterial
              color="#1a1408"
              emissive="#d4a853"
              emissiveIntensity={1.6}
            />
          </mesh>
        </group>
      </group>
    </Chamber>
  );
}

/* ── DOSSIER (Observatory → Ledger): a page sweeps across the lens ── */
export function DossierTransition() {
  const page = useRef<THREE.Group>(null);
  const tex = useMemo(
    () =>
      makeTextTexture("CASE FILE", {
        fontSize: 90,
        font: "600 90px 'Playfair Display', Georgia, serif",
        color: "#26221a",
        padding: 30,
        maxWidth: 500,
      }),
    []
  );

  useFrame(() => {
    if (!page.current) return;
    const p = runtime.progress;
    const k = clamp01((p - 0.685) / 0.03);
    const x = -10 + easeInOutCubic(k) * 20;
    page.current.position.x = x;
    page.current.rotation.y = Math.sin(k * Math.PI) * 0.6;
    page.current.position.z = -222 + k * -6;
  });

  const aspect = tex.width / tex.height;
  const h = 6;
  const w = h * aspect;
  return (
    <Chamber window={[0.68, 0.72]}>
      <group ref={page} position={[-10, 1.7, -222]}>
        <mesh>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={tex.texture} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Chamber>
  );
}

/* ── HORIZON OPENING (Ledger → Horizon): walls slide apart ── */
export function HorizonOpening() {
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const top = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const p = runtime.progress;
    const k = easeInOutCubic(clamp01((p - 0.805) / 0.035));
    if (left.current) left.current.position.x = -7 - k * 9;
    if (right.current) right.current.position.x = 7 + k * 9;
    if (top.current) top.current.position.y = 4.6 + k * 7;
  });

  return (
    <Chamber window={[0.795, 0.85]}>
      <group position={[0, 0, -278]}>
        <mesh ref={left} position={[-7, 1.5, 0]}>
          <boxGeometry args={[0.6, 6.4, 1]} />
          <meshStandardMaterial color="#191815" roughness={0.92} />
        </mesh>
        <mesh ref={right} position={[7, 1.5, 0]}>
          <boxGeometry args={[0.6, 6.4, 1]} />
          <meshStandardMaterial color="#191815" roughness={0.92} />
        </mesh>
        <mesh ref={top} position={[0, 4.6, 0]}>
          <boxGeometry args={[16, 0.6, 1]} />
          <meshStandardMaterial color="#12110e" roughness={0.95} />
        </mesh>
        {/* warm flood beyond the opening */}
        <WindowPointLight
          position={[0, 3, -8]}
          color="#e9c88a"
          intensity={70}
          distance={50}
          window={[0.805, 0.9]}
        />
      </group>
    </Chamber>
  );
}
