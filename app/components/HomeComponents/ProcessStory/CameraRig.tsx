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

// Camera keyframes (position/target/fov) were authored and verified against
// a wide desktop viewport (~2.0 aspect). On a narrow portrait phone (~0.46
// aspect), the same distance/target crops the scene hard: three.js
// PerspectiveCamera.fov is the *vertical* FOV, so horizontal FOV shrinks
// sharply as aspect narrows, while the octagon "layer" objects are wide
// relative to their height. Rather than widening FOV to compensate (which
// introduces fisheye-like distortion at the extremes this would require),
// pull the camera back along its own view direction on narrower-than-
// reference viewports so more of the object's width fits in frame.
// COMPENSATION_STRENGTH is a deliberately provisional tuning knob — 1.0
// would fully preserve horizontal framing but shrinks the object a lot on
// very narrow phones; this is a moderate default pending real-device
// feedback (this environment can't verify true mobile viewports directly).
const REFERENCE_ASPECT = 2.0;
const COMPENSATION_STRENGTH = 0.6;

// Generic over stage count — reads live scroll progress and lerps the camera
// between the two nearest stages' keyframes. No hand-lay-up-specific logic.
// Uses the same weighted getStageBoundaries/getStageProgress as
// useProcessScroll.ts, so camera timing and stage-index detection (driving
// the caption/companion panel) never drift out of sync even when stages have
// uneven scroll weight.
export default function CameraRig({ stages, progressRef }: CameraRigProps) {
  const { camera, size } = useThree();
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

    const aspect = size.width / size.height;
    if (aspect < REFERENCE_ASPECT) {
      const fullCompensation = REFERENCE_ASPECT / aspect;
      const distanceScale = 1 + (fullCompensation - 1) * COMPENSATION_STRENGTH;
      tmpPosition.sub(tmpTarget).multiplyScalar(distanceScale).add(tmpTarget);
    }

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
