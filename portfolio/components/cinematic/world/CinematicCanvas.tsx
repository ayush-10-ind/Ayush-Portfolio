// components/cinematic/world/CinematicCanvas.tsx
// The WebGL stage. Loaded with ssr:false (WebGL is client-only).

"use client";

import { Canvas } from "@react-three/fiber";
import WorldScene from "./WorldScene";
import CameraRig from "./CameraRig";
import { runtime } from "@/lib/cinematic/runtime";
import { devicePixelCap } from "@/lib/cinematic/responsive";

export default function CinematicCanvas() {
  return (
    <Canvas
      dpr={devicePixelCap(runtime.variant)}
      camera={{ position: [0, 1.5, 4], fov: 55, near: 0.1, far: 540 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="cinematic-canvas"
    >
      <color attach="background" args={["#07080a"]} />
      <fog attach="fog" args={["#07080a", 20, 140]} />
      <WorldScene />
      <CameraRig />
    </Canvas>
  );
}
