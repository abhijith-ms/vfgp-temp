"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { handLayupProcess } from "./ProcessStory/processes/handLayup";
import { usePrefersReducedMotion } from "./ProcessStory/usePrefersReducedMotion";
import CanvasErrorBoundary from "./ProcessStory/CanvasErrorBoundary";
import HeroOctagonBadge from "./HeroOctagonBadge";

// Same dynamic-import pattern as ProcessStorySection.tsx (the only other
// place @react-three/fiber is used) — keeps three/r3f/drei out of the
// initial page bundle. Loading fallback matches the octagon badge (not a
// blank div, unlike the scroll section) since the Hero's loading gap is
// guaranteed visible on every page load, not an edge case reached only
// after scrolling.
const ProcessModelViewer = dynamic(() => import("./ProcessStory/ProcessEngineeringScene"), {
  ssr: false,
  loading: () => <HeroOctagonBadge />,
});

const STAGE_COUNT = handLayupProcess.stages.length;

// One-time build-up sequence played on mount, then held at the last stage
// (finished part) — time-driven instead of scroll-driven, but it advances
// activeStageIndex through the exact same 0..N-1 progression useProcessScroll
// normally drives, so ProcessEngineeringScene's damped-transition machinery
// works completely unmodified. Durations are pacing choices, not physics —
// roughly matched to how long each stage's own transition takes to settle
// (see ProcessEngineeringScene.tsx's TRANSITION_DAMP_LAMBDA and the
// structural layer's roller pass), tuned visually rather than derived.
const STAGE_HOLD_MS = [500, 1200, 1200, 1600, 1200];

function useAutoAdvanceStageIndex(active: boolean) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    for (let i = 1; i < STAGE_COUNT; i++) {
      elapsed += STAGE_HOLD_MS[i - 1] ?? 1200;
      timers.push(
        setTimeout(() => {
          setStageIndex(i);
        }, elapsed)
      );
    }
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active]);

  return stageIndex;
}

// Hero-only camera framing — a small square container with no side panel to
// share space with, unlike the wide pinned scroll viewport. Threaded as
// override props (never the shared module constants) so the scroll
// section's approved framing is untouched by tuning this one.
const HERO_CAMERA_ZOOM = 295;
const HERO_CAMERA_BASE_POSITION = new THREE.Vector3(2.5, 2.05, 3.1);
const HERO_CAMERA_TARGET = new THREE.Vector3(-0.25, -0.12, -0.1);

export default function HeroProcessVisual() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [canvasFailed, setCanvasFailed] = useState(false);
  const [deferredMount, setDeferredMount] = useState(false);
  const activeStageIndex = useAutoAdvanceStageIndex(deferredMount && !prefersReducedMotion);

  // Defer mounting the 3D bundle until shortly after first paint so the
  // Hero's LCP-critical headline/CTA aren't delayed behind it — this is the
  // first place on the page reachable from initial load rather than only
  // after scrolling to the ProcessStory section.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => setDeferredMount(true), { timeout: 1200 })
        : window.setTimeout(() => setDeferredMount(true), 200);
    return () => {
      if (typeof window.requestIdleCallback === "function") {
        window.cancelIdleCallback(idle as number);
      } else {
        window.clearTimeout(idle as number);
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || canvasFailed || !deferredMount) {
    return <HeroOctagonBadge />;
  }

  return (
    <CanvasErrorBoundary onError={() => setCanvasFailed(true)}>
      <ProcessModelViewer
        stages={handLayupProcess.stages}
        activeStageIndex={activeStageIndex}
        showAnnotations={false}
        cameraZoom={HERO_CAMERA_ZOOM}
        cameraBasePosition={HERO_CAMERA_BASE_POSITION}
        cameraTarget={HERO_CAMERA_TARGET}
      />
    </CanvasErrorBoundary>
  );
}
