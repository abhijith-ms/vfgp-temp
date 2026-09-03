"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

const OCTAGON_CLIP =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

export default function HeroSection() {
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

        {/* Right Content - Static brand visual + scroll cue (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center relative min-h-[560px]">
          <h3 className="font-cond font-bold text-white/70 text-xs sm:text-sm uppercase tracking-[0.25em] mb-4">
            Hand Lay-Up <span className="text-brand-orange">Method</span>
          </h3>

          {/* Static nested-octagon badge — the full build-up story now lives
              in the scroll-driven section directly below the hero. */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72" aria-hidden="true">
            <div
              className="absolute inset-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)] border border-white/10"
              style={{ backgroundColor: "#f47c20", clipPath: OCTAGON_CLIP }}
            />
            <div
              className="absolute inset-6 sm:inset-8 border border-white/10"
              style={{ backgroundColor: "#0a1628", clipPath: OCTAGON_CLIP }}
            />
            <div
              className="absolute inset-12 sm:inset-16 border border-brand-orange/30"
              style={{ backgroundColor: "#112240", clipPath: OCTAGON_CLIP }}
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-2">
            <span className="text-white/50 text-[10px] uppercase font-mono tracking-widest">
              See how it&apos;s made
            </span>
            <ChevronDown className="w-4 h-4 text-brand-orange animate-bounce" />
          </div>
        </div>
      </div>

      {/* The "30+ Years / ISO / OEM / Precision" facts used to repeat here as
          a second stats strip on top of FeatureBar.tsx (rendered right after
          the process story, at every breakpoint including mobile, where this
          strip was always hidden anyway via `hidden sm:block`) — removed so
          FeatureBar is the single, consistent source across all screen
          sizes instead of showing the same four facts twice on desktop. */}
    </section>
  );
}
