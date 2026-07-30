"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getStageBoundaries, getStageProgress, type ProcessStage } from "./types";

interface CameraRigProps {
  stages: ProcessStage[];
  progressRef: React.RefObject<number>;
}

const tmpPosition = new THREE.Vector3();
const tmpTarget = new THREE.Vector3();

// Generic over stage count — reads live scroll progress and lerps the camera
// between the two nearest stages' keyframes. No hand-lay-up-specific logic.
// Uses the same weighted getStageBoundaries/getStageProgress as
// useProcessScroll.ts, so camera timing and stage-index detection (driving
// the caption/companion panel) never drift out of sync even when stages have
// uneven scroll weight.
export default function CameraRig({ stages, progressRef }: CameraRigProps) {
  const { camera } = useThree();
  const boundaries = useMemo(() => getStageBoundaries(stages), [stages]);

  useFrame(() => {
    const progress = Math.min(1, Math.max(0, progressRef.current ?? 0));
    const { index, nextIndex, t } = getStageProgress(boundaries, progress);

    const from = stages[index].camera;
    const to = stages[nextIndex].camera;

    tmpPosition.set(
      THREE.MathUtils.lerp(from.position[0], to.position[0], t),
      THREE.MathUtils.lerp(from.position[1], to.position[1], t),
      THREE.MathUtils.lerp(from.position[2], to.position[2], t)
    );
    tmpTarget.set(
      THREE.MathUtils.lerp(from.target[0], to.target[0], t),
      THREE.MathUtils.lerp(from.target[1], to.target[1], t),
      THREE.MathUtils.lerp(from.target[2], to.target[2], t)
    );

    camera.position.copy(tmpPosition);
    camera.lookAt(tmpTarget);

    if (camera instanceof THREE.PerspectiveCamera) {
      const fov = THREE.MathUtils.lerp(from.fov, to.fov, t);
      if (Math.abs(camera.fov - fov) > 0.001) {
        // Imperative mutation of the r3f-provided camera is the standard,
        // required pattern inside useFrame (this is what drives the scene
        // without a React re-render per frame) — not a real immutability bug.
        // eslint-disable-next-line react-hooks/immutability
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}
