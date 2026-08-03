"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { ProcessDefinition } from "./types";
import { useProcessScroll } from "./useProcessScroll";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import CaptionOverlay from "./CaptionOverlay";
import CompanionPanel from "./CompanionPanel";
import ProcessIllustration from "./ProcessIllustration";
import ProcessStoryFallback from "./ProcessStoryFallback";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import StepList from "./StepList";

// WebGL can't SSR, and this keeps three/@react-three/* out of the initial
// page bundle entirely — it only loads once this section is reached.
const ProcessModelViewer = dynamic(() => import("./ProcessModelViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-brand-navy" />,
});

interface ProcessStorySectionProps {
  process: ProcessDefinition;
}

// Entry point: decides whether this visitor gets the pinned 3D story or the
// static fallback, THEN mounts exactly one of the two — never both, and
// never one that briefly mounts before switching. Kept separate from the
// pinned implementation below so that when a visitor switches to the
// fallback (reduced motion, or a later WebGL failure), ProcessStoryPinned
// actually unmounts through React's normal lifecycle, letting useGSAP's own
// cleanup properly revert the ScrollTrigger — rather than the ScrollTrigger
// silently surviving detached from its trigger element.
export default function ProcessStorySection({ process }: ProcessStorySectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [canvasFailed, setCanvasFailed] = useState(false);

  if (prefersReducedMotion) {
    return <ProcessStoryFallback stages={process.stages} />;
  }

  return <ProcessStoryPinned process={process} canvasFailed={canvasFailed} onCanvasError={() => setCanvasFailed(true)} />;
}

interface ProcessStoryPinnedProps extends ProcessStorySectionProps {
  canvasFailed: boolean;
  onCanvasError: () => void;
}

// Tall wrapper pinned via ScrollTrigger; 3D hero visual (or its flat-SVG
// fallback on WebGL failure)/caption/companion panel all driven by live
// scroll progress (useProcessScroll).
function ProcessStoryPinned({ process, canvasFailed, onCanvasError }: ProcessStoryPinnedProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useProcessScroll({
    wrapperRef,
    pinRef,
    stages: process.stages,
    onStageChange: setActiveStageIndex,
  });

  return (
    <section
      ref={wrapperRef}
      className="relative w-full bg-brand-navy"
      style={{ height: `${process.stages.length * 100}vh` }}
    >
      {/* h-[100dvh], not h-screen (100vh): on mobile, 100vh resolves against
          the browser's maximum viewport (as if the address bar were hidden),
          not what's actually visible — pushing bottom-anchored overlay
          content below the real, currently-visible area. 100dvh tracks the
          actual visible viewport as the toolbar shows/hides. */}
      <div ref={pinRef} className="relative w-full h-[100dvh] overflow-hidden">
        {canvasFailed ? (
          <ProcessIllustration stages={process.stages} activeStageIndex={activeStageIndex} />
        ) : (
          <CanvasErrorBoundary onError={onCanvasError}>
            <ProcessModelViewer stages={process.stages} activeStageIndex={activeStageIndex} />
          </CanvasErrorBoundary>
        )}
        <CaptionOverlay stages={process.stages} activeStageIndex={activeStageIndex} />
        <CompanionPanel stages={process.stages} activeStageIndex={activeStageIndex} />
        <StepList stages={process.stages} activeStageIndex={activeStageIndex} />
      </div>
    </section>
  );
}
