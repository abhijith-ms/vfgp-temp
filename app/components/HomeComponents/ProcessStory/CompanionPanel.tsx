"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { ProcessStage, StageInsights } from "./types";
import { ILLUSTRATION_REGISTRY } from "./illustrations";

interface CompanionPanelProps {
  stages: ProcessStage[];
  activeStageIndex: number;
}

const DEFAULT_ACCENT = "#f47c20";

// Default (sync) AnimatePresence mode — deliberately different from
// CaptionOverlay's mode="wait" — so outgoing and incoming content genuinely
// overlap/crossfade rather than swap sequentially. The outer card exits as
// one unified fade+drift-up; children stagger in on enter only, per spec
// ("old content: fade, move up, reduce opacity" is one motion; "new content"
// sequences eyebrow/title -> illustration -> benefit chips).
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.06, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const chipContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

interface StageHeader {
  stageIndex: number;
  totalStages: number;
  title: string;
}

// Right-column educational companion — a pure DOM overlay on top of the
// existing full-bleed Canvas, exactly like CaptionOverlay.tsx, just anchored
// right. Renders only whatever the active stage's optional `insights`
// provides; camera-only narrative beats (no `insights`) render nothing here.
export default function CompanionPanel({ stages, activeStageIndex }: CompanionPanelProps) {
  const stage = stages[activeStageIndex];
  const insights = stage.insights;
  const header: StageHeader = { stageIndex: activeStageIndex, totalStages: stages.length, title: stage.title };

  return (
    <>
      <DesktopPanel stageId={stage.id} header={header} insights={insights} />
      <CompactPanel header={header} insights={insights} />
    </>
  );
}

// lg+: full right column, richest content, animated crossfade.
function DesktopPanel({
  stageId,
  header,
  insights,
}: {
  stageId: string;
  header: StageHeader;
  insights?: StageInsights;
}) {
  const Illustration = insights?.illustrationId ? ILLUSTRATION_REGISTRY[insights.illustrationId] : undefined;
  const accent = insights?.highlightColor ?? DEFAULT_ACCENT;

  return (
    <div className="hidden lg:block absolute inset-y-0 right-0 w-[34%] max-w-md z-20 pointer-events-none">
      {/* Relatively-positioned fixed-size column; crossfading cards are
          absolutely positioned inside it so variable content length between
          stages never reflows surrounding chrome mid-transition. */}
      <div className="relative w-full h-full">
        <AnimatePresence>
          {insights && (
            <motion.div
              key={stageId}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex items-center px-8 py-10"
            >
              <div className="w-full">
                <motion.div variants={itemVariants}>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    Stage {String(header.stageIndex).padStart(2, "0")} / {header.totalStages - 1}
                  </span>
                  <h4 className="font-cond font-black text-xl uppercase tracking-wide text-white mt-1 mb-4">
                    {header.title}
                  </h4>
                </motion.div>

                {Illustration && (
                  <motion.div variants={itemVariants} className="w-24 h-20 mb-4" style={{ color: accent }}>
                    <Illustration className="w-full h-full" />
                  </motion.div>
                )}

                {insights.tools && insights.tools.length > 0 && (
                  <motion.div variants={itemVariants} className="mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Tool</span>
                    <p className="font-cond font-bold text-sm text-white/90">{insights.tools.join(" & ")}</p>
                  </motion.div>
                )}

                {insights.whyItMatters && (
                  <motion.p variants={itemVariants} className="text-white/70 text-sm font-sans leading-relaxed mb-4">
                    {insights.whyItMatters}
                  </motion.p>
                )}

                {insights.keyBenefits && insights.keyBenefits.length > 0 && (
                  <motion.div variants={chipContainerVariants} className="flex flex-wrap gap-2 mb-4">
                    {insights.keyBenefits.map((benefit) => (
                      <motion.span
                        key={benefit}
                        variants={chipVariants}
                        className="border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-white/80"
                        style={{ borderColor: `${accent}66` }}
                      >
                        {benefit}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {insights.outcome && (
                  <motion.div variants={itemVariants} className="border-l-2 pl-3" style={{ borderColor: accent }}>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Result</span>
                    <p className="text-white/80 text-sm font-sans leading-relaxed">{insights.outcome}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// <lg (tablet + mobile): the right column has no room without cramping the
// 3D view. The 3D scene must stay the hero here, so this floats as a small,
// dense, bottom-anchored card (nothing sits between the navbar and the scene)
// — clears the shared stepper via bottom-16, and is horizontally centered
// like a floating card rather than a stretched strip. Trimmed to stage/title/
// tool/benefits/outcome only; no illustration, no full paragraph. CaptionOverlay's
// own card is hidden on this breakpoint so this is the single text source on
// mobile. Not animated (plain conditional render) — a deliberate simplification.
function CompactPanel({ header, insights }: { header: StageHeader; insights?: StageInsights }) {
  if (!insights) return null;
  const accent = insights.highlightColor ?? DEFAULT_ACCENT;
  const benefits = insights.keyBenefits?.slice(0, 2) ?? [];
  const hasToolsOrBenefits = (insights.tools && insights.tools.length > 0) || benefits.length > 0;

  return (
    <div className="lg:hidden absolute inset-x-0 bottom-16 z-20 pointer-events-none px-4">
      <div className="max-w-sm mx-auto max-h-[28vh] overflow-hidden bg-brand-navy-mid/90 border border-brand-orange/30 px-4 py-2.5 backdrop-blur-md">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
          Stage {String(header.stageIndex).padStart(2, "0")} / {header.totalStages - 1}
        </span>
        <h4 className="font-cond font-black text-sm uppercase tracking-wide text-white mt-0 mb-1">
          {header.title}
        </h4>
        {insights.tools && insights.tools.length > 0 && (
          <p className="text-white/80 text-xs font-sans mb-1">
            <span className="text-white/40 uppercase font-mono text-[9px] tracking-widest mr-1">Tool</span>
            {insights.tools.join(" & ")}
          </p>
        )}
        {benefits.length > 0 && (
          <ul className="flex flex-col gap-0.5">
            {benefits.map((benefit) => (
              <li key={benefit} className="text-white/80 text-[10px] font-mono uppercase tracking-wide">
                <span style={{ color: accent }}>✓</span> {benefit}
              </li>
            ))}
          </ul>
        )}
        {!hasToolsOrBenefits && insights.outcome && (
          <p className="text-white/70 text-xs font-sans leading-snug">{insights.outcome}</p>
        )}
      </div>
    </div>
  );
}
