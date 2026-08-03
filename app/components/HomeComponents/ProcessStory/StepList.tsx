"use client";

import type { ProcessStage } from "./types";

interface StepListProps {
  stages: ProcessStage[];
  activeStageIndex: number;
}

// Shared progress indicator, extracted from CaptionOverlay's old dot-row
// into its own component (substantial enough now to be its own concern) and
// owns the bottom-most strip of the pinned viewport at every breakpoint —
// CaptionOverlay's card and CompanionPanel's compact card are both offset
// above it.
//
// Desktop: full numbered step list with titles (client's requested upgrade
// from plain dots, reusing the shortLabel data already on each stage).
// Mobile: stays the simple dot row, deliberately — Phase 5's mobile work
// took three rounds of real-device feedback to earn back vertical space and
// a single source of information on screen; a text-heavy stepper would undo
// that. Not clickable/scroll-jump-navigable — a distinct interaction, out of
// scope here.
export default function StepList({ stages, activeStageIndex }: StepListProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none px-6 md:px-12 lg:pr-[38%] pb-4 lg:pb-6">
      <div className="hidden lg:flex items-center max-w-7xl mx-auto">
        {stages.map((stage, i) => {
          const active = i === activeStageIndex;
          return (
            <div key={stage.id} className="flex items-center flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`shrink-0 w-6 h-6 flex items-center justify-center border font-mono text-[10px] transition-colors duration-300 ${
                    active ? "border-brand-orange bg-brand-orange text-white" : "border-white/25 text-white/50"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`truncate text-[10px] font-cond font-bold uppercase tracking-wide transition-colors duration-300 ${
                    active ? "text-brand-orange" : "text-white/40"
                  }`}
                >
                  {stage.shortLabel}
                </span>
              </div>
              {i < stages.length - 1 && <div className="flex-1 h-px bg-white/10 mx-2" />}
            </div>
          );
        })}
      </div>

      <div className="lg:hidden flex items-center gap-2 max-w-7xl mx-auto">
        {stages.map((stage, i) => (
          <div
            key={stage.id}
            className={`h-1 flex-1 max-w-10 transition-colors duration-300 ${
              i === activeStageIndex ? "bg-brand-orange" : "bg-white/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
