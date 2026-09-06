// components/cinematic/world/chambers/ObservatoryChamber.tsx
// 04 — THE OBSERVATORY (Explainable AI). A cool data constellation, not a
// dashboard: MODEL → PREDICTION → FEATURES → ATTRIBUTION → EXPLANATION.

"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Chamber, WindowPointLight, Dust, Tag } from "../kit";

const CHAIN: { label: string; pos: [number, number, number] }[] = [
  { label: "Model", pos: [0, 1.6, -210] },
  { label: "Prediction", pos: [2.7, 2.1, -204] },
  { label: "Features", pos: [4.6, 1.4, -199] },
  { label: "Attribution", pos: [3.0, 0.55, -195] },
  { label: "Explanation", pos: [0.4, 0.15, -191] },
];

function Flow({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const dot = useRef<THREE.Mesh>(null);
  const len = Math.hypot(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
  const mid: [number, number, number] = [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2,
  ];
  const angle = Math.atan2(to[2] - from[2], to[0] - from[0]);

  useFrame(() => {
    if (!dot.current) return;
    const f = (performance.now() * 0.001 * 0.5) % 1;
    dot.current.position.set(
      from[0] + (to[0] - from[0]) * f,
      from[1] + (to[1] - from[1]) * f,
      from[2] + (to[2] - from[2]) * f
    );
  });

  return (
    <group>
      <mesh position={mid} rotation={[0, angle, 0]}>
        <boxGeometry args={[len, 0.012, 0.012]} />
        <meshBasicMaterial color="#4a6276" transparent opacity={0.7} />
      </mesh>
      <mesh ref={dot}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#9fc2da" />
      </mesh>
    </group>
  );
}

function ModelNode() {
  const ring = useRef<THREE.Mesh>(null);
  const dots = useRef<THREE.Group>(null);

  useFrame(() => {
    const t = performance.now() * 0.001;
    if (ring.current) {
      ring.current.rotation.x = t * 0.4;
      ring.current.rotation.z = t * 0.22;
    }
    if (dots.current) dots.current.rotation.y = t * 0.35;
  });

  return (
    <group position={[0, 1.6, -210]}>
      <mesh>
        <sphereGeometry args={[1.1, 40, 40]} />
        <meshStandardMaterial color="#1a2430" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.6, 0.015, 8, 80]} />
        <meshBasicMaterial color="#4a6276" transparent opacity={0.6} />
      </mesh>
      <group ref={dots}>
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.6, 0, Math.sin(a) * 1.6]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshBasicMaterial color="#7f9bb0" />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function ObservatoryChamber() {
  return (
    <Chamber window={[0.575, 0.72]}>
      {/* cool, deep bay */}
      <group position={[0, 0, -202]}>
        <mesh position={[-8, 1.5, -13]}>
          <boxGeometry args={[0.3, 6.4, 26]} />
          <meshStandardMaterial color="#11151c" roughness={0.95} />
        </mesh>
        <mesh position={[8, 1.5, -13]}>
          <boxGeometry args={[0.3, 6.4, 26]} />
          <meshStandardMaterial color="#11151c" roughness={0.95} />
        </mesh>
        <mesh position={[0, 4.7, -13]}>
          <boxGeometry args={[16, 0.4, 26]} />
          <meshStandardMaterial color="#0d1117" roughness={0.95} />
        </mesh>
      </group>

      <ModelNode />

      {CHAIN.slice(1).map((n, i) => {
        const from = CHAIN[i].pos;
        return (
          <group key={n.label}>
            <Flow from={from} to={n.pos} />
            <mesh position={n.pos}>
              <sphereGeometry args={[0.22, 20, 20]} />
              <meshStandardMaterial
                color="#2a3a4a"
                emissive="#7f9bb0"
                emissiveIntensity={0.7}
                roughness={0.4}
              />
            </mesh>
            <Tag text={n.label} position={[n.pos[0], n.pos[1] - 0.55, n.pos[2]]} color="#9fc2da" fontSize={16} />
          </group>
        );
      })}

      <WindowPointLight
        position={[0, 2.6, -204]}
        color="#9fc2da"
        intensity={30}
        distance={22}
        window={[0.58, 0.72]}
      />
      <Dust
        count={60}
        spread={[14, 6, 24]}
        center={[0, 1.6, -200]}
        color="#7f9bb0"
        size={0.016}
        speed={0.15}
      />
    </Chamber>
  );
}
