"use client";

import { motion } from "framer-motion";
import type { ProcessStage } from "./types";
import { HERO_ILLUSTRATION_REGISTRY } from "./illustrations/hero";

interface ProcessStoryFallbackProps {
  stages: ProcessStage[];
}

// Opacity-only reveal — no y/scale transforms — matching the reduced-motion
// convention already established in HandLayupLayerStack.tsx. Non-pinned,
// normal document flow: never touches scroll or touch gestures.
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Carries each stage's accent color forward to stages that don't introduce a
// new object (e.g. "mold-surface", "reveal") — computed once, outside the
// render loop, rather than mutating a variable across .map() iterations.
function withAccentColors(stages: ProcessStage[]) {
  return stages.reduce<{ stage: ProcessStage; color: string }[]>((acc, stage) => {
    const previous = acc[acc.length - 1]?.color ?? "#4a5568";
    acc.push({ stage, color: stage.accentColor ?? previous });
    return acc;
  }, []);
}

export default function ProcessStoryFallback({ stages }: ProcessStoryFallbackProps) {
  const stagesWithColor = withAccentColors(stages);

  return (
    <section className="relative w-full bg-brand-navy py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h3 className="font-cond font-bold text-white/70 text-xs sm:text-sm uppercase tracking-[0.25em]">
            Hand Lay-Up <span className="text-brand-orange">Method</span>
          </h3>
        </motion.div>

        <div className="flex flex-col gap-6">
          {stagesWithColor.map(({ stage, color }) => {
            const Illustration = HERO_ILLUSTRATION_REGISTRY[stage.heroIllustrationId];
            return (
            <motion.div
              key={stage.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="flex gap-5 items-stretch bg-brand-navy-mid/60 border border-white/10 p-5"
            >
              <div className="w-1.5 shrink-0" style={{ backgroundColor: color }} />
              {Illustration && (
                <div className="hidden sm:flex w-28 h-28 shrink-0 items-center justify-center bg-brand-navy/40 border border-white/10 p-2">
                  <Illustration className="w-full h-full" />
                </div>
              )}
              <div>
                <h4 className="font-cond font-bold text-xs uppercase tracking-widest text-brand-orange mb-2">
                  {stage.title}
                </h4>
                <p className="text-white/80 text-sm font-sans leading-relaxed">{stage.description}</p>

                {stage.insights?.tools && stage.insights.tools.length > 0 && (
                  <p className="text-white/60 text-xs font-sans mt-3">
                    <span className="text-white/40 uppercase font-mono tracking-widest mr-1.5">Tool</span>
                    {stage.insights.tools.join(" & ")}
                  </p>
                )}

                {stage.insights?.whyItMatters && (
                  <p className="text-white/70 text-sm font-sans leading-relaxed mt-2">
                    {stage.insights.whyItMatters}
                  </p>
                )}

                {stage.insights?.keyBenefits && stage.insights.keyBenefits.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {stage.insights.keyBenefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="border border-brand-orange/30 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-white/80"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                )}

                {stage.insights?.outcome && (
                  <p className="text-white/60 text-xs font-sans leading-relaxed mt-3">
                    <span className="text-white/40 uppercase font-mono tracking-widest mr-1.5">Result</span>
                    {stage.insights.outcome}
                  </p>
                )}
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
