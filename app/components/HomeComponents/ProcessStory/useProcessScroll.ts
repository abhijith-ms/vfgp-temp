"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getStageBoundaries, getStageProgress, type ProcessStage } from "./types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseProcessScrollOptions {
  wrapperRef: React.RefObject<HTMLElement | null>;
  pinRef: React.RefObject<HTMLElement | null>;
  stages: ProcessStage[];
  onStageChange: (index: number) => void;
}

// One pinned/scrubbed ScrollTrigger drives the whole story. progressRef is
// updated every tick (no re-render); onStageChange only fires the handful of
// times the derived stage index actually changes — mirrors the ref/quickSetter
// discipline already used in HandLayupLayerStack.tsx and the onStageChange
// pattern already proven in HeroSction.tsx.
export function useProcessScroll({ wrapperRef, pinRef, stages, onStageChange }: UseProcessScrollOptions) {
  const progressRef = useRef(0);
  const lastStageIndexRef = useRef(-1);
  const onStageChangeRef = useRef(onStageChange);
  useEffect(() => {
    onStageChangeRef.current = onStageChange;
  });

  const boundaries = useMemo(() => getStageBoundaries(stages), [stages]);

  useGSAP(
    () => {
      if (!wrapperRef.current || !pinRef.current) return;

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        pin: pinRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const { index } = getStageProgress(boundaries, self.progress);
          if (index !== lastStageIndexRef.current) {
            lastStageIndexRef.current = index;
            onStageChangeRef.current(index);
          }
        },
      });
    },
    { scope: wrapperRef }
  );

  return { progressRef };
}
