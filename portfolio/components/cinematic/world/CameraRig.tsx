// components/cinematic/world/CameraRig.tsx
// The real camera: spline target + critically-damped smoothing + idle drift.
// Never teleports; carries inertia; settles naturally.

"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { runtime } from "@/lib/cinematic/runtime";
import { sampleCameraPath } from "@/lib/cinematic/cameraPath";
import { getSceneIndexAtProgress } from "@/lib/cinematic/timeline";
import { damp, damp3 } from "@/lib/cinematic/damp";

const TMP_POS = new THREE.Vector3();
const TMP_LOOK = new THREE.Vector3();

export default function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;

  const s = useRef({
    pos: new THREE.Vector3(0, 1.5, 4),
    look: new THREE.Vector3(0, 1.5, -22),
    fov: 55,
    last: 0,
  });

  useFrame(() => {
    const now = performance.now();
    const dt = Math.min(0.05, s.current.last ? (now - s.current.last) / 1000 : 0.016);
    s.current.last = now;

    const p = runtime.progress;
    const pose = sampleCameraPath(runtime.variant, p);

    TMP_POS.set(pose.pos[0], pose.pos[1], pose.pos[2]);
    TMP_LOOK.set(pose.look[0], pose.look[1], pose.look[2]);

    const reduced = runtime.reducedMotion;
    const posLambda = reduced ? 30 : 3.1; // position: heavy, slow settle
    const lookLambda = reduced ? 30 : 2.7; // heading: slightly lighter
    const idle = reduced ? 0 : 1;

    damp3(s.current.pos, TMP_POS, posLambda, dt);
    damp3(s.current.look, TMP_LOOK, lookLambda, dt);
    s.current.fov = damp(s.current.fov, pose.fov, 3.0, dt);

    // subtle idle drift — the shot is never frozen while paused
    const t = now * 0.001;
    s.current.pos.y += Math.sin(t * 0.4) * 0.03 * idle;
    s.current.pos.x += Math.sin(t * 0.27) * 0.02 * idle;
    s.current.look.x += Math.sin(t * 0.31) * 0.1 * idle;
    s.current.look.y += Math.cos(t * 0.23) * 0.05 * idle;

    camera.position.copy(s.current.pos);
    camera.lookAt(s.current.look);
    if (Math.abs(camera.fov - s.current.fov) > 0.001) {
      camera.fov = s.current.fov;
      camera.updateProjectionMatrix();
    }

    // expose smoothed pose + scene index to the shared runtime
    runtime.camera.pos = [
      s.current.pos.x,
      s.current.pos.y,
      s.current.pos.z,
    ];
    runtime.camera.look = [
      s.current.look.x,
      s.current.look.y,
      s.current.look.z,
    ];
    runtime.camera.fov = s.current.fov;

    const idx = getSceneIndexAtProgress(p);
    if (idx !== runtime.sceneIndex) {
      runtime.sceneIndex = idx;
      runtime.notify();
    }
  });

  return null;
}
