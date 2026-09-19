"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ProcessStage } from "./types";

interface HeroStageCaptionProps {
  stages: ProcessStage[];
  activeStageIndex: number;
}

// Compact caption + stepper for the Hero's pinned 3D column. Same
// crossfade language as CaptionOverlay.tsx/StepList.tsx (the full-bleed
// ProcessStorySection overlays), but stacked in normal flow directly under
// a much narrower canvas instead of absolutely positioned over a
// full-viewport scene — so no per-breakpoint desktop/mobile split is
// needed, unlike StepList.
export default function HeroStageCaption({ stages, activeStageIndex }: HeroStageCaptionProps) {
  const stage = stages[activeStageIndex];

  return (
    <div className="w-full mt-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="min-h-[60px] sm:min-h-[68px]"
        >
          <h4 className="font-cond font-bold text-xs uppercase tracking-widest text-brand-orange mb-1.5">
            {stage.title}
          </h4>
          <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed">{stage.description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-1.5 mt-4">
        {stages.map((s, i) => {
          const active = i === activeStageIndex;
          return (
            <div key={s.id} className="flex items-center flex-1 min-w-0">
              <span
                className={`shrink-0 w-5 h-5 flex items-center justify-center border font-mono text-[9px] transition-colors duration-300 ${
                  active ? "border-brand-orange bg-brand-orange text-white" : "border-white/25 text-white/50"
                }`}
              >
                {i + 1}
              </span>
              {i < stages.length - 1 && <div className="flex-1 h-px bg-white/10 mx-1.5" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
