"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ProcessStage } from "./types";

interface CaptionOverlayProps {
  stages: ProcessStage[];
  activeStageIndex: number;
}

// Desktop-only cinematic title+description card — real text, independent of
// the illustration, so the story stays readable/accessible/SEO-visible
// regardless of visual state. Positioned above StepList (which owns the
// bottom-most strip of the viewport at every breakpoint). Mobile shows
// CompanionPanel's compact card instead, to avoid two competing text
// sources on a small screen.
export default function CaptionOverlay({ stages, activeStageIndex }: CaptionOverlayProps) {
  const stage = stages[activeStageIndex];

  return (
    <div className="hidden lg:block absolute inset-x-0 bottom-20 z-20 pointer-events-none px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            // min-h sized to the tallest description among the 5 stages (3
            // lines, e.g. fiberglass-layup) so the card's top edge stays put
            // across stage changes instead of hopping with shorter ones (e.g.
            // reveal's 2-line description).
            className="max-w-lg min-h-[130px] bg-brand-navy-mid/90 border border-brand-orange/40 p-5 shadow-xl backdrop-blur-md"
          >
            <h4 className="font-cond font-bold text-xs uppercase tracking-widest text-brand-orange mb-2">
              {stage.title}
            </h4>
            <p className="text-white/80 text-sm font-sans leading-relaxed">{stage.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
