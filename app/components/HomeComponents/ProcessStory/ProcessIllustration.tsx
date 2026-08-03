"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ProcessStage } from "./types";
import { HERO_ILLUSTRATION_REGISTRY } from "./illustrations/hero";

interface ProcessIllustrationProps {
  stages: ProcessStage[];
  activeStageIndex: number;
}

// Central visual of the pinned scroll story — a large flat illustration of
// the process action for the active stage, crossfading as the visitor
// scrolls. Replaces the abstract 3D octagon-layer geometry (ProcessCanvas)
// per client direction: show the process, not the product. Reads the same
// activeStageIndex/stages already threaded to CaptionOverlay/CompanionPanel,
// no new scroll-reading logic. Sync-mode AnimatePresence (not "wait"),
// matching CompanionPanel's already-proven crossfade pattern.
export default function ProcessIllustration({ stages, activeStageIndex }: ProcessIllustrationProps) {
  const stage = stages[activeStageIndex];
  const Illustration = HERO_ILLUSTRATION_REGISTRY[stage.heroIllustrationId];

  if (!Illustration) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-full max-w-2xl aspect-[4/3] px-10">
        <AnimatePresence>
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Illustration className="w-full h-full" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
