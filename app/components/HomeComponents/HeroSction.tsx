"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  // Technical descriptions of the composite layers
  const layerDescriptions: Record<string, { title: string; desc: string }> = {
    gelcoat: {
      title: "Gel Coat (UV/Corrosion Shield)",
      desc: "An outer layer of high-performance resin that provides a glossy, premium finish, UV resistance, and chemical protection.",
    },
    surfacemat: {
      title: "Surface Mat (Reinforcement)",
      desc: "A thin, continuous strand glass veil that improves surface aesthetics and creates a resin-rich skin barrier.",
    },
    wovenroving1: {
      title: "Woven Roving Ply 1 (Strength)",
      desc: "Heavy bidirectional fiberglass cloth providing high tensile and impact strength along primary structural axes.",
    },
    choppedstrand: {
      title: "Chopped Strand Mat (CSM)",
      desc: "Non-directional glass fibers offering isotropic strength, high thickness, and optimal resin absorption.",
    },
    wovenroving2: {
      title: "Woven Roving Ply 2 (Balancing)",
      desc: "Second layer of bidirectional weave, balancing structural loads and ensuring dimensional stability.",
    },
    backcoat: {
      title: "Back Coat (Sealing Layer)",
      desc: "Inner barrier sealing the composite matrix, preventing fiber exposure and ensuring moisture resistance.",
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
        <div className="absolute top-10 left-10 w-8 h-8 opacity-30">
          <div className="absolute top-0 left-0 w-8 h-[2px] bg-brand-orange" />
          <div className="absolute top-0 left-0 w-[2px] h-8 bg-brand-orange" />
        </div>
        <div className="absolute top-10 right-10 w-8 h-8 opacity-30">
          <div className="absolute top-0 right-0 w-8 h-[2px] bg-brand-orange" />
          <div className="absolute top-0 right-0 w-[2px] h-8 bg-brand-orange" />
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start text-white">
          <div className="inline-flex items-center gap-2 mb-6 border border-brand-orange/40 bg-brand-orange/5 px-4 py-1.5 font-cond text-xs font-semibold tracking-widest uppercase text-brand-orange">
            <span className="w-1.5 h-1.5 bg-brand-orange animate-pulse" />
            ISO Certified FRP Manufacturer · Hyderabad
          </div>

          <h1 className="font-cond font-black leading-[1.0] text-5xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight uppercase mb-2">
            Advanced <span className="text-brand-orange">FRP</span>
            <br />
            <span className="font-light text-white/80">Composites</span>
          </h1>
          <div className="h-1 bg-brand-orange w-24 mb-6" />

          <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mb-8 font-sans">
            Delivering high-performance fiberglass solutions for Automobile, Defence, and Engineering sectors with vacuum infusion and pultrusion excellence for over 30 years.
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
            aria-label="FRP Composite Layering Diagram"
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

            {/* FRP Layered panel drawing */}
            <g transform="translate(40, 70)">
              {/* L1: Gel coat */}
              <g
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredLayer("gelcoat")}
                onMouseLeave={() => setHoveredLayer(null)}
              >
                <rect
                  x="0"
                  y="0"
                  width="260"
                  height="20"
                  fill="#1a3a6b"
                  stroke={hoveredLayer === "gelcoat" ? "#f47c20" : "rgba(244,124,32,0.4)"}
                  strokeWidth={hoveredLayer === "gelcoat" ? 1.5 : 0.8}
                  className="transition-all duration-300"
                />
                <rect x="0" y="0" width="260" height="20" fill="url(#hero-grid-fine)" opacity="0.4" />
                <text x="270" y="14" fill={hoveredLayer === "gelcoat" ? "#f47c20" : "#ffffff"} opacity={hoveredLayer === "gelcoat" ? 1 : 0.6} fontFamily="monospace" fontSize="8" letterSpacing="1">GEL COAT</text>
              </g>

              {/* L2: Surface Mat */}
              <g
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredLayer("surfacemat")}
                onMouseLeave={() => setHoveredLayer(null)}
                transform="translate(0, 24)"
              >
                <rect
                  x="0"
                  y="0"
                  width="260"
                  height="14"
                  fill="#0f3060"
                  stroke={hoveredLayer === "surfacemat" ? "#f47c20" : "rgba(255,255,255,0.2)"}
                  strokeWidth={hoveredLayer === "surfacemat" ? 1.5 : 0.5}
                />
                <rect x="0" y="0" width="260" height="14" fill="url(#hero-weave)" opacity="0.5" />
                <text x="270" y="10" fill={hoveredLayer === "surfacemat" ? "#f47c20" : "#ffffff"} opacity={hoveredLayer === "surfacemat" ? 1 : 0.6} fontFamily="monospace" fontSize="8" letterSpacing="1">SURFACE MAT</text>
              </g>

              {/* L3: Woven Roving 1 */}
              <g
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredLayer("wovenroving1")}
                onMouseLeave={() => setHoveredLayer(null)}
                transform="translate(0, 42)"
              >
                <rect
                  x="0"
                  y="0"
                  width="260"
                  height="26"
                  fill="#0d2a55"
                  stroke={hoveredLayer === "wovenroving1" ? "#f47c20" : "rgba(244,124,32,0.4)"}
                  strokeWidth={hoveredLayer === "wovenroving1" ? 1.5 : 0.6}
                />
                <rect x="0" y="0" width="260" height="26" fill="url(#hero-weave)" opacity="0.8" />
                <text x="270" y="17" fill={hoveredLayer === "wovenroving1" ? "#f47c20" : "#ffffff"} opacity={hoveredLayer === "wovenroving1" ? 1 : 0.6} fontFamily="monospace" fontSize="8" letterSpacing="1">WOVEN ROVING</text>
              </g>

              {/* L4: Chopped strand */}
              <g
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredLayer("choppedstrand")}
                onMouseLeave={() => setHoveredLayer(null)}
                transform="translate(0, 72)"
              >
                <rect
                  x="0"
                  y="0"
                  width="260"
                  height="22"
                  fill="#0a1e40"
                  stroke={hoveredLayer === "choppedstrand" ? "#f47c20" : "rgba(255,255,255,0.2)"}
                  strokeWidth={hoveredLayer === "choppedstrand" ? 1.5 : 0.5}
                />
                <rect x="0" y="0" width="260" height="22" fill="url(#hero-diag)" opacity="0.7" />
                <text x="270" y="14" fill={hoveredLayer === "choppedstrand" ? "#f47c20" : "#ffffff"} opacity={hoveredLayer === "choppedstrand" ? 1 : 0.6} fontFamily="monospace" fontSize="8" letterSpacing="1">CHOPPED STRAND</text>
              </g>

              {/* L5: Woven Roving 2 */}
              <g
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredLayer("wovenroving2")}
                onMouseLeave={() => setHoveredLayer(null)}
                transform="translate(0, 98)"
              >
                <rect
                  x="0"
                  y="0"
                  width="260"
                  height="26"
                  fill="#0d2a55"
                  stroke={hoveredLayer === "wovenroving2" ? "#f47c20" : "rgba(244,124,32,0.4)"}
                  strokeWidth={hoveredLayer === "wovenroving2" ? 1.5 : 0.6}
                />
                <rect x="0" y="0" width="260" height="26" fill="url(#hero-weave)" opacity="0.8" />
              </g>

              {/* L6: Back coat */}
              <g
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredLayer("backcoat")}
                onMouseLeave={() => setHoveredLayer(null)}
                transform="translate(0, 128)"
              >
                <rect
                  x="0"
                  y="0"
                  width="260"
                  height="18"
                  fill="#1a3a6b"
                  stroke={hoveredLayer === "backcoat" ? "#f47c20" : "rgba(244,124,32,0.4)"}
                  strokeWidth={hoveredLayer === "backcoat" ? 1.5 : 0.8}
                />
                <rect x="0" y="0" width="260" height="18" fill="url(#hero-grid-fine)" opacity="0.4" />
                <text x="270" y="12" fill={hoveredLayer === "backcoat" ? "#f47c20" : "#ffffff"} opacity={hoveredLayer === "backcoat" ? 1 : 0.6} fontFamily="monospace" fontSize="8" letterSpacing="1">BACK COAT</text>
              </g>

              {/* Dimension brackets */}
              <line x1="-15" y1="0" x2="-15" y2="146" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <line x1="-20" y1="0" x2="-10" y2="0" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <line x1="-20" y1="146" x2="-10" y2="146" stroke="#f47c20" strokeWidth="0.8" opacity="0.6" />
              <text x="-30" y="73" fill="rgba(255,255,255,0.4)" fontFamily="monospace" fontSize="8" textAnchor="middle" transform="rotate(-90 -30 73)">LAMINATE PLIES</text>
            </g>

            {/* Pultruded Grating profile drawing */}
            <g transform="translate(40, 260)">
              <text x="0" y="-8" fill="rgba(244,124,32,0.6)" fontFamily="monospace" fontSize="9" letterSpacing="2">FRP GRATING PROFILE</text>
              <g opacity="0.5">
                <rect x="0" y="0" width="260" height="12" fill="none" stroke="#f47c20" strokeWidth="0.8" />
                <rect x="0" y="16" width="260" height="12" fill="none" stroke="#f47c20" strokeWidth="0.8" />
                <rect x="0" y="32" width="260" height="12" fill="none" stroke="#f47c20" strokeWidth="0.8" />
                <rect x="0" y="48" width="260" height="12" fill="none" stroke="#f47c20" strokeWidth="0.8" />
              </g>
              <g opacity="0.3">
                <line x1="26" y1="0" x2="26" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="52" y1="0" x2="52" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="78" y1="0" x2="78" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="104" y1="0" x2="104" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="130" y1="0" x2="130" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="156" y1="0" x2="156" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="182" y1="0" x2="182" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="208" y1="0" x2="208" y2="60" stroke="#ffffff" strokeWidth="0.5" />
                <line x1="234" y1="0" x2="234" y2="60" stroke="#ffffff" strokeWidth="0.5" />
              </g>
            </g>

            {/* Background thin fiber overlay */}
            <g opacity="0.08" stroke="#f47c20" strokeWidth="0.8" fill="none">
              <line x1="0" y1="180" x2="420" y2="300" />
              <line x1="0" y1="220" x2="420" y2="340" />
              <line x1="150" y1="0" x2="420" y2="450" />
            </g>

            {/* Bottom text */}
            <text x="210" y="400" fill="rgba(244,124,32,0.4)" fontFamily="monospace" fontSize="9" textAnchor="middle" letterSpacing="3">VACUUM INFUSION PROCESS</text>
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
                    [ Hover diagram elements to view material composition plies ]
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
