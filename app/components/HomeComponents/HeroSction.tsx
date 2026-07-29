"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HandLayupLayerStack from "./HandLayupLayerStack";

const layerDescriptions: { title: string; desc: string }[] = [
  {
    title: "Mold Surface & Release Agent",
    desc: "The polished mold surface is cleaned and treated with a release agent (wax or PVA), forming the base against which every subsequent layer is built.",
  },
  {
    title: "Gel Coat",
    desc: "A pigmented, UV- and corrosion-resistant resin layer sprayed directly onto the mold surface, forming the finished part's outer skin.",
  },
  {
    title: "Surface Mat",
    desc: "A thin continuous-strand glass veil laid over the gel coat, creating a smooth, resin-rich barrier that prevents fiber print-through.",
  },
  {
    title: "Chopped Strand Mat",
    desc: "Non-directional glass fibers hand-laid and rolled with resin, adding bulk thickness and isotropic strength through the laminate.",
  },
  {
    title: "Woven Roving",
    desc: "Heavy bidirectional fiberglass cloth positioned for high tensile and impact strength along the part's primary structural axes.",
  },
  {
    title: "Back Coat & Final Cure",
    desc: "A sealing resin layer locks in the laminate stack, which then cures at room temperature until fully hardened and ready for demolding.",
  },
];

// Short quick-glance names for the per-layer hover tag on the 3D diagram itself
// (the fuller titles/descriptions above stay in the shared caption card).
const layerShortLabels = [
  "Mold Surface",
  "Gel Coat",
  "Surface Mat",
  "Chopped Strand Mat",
  "Woven Roving",
  "Back Coat",
];

export default function HeroSection() {
  const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);
  const [introDone, setIntroDone] = useState(false);

  return (
    <section className="relative min-h-[95vh] w-full flex items-center bg-[#0a1628] overflow-hidden">
      {/* Background Grids & Patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Weave texture layer */}
        <div className="absolute inset-0 bg-fiber-weave opacity-25" />
        {/* Blueprint grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-75" />

        {/* Glow zones */}
        <div className="absolute left-[-150px] top-[10%] w-[600px] h-[600px] rounded-full bg-radial from-brand-orange/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute right-[-100px] top-[20%] w-[700px] h-[700px] rounded-full bg-radial from-brand-navy-light/60 via-transparent to-transparent blur-3xl" />

        {/* Diagonal accent bars */}
        <div className="absolute top-[25%] left-0 w-[45%] h-[2px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent -skew-y-3" />
        <div className="absolute top-[60%] right-0 w-[30%] h-[2px] bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent skew-y-2" />

        {/* Blueprint corner marks */}
        <div className="absolute top-10 left-10 w-8 h-8 opacity-30 hidden md:block">
          <div className="absolute top-0 left-0 w-8 h-[2px] bg-brand-orange" />
          <div className="absolute top-0 left-0 w-[2px] h-8 bg-brand-orange" />
        </div>
        <div className="absolute top-10 right-10 w-8 h-8 opacity-30 hidden md:block">
          <div className="absolute top-0 right-0 w-8 h-[2px] bg-brand-orange" />
          <div className="absolute top-0 right-0 w-[2px] h-8 bg-brand-orange" />
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start text-white">
          <h1 className="font-cond font-black leading-[1.0] text-5xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight uppercase mb-2">Advanced <span className="text-brand-orange">FRP</span><br /><span className="font-light text-white/80">Composites</span></h1>
          <div className="h-1 bg-brand-orange w-24 mb-6" />

          <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mb-8 font-sans">
            Delivering high-performance fiberglass solutions for Automobile, Defence, and Engineering sectors with hand lay-up and pultrusion excellence for over 30 years.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/product"
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-cond font-bold text-xs uppercase tracking-widest px-8 py-3.5 transition-colors shadow-lg shadow-brand-orange/20"
            >
              Explore Products
            </Link>

            <Link
              href="/contact"
              className="border border-white/30 hover:border-white text-white font-cond font-bold text-xs uppercase tracking-widest px-8 py-3.5 bg-white/5 hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Content - Interactive 3D (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center relative min-h-[560px]">
          <h3 className="font-cond font-bold text-white/70 text-xs sm:text-sm uppercase tracking-[0.25em] mb-4">
            Hand Lay-Up <span className="text-brand-orange">Method</span>
          </h3>

          {/* Animated CSS-3D hand lay-up layer stack */}
          <div className="w-full max-w-lg aspect-square" aria-label="Hand Lay-Up Layer Build-Up Diagram">
            <HandLayupLayerStack
              onStageChange={setActiveStageIndex}
              onIntroComplete={() => setIntroDone(true)}
              layerLabels={layerShortLabels}
            />
          </div>

          {/* Info Card synced to the build-up animation */}
          <div className="absolute bottom-2 left-6 right-6 z-20 pointer-events-none">
            <AnimatePresence mode="wait">
              {activeStageIndex !== null ? (
                <motion.div
                  key={activeStageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-brand-navy-mid/95 border border-brand-orange/40 p-4 shadow-xl backdrop-blur-md"
                >
                  <h4 className="font-cond font-bold text-xs uppercase tracking-widest text-brand-orange mb-1">
                    {layerDescriptions[activeStageIndex].title}
                  </h4>
                  <p className="text-white/80 text-[11px] font-sans leading-relaxed">
                    {layerDescriptions[activeStageIndex].desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-brand-navy-mid/45 border border-white/5 p-4 text-center backdrop-blur-sm"
                >
                  <p className="text-white/40 text-[10px] uppercase font-mono tracking-widest leading-relaxed">
                    {introDone ? "[ Drag to rotate — hover a layer to inspect ]" : "[ Building hand lay-up laminate stack ]"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Technical stats strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-brand-navy-mid/90 border-t border-white/10 backdrop-blur-md hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {[
            { num: "30+", label: "Years Experience" },
            { num: "ISO", label: "Certified Quality" },
            { num: "OEM", label: "Automotive Supplier" },
            { num: "100%", label: "Precision Engineering" },
          ].map((stat, idx) => (
            <div key={idx} className="py-4.5 px-6 flex items-center gap-3.5">
              <span className="font-cond font-black text-brand-orange text-2xl lg:text-3xl leading-none">
                {stat.num}
              </span>
              <span className="font-cond font-bold text-white/50 text-[10px] tracking-widest uppercase leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
