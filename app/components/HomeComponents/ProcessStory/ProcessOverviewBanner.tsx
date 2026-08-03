"use client";

import { motion, Variants } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { ComponentType } from "react";
import type { ProcessDefinition } from "./types";
import { HERO_ILLUSTRATION_REGISTRY } from "./illustrations/hero";

interface ProcessOverviewBannerProps {
  process: ProcessDefinition;
}

const sectionViewport = { once: true, amount: 0.15 };
const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// The client's own 7-step framing for the overview, independent of the
// 8-stage scroll-story data (an overview naturally groups/labels steps more
// coarsely than a detailed walkthrough — see Phase 6 plan's content-alignment
// note). Each step reuses one of the scroll-story's hero illustrations at
// small size, keeping a single illustration source of truth rather than
// authoring a third visual set.
const OVERVIEW_STEPS = [
  { title: "Mold Preparation", desc: "Mold cleaned and treated with release agent.", heroIllustrationId: "apply-release-agent" },
  { title: "Gel Coat Application", desc: "Pigmented resin skin sprayed onto the mold.", heroIllustrationId: "apply-gel-coat" },
  { title: "Fiber Glass Layup", desc: "Surface veil laid over the gel coat.", heroIllustrationId: "place-surface-mat" },
  { title: "Resin Application", desc: "Resin rolled through to wet out the fibers.", heroIllustrationId: "roll-chopped-strand" },
  { title: "Additional Layers", desc: "Structural roving added for directional strength.", heroIllustrationId: "place-woven-roving" },
  { title: "Curing", desc: "Back coat seals the laminate as it hardens.", heroIllustrationId: "seal-back-coat" },
  { title: "Demold & Finishing", desc: "Finished part released, trimmed and inspected.", heroIllustrationId: "finished-part" },
];

export default function ProcessOverviewBanner({ process }: ProcessOverviewBannerProps) {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-blueprint-grid-light bg-slate-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="font-cond font-black text-brand-navy text-4xl sm:text-5xl leading-none uppercase">
            Hand Lay-Up <span className="text-brand-orange">Process</span>
          </h2>
          <div className="h-1 bg-brand-navy w-16 mx-auto mt-4" />
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4 max-w-lg mx-auto font-sans">
            Every FRP component we build follows the same seven-step, hand-built discipline — from bare mold to finished part.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 mb-16"
        >
          {OVERVIEW_STEPS.map((step, i) => {
            const Illustration = HERO_ILLUSTRATION_REGISTRY[step.heroIllustrationId];
            return (
              <motion.div key={step.title} variants={fadeUp} className="flex flex-col items-center text-center">
                <div className="relative w-full aspect-square bg-white border border-gray-100 mb-3 flex items-center justify-center p-3">
                  <span className="absolute top-1.5 left-1.5 font-mono text-[10px] font-bold text-brand-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {Illustration && <Illustration className="w-full h-full" />}
                </div>
                <h4 className="font-cond font-black text-[11px] sm:text-xs uppercase tracking-wide text-brand-navy mb-1">
                  {step.title}
                </h4>
                <p className="text-gray-500 text-[11px] leading-snug font-sans">{step.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {process.productBenefits && process.productBenefits.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {process.productBenefits.map((benefit) => {
              const Icon = (LucideIcons as unknown as Record<string, ComponentType<{ className?: string }>>)[
                benefit.icon
              ];
              return (
                <motion.div
                  key={benefit.label}
                  variants={fadeUp}
                  className="flex items-center gap-2.5 bg-white border border-gray-100 px-5 py-3"
                >
                  {Icon && <Icon className="w-4.5 h-4.5 text-brand-orange" />}
                  <span className="font-cond font-bold text-brand-navy text-xs uppercase tracking-wide">
                    {benefit.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
