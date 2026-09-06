// components/cinematic/world/chambers/WorkshopChamber.tsx
// 02 — THE WORKSHOP. Skills as physical labeled artifacts — no bars, no %.

"use client";

import {
  Bay,
  Chamber,
  WindowPointLight,
  Dust,
  Tag,
  WallWithOpening,
  PALETTE,
} from "../kit";

interface ClusterDef {
  title: string;
  skills: string[];
}

const LEFT: { y: number; def: ClusterDef }[] = [
  { y: 2.7, def: { title: "Programming", skills: ["Java", "Python", "JavaScript"] } },
  { y: 0.5, def: { title: "Backend", skills: ["Spring Boot", "Spring Data JPA"] } },
  { y: -0.9, def: { title: "Frontend", skills: ["React"] } },
];

const RIGHT: { y: number; def: ClusterDef }[] = [
  { y: 2.7, def: { title: "Database", skills: ["Oracle", "SQL"] } },
  { y: 0.5, def: { title: "Tools", skills: ["Git", "GitHub", "VS Code"] } },
  { y: -0.9, def: { title: "Core", skills: ["Data Structures & Algorithms", "LeetCode"] } },
];

function Cluster({ x, y, def }: { x: number; y: number; def: ClusterDef }) {
  return (
    <group position={[x, y, 0.1]}>
      <Tag text={def.title} position={[0, 0.72, 0]} color="#d4a853" fontSize={18} />
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[4.2, 0.02, 0.02]} />
        <meshBasicMaterial color={PALETTE.gold} />
      </mesh>
      {def.skills.map((s, i) => (
        <Tag
          key={s}
          text={s}
          position={[0, -0.06 - i * 0.44, 0]}
          color="#e6ddc9"
          fontSize={20}
        />
      ))}
    </group>
  );
}

export default function WorkshopChamber() {
  return (
    <Chamber window={[0.26, 0.44]}>
      <Bay width={15} depth={30} zCenter={-96}>
        {/* back wall — the skill wall with the portal doorway */}
        <WallWithOpening width={15} position={[0, 0, -111]}>
          {LEFT.map((c) => (
            <Cluster key={c.def.title} x={-5.0} y={c.y} def={c.def} />
          ))}
          {RIGHT.map((c) => (
            <Cluster key={c.def.title} x={5.0} y={c.y} def={c.def} />
          ))}
        </WallWithOpening>

        {/* workbench */}
        <group position={[0, 0, -100]}>
          <mesh position={[0, -0.6, 0]}>
            <boxGeometry args={[4, 0.16, 1.2]} />
            <meshStandardMaterial color="#241f18" roughness={0.7} />
          </mesh>
          <mesh position={[-1.7, -1.2, 0.4]}>
            <boxGeometry args={[0.14, 1.2, 0.14]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          <mesh position={[1.7, -1.2, 0.4]}>
            <boxGeometry args={[0.14, 1.2, 0.14]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          <mesh position={[-1.7, -1.2, -0.4]}>
            <boxGeometry args={[0.14, 1.2, 0.14]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          <mesh position={[1.7, -1.2, -0.4]}>
            <boxGeometry args={[0.14, 1.2, 0.14]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          {/* subtle easter egg: three quiet scratches */}
          {[-0.4, 0, 0.4].map((x) => (
            <mesh key={x} position={[x, -0.5, 0.61]}>
              <boxGeometry args={[0.03, 0.5, 0.01]} />
              <meshBasicMaterial color="#8a6a33" />
            </mesh>
          ))}
        </group>

        {/* discipline over noise */}
        <Tag
          text="DISCIPLINE OVER NOISE."
          position={[0, -0.9, -99]}
          color="#8a7a55"
          fontSize={18}
        />

        <WindowPointLight
          position={[0, 2.6, -104]}
          color="#e3c690"
          intensity={34}
          distance={20}
          window={[0.27, 0.44]}
        />
        <WindowPointLight
          position={[-4, 1.4, -92]}
          color="#cfb787"
          intensity={20}
          distance={16}
          window={[0.27, 0.44]}
        />
        <Dust
          count={30}
          spread={[12, 4, 24]}
          center={[0, 1.8, -98]}
          color="#cbb37f"
          size={0.016}
        />
      </Bay>
    </Chamber>
  );
}
