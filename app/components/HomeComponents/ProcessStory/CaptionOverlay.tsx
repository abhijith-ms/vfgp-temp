"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ProcessStage } from "./types";

interface CaptionOverlayProps {
  stages: ProcessStage[];
  activeStageIndex: number;
}

// Pure presentational DOM overlay — real text, independent of WebGL, so the
// story stays readable/accessible/SEO-visible regardless of Canvas state.
// Styled to match the caption card already proven in HeroSction.tsx.
export default function CaptionOverlay({ stages, activeStageIndex }: CaptionOverlayProps) {
  const stage = stages[activeStageIndex];

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-10 flex flex-col gap-4">
        {/* Desktop only — mobile shows a single compact card (CompanionPanel's
            CompactPanel) instead, to avoid two competing text sources on a
            small screen. Stepper below stays visible at every breakpoint. */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="max-w-lg bg-brand-navy-mid/90 border border-brand-orange/40 p-5 shadow-xl backdrop-blur-md"
            >
              <h4 className="font-cond font-bold text-xs uppercase tracking-widest text-brand-orange mb-2">
                {stage.title}
              </h4>
              <p className="text-white/80 text-sm font-sans leading-relaxed">{stage.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          {stages.map((s, i) => (
            <div
              key={s.id}
              className={`h-1 flex-1 max-w-10 transition-colors duration-300 ${
                i === activeStageIndex ? "bg-brand-orange" : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
