// components/cinematic/world/chambers/StudyChamber.tsx
// 01 — THE STUDY. Warm desk-light, paper, engraved identity plaques.

"use client";

import {
  Bay,
  Chamber,
  WindowPointLight,
  Dust,
  Plaque,
  WallWithOpening,
} from "../kit";

export default function StudyChamber() {
  return (
    <Chamber window={[0.095, 0.27]}>
      <Bay width={13} depth={28} zCenter={-40}>
        {/* back wall with the doorway to the corridor */}
        <WallWithOpening width={13} position={[0, 0, -54]}>
          <Plaque
            text="Ayush Trivedi"
            sub="Computer Science & Engineering"
            position={[0, 3.25, 0.1]}
            width={3.4}
          />
          <Plaque
            text="NIET"
            sub="Greater Noida"
            position={[-4.6, 1.2, 0.1]}
            width={1.8}
            subSize={14}
          />
          <Plaque
            text="8.4 CGPA"
            sub="Expected 2028"
            position={[4.6, 1.2, 0.1]}
            width={1.8}
            subSize={14}
          />
        </WallWithOpening>

        {/* desk + lamp */}
        <group position={[0, 0, -46]}>
          <mesh position={[0, -0.55, 0]}>
            <boxGeometry args={[3.4, 0.14, 1.4]} />
            <meshStandardMaterial color="#241f18" roughness={0.7} />
          </mesh>
          <mesh position={[-1.5, -1.15, 0.5]}>
            <boxGeometry args={[0.12, 1.2, 0.12]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          <mesh position={[1.5, -1.15, 0.5]}>
            <boxGeometry args={[0.12, 1.2, 0.12]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          <mesh position={[-1.5, -1.15, -0.5]}>
            <boxGeometry args={[0.12, 1.2, 0.12]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          <mesh position={[1.5, -1.15, -0.5]}>
            <boxGeometry args={[0.12, 1.2, 0.12]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          {/* lamp */}
          <mesh position={[1.1, -0.32, 0]}>
            <cylinderGeometry args={[0.05, 0.09, 0.5, 12]} />
            <meshStandardMaterial color="#d4a853" metalness={0.7} roughness={0.4} />
          </mesh>
          <mesh position={[1.1, -0.06, 0]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color="#e9c88a"
              emissive="#e9c88a"
              emissiveIntensity={1.4}
            />
          </mesh>
        </group>

        <WindowPointLight
          position={[1.1, 0.4, -46]}
          color="#e9c88a"
          intensity={40}
          distance={18}
          window={[0.1, 0.27]}
        />
        <WindowPointLight
          position={[0, 2, -38]}
          color="#cfb787"
          intensity={26}
          distance={20}
          window={[0.1, 0.27]}
        />
        <Dust
          count={40}
          spread={[10, 4, 22]}
          center={[0, 1.8, -42]}
          color="#cbb37f"
          size={0.018}
        />
      </Bay>
    </Chamber>
  );
}
