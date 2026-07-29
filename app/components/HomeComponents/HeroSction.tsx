"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// A single step node in the hand lay-up process flow diagram
function ProcessNode({
  x,
  y,
  num,
  stepKey,
  label,
  hovered,
  onHover,
  onLeave,
  children,
}: {
  x: number;
  y: number;
  num: string;
  stepKey: string;
  label: string;
  hovered: string | null;
  onHover: () => void;
  onLeave: () => void;
  children: React.ReactNode;
}) {
  const active = hovered === stepKey;
  return (
    <g
      className="cursor-pointer transition-all duration-300"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      transform={`translate(${x}, ${y}) scale(1.3)`}
    >
      <rect
        x="4"
        y="4"
        width="72"
        height="62"
        rx="3"
        fill="#0d2a55"
        stroke={active ? "#f47c20" : "rgba(244,124,32,0.35)"}
        strokeWidth={active ? 1.5 : 0.7}
        className="transition-all duration-300"
      />
      <circle
        cx="16"
        cy="16"
        r="7"
        fill={active ? "#f47c20" : "#0a1e40"}
        stroke="#f47c20"
        strokeWidth="0.8"
        opacity={active ? 1 : 0.7}
      />
      <text x="16" y="18.5" textAnchor="middle" fill={active ? "#0a1628" : "#f47c20"} fontFamily="monospace" fontSize="7" fontWeight="bold">
        {num}
      </text>
      {children}
      <text x="40" y="60" textAnchor="middle" fill={active ? "#f47c20" : "#ffffff"} opacity={active ? 1 : 0.6} fontFamily="monospace" fontSize="5.5" letterSpacing="0.3">
        {label}
      </text>
    </g>
  );
}

export default function HeroSection() {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  // Technical descriptions of the hand lay-up process stages
  const layerDescriptions: Record<string, { title: string; desc: string }> = {
    gelcoat: {
      title: "Mold Preparation & Release Agent",
      desc: "The mold surface is cleaned, polished, and coated with a release agent (wax or PVA) to ensure the cured part separates cleanly without damage.",
    },
    surfacemat: {
      title: "Gel Coat Application",
      desc: "A pigmented gel coat is brushed or sprayed onto the mold to form the outer finish layer, providing a glossy, UV- and corrosion-resistant surface before lamination begins.",
    },
    wovenroving1: {
      title: "Reinforcement Placement",
      desc: "Layers of glass mat and woven roving are cut to shape and manually positioned over the gel coat, building the structural reinforcement of the laminate ply by ply.",
    },
    choppedstrand: {
      title: "Manual Resin Application",
      desc: "Catalyzed resin is applied by brush or roller over each reinforcement layer, thoroughly wetting out the fibers before the next ply is laid down.",
    },
    wovenroving2: {
      title: "Air-Bubble Removal & Compaction",
      desc: "Ribbed metal or laminate rollers are worked over each wetted layer to press out trapped air and excess resin, compacting the plies into a dense, void-free laminate.",
    },
    backcoat: {
      title: "Curing & Demolding",
      desc: "The laminate cures at room temperature or in a controlled zone until fully hardened, after which the finished part is carefully released from the mold.",
    },
  };

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
          {/* <div className="inline-flex items-center gap-2 mb-6 border border-brand-orange/40 bg-brand-orange/5 px-4 py-1.5 font-cond text-xs font-semibold tracking-widest uppercase text-brand-orange">
            <span className="w-1.5 h-1.5 bg-brand-orange animate-pulse" />
            ISO Certified FRP Manufacturer · Hyderabad
          </div> */}

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

        {/* Right Content - Interactive SVG (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center relative min-h-[400px]">
          {/* Main SVG Blueprint Diagram */}
          <svg
            width="100%"
            viewBox="0 0 420 540"
            className="w-full max-w-md h-auto"
            aria-label="Hand Lay-Up Process Diagram"
          >
            <defs>
              <pattern id="hero-weave" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <line x1="0" y1="8" x2="16" y2="8" stroke="#f47c20" strokeWidth="0.8" opacity="0.4" />
                <line x1="8" y1="0" x2="8" y2="16" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
              </pattern>
              <pattern id="hero-diag" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                <line x1="0" y1="12" x2="12" y2="0" stroke="#f47c20" strokeWidth="0.6" opacity="0.4" />
              </pattern>
              <pattern id="hero-grid-fine" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#ffffff" strokeWidth="0.3" opacity="0.2" />
                <line x1="0" y1="0" x2="8" y2="0" stroke="#ffffff" strokeWidth="0.3" opacity="0.2" />
              </pattern>
            </defs>

            {/* Technical grid borders & ticks */}
            <g opacity="0.5" stroke="#f47c20" strokeWidth="0.5" fill="none">
              <line x1="20" y1="40" x2="400" y2="40" strokeDasharray="3,3" />
              <line x1="20" y1="460" x2="400" y2="460" strokeDasharray="3,3" />
              <line x1="20" y1="40" x2="20" y2="460" strokeDasharray="3,3" />
              <line x1="400" y1="40" x2="400" y2="460" strokeDasharray="3,3" />

              <line x1="20" y1="40" x2="35" y2="40" strokeWidth="1" />
              <line x1="20" y1="40" x2="20" y2="55" strokeWidth="1" />
              <line x1="400" y1="40" x2="385" y2="40" strokeWidth="1" />
              <line x1="400" y1="40" x2="400" y2="55" strokeWidth="1" />
              <line x1="20" y1="460" x2="35" y2="460" strokeWidth="1" />
              <line x1="20" y1="460" x2="20" y2="445" strokeWidth="1" />
              <line x1="400" y1="460" x2="385" y2="460" strokeWidth="1" />
              <line x1="400" y1="460" x2="400" y2="445" strokeWidth="1" />
            </g>

            {/* Hand lay-up process flow: 6-step zigzag sequence */}
            <g transform="translate(40, 70)">
              {/* Step 1: Mold Preparation & Release Agent */}
              <ProcessNode x={0} y={0} num="01" stepKey="gelcoat" label="MOLD PREP" hovered={hoveredLayer} onHover={() => setHoveredLayer("gelcoat")} onLeave={() => setHoveredLayer(null)}>
                <path d="M18,38 Q40,16 62,38" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                <path d="M20,35 Q40,20 60,35" fill="none" stroke="#f47c20" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.8" />
                <rect x="14" y="38" width="52" height="5" fill="url(#hero-grid-fine)" opacity="0.5" />
              </ProcessNode>

              {/* Step 2: Gel Coat Application */}
              <ProcessNode x={118} y={0} num="02" stepKey="surfacemat" label="GEL COAT" hovered={hoveredLayer} onHover={() => setHoveredLayer("surfacemat")} onLeave={() => setHoveredLayer(null)}>
                <circle cx="24" cy="13" r="1.2" fill="#f47c20" opacity="0.8" />
                <line x1="24" y1="13" x2="30" y2="26" stroke="#f47c20" strokeWidth="0.6" opacity="0.6" />
                <line x1="24" y1="13" x2="40" y2="28" stroke="#f47c20" strokeWidth="0.6" opacity="0.6" />
                <line x1="24" y1="13" x2="50" y2="26" stroke="#f47c20" strokeWidth="0.6" opacity="0.6" />
                <rect x="18" y="30" width="44" height="9" fill="url(#hero-diag)" opacity="0.6" stroke="#f47c20" strokeWidth="0.5" />
              </ProcessNode>

              {/* Step 3: Reinforcement Placement */}
              <ProcessNode x={236} y={0} num="03" stepKey="wovenroving1" label="REINFORCEMENT" hovered={hoveredLayer} onHover={() => setHoveredLayer("wovenroving1")} onLeave={() => setHoveredLayer(null)}>
                <rect x="18" y="14" width="44" height="24" fill="url(#hero-weave)" opacity="0.7" stroke="#f47c20" strokeWidth="0.5" />
                <polygon points="52,14 62,14 62,24" fill="#0a1e40" stroke="#f47c20" strokeWidth="0.5" />
              </ProcessNode>

              {/* Flow arrows: row 1 (left to right) */}
              <line x1="99" y1="46" x2="121" y2="46" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <polygon points="121,46 116,43 116,49" fill="#f47c20" opacity="0.6" />
              <line x1="217" y1="46" x2="239" y2="46" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <polygon points="239,46 234,43 234,49" fill="#f47c20" opacity="0.6" />
              {/* Flow arrow: down to row 2 */}
              <line x1="288" y1="86" x2="288" y2="113" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <polygon points="288,113 285,108 291,108" fill="#f47c20" opacity="0.6" />

              {/* Step 4: Manual Resin Application */}
              <ProcessNode x={236} y={110} num="04" stepKey="choppedstrand" label="RESIN APPLICATION" hovered={hoveredLayer} onHover={() => setHoveredLayer("choppedstrand")} onLeave={() => setHoveredLayer(null)}>
                <rect x="26" y="12" width="28" height="9" rx="2" fill="#0f3060" stroke="#f47c20" strokeWidth="0.8" opacity="0.9" />
                <line x1="54" y1="16" x2="64" y2="8" stroke="#f47c20" strokeWidth="0.8" opacity="0.7" />
                <path d="M18,30 q5,-4 10,0 q5,4 10,0 q5,-4 10,0 q5,4 10,0" fill="none" stroke="#f47c20" strokeWidth="0.7" opacity="0.6" />
                <path d="M18,38 q5,-3 10,0 q5,3 10,0 q5,-3 10,0 q5,3 10,0" fill="none" stroke="#f47c20" strokeWidth="0.5" opacity="0.35" />
              </ProcessNode>

              {/* Step 5: Air-Bubble Removal & Compaction */}
              <ProcessNode x={118} y={110} num="05" stepKey="wovenroving2" label="COMPACTION" hovered={hoveredLayer} onHover={() => setHoveredLayer("wovenroving2")} onLeave={() => setHoveredLayer(null)}>
                <rect x="22" y="12" width="36" height="10" rx="1" fill="#0f3060" stroke="#f47c20" strokeWidth="0.8" opacity="0.9" />
                <line x1="26" y1="13" x2="26" y2="21" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
                <line x1="32" y1="13" x2="32" y2="21" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
                <line x1="38" y1="13" x2="38" y2="21" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
                <line x1="44" y1="13" x2="44" y2="21" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
                <line x1="50" y1="13" x2="50" y2="21" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
                <line x1="56" y1="13" x2="56" y2="21" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
                <circle cx="14" cy="34" r="1.6" fill="none" stroke="#f47c20" strokeWidth="0.6" opacity="0.6" />
                <line x1="11" y1="34" x2="6" y2="34" stroke="#f47c20" strokeWidth="0.6" opacity="0.5" />
                <circle cx="66" cy="34" r="1.6" fill="none" stroke="#f47c20" strokeWidth="0.6" opacity="0.6" />
                <line x1="69" y1="34" x2="74" y2="34" stroke="#f47c20" strokeWidth="0.6" opacity="0.5" />
                <line x1="18" y1="40" x2="62" y2="40" stroke="#f47c20" strokeWidth="0.5" opacity="0.4" />
              </ProcessNode>

              {/* Step 6: Curing & Demolding */}
              <ProcessNode x={0} y={110} num="06" stepKey="backcoat" label="CURE / DEMOLD" hovered={hoveredLayer} onHover={() => setHoveredLayer("backcoat")} onLeave={() => setHoveredLayer(null)}>
                <circle cx="28" cy="26" r="10" fill="#0a1e40" stroke="#f47c20" strokeWidth="0.8" opacity="0.9" />
                <line x1="28" y1="26" x2="28" y2="18" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
                <line x1="28" y1="26" x2="34" y2="27" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
                <line x1="52" y1="34" x2="52" y2="18" stroke="#f47c20" strokeWidth="1" opacity="0.7" />
                <polygon points="48,20 52,13 56,20" fill="#f47c20" opacity="0.7" />
              </ProcessNode>

              {/* Flow arrows: row 2 (right to left) */}
              <line x1="241" y1="156" x2="219" y2="156" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <polygon points="219,156 224,153 224,159" fill="#f47c20" opacity="0.6" />
              <line x1="123" y1="156" x2="101" y2="156" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <polygon points="101,156 106,153 106,159" fill="#f47c20" opacity="0.6" />

              {/* Dimension brackets */}
              <line x1="-15" y1="0" x2="-15" y2="200" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <line x1="-20" y1="0" x2="-10" y2="0" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <line x1="-20" y1="200" x2="-10" y2="200" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <text x="-30" y="100" fill="rgba(255,255,255,0.4)" fontFamily="monospace" fontSize="8" textAnchor="middle" transform="rotate(-90 -30 100)">LAY-UP SEQUENCE</text>
            </g>

            {/* Pultruded Grating profile drawing */}
            <g transform="translate(40, 300)">
              <text x="0" y="-8" fill="rgba(244,124,32,0.6)" fontFamily="monospace" fontSize="9" letterSpacing="2">FRP GRATING PROFILE</text>
              <g opacity="0.5">
                <rect x="0" y="0" width="340" height="12" fill="none" stroke="#f47c20" strokeWidth="0.8" />
                <rect x="0" y="16" width="340" height="12" fill="none" stroke="#f47c20" strokeWidth="0.8" />
                <rect x="0" y="32" width="340" height="12" fill="none" stroke="#f47c20" strokeWidth="0.8" />
                <rect x="0" y="48" width="340" height="12" fill="none" stroke="#f47c20" strokeWidth="0.8" />
              </g>
              <g opacity="0.3">
                <line x1="34" y1="0" x2="34" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="68" y1="0" x2="68" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="102" y1="0" x2="102" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="136" y1="0" x2="136" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="170" y1="0" x2="170" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="204" y1="0" x2="204" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="238" y1="0" x2="238" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="272" y1="0" x2="272" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="306" y1="0" x2="306" y2="60" stroke="#ffffff" strokeWidth="0.5" />
              </g>
            </g>

            {/* Background thin fiber overlay */}
            <g opacity="0.08" stroke="#f47c20" strokeWidth="0.8" fill="none">
              <line x1="0" y1="180" x2="420" y2="300" />
              <line x1="0" y1="220" x2="420" y2="340" />
              <line x1="150" y1="0" x2="420" y2="450" />
            </g>

            {/* Bottom text */}
            <text x="210" y="400" fill="rgba(244,124,32,0.4)" fontFamily="monospace" fontSize="9" textAnchor="middle" letterSpacing="3">HAND LAY-UP PROCESS</text>
            <line x1="70" y1="408" x2="130" y2="408" stroke="#f47c20" strokeWidth="0.5" opacity="0.3" />
            <line x1="290" y1="408" x2="350" y2="408" stroke="#f47c20" strokeWidth="0.5" opacity="0.3" />
          </svg>

          {/* Interactive Info Card */}
          <div className="absolute bottom-2 left-6 right-6 z-20 pointer-events-none">
            <AnimatePresence mode="wait">
              {hoveredLayer ? (
                <motion.div
                  key={hoveredLayer}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-brand-navy-mid/95 border border-brand-orange/40 p-4 shadow-xl backdrop-blur-md"
                >
                  <h4 className="font-cond font-bold text-xs uppercase tracking-widest text-brand-orange mb-1">
                    {layerDescriptions[hoveredLayer].title}
                  </h4>
                  <p className="text-white/80 text-[11px] font-sans leading-relaxed">
                    {layerDescriptions[hoveredLayer].desc}
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
                    [ Hover diagram elements to view hand lay-up process stages ]
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
