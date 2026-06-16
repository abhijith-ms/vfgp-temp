"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FRPTankSVG, FRPDuctSVG, FRPProfileSVG } from "../components/BackgroundDrawings";

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};
const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};
const fadeLeft = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

// ─── PRODUCT DATA ─────────────────────────────────────────────────────
const busBodyParts = [
  { id: 1, name: "Front Bumper Assembly", img: "/parts/1-1.png" },
  { id: 2, name: "Rear Panel", img: "/parts/2-1.png" },
  { id: 3, name: "Side Skirt", img: "/parts/3-1.png" },
  { id: 4, name: "Roof Hatch", img: "/parts/4-1.png" },
  { id: 5, name: "Dashboard Assembly", img: "/parts/5-1.png" },
  { id: 6, name: "Interior Trim", img: "/parts/6.png" },
  { id: 7, name: "Side Panel Assembly", img: "/parts/7.png" },
  { id: 8, name: "FRP Cover Component", img: "/parts/8.png" },
  { id: 9, name: "Molded Panel", img: "/parts/9.png" },
  { id: 10, name: "Access Door", img: "/parts/10.png" },
  { id: 11, name: "FRP Enclosure", img: "/parts/11.png" },
  { id: 12, name: "Cluster Bezel", img: "/parts/Cluster-Bezel.png" },
  { id: 13, name: "Engine Hood", img: "/parts/Engine-Hood-A.png" },
  {
    id: 14,
    name: "Podest with Stiffener",
    img: "/parts/Podest-with-stifner.png",
  },
  { id: 15, name: "Snorkel Mesh Cover", img: "/parts/Snorkel-Mesh-Cover.png" },
  {
    id: 16,
    name: "Dashboard with front inner dome",
    img: "/parts/VehicleDashboard-and-podest-assembly-with-front-inner-dome.png",
  },
];

const loadTestingProducts = [
  {
    name: "FRP Load Testing Box 500 Kg",
    capacity: "500 Kg",
    img: "/parts/load_testing_1.png",
    desc: "High-strength FRP load testing box designed for medium-capacity load simulations and structural validations.",
    features: [
      "500 Kg maximum load capacity",
      "FRP composite construction for durability",
      "Precision-calibrated stress distribution",
      "Suitable for automotive and industrial testing",
    ],
  },
  {
    name: "FRP Load Testing Box 2000 Kg",
    capacity: "2000 Kg",
    img: "/parts/load_testing_2.png",
    desc: "Heavy-duty FRP load testing box built for extreme stress simulations and high-capacity structural validations.",
    features: [
      "2000 Kg maximum load capacity",
      "Reinforced FRP composite structure",
      "Engineered for heavy industrial applications",
      "Certified for rigorous safety testing protocols",
    ],
  },
];

const bodyDoubleData = {
  tagline: "FRP Human Being Body Part",
  title: "Automotive Testing Body Double",
  desc: "Precision-engineered FRP body double designed specifically for rigorous automotive load, impact, and safety testing. Built to exact specifications to simulate human weight distribution and spatial displacement.",
  features: [
    "High-impact resistant FRP composite construction",
    "Accurate dimensional scaling (610mm standard)",
    "Integrated mounting structures for secure testing",
    "OEM approved for vehicle safety validations",
  ],
  img: "/parts/body_double.png",
};

const sections = [
  { id: "bus", label: "Bus Body Parts" },
  { id: "bodydouble", label: "Body Double" },
  { id: "load", label: "Load Testing Box" },
] as const;

// ─── SCROLL-TO HELPER ─────────────────────────────────────────────────
function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    const yOffset = -80; // offset for navbar
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white font-sans antialiased text-brand-navy" role="main" lang="en">
      {/* ─── HERO SECTION ───────────────────────────────────────────────── */}
      <section className="relative h-[calc(80vh-60px)] flex flex-col justify-between bg-[#0a1628] overflow-hidden">
        {/* Weave & Grid Background */}
        <div className="absolute inset-0 bg-fiber-weave opacity-20 z-0" />
        <div className="absolute inset-0 bg-blueprint-grid opacity-75 z-0" />
        
        {/* Glow zone */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-brand-orange/10 via-transparent to-transparent blur-2xl z-0" />

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full max-w-7xl mx-auto px-6 md:px-12 text-center"
          >
            <p className="font-cond font-bold text-xs uppercase tracking-widest text-brand-orange mb-3">[ Spec Catalog ]</p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-6xl md:text-7xl font-cond font-black leading-none uppercase text-white mb-6"
            >
              Our <span className="text-brand-orange">Products</span>
            </motion.h1>
            <div className="w-16 h-1 bg-brand-orange mx-auto mb-6" />
            <motion.p
              variants={fadeUp}
              className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-sans"
            >
              High-performance FRP molded assemblies, structural profiles, and safety testing apparatus built to stringent engineering tolerances.
            </motion.p>
          </motion.div>
        </div>

        {/* ─── MODERN TAB NAVIGATION ──────────────────────────────────── */}
        <nav
          aria-label="Product categories navigation"
          className="z-30 pb-8 px-6 hidden md:flex justify-center"
        >
          <div className="inline-flex bg-white/5 border border-white/10 rounded-none p-1.5 shadow-2xl backdrop-blur-md">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative px-8 py-3.5 text-xs font-cond font-bold tracking-widest text-white uppercase hover:bg-white/5 transition-all cursor-pointer whitespace-nowrap"
                aria-label={`Scroll to ${section.label} section`}
              >
                {section.label}
                {/* Underline indicator */}
                <span className="absolute bottom-1 left-4 right-4 h-[1.5px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            ))}
          </div>
        </nav>
      </section>

      {/* ─── SECTION 1: BUS BODY PARTS ────────────────────────────────── */}
      <section id="bus" className="relative scroll-mt-20 w-full bg-white py-16 md:py-24 bg-fiber-weave overflow-hidden border-b border-gray-100">
        {/* Subtle engineering line-art profile overlay */}
        <FRPProfileSVG className="absolute right-6 top-10 w-80 h-80 opacity-[0.05] text-brand-navy pointer-events-none" />
        <div 
          className="absolute -left-10 bottom-10 w-96 h-96 opacity-[0.04] pointer-events-none bg-contain bg-no-repeat bg-left-bottom select-none rotate-12"
          style={{ backgroundImage: "url('/parts/Engine-Hood-A.png')" }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-4 h-[2px] bg-brand-orange" />
              <span className="font-cond font-bold text-xs uppercase tracking-widest text-brand-orange">Automotive Components</span>
              <span className="w-4 h-[2px] bg-brand-orange" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-cond font-black text-brand-navy uppercase">
              Bus Body <span className="text-brand-orange">Parts</span>
            </h2>
            <div className="h-0.5 bg-brand-navy w-12 mx-auto mt-4" />
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4 max-w-xl mx-auto font-sans">
              Precision-molded FRP bus body parts engineered to class-A finishes, offering high tensile durability and minimal weight parameters.
            </p>
          </motion.div>

          {/* Parts Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
          >
            {busBodyParts.map((part) => (
              <motion.div
                key={part.id}
                variants={fadeUp}
                className="group cursor-pointer flex flex-col items-center bg-white border border-gray-100 p-4 hover:border-brand-orange/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Tech image wrap with faint grid layout */}
                <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-6 bg-slate-50 bg-blueprint-grid-light opacity-95">
                  <img
                    src={part.img}
                    alt={part.name}
                    className="max-h-[90%] max-w-[90%] object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-cond font-bold text-brand-navy text-xs sm:text-sm tracking-widest uppercase mb-1.5 group-hover:text-brand-orange transition-colors">
                    {part.name}
                  </h3>
                  <div className="w-6 h-0.5 bg-gray-100 mx-auto group-hover:bg-brand-orange transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: BODY DOUBLE ───────────────────────────────────── */}
      <section
        id="bodydouble"
        className="relative scroll-mt-20 w-full bg-[#0a1628] py-16 md:py-24 overflow-hidden border-t-2 border-brand-orange bg-blueprint-grid"
      >
        <FRPDuctSVG className="absolute left-6 bottom-0 w-80 h-80 opacity-[0.06] text-white pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeRight}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-[2px] bg-brand-orange" />
                <span className="font-cond font-bold text-xs uppercase tracking-widest text-brand-orange">{bodyDoubleData.tagline}</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-cond font-black text-white uppercase mb-6 leading-none">
                {bodyDoubleData.title}
              </h2>
              <div className="h-1 bg-brand-orange w-16 mb-6" />
              
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 font-sans">
                {bodyDoubleData.desc}
              </p>
              
              <ul className="space-y-4 mb-10 font-cond text-sm uppercase tracking-wide">
                {bodyDoubleData.features.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="font-bold text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-white font-cond font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-none transition-colors shadow-lg shadow-brand-orange/20"
                  aria-label="Request specifications for Automotive Testing Body Double"
                >
                  Request Specifications
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeLeft}
              className="relative order-first lg:order-none"
            >
              <div className="absolute -top-4 -right-4 w-28 h-28 border-t border-r border-brand-orange opacity-40 z-0" />
              <div className="absolute -bottom-4 -left-4 w-28 h-28 border-b border-l border-white/20 opacity-40 z-0" />
              <div className="relative z-10 bg-white rounded-none p-3 border border-white/5 shadow-2xl">
                <img
                  src={bodyDoubleData.img}
                  alt="FRP Automotive Testing Body Double"
                  loading="lazy"
                  className="w-full h-auto object-cover rounded-none"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: LOAD TESTING BOX ──────────────────────────────── */}
      <section
        id="load"
        className="relative scroll-mt-20 w-full bg-white py-16 md:py-24 bg-composite-layers border-b border-gray-100 overflow-hidden"
      >
        <FRPTankSVG className="absolute right-6 top-1/2 -translate-y-1/2 w-64 h-96 opacity-[0.05] text-brand-navy pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-4 h-[2px] bg-brand-orange" />
              <span className="font-cond font-bold text-xs uppercase tracking-widest text-brand-orange">Load Verification Equipment</span>
              <span className="w-4 h-[2px] bg-brand-orange" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-cond font-black text-brand-navy uppercase">
              FRP Load <span className="text-brand-orange">Testing Box</span>
            </h2>
            <div className="h-0.5 bg-brand-navy w-12 mx-auto mt-4" />
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4 max-w-xl mx-auto font-sans">
              High-durability lamination boxes built to simulate extreme loading configurations for automotive body platforms and structures.
            </p>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {loadTestingProducts.map((product, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white border border-gray-100 p-6 md:p-8 hover:border-brand-orange/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="overflow-hidden bg-slate-50 flex items-center justify-center aspect-video mb-6 relative bg-blueprint-grid-light opacity-95">
                  <img
                    src={product.img}
                    alt={product.name}
                    loading="lazy"
                    className="max-h-[90%] max-w-[90%] object-contain group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-navy text-white text-[10px] font-mono tracking-wider px-3 py-1 uppercase">
                    {product.capacity} Capacity
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="font-cond font-black text-brand-navy text-2xl uppercase tracking-wider mb-1">
                    {product.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-brand-orange mx-auto mt-3" />
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-8 text-center font-sans flex-grow">
                  {product.desc}
                </p>

                <ul className="space-y-3 pt-6 border-t border-gray-50 text-xs sm:text-sm font-cond uppercase tracking-wide">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-bold">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────────────── */}
      <section className="relative w-full py-20 bg-[#DCE8F6] bg-frp-mesh border-b border-gray-200">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="max-w-3xl mx-auto px-6 text-center relative z-10"
        >
          <h2 className="font-cond font-black text-brand-navy text-3xl sm:text-[40px] leading-tight uppercase mb-4">
            Need Custom FRP <span className="text-brand-orange">Components?</span>
          </h2>
          <p className="text-brand-navy/80 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans leading-relaxed">
            Get in touch with our design and development engineering staff for custom pricing details and laminate modeling checks.
          </p>
          <Link href="/contact" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand-navy hover:bg-brand-navy-light text-white font-cond font-bold tracking-widest uppercase text-xs px-10 py-4 shadow-lg shadow-black/10 rounded-none cursor-pointer"
            >
              Request a Quote
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
