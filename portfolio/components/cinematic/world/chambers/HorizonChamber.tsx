// components/cinematic/world/chambers/HorizonChamber.tsx
// 06 — THE HORIZON. The world opens; contact is engraved; the film ends.

"use client";

import type * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Chamber,
  WindowPointLight,
  Dust,
  makeTextTexture,
  mulberry32,
  PALETTE,
} from "../kit";
import { profile } from "@/lib/data/profile";

function ContactMonolith() {
  const tex = useMemo(
    () =>
      makeTextTexture(
        `CONTACT\n\n${profile.email}\n${profile.socials
          .map((s) => s.label)
          .join("  ·  ")}\n\n— the horizon is open —`,
        {
          fontSize: 30,
          font: "500 30px 'JetBrains Mono', monospace",
          color: "#f0ede8",
          padding: 56,
          maxWidth: 900,
        }
      ),
    []
  );
  const aspect = tex.width / tex.height;
  const w = 4.4;
  const h = w / aspect;
  return (
    <group position={[0, 2.1, -306]} rotation={[0, 0, 0]}>
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[w + 0.3, h + 0.3, 0.3]} />
        <meshStandardMaterial color="#171612" roughness={0.75} metalness={0.2} />
      </mesh>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex.texture} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

function Sun() {
  return (
    <group position={[0, 2.4, -430]}>
      <mesh>
        <circleGeometry args={[16, 64]} />
        <meshBasicMaterial color={PALETTE.sun} fog={false} />
      </mesh>
      <mesh>
        <circleGeometry args={[22, 64]} />
        <meshBasicMaterial
          color={PALETTE.sun}
          transparent
          opacity={0.12}
          fog={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Stars({ count = 220 }: { count?: number }) {
  const positions = useMemo(() => {
    const rand = mulberry32(0x57a7 + count);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 70;
      arr[i * 3 + 1] = 2 + rand() * 14;
      arr[i * 3 + 2] = -300 - rand() * 130;
    }
    return arr;
  }, [count]);
  const ref = useRef<THREE.Points>(null);
  useFrame(() => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.25 + Math.sin(performance.now() * 0.0006) * 0.15;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#e6ddc9"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HorizonChamber() {
  return (
    <Chamber window={[0.835, 1.0]}>
      <Sun />
      <Stars />
      <ContactMonolith />

      {/* NOTHING HAPPENED. — the last frame, very quiet */}
      <group position={[0, 0.25, -296]}>
        <mesh>
          <planeGeometry args={[3.2, 0.34]} />
          <meshBasicMaterial
            map={
              makeTextTexture("NOTHING HAPPENED.", {
                fontSize: 20,
                font: "500 20px 'JetBrains Mono', monospace",
                color: "#6a624f",
                padding: 8,
                maxWidth: 600,
              }).texture
            }
            transparent
            toneMapped={false}
          />
        </mesh>
      </group>

      <WindowPointLight
        position={[0, 4, -306]}
        color="#e9c88a"
        intensity={60}
        distance={40}
        window={[0.8, 1.1]}
      />
      <Dust
        count={50}
        spread={[40, 8, 60]}
        center={[0, 2.5, -340]}
        color="#e3c690"
        size={0.02}
        speed={0.1}
      />
    </Chamber>
  );
}
