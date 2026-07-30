"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import type { ProcessDefinition } from "./types";
import SceneObjectMesh from "./SceneObjectMesh";
import CameraRig from "./CameraRig";

interface ProcessCanvasProps {
  process: ProcessDefinition;
  progressRef: React.RefObject<number>;
}

// Only ever reached via next/dynamic({ ssr: false }) from ProcessStorySection —
// keeps three/@react-three/* entirely out of the initial/hero bundle.
// Knows nothing about hand lay-up specifically: it just renders whatever
// stages/objects/camera keyframes the given ProcessDefinition provides.
export default function ProcessCanvas({ process, progressRef }: ProcessCanvasProps) {
  const initialCamera = process.stages[0].camera;
  const objects = process.stages.flatMap((stage) => stage.objects);

  // This Canvas mounts asynchronously (lazy-loaded) inside a container GSAP's
  // ScrollTrigger pin restructures on the same mount pass. That race can make
  // the canvas's own resize-observer miss its first real measurement, leaving
  // it stuck at the browser's 300x150 default. One nudge after mount fixes it.
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
      <PerspectiveCamera makeDefault position={initialCamera.position} fov={initialCamera.fov} />
      <CameraRig stages={process.stages} progressRef={progressRef} />
      {/* R3F's default physically-correct lighting needs much higher intensities
          than classic three.js examples typically use, or the scene reads as
          near-black — tuned against the actual rendered result, not guessed. */}
      <ambientLight color="#3a5a8b" intensity={1.2} />
      <directionalLight color="#f47c20" intensity={5} position={[2.5, 5, 3]} />
      <directionalLight color="#8fb4e8" intensity={2.2} position={[-3, 2.5, -1.5]} />
      <directionalLight color="#ffffff" intensity={1.4} position={[0, 3, 5]} />
      {objects.map((object) => (
        <SceneObjectMesh key={object.id} object={object} progressRef={progressRef} />
      ))}
    </Canvas>
  );
}
