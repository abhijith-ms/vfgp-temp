"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SceneObject } from "./types";

// Reproduces the brand octagon clip-path
// (polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%))
// as real 2D geometry, centered at the origin with radius 1, so the 3D layers
// keep the same signature silhouette as the CSS version they replace.
function createOctagonShape(): THREE.Shape {
  const points: [number, number][] = [
    [-0.4, 1],
    [0.4, 1],
    [1, 0.4],
    [1, -0.4],
    [0.4, -1],
    [-0.4, -1],
    [-1, -0.4],
    [-1, 0.4],
  ];
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i][0], points[i][1]);
  }
  shape.closePath();
  return shape;
}

interface SceneObjectMeshProps {
  object: SceneObject;
  /**
   * Live scroll progress (0..1), read imperatively every frame — never passed
   * as a React prop that changes per-frame, to avoid a re-render per tick.
   * In Phase 1 this is a static ref pinned at 1 (fully revealed); Phase 2
   * wires it to the real pinned/scrubbed ScrollTrigger progress.
   */
  progressRef: React.RefObject<number>;
}

export default function SceneObjectMesh({ object, progressRef }: SceneObjectMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const geometry = useMemo(() => {
    const shape = createOctagonShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth: object.height,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 1,
    });
  }, [object.height]);

  useFrame(() => {
    const progress = progressRef.current ?? 1;
    const [start, end] = object.visibilityRange;
    const t = end > start ? (progress - start) / (end - start) : progress >= start ? 1 : 0;
    const reveal = Math.min(1, Math.max(0, t));

    if (materialRef.current) {
      materialRef.current.opacity = reveal;
    }
    if (meshRef.current) {
      meshRef.current.visible = reveal > 0;
      // Layer settles the last bit of the way into place as it reveals.
      meshRef.current.position.y = object.elevation + (1 - reveal) * 0.08;
    }
  });

  return (
    // ExtrudeGeometry builds along local +Z; rotate so extrusion (layer
    // thickness) runs along world +Y, matching the storyboard's stacking axis.
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, object.elevation, 0]}>
      <meshStandardMaterial
        ref={materialRef}
        color={object.color}
        roughness={object.materialProps?.roughness ?? 0.5}
        metalness={object.materialProps?.metalness ?? 0}
        transparent
        opacity={1}
      />
    </mesh>
  );
}
