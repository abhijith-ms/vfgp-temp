"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import * as THREE from "three";
import type { ProcessStage } from "./types";

interface ProcessEngineeringSceneProps {
  stages: ProcessStage[];
  activeStageIndex: number;
}

// Fully procedural "engineering illustration" scene, built from primitives,
// not the scanned GLBs. All 5 stages ("mold-prep", "gel-coat",
// "fiberglass-layup", "structural-cure", "reveal") have real content.
//
// Motion architecture: one damped progress ref PER STAGE EDGE (mold-prep ->
// gel-coat -> fiberglass-layup -> structural-cure -> reveal), each computed
// once per frame in its own TransitionController and only *read* by
// CameraRig/MoldScene — the same pattern the approved Gel Coat pass
// established, extended to 4 edges rather than replaced with a different
// system. Camera orbit and object turn accumulate across edges (each stage
// nudges the view a little further, rather than resetting), so the story
// keeps progressing. Because every edge is a plain damp-toward-target every
// frame (never a one-shot tween), scrolling backward reverses everything for
// free. Each "reachedX" flag stays true for its own stage AND every stage
// after it — earlier layers (gel coat, fiberglass) must stay built-up/settled
// while later stages add on top, not animate back out once the story moves
// past them.
export default function ProcessEngineeringScene({ stages, activeStageIndex }: ProcessEngineeringSceneProps) {
  const activeStage = stages[activeStageIndex];
  const stageId = activeStage.id;
  const showMold =
    stageId === "mold-prep" ||
    stageId === "gel-coat" ||
    stageId === "fiberglass-layup" ||
    stageId === "structural-cure" ||
    stageId === "reveal";
  const reachedGelCoat =
    stageId === "gel-coat" || stageId === "fiberglass-layup" || stageId === "structural-cure" || stageId === "reveal";
  const reachedFiberglass = stageId === "fiberglass-layup" || stageId === "structural-cure" || stageId === "reveal";
  const reachedStructuralCure = stageId === "structural-cure" || stageId === "reveal";
  const reachedReveal = stageId === "reveal";
  const gelCoatProgressRef = useRef(0);
  const fiberglassProgressRef = useRef(0);
  const structuralProgressRef = useRef(0);
  const revealProgressRef = useRef(0);

  return (
    <div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle at 50% 38%, #16294f 0%, #0a1628 62%, #05090f 100%)",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        orthographic
        camera={{ zoom: CAMERA_ZOOM, position: CAMERA_BASE_POSITION.toArray(), near: 0.01, far: 20 }}
      >
        <TransitionController isActive={reachedGelCoat} progressRef={gelCoatProgressRef} />
        <TransitionController isActive={reachedFiberglass} progressRef={fiberglassProgressRef} />
        <TransitionController isActive={reachedStructuralCure} progressRef={structuralProgressRef} />
        <TransitionController isActive={reachedReveal} progressRef={revealProgressRef} />
        <CameraRig
          gelCoatProgressRef={gelCoatProgressRef}
          fiberglassProgressRef={fiberglassProgressRef}
          structuralProgressRef={structuralProgressRef}
          revealProgressRef={revealProgressRef}
        />
        <Lights />
        <BlueprintGrid revealProgressRef={revealProgressRef} />
        {showMold ? (
          <MoldScene
            stageId={stageId}
            gelCoatProgressRef={gelCoatProgressRef}
            fiberglassProgressRef={fiberglassProgressRef}
            structuralProgressRef={structuralProgressRef}
            revealProgressRef={revealProgressRef}
          />
        ) : null}
      </Canvas>
    </div>
  );
}

// One damped value per stage edge — see file header.
const TRANSITION_DAMP_LAMBDA = 2.4;

function TransitionController({
  isActive,
  progressRef,
}: {
  isActive: boolean;
  progressRef: React.RefObject<number>;
}) {
  useFrame((_state, delta) => {
    const target = isActive ? 1 : 0;
    progressRef.current = THREE.MathUtils.damp(progressRef.current, target, TRANSITION_DAMP_LAMBDA, delta);
  });
  return null;
}

// --- Camera: orthographic. Motions layered on the same base position: a
// continuous, tiny ambient wobble (life, not decoration) and per-edge orbit
// increments that accumulate as the story progresses — "the viewer moving
// around an engineered object" as it advances, not a spin, and not a reset
// between stages.
const CAMERA_BASE_POSITION = new THREE.Vector3(2.5, 2.05, 3.1);
const CAMERA_TARGET = new THREE.Vector3(-0.55, -0.15, -0.1);
const CAMERA_ZOOM = 240;
const CAMERA_AMBIENT_ORBIT_DEG = 1.4;
const CAMERA_AMBIENT_PERIOD_SECONDS = 22;
const CAMERA_GEL_COAT_ORBIT_DEG = 11; // within the requested 8-15deg range
const CAMERA_FIBERGLASS_ORBIT_DEG = 9; // within the requested 8-15deg range
const CAMERA_STRUCTURAL_ORBIT_DEG = 5; // Stage 4+5 add at most ~8deg combined
const CAMERA_REVEAL_ORBIT_DEG = 3;

function CameraRig({
  gelCoatProgressRef,
  fiberglassProgressRef,
  structuralProgressRef,
  revealProgressRef,
}: {
  gelCoatProgressRef: React.RefObject<number>;
  fiberglassProgressRef: React.RefObject<number>;
  structuralProgressRef: React.RefObject<number>;
  revealProgressRef: React.RefObject<number>;
}) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.copy(CAMERA_BASE_POSITION);
    camera.lookAt(CAMERA_TARGET);
  }, [camera]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ambientAngle =
      THREE.MathUtils.degToRad(CAMERA_AMBIENT_ORBIT_DEG) *
      Math.sin((2 * Math.PI * t) / CAMERA_AMBIENT_PERIOD_SECONDS);
    const stageAngle =
      THREE.MathUtils.degToRad(CAMERA_GEL_COAT_ORBIT_DEG) * gelCoatProgressRef.current +
      THREE.MathUtils.degToRad(CAMERA_FIBERGLASS_ORBIT_DEG) * fiberglassProgressRef.current +
      THREE.MathUtils.degToRad(CAMERA_STRUCTURAL_ORBIT_DEG) * structuralProgressRef.current +
      THREE.MathUtils.degToRad(CAMERA_REVEAL_ORBIT_DEG) * revealProgressRef.current;
    const totalAngle = ambientAngle + stageAngle;
    const offset = CAMERA_BASE_POSITION.clone().sub(CAMERA_TARGET).applyAxisAngle(new THREE.Vector3(0, 1, 0), totalAngle);
    camera.position.copy(CAMERA_TARGET).add(offset);
    camera.lookAt(CAMERA_TARGET);
  });

  return null;
}

function Lights() {
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.55} />
      <directionalLight color="#ffffff" intensity={0.85} position={[2.4, 3.6, 2.6]} />
      <directionalLight color="#c9d9f2" intensity={0.35} position={[-2.6, 1.6, -1]} />
      <directionalLight color="#f0d9c4" intensity={0.16} position={[-1, 1.6, -2.4]} />
    </>
  );
}

// Faint blueprint-grid ground plane, extending the site's own bg-blueprint-grid
// CSS pattern into the 3D space — "subtle and supportive, never the main
// visual", so it stays at low alpha and small in visual weight. Quiets
// further (never disappears) as the reveal stage resolves, so the finished
// part reads as calmer/more premium than the earlier technical stages.
const BLUEPRINT_BASE_OPACITY = 0.09;
const BLUEPRINT_REVEAL_MIN_OPACITY = 0.045;

function BlueprintGrid({ revealProgressRef }: { revealProgressRef: React.RefObject<number> }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, size, size);
      ctx.strokeStyle = "rgba(190, 210, 240, 0.5)";
      ctx.lineWidth = 1;
      const minor = size / 16;
      for (let i = 0; i <= 16; i++) {
        ctx.beginPath();
        ctx.moveTo(i * minor, 0);
        ctx.lineTo(i * minor, size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * minor);
        ctx.lineTo(size, i * minor);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(210, 225, 245, 0.9)";
      ctx.lineWidth = 1.5;
      const major = size / 4;
      for (let i = 0; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(i * major, 0);
        ctx.lineTo(i * major, size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * major);
        ctx.lineTo(size, i * major);
        ctx.stroke();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame(() => {
    if (!materialRef.current) return;
    const p4 = revealProgressRef.current;
    materialRef.current.opacity = THREE.MathUtils.lerp(BLUEPRINT_BASE_OPACITY, BLUEPRINT_REVEAL_MIN_OPACITY, p4);
  });

  return (
    <mesh position={[-0.55, -0.72, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[2.6, 4]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={BLUEPRINT_BASE_OPACITY}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function roundedRectShape(width: number, depth: number, radius: number): THREE.Shape {
  const w = width / 2;
  const d = depth / 2;
  const r = Math.min(radius, w, d);
  const shape = new THREE.Shape();
  shape.moveTo(-w + r, -d);
  shape.lineTo(w - r, -d);
  shape.quadraticCurveTo(w, -d, w, -d + r);
  shape.lineTo(w, d - r);
  shape.quadraticCurveTo(w, d, w - r, d);
  shape.lineTo(-w + r, d);
  shape.quadraticCurveTo(-w, d, -w, d - r);
  shape.lineTo(-w, -d + r);
  shape.quadraticCurveTo(-w, -d, -w + r, -d);
  shape.closePath();
  return shape;
}

// --- Materials: neutral blue-gray tooling body, orange reserved for the
// gel-coat layer, pale neutral for the fiberglass reinforcement — three
// distinct colors for three distinct roles, never blended.
const TOOLING_COLOR = "#4a5b76";
const TOOLING_DARK = "#2e3a4d";
const COAT_COLOR = "#f47c20";
const FIBER_COLOR = "#e7e1d2";
const EDGE_NEUTRAL = new THREE.Color("#a9c0e0");
const EDGE_ACTIVE = new THREE.Color("#f4a15c");

const BASE_W = 2.0;
const BASE_D = 2.0;
const BASE_H = 0.32;
const RING_OUTER = 1.5;
const RING_INNER = 1.06;
const RING_H = 0.42;
const FLOOR_W = RING_INNER - 0.12;
const FLOOR_D = RING_INNER - 0.12;
const FLOOR_H = 0.07;
const COAT_W = FLOOR_W - 0.1;
const COAT_D = FLOOR_D - 0.1;
const COAT_H = 0.035;

const BASE_TOP_Y = -0.4 + BASE_H / 2; // top surface of base plate
const RING_BOTTOM_Y = BASE_TOP_Y;
const FLOOR_TOP_Y = RING_BOTTOM_Y + 0.16 + FLOOR_H / 2; // recessed below ring rim
const COAT_Y = FLOOR_TOP_Y + FLOOR_H / 2 + COAT_H / 2 + 0.006;

// Object motion — restrained, tied to shared progress: a small turn plus
// barely-there lift/scale per edge, accumulating, "to expose its 3D form".
const OBJECT_GEL_COAT_ROTATION_DEG = 3;
const OBJECT_GEL_COAT_LIFT = 0.03;
const OBJECT_GEL_COAT_SCALE_DELTA = 0.014;
const OBJECT_FIBERGLASS_ROTATION_DEG = 2.5;
const OBJECT_FIBERGLASS_LIFT = 0.018;
const OBJECT_FIBERGLASS_SCALE_DELTA = 0.01;
const OBJECT_STRUCTURAL_ROTATION_DEG = 2;
const OBJECT_STRUCTURAL_LIFT = 0.015;
const OBJECT_STRUCTURAL_SCALE_DELTA = 0.008;
const OBJECT_REVEAL_ROTATION_DEG = 1.5;
// Slightly negative: the mold assembly settles rather than rising — the
// finished part's own separate FINISHED_LIFT (applied only to itself, inside
// this same group) is what creates the visible demold gap.
const OBJECT_REVEAL_LIFT = -0.004;
const OBJECT_REVEAL_SCALE_DELTA = 0.006;

// As the reveal stage resolves, the earlier layered materials (coat, fiber,
// structural) don't vanish — they settle to a low "hint of laminate beneath
// the surface" opacity while FinishedPart crossfades in on top, so the story
// reads as the surface resolving out of the layered construction rather than
// a hard cut to a new object.
const REVEAL_LAYER_MIN_OPACITY = 0.22;

// Gel-coat reveal shader constants — an organic, noise-broken radial front
// growing from a slightly off-center point (implying where application
// started), not a uniform scale-up. `discard`-based, so at progress 0
// nothing draws at all (natural fade-in-by-growth) and it reverses cleanly
// as progress eases back toward 0.
const COAT_REVEAL_ORIGIN = new THREE.Vector2(0.14, -0.1);
const COAT_REVEAL_MAX_RADIUS = 0.74;
const COAT_REVEAL_NOISE_SCALE = 6.5;
const COAT_REVEAL_NOISE_AMOUNT = 0.1;

function useCoatMaterial() {
  // A plain mutable object, not a ref — it's a three.js uniform holder read
  // imperatively every frame in useFrame, not a value tied to a DOM/fiber
  // node, so useMemo (not useRef, which the compiler forbids reading from
  // during render) is the correct tool here.
  const uProgress = useMemo(() => ({ value: 0 }), []);
  return useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: COAT_COLOR,
      roughness: 0.32,
      metalness: 0,
      emissive: COAT_COLOR,
      emissiveIntensity: 0.12,
      transparent: true,
    });
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uProgress = uProgress;
      shader.uniforms.uOrigin = { value: COAT_REVEAL_ORIGIN };
      shader.uniforms.uMaxRadius = { value: COAT_REVEAL_MAX_RADIUS };
      shader.uniforms.uNoiseScale = { value: COAT_REVEAL_NOISE_SCALE };
      shader.uniforms.uNoiseAmount = { value: COAT_REVEAL_NOISE_AMOUNT };

      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vLocalPos;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvLocalPos = position;");

      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
          varying vec3 vLocalPos;
          uniform float uProgress;
          uniform vec2 uOrigin;
          uniform float uMaxRadius;
          uniform float uNoiseScale;
          uniform float uNoiseAmount;

          float coatHash(vec2 p) {
            return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453123);
          }
          float coatNoise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = coatHash(i);
            float b = coatHash(i + vec2(1.0, 0.0));
            float c = coatHash(i + vec2(0.0, 1.0));
            float d = coatHash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }`
        )
        .replace(
          "#include <alphatest_fragment>",
          `#include <alphatest_fragment>
          {
            vec2 p = vLocalPos.xz - uOrigin;
            float dist = length(p);
            float n = (coatNoise(vLocalPos.xz * uNoiseScale) - 0.5) * uNoiseAmount;
            float frontRadius = uProgress * uMaxRadius;
            if (dist + n > frontRadius) discard;
          }`
        );
    };
    return { material, uProgress };
  }, [uProgress]);
}

// --- Fiberglass sheet: a subdivided plane, deformed on the CPU every frame
// (not a shader, not a cloth-sim library) — cheap enough at this vertex
// count to just mutate the BufferGeometry position attribute directly.
// Undersized relative to the coat footprint so a visible orange margin
// always remains — "gel coat visibly underneath" is guaranteed by
// composition, not by transparency tricks.
const FIBER_W = COAT_W * 0.82;
const FIBER_D = COAT_D * 0.82;
const FIBER_SEGMENTS = 20;
const FIBER_REST_GAP = 0.02;
const FIBER_HOVER_OFFSET = 0.55;
const FIBER_START_OFFSET = new THREE.Vector3(0.24, 0, 0.17);
const FIBER_RIPPLE_AMOUNT = 0.045;
const FIBER_RIPPLE_FREQ = 5.2;
const FIBER_CENTER_SAG = 0.05;
const FIBER_MAX_RADIUS = Math.sqrt((FIBER_W / 2) ** 2 + (FIBER_D / 2) ** 2);

function useFiberglassMaterial() {
  return useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: FIBER_COLOR,
      roughness: 0.74,
      metalness: 0,
      transparent: true,
    });
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vLocalPosFiber;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvLocalPosFiber = position;");
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vLocalPosFiber;")
        .replace(
          "#include <color_fragment>",
          `#include <color_fragment>
          {
            float wx = smoothstep(0.0, 0.5, abs(fract(vLocalPosFiber.x * 24.0) - 0.5));
            float wz = smoothstep(0.0, 0.5, abs(fract(vLocalPosFiber.z * 24.0) - 0.5));
            float checker = step(0.5, fract((vLocalPosFiber.x + vLocalPosFiber.z) * 12.0));
            float weave = mix(wx, wz, checker);
            diffuseColor.rgb *= mix(0.93, 1.05, weave);
          }`
        );
    };
    return material;
  }, []);
}

function FiberglassSheet({
  progressRef,
  revealProgressRef,
}: {
  progressRef: React.RefObject<number>;
  revealProgressRef: React.RefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useFiberglassMaterial();
  // Rotation is baked in here, inside the same useMemo that creates the
  // geometry — NOT in a separate useEffect. React Strict Mode (which Next.js
  // dev mode uses) double-invokes effects; rotateX() in a useEffect against
  // the same geometry instance would apply twice (180 deg total instead of
  // 90), leaving the sheet standing on edge instead of lying flat. Each
  // useMemo call — even if StrictMode invokes the initializer twice — builds
  // a brand-new geometry and rotates that one instance exactly once, so
  // there's no shared mutable state to double-apply against.
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(FIBER_W, FIBER_D, FIBER_SEGMENTS, FIBER_SEGMENTS);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);
  const basePositions = useMemo(() => (geometry.attributes.position as THREE.BufferAttribute).array.slice(), [
    geometry,
  ]);

  useFrame((state) => {
    const p = progressRef.current;
    if (!meshRef.current) return;

    meshRef.current.visible = p > 0.002;
    meshRef.current.position.set(
      THREE.MathUtils.lerp(FIBER_START_OFFSET.x, 0, p),
      THREE.MathUtils.lerp(COAT_Y + FIBER_HOVER_OFFSET, COAT_Y + COAT_H / 2 + FIBER_REST_GAP, p),
      THREE.MathUtils.lerp(FIBER_START_OFFSET.z, 0, p)
    );

    // Settle envelope: 0 at rest (either end), peaks mid-transition — the
    // sheet ripples/sags while descending, then goes still once seated.
    const envelope = Math.sin(THREE.MathUtils.clamp(p, 0, 1) * Math.PI);
    const t = state.clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      const bx = basePositions[i * 3];
      const bz = basePositions[i * 3 + 2];
      const radial = Math.min(1, Math.sqrt(bx * bx + bz * bz) / FIBER_MAX_RADIUS);
      const ripple =
        envelope *
        FIBER_RIPPLE_AMOUNT *
        Math.sin(bx * FIBER_RIPPLE_FREQ + t * 1.4) *
        Math.cos(bz * FIBER_RIPPLE_FREQ * 0.85 + t * 1.7);
      const centerSag = envelope * FIBER_CENTER_SAG * (1 - radial);
      posAttr.setY(i, -ripple - centerSag);
    }
    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    // eslint-disable-next-line react-hooks/immutability
    material.opacity = THREE.MathUtils.lerp(1, REVEAL_LAYER_MIN_OPACITY, revealProgressRef.current);
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

// --- Structural roving layer (Stage 4): same CPU-deformed-plane approach as
// the fiberglass sheet, but a coarser weave (heavy bidirectional cloth,
// not fine chopped-strand mat), smaller ripple (it's settling onto an
// already-flat fiberglass layer, not a bare cavity), and undersized relative
// to the fiberglass beneath it so BOTH earlier layers keep a visible margin —
// "built up layer by layer", never a single slab replacing what came before.
const STRUCTURAL_W = FIBER_W * 0.96;
const STRUCTURAL_D = FIBER_D * 0.96;
const STRUCTURAL_SEGMENTS = 14;
const STRUCTURAL_REST_GAP = 0.018;
const STRUCTURAL_Y_REST = COAT_Y + COAT_H / 2 + FIBER_REST_GAP + STRUCTURAL_REST_GAP;
const STRUCTURAL_HOVER_OFFSET = 0.5;
const STRUCTURAL_START_OFFSET = new THREE.Vector3(-0.2, 0, 0.22);
const STRUCTURAL_RIPPLE_AMOUNT = 0.02;
const STRUCTURAL_RIPPLE_FREQ = 4.0;
const STRUCTURAL_CENTER_SAG = 0.018;
const STRUCTURAL_MAX_RADIUS = Math.sqrt((STRUCTURAL_W / 2) ** 2 + (STRUCTURAL_D / 2) ** 2);
const STRUCTURAL_COLOR = "#ded4bd";

// Sequencing sub-windows within the single 0-1 structuralProgressRef —
// APPROACH (descent) finishes and hands off to LAY/SETTLE (ripple dies out)
// well before ROLLER_WINDOW_START below, so the roller never becomes active
// while the layer is still mid-descent. All are plain functions of the same
// damped ref, so scrubbing/reversing needs no special-casing.
const LAYER_APPROACH_END = 0.4; // descent (position lerp) completes by here
const LAYER_SETTLE_END = 0.55; // ripple/sag envelope has fully died out by here

function useStructuralMaterial() {
  return useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: STRUCTURAL_COLOR,
      roughness: 0.72,
      metalness: 0,
      transparent: true,
    });
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vLocalPosStructural;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvLocalPosStructural = position;");
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vLocalPosStructural;")
        .replace(
          "#include <color_fragment>",
          `#include <color_fragment>
          {
            float wx = smoothstep(0.0, 0.5, abs(fract(vLocalPosStructural.x * 9.0) - 0.5));
            float wz = smoothstep(0.0, 0.5, abs(fract(vLocalPosStructural.z * 9.0) - 0.5));
            float checker = step(0.5, fract((vLocalPosStructural.x + vLocalPosStructural.z) * 5.0));
            float weave = mix(wx, wz, checker);
            diffuseColor.rgb *= mix(0.86, 1.1, weave);
          }`
        );
    };
    return material;
  }, []);
}

function StructuralLayer({
  progressRef,
  revealProgressRef,
}: {
  progressRef: React.RefObject<number>;
  revealProgressRef: React.RefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgeMatRef = useRef<THREE.LineBasicMaterial>(null);
  const material = useStructuralMaterial();
  // Same StrictMode-safe pattern as FiberglassSheet: rotate inside the same
  // useMemo that constructs the geometry, never in a separate useEffect.
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(STRUCTURAL_W, STRUCTURAL_D, STRUCTURAL_SEGMENTS, STRUCTURAL_SEGMENTS);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);
  const basePositions = useMemo(
    () => (geometry.attributes.position as THREE.BufferAttribute).array.slice(),
    [geometry]
  );
  // Unrotated — nested as a child of meshRef below, so it inherits the
  // mesh's own rotation/position each frame for free instead of needing a
  // second imperative sync.
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(STRUCTURAL_W, STRUCTURAL_D)), []);

  useFrame((state) => {
    const p = progressRef.current;
    if (!meshRef.current) return;

    meshRef.current.visible = p > 0.002;
    // Descent (APPROACH) is remapped onto its own sub-window and fully
    // arrives at rest by LAYER_APPROACH_END, rather than lerping against raw
    // p all the way to 1 — otherwise the layer is still visibly mid-descent
    // (well above the roller's fixed height) while the roller is already
    // active, causing it to appear to roll through/under the falling sheet.
    const approachT = THREE.MathUtils.smoothstep(p, 0, LAYER_APPROACH_END);
    meshRef.current.position.set(
      THREE.MathUtils.lerp(STRUCTURAL_START_OFFSET.x, 0, approachT),
      THREE.MathUtils.lerp(STRUCTURAL_Y_REST + STRUCTURAL_HOVER_OFFSET, STRUCTURAL_Y_REST, approachT),
      THREE.MathUtils.lerp(STRUCTURAL_START_OFFSET.z, 0, approachT)
    );

    // Ripple/sag (LAY/SETTLE) likewise settles within its own sub-window
    // (dies out by LAYER_SETTLE_END) instead of continuing across the whole
    // transition, so the layer is visibly still and fully seated before
    // ROLLER_WINDOW_START.
    const settleT = THREE.MathUtils.clamp(p / LAYER_SETTLE_END, 0, 1);
    const envelope = Math.sin(settleT * Math.PI);
    const t = state.clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      const bx = basePositions[i * 3];
      const bz = basePositions[i * 3 + 2];
      const radial = Math.min(1, Math.sqrt(bx * bx + bz * bz) / STRUCTURAL_MAX_RADIUS);
      const ripple =
        envelope *
        STRUCTURAL_RIPPLE_AMOUNT *
        Math.sin(bx * STRUCTURAL_RIPPLE_FREQ + t * 1.1) *
        Math.cos(bz * STRUCTURAL_RIPPLE_FREQ * 0.8 + t * 1.3);
      const centerSag = envelope * STRUCTURAL_CENTER_SAG * (1 - radial);
      posAttr.setY(i, -ripple - centerSag);
    }
    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    // Denser/more consolidated as it settles — tightens (less rough) toward
    // full progress, simulating resin wet-out, rather than fading in flat.
    // eslint-disable-next-line react-hooks/immutability
    material.roughness = THREE.MathUtils.lerp(0.72, 0.5, p);
    material.opacity = THREE.MathUtils.lerp(1, REVEAL_LAYER_MIN_OPACITY, revealProgressRef.current);

    if (edgeMatRef.current) {
      // Restrained orange resin-seal accent at the perimeter only, appearing
      // as the layer nears fully consolidated — never covering the material.
      // Fades out fully (not just toward REVEAL_LAYER_MIN_OPACITY like the
      // fill) once the reveal stage takes over — a thin saturated line is far
      // more visually prominent than a low-opacity fill, and would otherwise
      // read as a stray mark sitting on top of the finished part's smooth
      // surface instead of the fill's intended soft "hint beneath it".

      edgeMatRef.current.opacity = 0.5 * THREE.MathUtils.smoothstep(p, 0.55, 0.95) * (1 - revealProgressRef.current);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material}>
      <lineSegments geometry={edgesGeo} position={[0, 0.002, 0]}>
        <lineBasicMaterial ref={edgeMatRef} color={COAT_COLOR} transparent opacity={0} />
      </lineSegments>
    </mesh>
  );
}

// --- Consolidation roller (Stage 4): a plain neutral-colored cylinder + thin
// handle stem, proportionally sized to span most of the structural layer's
// width — a tool, not a hand. Its position/spin are pure functions of the
// same damped progress ref everything else reads, so the pass is a single
// controlled out-and-back sweep that scrubs cleanly with scroll in either
// direction, never a clock-driven "play once" animation.
const ROLLER_LENGTH = STRUCTURAL_W * 0.92;
const ROLLER_RADIUS = 0.055;
const ROLLER_HANDLE_LENGTH = 0.16;
const ROLLER_HANDLE_RADIUS = 0.012;
// Starts only after the layer has fully approached AND settled (see
// LAYER_APPROACH_END/LAYER_SETTLE_END above) — a small overlap with the tail
// of the settle window is intentional (one continuous operation, not four
// disconnected animations), not a gap that would leave the transition idle.
const ROLLER_WINDOW_START = 0.5;
// Progress damps toward its target exponentially (TRANSITION_DAMP_LAMBDA),
// not linearly, so the real-time duration of a p-window shrinks fast the
// closer it sits to the end of the transition — the original 0.5-0.9 window
// packed the whole sweep into well under a second. Widened to 0.97 (real
// time roughly 0.67s -> ~1.1s for the same sweep) so the pass reads as a
// deliberate roll rather than a blur, without touching the damp itself or
// any other stage's pacing.
const ROLLER_WINDOW_END = 0.97;
const ROLLER_FADE_WIDTH = 0.08;
const ROLLER_TRAVEL_HALF = (STRUCTURAL_D / 2) * 0.8;
// Halved from 3 -> 1.5 full turns across the same sweep — the barrel spin
// was the fastest-reading part of the motion; this alone roughly halves its
// apparent rotation speed.
const ROLLER_SPIN_TURNS = 1.5;
const ROLLER_COLOR = "#7c8798";
const ROLLER_LAYDOWN_QUAT = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 2));

function ConsolidationRoller({ progressRef }: { progressRef: React.RefObject<number> }) {
  const rollerRef = useRef<THREE.Mesh>(null);
  const handleRef = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: ROLLER_COLOR, roughness: 0.45, metalness: 0.35, transparent: true }),
    []
  );
  // Bottom edge sits just above the layer's rest plane (a visible contact
  // gap, not a hover) — tightened from an earlier looser clearance now that
  // the roller only ever activates once the layer is confirmed at rest.
  const rollerY = STRUCTURAL_Y_REST + ROLLER_RADIUS + 0.012;

  useFrame(() => {
    const p = progressRef.current;
    if (!rollerRef.current || !handleRef.current) return;

    const inWindow = p > ROLLER_WINDOW_START && p < ROLLER_WINDOW_END;
    rollerRef.current.visible = inWindow;
    handleRef.current.visible = inWindow;
    if (!inWindow) return;

    const u = THREE.MathUtils.clamp((p - ROLLER_WINDOW_START) / (ROLLER_WINDOW_END - ROLLER_WINDOW_START), 0, 1);
    const sweep = Math.sin(u * Math.PI * 2);
    const fadeIn = THREE.MathUtils.smoothstep(p, ROLLER_WINDOW_START, ROLLER_WINDOW_START + ROLLER_FADE_WIDTH);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(p, ROLLER_WINDOW_END - ROLLER_FADE_WIDTH, ROLLER_WINDOW_END);
    const z = sweep * ROLLER_TRAVEL_HALF;
    const spinAngle = sweep * ROLLER_SPIN_TURNS * Math.PI * 2;
    const spinQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), spinAngle);

    rollerRef.current.position.set(0, rollerY, z);
    rollerRef.current.quaternion.copy(ROLLER_LAYDOWN_QUAT).multiply(spinQuat);
    handleRef.current.position.set(0, rollerY + ROLLER_RADIUS + ROLLER_HANDLE_LENGTH / 2, z);

    // eslint-disable-next-line react-hooks/immutability
    material.opacity = fadeIn * fadeOut;
  });

  return (
    <>
      <mesh ref={rollerRef} material={material}>
        <cylinderGeometry args={[ROLLER_RADIUS, ROLLER_RADIUS, ROLLER_LENGTH, 18]} />
      </mesh>
      <mesh ref={handleRef} material={material}>
        <cylinderGeometry args={[ROLLER_HANDLE_RADIUS, ROLLER_HANDLE_RADIUS, ROLLER_HANDLE_LENGTH, 8]} />
      </mesh>
    </>
  );
}

// --- Finished part (Stage 5): not a new floating object — the same footprint
// as the layered stack beneath it, crossfading in as the earlier layers
// settle to a low "hint of laminate" opacity (REVEAL_LAYER_MIN_OPACITY,
// applied where each layer already reads its own revealProgressRef). Reads
// as the surface resolving out of the construction, not a hard cut.
const FINISHED_W = FLOOR_W - 0.06;
const FINISHED_D = FLOOR_D - 0.06;
const FINISHED_H = 0.11; // kept shallow enough that its bottom face stays above FLOOR_TOP_Y — no interpenetration with the cavity floor mesh
const FINISHED_Y_REST = COAT_Y;
// Demold lift, tuned visually against this scene's camera zoom rather than
// held to a literal fraction of FINISHED_H — at this orthographic scale
// (roughly CAMERA_ZOOM pixels per world unit), a literal 5-10% of the part's
// own height is only a few screen pixels and reads as no separation at all.
// This value is the smallest lift that still reads as an unmistakable
// release once combined with SeparationShadow and the release-flash accent.
const FINISHED_LIFT = 0.04;
const FINISHED_COLOR_START = new THREE.Color(STRUCTURAL_COLOR);
// Lighter/cooler than TOOLING_COLOR (#4a5b76) so the finished part's
// silhouette reads clearly against the mold once demolded, while staying in
// the same restrained navy/blue-gray family.
const FINISHED_COLOR_END = new THREE.Color("#5c6e86");
const FINISHED_ROUGHNESS_START = 0.68;
const FINISHED_ROUGHNESS_END = 0.38; // slightly smoother than the mold's matte tooling (0.55-0.6) — a distinct, satin "finished" surface

function FinishedPart({ progressRef }: { progressRef: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgeMatRef = useRef<THREE.LineBasicMaterial>(null);
  const geometry = useMemo(() => new RoundedBoxGeometry(FINISHED_W, FINISHED_H, FINISHED_D, 3, 0.05), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geometry, 20), [geometry]);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: FINISHED_COLOR_START.clone(),
        roughness: FINISHED_ROUGHNESS_START,
        metalness: 0.08,
        transparent: true,
        opacity: 0,
      }),
    []
  );

  useFrame(() => {
    const p = progressRef.current;
    if (!meshRef.current) return;
    meshRef.current.visible = p > 0.002;
    meshRef.current.position.y = THREE.MathUtils.lerp(FINISHED_Y_REST, FINISHED_Y_REST + FINISHED_LIFT, p);

    // eslint-disable-next-line react-hooks/immutability
    material.opacity = p;

    material.color.lerpColors(FINISHED_COLOR_START, FINISHED_COLOR_END, p);

    material.roughness = THREE.MathUtils.lerp(FINISHED_ROUGHNESS_START, FINISHED_ROUGHNESS_END, p);

    if (edgeMatRef.current) {
      // Orange accent flashes only DURING the release itself (peaks
      // mid-transition, same envelope shape used for the fiberglass/
      // structural settle motions) then goes fully quiet once the part has
      // come to rest — a demold cue, not a permanent brand highlight.
      const releaseEnvelope = Math.sin(THREE.MathUtils.clamp(p, 0, 1) * Math.PI);
      edgeMatRef.current.opacity = 0.6 * releaseEnvelope;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={[0, FINISHED_Y_REST, 0]}>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial ref={edgeMatRef} color={COAT_COLOR} transparent opacity={0} />
      </lineSegments>
    </mesh>
  );
}

// --- Separation shadow (Stage 5): a soft canvas-gradient decal marking the
// gap left on the cavity floor where the finished part used to sit flush
// before lifting off — makes the demold unmistakable without any extra
// moving geometry. Unlit (MeshBasicMaterial) and depthWrite:false, same
// technique as BlueprintGrid, so it reads as a flat cast shadow rather than
// a lit object and never z-fights with the floor/coat/fiber/structural
// meshes it sits just above.
const SEPARATION_SHADOW_SIZE = FINISHED_W * 1.3;
const SEPARATION_SHADOW_Y = FLOOR_TOP_Y + 0.003;
const SEPARATION_SHADOW_MAX_OPACITY = 0.4;

function SeparationShadow({ progressRef }: { progressRef: React.RefObject<number> }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, "rgba(4, 8, 14, 0.9)");
      gradient.addColorStop(0.55, "rgba(4, 8, 14, 0.35)");
      gradient.addColorStop(1, "rgba(4, 8, 14, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame(() => {
    if (!materialRef.current) return;
    const p = progressRef.current;
    // Fades in as the part lifts and stays — the gap it marks is real and
    // permanent once demolded, unlike the orange release-flash accent.

    materialRef.current.opacity = SEPARATION_SHADOW_MAX_OPACITY * THREE.MathUtils.smoothstep(p, 0.08, 0.5);
  });

  return (
    <mesh position={[0, SEPARATION_SHADOW_Y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[SEPARATION_SHADOW_SIZE / 2, 32]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={0}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function MoldScene({
  stageId,
  gelCoatProgressRef,
  fiberglassProgressRef,
  structuralProgressRef,
  revealProgressRef,
}: {
  stageId: string;
  gelCoatProgressRef: React.RefObject<number>;
  fiberglassProgressRef: React.RefObject<number>;
  structuralProgressRef: React.RefObject<number>;
  revealProgressRef: React.RefObject<number>;
}) {
  const coatMeshRef = useRef<THREE.Mesh>(null);
  const edgeGroupRef = useRef<THREE.Group>(null);
  const baseEdgeMatRef = useRef<THREE.LineBasicMaterial>(null);
  const moldGroupRef = useRef<THREE.Group>(null);
  const { material: coatMaterial, uProgress: coatUProgress } = useCoatMaterial();

  const baseGeometry = useMemo(() => new RoundedBoxGeometry(BASE_W, BASE_H, BASE_D, 3, 0.06), []);
  const ringGeometry = useMemo(() => {
    const outer = roundedRectShape(RING_OUTER, RING_OUTER, 0.16);
    const inner = roundedRectShape(RING_INNER, RING_INNER, 0.1);
    outer.holes.push(inner);
    const geo = new THREE.ExtrudeGeometry(outer, {
      depth: RING_H,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
      steps: 1,
      curveSegments: 12,
    });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -RING_H, 0);
    return geo;
  }, []);
  const floorGeometry = useMemo(() => new RoundedBoxGeometry(FLOOR_W, FLOOR_H, FLOOR_D, 2, 0.03), []);
  const coatGeometry = useMemo(() => new RoundedBoxGeometry(COAT_W, COAT_H, COAT_D, 2, 0.025), []);

  const toolingMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: TOOLING_COLOR, roughness: 0.55, metalness: 0.18 }),
    []
  );
  const baseMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: TOOLING_DARK, roughness: 0.6, metalness: 0.12 }),
    []
  );

  const boltPositions = useMemo(() => {
    const inset = BASE_W / 2 - 0.16;
    return [
      [-inset, -inset],
      [inset, -inset],
      [inset, inset],
      [-inset, inset],
    ] as [number, number][];
  }, []);

  useFrame((state) => {
    const p1 = gelCoatProgressRef.current;
    const p2 = fiberglassProgressRef.current;
    const p3 = structuralProgressRef.current;
    const p4 = revealProgressRef.current;

    if (moldGroupRef.current) {
      moldGroupRef.current.rotation.y =
        THREE.MathUtils.degToRad(OBJECT_GEL_COAT_ROTATION_DEG) * p1 +
        THREE.MathUtils.degToRad(OBJECT_FIBERGLASS_ROTATION_DEG) * p2 +
        THREE.MathUtils.degToRad(OBJECT_STRUCTURAL_ROTATION_DEG) * p3 +
        THREE.MathUtils.degToRad(OBJECT_REVEAL_ROTATION_DEG) * p4;
      moldGroupRef.current.position.y =
        OBJECT_GEL_COAT_LIFT * p1 + OBJECT_FIBERGLASS_LIFT * p2 + OBJECT_STRUCTURAL_LIFT * p3 + OBJECT_REVEAL_LIFT * p4;
      const s =
        1 +
        OBJECT_GEL_COAT_SCALE_DELTA * p1 +
        OBJECT_FIBERGLASS_SCALE_DELTA * p2 +
        OBJECT_STRUCTURAL_SCALE_DELTA * p3 +
        OBJECT_REVEAL_SCALE_DELTA * p4;
      moldGroupRef.current.scale.set(s, s, s);
    }

    // Imperative per-frame mutation of the shared uniform holder and the
    // material instance is the standard r3f pattern inside useFrame (same
    // justified pattern already used for camera/material mutation elsewhere
    // in this project) — not a real immutability bug.
    // eslint-disable-next-line react-hooks/immutability
    coatUProgress.value = p1;
    if (coatMeshRef.current) {
      coatMeshRef.current.visible = p1 > 0.004;
    }
    // eslint-disable-next-line react-hooks/immutability
    coatMaterial.emissiveIntensity = 0.1 + 0.09 * Math.sin(state.clock.getElapsedTime() * 1.6) * p1;
    // Coat settles to a low "hint beneath the surface" opacity as the
    // finished part (FinishedPart, reading the same revealProgressRef)
    // crossfades in on top of it — see REVEAL_LAYER_MIN_OPACITY.

    coatMaterial.opacity = THREE.MathUtils.lerp(1, REVEAL_LAYER_MIN_OPACITY, p4);

    if (edgeGroupRef.current) {
      // Edge tint reads "gel coat is the active process" only while that
      // stage is current — once fiberglass takes over, the tint eases back
      // toward neutral so attention shifts to the new active material
      // rather than the tooling edges staying lit forever.
      const edgeActive = Math.max(0, p1 - p2);
      // Wireframe becomes progressively less prominent (never fully gone)
      // once the reveal stage starts resolving — "calm and premium", not a
      // sudden switch to a different visual language.
      const wireframeFade = 1 - 0.55 * p4;
      const baseOpacities = [0.55, 0.45];
      edgeGroupRef.current.children.forEach((child, i) => {
        const line = child as THREE.LineSegments;
        const mat = line.material as THREE.LineBasicMaterial;
        mat.color.copy(EDGE_NEUTRAL).lerp(EDGE_ACTIVE, edgeActive * 0.7);
        mat.opacity = baseOpacities[i] * wireframeFade;
      });
    }
    if (baseEdgeMatRef.current) {
      baseEdgeMatRef.current.opacity = 0.4 * (1 - 0.55 * p4);
    }
  });

  return (
    <group ref={moldGroupRef}>
      {/* Base plate */}
      <mesh geometry={baseGeometry} material={baseMaterial} position={[0, -0.4, 0]} />
      <lineSegments position={[0, -0.4, 0]}>
        <edgesGeometry args={[baseGeometry, 20]} />
        <lineBasicMaterial ref={baseEdgeMatRef} color={EDGE_NEUTRAL} transparent opacity={0.4} />
      </lineSegments>

      {/* Cavity wall ring */}
      <mesh geometry={ringGeometry} material={toolingMaterial} position={[0, RING_BOTTOM_Y + RING_H, 0]} />

      {/* Cavity floor */}
      <mesh geometry={floorGeometry} material={toolingMaterial} position={[0, FLOOR_TOP_Y - FLOOR_H / 2, 0]} />

      {/* Restrained neutral (or orange-tinted when active) edge lines on the
          tooling — extremely thin, low opacity. */}
      <group ref={edgeGroupRef}>
        <lineSegments position={[0, RING_BOTTOM_Y + RING_H, 0]}>
          <edgesGeometry args={[ringGeometry, 15]} />
          <lineBasicMaterial color={EDGE_NEUTRAL} transparent opacity={0.55} />
        </lineSegments>
        <lineSegments position={[0, FLOOR_TOP_Y - FLOOR_H / 2, 0]}>
          <edgesGeometry args={[floorGeometry, 20]} />
          <lineBasicMaterial color={EDGE_NEUTRAL} transparent opacity={0.45} />
        </lineSegments>
      </group>

      {/* Gel-coat layer — a thin, separate film above the cavity floor whose
          own shader grows an organic, noise-broken front from an off-center
          origin as progress rises, so it reads as material spreading across
          the surface rather than a shape scaling up. Stays visible once
          settled — the fiberglass stage builds on top of it, doesn't hide it. */}
      <mesh ref={coatMeshRef} geometry={coatGeometry} material={coatMaterial} position={[0, COAT_Y, 0]} />

      {/* Fiberglass reinforcement — descends from an offset hover position,
          ripples/sags while settling, goes still once seated. Undersized
          relative to the coat so an orange margin stays visible around it. */}
      <FiberglassSheet progressRef={fiberglassProgressRef} revealProgressRef={revealProgressRef} />

      {/* Structural roving (Stage 4) — heavier woven layer settling onto the
          fiberglass, undersized again so both earlier layers keep a visible
          margin, consolidated by a short controlled roller pass. */}
      <StructuralLayer progressRef={structuralProgressRef} revealProgressRef={revealProgressRef} />
      <ConsolidationRoller progressRef={structuralProgressRef} />

      {/* Finished part (Stage 5) — crossfades in over the same footprint as
          the layered stack above, which settles to a low "hint beneath the
          surface" opacity rather than disappearing outright. Lifts a small,
          fixed amount off the mold as it demolds; SeparationShadow marks the
          gap left behind so the release reads clearly. */}
      <SeparationShadow progressRef={revealProgressRef} />
      <FinishedPart progressRef={revealProgressRef} />

      {/* Bolt details — small, functional, not decorative */}
      {boltPositions.map(([x, z], i) => (
        <mesh key={i} position={[x, BASE_TOP_Y + 0.012, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.025, 16]} />
          <meshStandardMaterial color="#8b95a3" roughness={0.4} metalness={0.55} />
        </mesh>
      ))}

      {stageId === "mold-prep" && (
        <Html position={[0.95, BASE_TOP_Y + 0.5, -0.4]} center={false} zIndexRange={[1, 0]} occlude={false}>
          <div className="pointer-events-none whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
            Tooling · Precision Mold
          </div>
        </Html>
      )}
      {stageId === "gel-coat" && (
        <Html position={[0.95, FLOOR_TOP_Y + 0.4, -0.4]} center={false} zIndexRange={[1, 0]} occlude={false}>
          <div className="pointer-events-none whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-brand-orange/80">
            Gel Coat · 0.5mm
          </div>
        </Html>
      )}
      {stageId === "fiberglass-layup" && (
        <Html position={[0.95, FLOOR_TOP_Y + 0.55, -0.4]} center={false} zIndexRange={[1, 0]} occlude={false}>
          <div className="pointer-events-none whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
            Fiberglass · Reinforcement
          </div>
        </Html>
      )}
      {stageId === "structural-cure" && (
        <Html position={[0.95, FLOOR_TOP_Y + 0.68, -0.4]} center={false} zIndexRange={[1, 0]} occlude={false}>
          <div className="pointer-events-none whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
            Structural Roving · Bidirectional
          </div>
        </Html>
      )}
      {stageId === "reveal" && (
        <Html position={[0.95, FLOOR_TOP_Y + 0.78, -0.4]} center={false} zIndexRange={[1, 0]} occlude={false}>
          <div className="pointer-events-none whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
            Finished Part · Demolded
          </div>
        </Html>
      )}
    </group>
  );
}
