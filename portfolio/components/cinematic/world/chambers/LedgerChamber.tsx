// components/cinematic/world/chambers/LedgerChamber.tsx
// 05 — THE LEDGER (experience + education). Records room, warm.

"use client";

import { useMemo } from "react";
import {
  Bay,
  Chamber,
  WindowPointLight,
  Dust,
  Plaque,
  WallWithOpening,
  makeTextTexture,
} from "../kit";

function Dossier() {
  const tex = useMemo(
    () =>
      makeTextTexture(
        "PYTHON DEVELOPER INTERN\nAICTE Code Technologies\nJune – July 2025\n\nModular Python · OOP · File handling\nDebugging · Code optimization",
        {
          fontSize: 30,
          font: "500 30px 'JetBrains Mono', monospace",
          color: "#26221a",
          padding: 40,
          maxWidth: 760,
        }
      ),
    []
  );
  const aspect = tex.width / tex.height;
  const w = 3.4;
  const h = w / aspect;
  return (
    <group position={[0, -0.3, -256.4]} rotation={[-0.12, 0, 0]}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#e6ddc9" roughness={0.9} map={tex.texture} />
      </mesh>
    </group>
  );
}

export default function LedgerChamber() {
  return (
    <Chamber window={[0.71, 0.845]}>
      <Bay width={13} depth={24} zCenter={-252}>
        <WallWithOpening width={13} position={[0, 0, -264]}>
          <Plaque
            text="Python Developer Intern"
            sub="AICTE Code Technologies · June–July 2025"
            position={[0, 3.25, 0.1]}
            width={3.2}
            subSize={12}
          />
          <Plaque
            text="NIET"
            sub="B.Tech CSE · 8.4 CGPA · Expected 2028"
            position={[-4.6, 1.4, 0.1]}
            width={2.0}
            subSize={11}
          />
          <Plaque
            text="K.V. Raebareli"
            sub="12th Grade · 2021–22"
            position={[4.6, 1.4, 0.1]}
            width={2.0}
            subSize={11}
          />
          <Plaque
            text="Python Internship"
            sub="AICTE Code Technologies"
            position={[-4.6, -0.7, 0.1]}
            width={1.6}
            subSize={10}
          />
          <Plaque
            text="Bootstrap"
            sub="Infosys Springboard"
            position={[4.6, -0.7, 0.1]}
            width={1.5}
            subSize={10}
          />
          <Plaque
            text="DBMS"
            sub="Infosys Springboard"
            position={[4.6, -1.0, 0.1]}
            width={1.5}
            subSize={10}
          />
        </WallWithOpening>

        {/* desk */}
        <group position={[0, 0, -256]}>
          <mesh position={[0, -0.72, 0]}>
            <boxGeometry args={[3.6, 0.14, 1.3]} />
            <meshStandardMaterial color="#241f18" roughness={0.7} />
          </mesh>
          <mesh position={[-1.6, -1.3, 0.5]}>
            <boxGeometry args={[0.12, 1.2, 0.12]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          <mesh position={[1.6, -1.3, 0.5]}>
            <boxGeometry args={[0.12, 1.2, 0.12]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          <mesh position={[-1.6, -1.3, -0.5]}>
            <boxGeometry args={[0.12, 1.2, 0.12]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
          <mesh position={[1.6, -1.3, -0.5]}>
            <boxGeometry args={[0.12, 1.2, 0.12]} />
            <meshStandardMaterial color="#171612" roughness={0.8} />
          </mesh>
        </group>

        <Dossier />

        <WindowPointLight
          position={[0, 1.2, -252]}
          color="#e9c88a"
          intensity={38}
          distance={18}
          window={[0.715, 0.845]}
        />
        <Dust
          count={28}
          spread={[10, 4, 20]}
          center={[0, 1.7, -252]}
          color="#cbb37f"
          size={0.016}
        />
      </Bay>
    </Chamber>
  );
}
