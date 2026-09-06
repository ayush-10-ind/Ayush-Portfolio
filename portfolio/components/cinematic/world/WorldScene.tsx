// components/cinematic/world/WorldScene.tsx
// The whole continuous world: one floor, global light, all chambers and the
// physical transitions between them.

"use client";

import { useMemo } from "react";
import { makeGridTexture } from "./kit";
import ThresholdChamber from "./chambers/ThresholdChamber";
import StudyChamber from "./chambers/StudyChamber";
import WorkshopChamber from "./chambers/WorkshopChamber";
import EngineChamber from "./chambers/EngineChamber";
import ObservatoryChamber from "./chambers/ObservatoryChamber";
import LedgerChamber from "./chambers/LedgerChamber";
import HorizonChamber from "./chambers/HorizonChamber";
import {
  CorridorTransition,
  TypographyPortal,
  EngineCore,
  DossierTransition,
  HorizonOpening,
} from "./transitions/Transitions";

export default function WorldScene() {
  const floorTex = useMemo(() => makeGridTexture(), []);

  return (
    <>
      <ambientLight color="#413d37" intensity={0.28} />
      <directionalLight position={[6, 10, 4]} color="#ffe6c4" intensity={0.55} />

      {/* continuous floor — one shot, one ground plane */}
      <mesh position={[0, -1.7, -190]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 460]} />
        <meshStandardMaterial map={floorTex} roughness={0.9} />
      </mesh>

      {/* chambers */}
      <ThresholdChamber />
      <StudyChamber />
      <WorkshopChamber />
      <EngineChamber />
      <ObservatoryChamber />
      <LedgerChamber />
      <HorizonChamber />

      {/* physical transitions */}
      <CorridorTransition />
      <TypographyPortal />
      <EngineCore />
      <DossierTransition />
      <HorizonOpening />
    </>
  );
}
