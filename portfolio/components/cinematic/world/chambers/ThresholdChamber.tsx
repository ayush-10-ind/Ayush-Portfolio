// components/cinematic/world/chambers/ThresholdChamber.tsx
// 00 — ARRIVAL. A dark void, a light shaft, dust, and a gate that parts.

"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Chamber, WindowPointLight, Dust, makeTextTexture } from "../kit";
import { runtime } from "@/lib/cinematic/runtime";
import { clamp01 } from "@/lib/cinematic/easing";

function GateName() {
  const tex = useMemo(
    () =>
      makeTextTexture("AYUSH TRIVEDI", {
        fontSize: 132,
        font: "600 132px 'Playfair Display', Georgia, serif",
        color: "#e9d9b0",
        padding: 60,
        maxWidth: 1600,
        letterSpacing: 8,
      }),
    []
  );
  const aspect = tex.width / tex.height;
  const h = 2.6;
  const w = h * aspect;
  return (
    <group position={[0, 2.9, -13.2]}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex.texture} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, -h / 2 - 0.3, 0]}>
        <planeGeometry args={[w * 0.7, 0.02]} />
        <meshBasicMaterial color="#d4a853" />
      </mesh>
    </group>
  );
}

function Gate() {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);

  useFrame(() => {
    // part during 0.07..0.10 as the camera passes through
    const p = runtime.progress;
    const k = clamp01((p - 0.072) / 0.028);
    const eased = k * k * (3 - 2 * k); // smoothstep
    if (left.current) left.current.position.x = -3.4 - eased * 2.4;
    if (right.current) right.current.position.x = 3.4 + eased * 2.4;
  });

  return (
    <group position={[0, 0, -16]}>
      {/* lintel */}
      <mesh position={[0, 3.4, 0]}>
        <boxGeometry args={[14, 1.1, 0.6]} />
        <meshStandardMaterial color="#14130f" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* monoliths */}
      <group ref={left}>
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[2.4, 8, 0.7]} />
          <meshStandardMaterial color="#171612" roughness={0.75} metalness={0.25} />
        </mesh>
      </group>
      <group ref={right}>
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[2.4, 8, 0.7]} />
          <meshStandardMaterial color="#171612" roughness={0.75} metalness={0.25} />
        </mesh>
      </group>
      {/* gold threshold strip */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[11, 0.08, 0.75]} />
        <meshStandardMaterial color="#d4a853" metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  );
}

/** The dark plane the camera passes through — the physical "wipe". */
function ThresholdPlane() {
  return (
    <mesh position={[0, 1.5, -15]} rotation={[0, 0, 0]}>
      <planeGeometry args={[60, 40]} />
      <meshBasicMaterial color="#040405" />
    </mesh>
  );
}

export default function ThresholdChamber() {
  return (
    <>
      <Chamber window={[0.0, 0.1]}>
        <GateName />
        <Gate />
        <ThresholdPlane />
        <WindowPointLight
          position={[0, 4.5, -8]}
          color="#e9c88a"
          intensity={60}
          distance={30}
          window={[-0.05, 0.1]}
        />
        <Dust
          count={70}
          spread={[16, 7, 18]}
          center={[0, 2.2, -9]}
          color="#e3c690"
        />
      </Chamber>
    </>
  );
}
