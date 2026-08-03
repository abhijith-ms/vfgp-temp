"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { ProcessStage } from "./types";

interface ProcessModelViewerProps {
  stages: ProcessStage[];
  activeStageIndex: number;
}

// Only ever reached via next/dynamic({ ssr: false }) from ProcessStorySection,
// same as the old (now orphaned) ProcessCanvas — keeps three/@react-three/*
// entirely out of the initial bundle. Replaces ProcessIllustration's flat SVG
// as the pinned story's primary visual: one real GLB "hero shot" per stage
// (public/3d/*.glb — actual mold/hand/tool scans, not abstract geometry),
// crossfaded and cinematically camera-directed as activeStageIndex changes.
// Knows nothing about hand lay-up specifically — stage content/models/camera
// data all come from the given ProcessStage[].
export default function ProcessModelViewer({ stages, activeStageIndex }: ProcessModelViewerProps) {
  // All 5 stage GLBs are preloaded once, up front, the moment this dynamic
  // chunk actually loads — never lazily per stage-change, so scrolling
  // through stages never shows a load-in pop. useGLTF.preload is a plain
  // static method (not a hook), safe to call imperatively here.
  useEffect(() => {
    stages.forEach((stage) => useGLTF.preload(stage.modelUrl));
  }, [stages]);

  const initialStage = stages[activeStageIndex] ?? stages[0];

  return (
    <div
      className="absolute inset-0"
      style={{
        // Subtle radial studio backdrop instead of flat navy — reads as a
        // product-photography cove rather than a flat color fill. Canvas
        // itself renders with an alpha-transparent clear so this shows through.
        background: "radial-gradient(circle at 50% 38%, #16294f 0%, #0a1628 62%, #05090f 100%)",
      }}
    >
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <PerspectiveCamera
          makeDefault
          position={initialStage.camera.position}
          fov={initialStage.camera.fov}
        />
        <CameraDirector stages={stages} activeStageIndex={activeStageIndex} />

        {/* Four-light product-photography rig (tuned in-browser against the
            actual neutral-gray geometry, not guessed): key for primary form
            reveal, fill to lift shadows, a brand-orange rim for a premium
            backlit edge, and a soft ground-bounce mimicking a studio table. */}
        <ambientLight color="#3a5a8b" intensity={0.5} />
        <directionalLight color="#ffffff" intensity={3.4} position={[2.6, 5, 3.2]} />
        <directionalLight color="#8fb4e8" intensity={1.1} position={[-3.2, 2, -1.2]} />
        <directionalLight color="#f47c20" intensity={2.6} position={[-1.5, 1.8, -3.5]} />
        <directionalLight color="#cbd5e1" intensity={0.5} position={[0, -2.2, 1.5]} />

        {stages.map((stage, index) => (
          <StageModel key={stage.id} stage={stage} index={index} activeStageIndex={activeStageIndex} />
        ))}
      </Canvas>
    </div>
  );
}

const CAMERA_DAMP_LAMBDA = 4;
const FLOURISH_SCALE_FROM = 0.96;
const FLOURISH_ROTATION_FROM = 0.05; // radians

// Mobile/portrait aspect compensation — every stage's camera keyframe was
// calibrated against a wide desktop viewport. Three.js PerspectiveCamera.fov
// is *vertical* FOV, so on a narrow portrait viewport the effective
// horizontal FOV collapses and these wider-than-tall tray/hand compositions
// crop hard at the sides. Rather than widen FOV (introduces fisheye-like
// distortion), pull the camera back along its own view direction on
// viewports narrower than REFERENCE_ASPECT — same fix already proven on
// this feature's earlier procedural build (see the retired CameraRig.tsx),
// re-derived here since each stage is now its own independent shot rather
// than one continuous scene. COMPENSATION_STRENGTH < 1 (partial, not full,
// compensation) avoids the subject shrinking to a speck on very narrow
// phones; MAX_COMPENSATION_SCALE is a relative cap (not an absolute unit
// distance like the old system used) so it scales correctly regardless of
// a given stage's own base distance.
const REFERENCE_ASPECT = 16 / 9;
const COMPENSATION_STRENGTH = 0.65;
const MAX_COMPENSATION_SCALE = 1.9;

const tmpBaseTarget = new THREE.Vector3();
const tmpBasePos = new THREE.Vector3();
const tmpOffset = new THREE.Vector3();
const tmpDesiredPos = new THREE.Vector3();
const AXIS_Y = new THREE.Vector3(0, 1, 0);

interface CameraDirectorProps {
  stages: ProcessStage[];
  activeStageIndex: number;
}

// Drives the camera continuously: every frame it computes the *desired*
// pose for the currently-active stage (its base `camera` keyframe plus that
// stage's own subtle cameraMotion — orbit or push-in — as a function of
// elapsed time), then damps the real camera toward it. Damping (rather than
// an explicit timed transition) means a stage change mid-motion eases from
// wherever the camera actually is, never pops, and needs no snapshot/timer
// bookkeeping. Deliberately scoped to one stage at a time — unlike the old
// CameraRig.tsx, there is no continuous cross-stage lerp path, since each
// stage's GLB is its own independent coordinate space now, not one shared scene.
function CameraDirector({ stages, activeStageIndex }: CameraDirectorProps) {
  const { camera, size } = useThree();
  const currentTargetRef = useRef(new THREE.Vector3(...stages[activeStageIndex].camera.target));

  useFrame((state, delta) => {
    const stage = stages[activeStageIndex];
    const { camera: keyframe, cameraMotion } = stage;
    const t = state.clock.getElapsedTime();

    tmpBaseTarget.set(...keyframe.target);
    tmpBasePos.set(...keyframe.position);
    tmpOffset.copy(tmpBasePos).sub(tmpBaseTarget);

    if (cameraMotion.type === "orbit") {
      const angle =
        THREE.MathUtils.degToRad(cameraMotion.amplitude) * Math.sin((2 * Math.PI * t) / cameraMotion.periodSeconds);
      tmpOffset.applyAxisAngle(AXIS_Y, angle);
    } else {
      const factor = 1 + cameraMotion.amplitude * Math.sin((2 * Math.PI * t) / cameraMotion.periodSeconds);
      tmpOffset.multiplyScalar(factor);
    }

    const aspect = size.width / size.height;
    if (aspect < REFERENCE_ASPECT) {
      const fullCompensation = REFERENCE_ASPECT / aspect;
      const distanceScale = Math.min(1 + (fullCompensation - 1) * COMPENSATION_STRENGTH, MAX_COMPENSATION_SCALE);
      tmpOffset.multiplyScalar(distanceScale);
    }

    tmpDesiredPos.copy(tmpBaseTarget).add(tmpOffset);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, tmpDesiredPos.x, CAMERA_DAMP_LAMBDA, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, tmpDesiredPos.y, CAMERA_DAMP_LAMBDA, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tmpDesiredPos.z, CAMERA_DAMP_LAMBDA, delta);

    currentTargetRef.current.x = THREE.MathUtils.damp(currentTargetRef.current.x, tmpBaseTarget.x, CAMERA_DAMP_LAMBDA, delta);
    currentTargetRef.current.y = THREE.MathUtils.damp(currentTargetRef.current.y, tmpBaseTarget.y, CAMERA_DAMP_LAMBDA, delta);
    currentTargetRef.current.z = THREE.MathUtils.damp(currentTargetRef.current.z, tmpBaseTarget.z, CAMERA_DAMP_LAMBDA, delta);
    camera.lookAt(currentTargetRef.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      const fov = THREE.MathUtils.damp(camera.fov, keyframe.fov, CAMERA_DAMP_LAMBDA, delta);
      if (Math.abs(camera.fov - fov) > 0.001) {
        // Imperative mutation of the r3f-provided camera is the standard,
        // required pattern inside useFrame — not a real immutability bug.
        // eslint-disable-next-line react-hooks/immutability
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}

interface StageModelProps {
  stage: ProcessStage;
  index: number;
  activeStageIndex: number;
}

const OPACITY_DAMP_LAMBDA = 6;

// One real GLB "hero shot" per stage. All 5 are mounted simultaneously
// (post-preload) and stay mounted for the section's lifetime — only opacity/
// scale/rotation change on stage transitions, never a remount — so nothing
// ever re-loads or pops mid-scroll.
function StageModel({ stage, index, activeStageIndex }: StageModelProps) {
  const { scene } = useGLTF(stage.modelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const opacityRef = useRef(index === activeStageIndex ? 1 : 0);
  const baseRotation = stage.modelRotation ?? [0, 0, 0];

  // These GLBs have only a POSITION attribute (trimesh exports from arbitrary
  // point-cloud scans) — no NORMAL, no material. three's GLTFLoader does NOT
  // auto-generate normals when absent (it only flags its default material
  // flatShading = true), so smooth lighting requires computing them ourselves,
  // once, and rendering with our own material rather than the loader's.
  const geometry = useMemo(() => {
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) meshes.push(child as THREE.Mesh);
    });
    const found = meshes[0]?.geometry ?? null;
    if (found && !found.attributes.normal) {
      found.computeVertexNormals();
    }
    return found;
  }, [scene]);

  useFrame((_state, delta) => {
    const target = index === activeStageIndex ? 1 : 0;
    opacityRef.current = THREE.MathUtils.damp(opacityRef.current, target, OPACITY_DAMP_LAMBDA, delta);
    const progress = opacityRef.current;
    const visible = progress > 0.001;

    if (groupRef.current) {
      groupRef.current.visible = visible;
      // Small scale/rotation flourish tied to the same fade progress as
      // opacity — an intentional "match cut" (content settles into place as
      // it fades in, drifts slightly as it fades out) rather than a plain
      // dissolve underneath a moving camera.
      const scale = THREE.MathUtils.lerp(FLOURISH_SCALE_FROM, 1, progress);
      groupRef.current.scale.setScalar(scale);
      groupRef.current.rotation.set(
        baseRotation[0],
        baseRotation[1] + THREE.MathUtils.lerp(FLOURISH_ROTATION_FROM, 0, progress),
        baseRotation[2]
      );
    }
    if (materialRef.current) {
      materialRef.current.opacity = progress;
    }
  });

  if (!geometry) return null;

  return (
    // dispose={null}: geometry/scene come from useGLTF's shared cache (keyed
    // by URL, not per-instance) — R3F's default auto-dispose-on-unmount
    // would tear down those shared GPU buffers the moment this remounts
    // (Next.js dev mode double-mounts every component once via React Strict
    // Mode), leaving the *next* mount rendering already-disposed buffers,
    // which reliably crashed the WebGL context ("Context Lost") in testing.
    <group ref={groupRef} dispose={null}>
      <Center>
        <mesh geometry={geometry}>
          <meshPhysicalMaterial
            ref={materialRef}
            color="#c7cdd6"
            roughness={0.5}
            metalness={0.1}
            clearcoat={0.15}
            clearcoatRoughness={0.4}
            transparent
            opacity={opacityRef.current}
          />
        </mesh>
      </Center>
    </group>
  );
}
