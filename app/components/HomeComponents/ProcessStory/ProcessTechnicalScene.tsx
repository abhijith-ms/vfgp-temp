"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { ProcessStage } from "./types";

interface ProcessTechnicalSceneProps {
  stages: ProcessStage[];
  activeStageIndex: number;
}

// Proof of concept for the "controlled technical illustration" direction —
// deliberately narrow in scope: only "gel-coat" has a real composition
// registered below; every other stage renders an empty (but stable) scene so
// the pinned scroll/crossfade/caption system stays fully exercisable while
// this one stage is under review. Not data-driven from ProcessStage yet —
// that generalization is a follow-up once the direction itself is approved,
// not before (each stage needs its own hand-authored composition, the same
// way the Blender scenes did — there's no bounding-box-and-Center shortcut
// this brief explicitly ruled out).
export default function ProcessTechnicalScene({ stages, activeStageIndex }: ProcessTechnicalSceneProps) {
  const activeStage = stages[activeStageIndex];

  useEffect(() => {
    useGLTF.preload(GEL_COAT_MOLD_URL);
  }, []);

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
        <CameraRig />
        <Lights />
        {activeStage.id === "gel-coat" ? <GelCoatScene /> : null}
      </Canvas>
    </div>
  );
}

const GEL_COAT_MOLD_URL = "/3d/gel-coat-mold.glb";

// --- Camera: orthographic, near-static — only a very small orbit wobble.
// Position/target are best-guess from the previously-validated perspective
// gel-coat camera (handLayup.ts), converted to this stage's own composition;
// calibrated visually against the actual render, same as every other camera
// value in this project.
const CAMERA_BASE_POSITION = new THREE.Vector3(1.55, 1.35, 2.7);
const CAMERA_TARGET = new THREE.Vector3(-0.28, -0.34, -0.25);
const CAMERA_ZOOM = 260;
const CAMERA_ORBIT_DEG = 2;
const CAMERA_PERIOD_SECONDS = 20;

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.copy(CAMERA_BASE_POSITION);
    camera.lookAt(CAMERA_TARGET);
  }, [camera]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const angle = THREE.MathUtils.degToRad(CAMERA_ORBIT_DEG) * Math.sin((2 * Math.PI * t) / CAMERA_PERIOD_SECONDS);
    const offset = CAMERA_BASE_POSITION.clone().sub(CAMERA_TARGET).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    camera.position.copy(CAMERA_TARGET).add(offset);
    camera.lookAt(CAMERA_TARGET);
  });

  return null;
}

// --- Lighting: plain 3-point, neutral, low intensity. No orange wash — the
// rim carries only a faint warm tint, not the saturated brand-orange rim
// light the earlier photoreal pass used.
function Lights() {
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.65} />
      <directionalLight color="#ffffff" intensity={0.9} position={[2.2, 3.5, 2.5]} />
      <directionalLight color="#dbe6f5" intensity={0.4} position={[-2.5, 1.5, -1]} />
      <directionalLight color="#f0d9c4" intensity={0.22} position={[-1, 1.8, -2.6]} />
    </>
  );
}

// --- Materials: flat, controlled, matte — ignores whatever the GLB carries.
function useGelCoatMaterials() {
  return useMemo(
    () => ({
      mold: new THREE.MeshStandardMaterial({ color: "#f47c20", roughness: 0.62, metalness: 0 }),
      glove: new THREE.MeshStandardMaterial({ color: "#8ba0bd", roughness: 0.75, metalness: 0 }),
      handle: new THREE.MeshStandardMaterial({ color: "#2b2d31", roughness: 0.55, metalness: 0 }),
      ferrule: new THREE.MeshStandardMaterial({ color: "#b9bec6", roughness: 0.5, metalness: 0.35 }),
      bristle: new THREE.MeshStandardMaterial({ color: "#f47c20", roughness: 0.55, metalness: 0 }),
    }),
    []
  );
}

// --- Pose geometry, ported from the validated Blender POC (same tip/grip
// reference points measured off the original scan, same wrist-bend logic —
// the camera looks almost straight down the forearm's own axis, so a flat
// blade attached along it needs a deliberate bend to have any angle to face
// the viewer at all; this isn't stylistic, it's a real constraint that
// showed up as a bug there and is reused as a known-good fix here).
const TILT_DEG = 34;

// Measured in the original scan's Blender-import (Z-up) space; converted to
// three.js/glTF space (Y-up, no axis remap on load) via
// gltf(x, y, z) = blender(x, z, -y).
function blenderToGltf(x: number, y: number, z: number): THREE.Vector3 {
  return new THREE.Vector3(x, z, -y);
}

const TIP = blenderToGltf(0.1, 0.515, 0.4);
const TOP_REF = blenderToGltf(0.819, 0.895, 0.928);

function alignToAxis(axisWorld: THREE.Vector3, location: THREE.Vector3): [THREE.Quaternion, THREE.Vector3] {
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), axisWorld.clone().normalize());
  return [q, location];
}

// Orients so local Y -> lengthAxis and local Z (the box's face normal) ->
// the component of cameraDir perpendicular to lengthAxis — the closest a
// face whose plane contains lengthAxis can get to facing the camera.
function orientFace(
  lengthAxis: THREE.Vector3,
  cameraDir: THREE.Vector3,
  location: THREE.Vector3
): [THREE.Quaternion, THREE.Vector3] {
  const y = lengthAxis.clone().normalize();
  const z = cameraDir
    .clone()
    .sub(y.clone().multiplyScalar(cameraDir.dot(y)))
    .normalize();
  const x = new THREE.Vector3().crossVectors(y, z).normalize();
  const m = new THREE.Matrix4().makeBasis(x, y, z);
  return [new THREE.Quaternion().setFromRotationMatrix(m), location];
}

interface HandPose {
  tip: THREE.Vector3;
  uBrush: THREE.Vector3;
  vBrush: THREE.Vector3;
  wBrush: THREE.Vector3;
  u: THREE.Vector3;
  gripCenter: THREE.Vector3;
  cameraDir: THREE.Vector3;
}

function useHandPose(): HandPose {
  return useMemo(() => {
    const u = TOP_REF.clone().sub(TIP).normalize();
    const worldUp = new THREE.Vector3(0, 1, 0);
    const v = new THREE.Vector3().crossVectors(u, worldUp).normalize();

    const uBrush = u
      .clone()
      .multiplyScalar(Math.cos(THREE.MathUtils.degToRad(TILT_DEG)))
      .add(v.clone().multiplyScalar(Math.sin(THREE.MathUtils.degToRad(TILT_DEG))))
      .normalize();
    const vBrush = new THREE.Vector3().crossVectors(uBrush, worldUp).normalize();
    const wBrush = new THREE.Vector3().crossVectors(uBrush, vBrush).normalize();

    const HEAD_LEN_LOCAL = 0.17;
    const FERRULE_LEN_LOCAL = 0.03;
    const HANDLE_LEN_LOCAL = 0.3;
    const GRIP_T = HEAD_LEN_LOCAL + FERRULE_LEN_LOCAL + HANDLE_LEN_LOCAL * 0.32;
    const gripCenter = TIP.clone().add(uBrush.clone().multiplyScalar(GRIP_T));

    const cameraDir = CAMERA_BASE_POSITION.clone().sub(TIP).normalize();

    return { tip: TIP, uBrush, vBrush, wBrush, u, gripCenter, cameraDir };
  }, []);
}

const HEAD_LEN = 0.17;
const FERRULE_LEN = 0.03;
const HANDLE_LEN = 0.3;
const HANDLE_R = 0.03;
const FINGER_R = 0.018;
const PROXIMAL_LEN = 0.052;
const DISTAL_LEN = 0.05;
const FINGER_ANGLES_DEG = [-48, -16, 16, 48];
const THUMB_ANGLE_DEG = 165;

function GelCoatScene() {
  const { scene } = useGLTF(GEL_COAT_MOLD_URL);
  const materials = useGelCoatMaterials();
  const pose = useHandPose();
  const handGroupRef = useRef<THREE.Group>(null);

  const moldGeometry = useMemo(() => {
    let found: THREE.BufferGeometry | null = null;
    scene.traverse((child) => {
      if (!found && (child as THREE.Mesh).isMesh) {
        found = (child as THREE.Mesh).geometry;
      }
    });
    return found;
  }, [scene]);

  const fingerParts = useMemo(() => {
    const parts: {
      key: string;
      kind: "cylinder" | "sphere";
      args: number[];
      material: THREE.Material;
      quaternion?: THREE.Quaternion;
      position: THREE.Vector3;
    }[] = [];

    FINGER_ANGLES_DEG.forEach((angDeg, i) => {
      const rad = THREE.MathUtils.degToRad(angDeg);
      const radial = pose.vBrush
        .clone()
        .multiplyScalar(Math.cos(rad))
        .add(pose.wBrush.clone().multiplyScalar(Math.sin(rad)))
        .normalize();
      const base = pose.gripCenter
        .clone()
        .add(radial.clone().multiplyScalar(HANDLE_R * 0.85))
        .add(pose.uBrush.clone().multiplyScalar((i - 1.5) * 0.008))
        .sub(pose.uBrush.clone().multiplyScalar(0.01));
      const knuckle = base.clone().add(radial.clone().multiplyScalar(PROXIMAL_LEN));
      const curlDir = radial
        .clone()
        .multiplyScalar(0.35)
        .sub(pose.uBrush.clone().multiplyScalar(0.55))
        .normalize();
      const fingertip = knuckle.clone().add(curlDir.multiplyScalar(DISTAL_LEN));

      const [proxQ] = alignToAxis(knuckle.clone().sub(base), base.clone().lerp(knuckle, 0.5));
      parts.push({
        key: `finger-${i}-prox`,
        kind: "cylinder",
        args: [FINGER_R, FINGER_R, PROXIMAL_LEN, 10],
        material: materials.glove,
        quaternion: proxQ,
        position: base.clone().lerp(knuckle, 0.5),
      });

      const [distQ] = alignToAxis(fingertip.clone().sub(knuckle), knuckle.clone().lerp(fingertip, 0.5));
      parts.push({
        key: `finger-${i}-dist`,
        kind: "cylinder",
        args: [FINGER_R * 0.9, FINGER_R * 0.9, DISTAL_LEN, 10],
        material: materials.glove,
        quaternion: distQ,
        position: knuckle.clone().lerp(fingertip, 0.5),
      });

      parts.push({
        key: `finger-${i}-knuckle`,
        kind: "sphere",
        args: [FINGER_R, 12, 10],
        material: materials.glove,
        position: knuckle,
      });
      parts.push({
        key: `finger-${i}-cap`,
        kind: "sphere",
        args: [FINGER_R * 0.9, 12, 10],
        material: materials.glove,
        position: fingertip,
      });
    });

    const thumbRad = THREE.MathUtils.degToRad(THUMB_ANGLE_DEG);
    const thumbRadial = pose.vBrush
      .clone()
      .multiplyScalar(Math.cos(thumbRad))
      .add(pose.wBrush.clone().multiplyScalar(Math.sin(thumbRad)))
      .normalize();
    const thumbBase = pose.gripCenter
      .clone()
      .add(thumbRadial.clone().multiplyScalar(HANDLE_R * 0.9))
      .sub(pose.uBrush.clone().multiplyScalar(0.025));
    const thumbLen = 0.078;
    const thumbTip = thumbBase.clone().add(thumbRadial.clone().multiplyScalar(thumbLen));
    const [thumbQ] = alignToAxis(thumbTip.clone().sub(thumbBase), thumbBase.clone().lerp(thumbTip, 0.5));
    parts.push({
      key: "thumb",
      kind: "cylinder",
      args: [FINGER_R * 1.05, FINGER_R * 1.05, thumbLen, 10],
      material: materials.glove,
      quaternion: thumbQ,
      position: thumbBase.clone().lerp(thumbTip, 0.5),
    });
    parts.push({
      key: "thumb-cap",
      kind: "sphere",
      args: [FINGER_R * 1.05, 12, 10],
      material: materials.glove,
      position: thumbTip,
    });

    const palmCenter = pose.gripCenter
      .clone()
      .add(thumbRadial.clone().multiplyScalar(HANDLE_R + 0.028))
      .add(pose.u.clone().multiplyScalar(0.02));
    parts.push({
      key: "palm",
      kind: "sphere",
      args: [0.052, 14, 12],
      material: materials.glove,
      position: palmCenter,
    });

    const cuffLen = 0.2;
    const cuffCenter = pose.gripCenter.clone().add(pose.u.clone().multiplyScalar(0.075 + cuffLen / 2));
    const [cuffQ] = alignToAxis(pose.u, cuffCenter);
    parts.push({
      key: "cuff",
      kind: "cylinder",
      args: [0.044, 0.044, cuffLen, 14],
      material: materials.glove,
      quaternion: cuffQ,
      position: cuffCenter,
    });

    return parts;
  }, [pose, materials]);

  const headPose = useMemo(() => {
    const headCenter = pose.tip.clone().add(pose.uBrush.clone().multiplyScalar(HEAD_LEN / 2));
    return orientFace(pose.uBrush, pose.cameraDir, headCenter);
  }, [pose]);

  const ferrulePose = useMemo(() => {
    const c = pose.tip.clone().add(pose.uBrush.clone().multiplyScalar(HEAD_LEN + FERRULE_LEN / 2));
    return alignToAxis(pose.uBrush, c);
  }, [pose]);

  const handlePose = useMemo(() => {
    const c = pose.tip.clone().add(pose.uBrush.clone().multiplyScalar(HEAD_LEN + FERRULE_LEN + HANDLE_LEN / 2));
    return alignToAxis(pose.uBrush, c);
  }, [pose]);

  // Very short, subtle looped stroke — the process action is the animation,
  // not the camera. A few cm of travel along the brush's own sideways axis,
  // eased with a smooth sine rather than a linear back-and-forth snap.
  const strokeDir = pose.vBrush;
  useFrame((state) => {
    if (!handGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    const stroke = Math.sin((2 * Math.PI * t) / 3.4) * 0.045;
    const lift = (1 - Math.cos((2 * Math.PI * t) / 3.4)) * 0.006;
    handGroupRef.current.position.set(strokeDir.x * stroke, strokeDir.y * stroke + lift, strokeDir.z * stroke);
  });

  return (
    <>
      {moldGeometry && <mesh geometry={moldGeometry} material={materials.mold} />}
      <ShadowDecal />
      <group ref={handGroupRef}>
        <mesh
          position={headPose[1]}
          quaternion={headPose[0]}
          material={materials.bristle}
          scale={[0.075, HEAD_LEN, 0.022]}
        >
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh position={ferrulePose[1]} quaternion={ferrulePose[0]} material={materials.ferrule}>
          <cylinderGeometry args={[HANDLE_R * 1.08, HANDLE_R * 1.08, FERRULE_LEN, 16]} />
        </mesh>
        <mesh position={handlePose[1]} quaternion={handlePose[0]} material={materials.handle}>
          <cylinderGeometry args={[HANDLE_R, HANDLE_R, HANDLE_LEN, 16]} />
        </mesh>
        {fingerParts.map((part) => (
          <mesh key={part.key} position={part.position} quaternion={part.quaternion} material={part.material}>
            {part.kind === "cylinder" ? (
              <cylinderGeometry args={part.args as [number, number, number, number]} />
            ) : (
              <sphereGeometry args={part.args as [number, number, number]} />
            )}
          </mesh>
        ))}
      </group>
    </>
  );
}

// Cheap fake soft contact shadow — a flat disc with a radial-gradient alpha
// texture, not real shadow-mapping (avoids configuring shadow cameras per
// light in an always-rendering scroll canvas for one small decal's worth of
// grounding cue).
function ShadowDecal() {
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, "rgba(0,0,0,0.35)");
      gradient.addColorStop(0.7, "rgba(0,0,0,0.16)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <mesh position={[0.05, -0.975, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.35, 32]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

useGLTF.preload(GEL_COAT_MOLD_URL);
