// components/cinematic/world/chambers/EngineChamber.tsx
// 03 — THE ENGINE (AgniPress). An instrumented press whose center is the
// portal to the core.

"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Bay,
  Chamber,
  WindowPointLight,
  Dust,
  Tag,
  Plaque,
  WallWithOpening,
} from "../kit";

const NODES: { label: string; pos: [number, number, number] }[] = [
  { label: "Sources", pos: [-4.4, 1.15, -140] },
  { label: "Scheduler", pos: [-2.2, 1.15, -144] },
  { label: "API", pos: [0, 1.15, -148] },
  { label: "DB", pos: [2.2, 1.15, -152] },
  { label: "Feed", pos: [4.4, 1.15, -156] },
];

const LEFT_TAGS = [
  { text: "Java 21", pos: [-3.6, 2.6, -156.5] as [number, number, number] },
  { text: "WebClient", pos: [-3.6, 1.9, -156.5] as [number, number, number] },
  { text: "Schedulers", pos: [-3.6, 1.2, -156.5] as [number, number, number] },
  { text: "REST APIs", pos: [-3.6, 0.5, -156.5] as [number, number, number] },
];

const RIGHT_TAGS = [
  { text: "Spring Boot 3", pos: [3.6, 2.6, -156.5] as [number, number, number] },
  { text: "Spring Data JPA", pos: [3.6, 1.9, -156.5] as [number, number, number] },
  { text: "Spring Security", pos: [3.6, 1.2, -156.5] as [number, number, number] },
  { text: "Oracle DB", pos: [3.6, 0.5, -156.5] as [number, number, number] },
];

function Pipeline() {
  const flow = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!flow.current) return;
    const t = (performance.now() * 0.001) * 0.6;
    const i = Math.floor(t) % (NODES.length - 1);
    const f = t - Math.floor(t);
    const a = NODES[i].pos;
    const b = NODES[i + 1].pos;
    flow.current.position.set(
      a[0] + (b[0] - a[0]) * f,
      a[1] + (b[1] - a[1]) * f,
      a[2] + (b[2] - a[2]) * f
    );
  });

  return (
    <group>
      {NODES.map((n, i) => (
        <group key={n.label}>
          <mesh position={n.pos}>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color="#2a2824" metalness={0.7} roughness={0.4} />
          </mesh>
          <mesh position={[n.pos[0], n.pos[1], n.pos[2] + 0.01]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#e9c88a"
              emissive="#d4a853"
              emissiveIntensity={1.6}
            />
          </mesh>
          <Tag
            text={n.label}
            position={[n.pos[0], n.pos[1] - 0.62, n.pos[2]]}
            color="#b7ad96"
            fontSize={16}
          />
          {i < NODES.length - 1 && (
            <mesh
              position={[
                (n.pos[0] + NODES[i + 1].pos[0]) / 2,
                n.pos[1],
                (n.pos[2] + NODES[i + 1].pos[2]) / 2,
              ]}
            >
              <boxGeometry
                args={[
                  Math.hypot(
                    NODES[i + 1].pos[0] - n.pos[0],
                    NODES[i + 1].pos[2] - n.pos[2]
                  ) + 0.2,
                  0.05,
                  0.05,
                ]}
              />
              <meshStandardMaterial color="#d4a853" metalness={0.6} roughness={0.4} />
            </mesh>
          )}
        </group>
      ))}
      <mesh ref={flow}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#fff2d4"
          emissive="#e9c88a"
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  );
}

/** Two press columns framing the opening to the core. */
function PressColumns() {
  return (
    <group position={[0, 0, -157]}>
      {[-3.6, 3.6].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[2.1, 3.4, 1.6]} />
            <meshStandardMaterial color="#2a2824" metalness={0.55} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.72, 0.82]}>
            <boxGeometry args={[2.1, 0.05, 0.05]} />
            <meshStandardMaterial
              color="#e9c88a"
              emissive="#d4a853"
              emissiveIntensity={1.2}
            />
          </mesh>
          <mesh position={[0, 1.9, 0.82]}>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 18]} />
            <meshStandardMaterial color="#d4a853" metalness={0.7} roughness={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function EngineChamber() {
  return (
    <Chamber window={[0.43, 0.59]}>
      <Bay width={13} depth={26} zCenter={-146}>
        <WallWithOpening width={13} position={[0, 0, -159]}>
          <Plaque
            text="AgniPress"
            sub="News & Content Engine"
            position={[0, 3.2, 0.1]}
            width={2.6}
            subSize={12}
          />
        </WallWithOpening>

        <PressColumns />
        {LEFT_TAGS.map((t) => (
          <Tag key={t.text} text={t.text} position={t.pos} color="#e6ddc9" fontSize={16} />
        ))}
        {RIGHT_TAGS.map((t) => (
          <Tag key={t.text} text={t.text} position={t.pos} color="#e6ddc9" fontSize={16} />
        ))}

        <Pipeline />

        <WindowPointLight
          position={[0, 3, -146]}
          color="#e9c88a"
          intensity={40}
          distance={22}
          window={[0.435, 0.59]}
        />
        <WindowPointLight
          position={[0, 0.6, -140]}
          color="#d4a853"
          intensity={18}
          distance={14}
          window={[0.435, 0.59]}
        />
        <Dust
          count={24}
          spread={[10, 4, 20]}
          center={[0, 1.6, -146]}
          color="#cbb37f"
          size={0.015}
        />
      </Bay>
    </Chamber>
  );
}
