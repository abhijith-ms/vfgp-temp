"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};
const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};
const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
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
    transition: { staggerChildren: 0.1 },
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
  img: "/parts/body_double.jpeg",
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

// ─── MAIN PAGE ────────────────────────────────────────────────────────
export default function Page() {
  return (
    <main className="min-h-screen bg-white" role="main" lang="en">
      {/* ─── HERO SECTION – FIXED & MODERN DESIGN ─────────────────────────── */}
      <section className="relative h-[calc(100vh-60px)] flex flex-col overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/parts/hero/producthero.png"
            alt="FRP products hero banner showcasing bus body parts and testing equipment"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1221]/75 via-[#0c1221]/85 to-[#1b2a52]/95 z-10" />

        {/* Main Content */}
        <div className="relative z-20 flex-1 flex items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center"
          >
            {/* Hero Title */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-[-0.03em] text-white mb-6"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#F27A22] to-[#FF9F5E] bg-clip-text text-transparent">
                Products
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-white/90 font-medium leading-relaxed"
            >
              High-quality FRP components and testing equipment designed for
              durability, lightweight performance, and industry-leading
              precision.
            </motion.p>
          </motion.div>
        </div>

        {/* ─── MODERN TAB NAVIGATION with Animated Underline ─────────────────── */}
        <nav
          aria-label="Product categories navigation"
          className="z-30 pb-8 md:pb-12 px-4 hidden md:block sm:px-6 md:px-12 flex justify-center"
        >
          <div className="inline-flex bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-2 shadow-2xl">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative px-7 md:px-10 py-4 text-sm md:text-base font-semibold text-white rounded-3xl transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F27A22] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent whitespace-nowrap"
                aria-label={`Scroll to ${section.label} section`}
              >
                {section.label}
                {/* Animated underline */}
                <span className="absolute mx-6 bottom-2 left-0 right-0 h-[2px] bg-[#F27A22] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            ))}
          </div>
        </nav>
      </section>

      {/* ─── SECTION 1: BUS BODY PARTS ────────────────────────────────── */}
      <section id="bus" className="scroll-mt-20 w-full bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[#F27A22] font-black tracking-[0.2em] uppercase text-sm mb-4">
              Automobile Components
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1b2a52] mb-4">
              Bus Body <span className="text-[#F27A22]">Parts</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#F27A22] mx-auto rounded-full mb-6" />
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Precision-molded FRP bus body components engineered for
              durability, lightweight performance, and modern bus manufacturing
              standards.
            </p>
          </motion.div>

          {/* Parts Grid - Fully responsive */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8 md:gap-x-8 md:gap-y-16"
          >
            {busBodyParts.map((part) => (
              <motion.div
                key={part.id}
                variants={fadeUp}
                className="group cursor-pointer flex flex-col items-center"
              >
                <div className="w-full aspect-4/3 flex items-center justify-center overflow-hidden mb-6">
                  <img
                    src={part.img}
                    alt={part.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-[#1b2a52] font-black text-sm md:text-base tracking-[0.18em] uppercase mb-2 group-hover:text-[#F27A22] transition-colors">
                    {part.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-gray-200 mx-auto group-hover:bg-[#F27A22] transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: BODY DOUBLE ───────────────────────────────────── */}
      <section
        id="bodydouble"
        className="scroll-mt-20 w-full bg-[#1b2a52] py-16 md:py-24 overflow-hidden border-t-4 border-[#F27A22]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content - First on mobile for logical reading order */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeRight}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-black text-[#F27A22] mb-6 leading-tight">
                FRP Body Double
              </h2>
              <div className="w-20 h-1 bg-[#F27A22] mb-8 mx-auto rounded-full" />
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                {bodyDoubleData.desc}
              </p>
              <ul className="space-y-4 mb-10">
                {bodyDoubleData.features.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white">
                    <CheckCircle2 className="w-6 h-6 text-[#F27A22] shrink-0 mt-0.5" />
                    <span className="font-medium text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="flex justify-center items-center gap-2 bg-[#F27A22] text-white mx-16 px-2 py-4 rounded-2xl font-bold text-base hover:bg-[#c96414] focus-visible:ring-2 focus-visible:ring-white transition-all shadow-lg"
                  aria-label="Request specifications for Automotive Testing Body Double"
                >
                  Request Specifications
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeLeft}
              className="relative order-first lg:order-none"
            >
              <div className="absolute -top-4 -right-4 w-28 h-28 md:w-32 md:h-32 border-t-[4px] border-r-[4px] border-[#F27A22] z-0" />
              <div className="absolute -bottom-4 -left-4 w-28 h-28 md:w-32 md:h-32 border-b-[4px] border-l-[4px] border-gray-600 z-0" />
              <div className="relative z-10 bg-white rounded-3xl p-3 shadow-2xl">
                <img
                  src={bodyDoubleData.img}
                  alt="Precision-engineered FRP Automotive Testing Body Double for safety validation"
                  loading="lazy"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: LOAD TESTING BOX ──────────────────────────────── */}
      <section
        id="load"
        className="scroll-mt-20 w-full bg-slate-50 py-16 md:py-24 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1b2a52] mb-4">
              FRP Load <span className="text-[#F27A22]">Testing Box</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#F27A22] mx-auto rounded-full mb-6" />
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              High-strength FRP load testing boxes available in various
              capacities for rigorous industrial and automotive load
              simulations. Built for extreme durability under heavy stress.
            </p>
          </motion.div>

          {/* Products Grid - Responsive */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {loadTestingProducts.map((product, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 focus-within:ring-2 focus-within:ring-[#F27A22] transition-all duration-300 group"
              >
                <div className="overflow-hidden rounded-2xl mb-8 bg-gray-50 flex items-center justify-center aspect-video">
                  <img
                    src={product.img}
                    alt={`${product.name} - ${product.capacity} capacity FRP load testing box`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-3xl font-black text-[#1b2a52] mb-1">
                    {product.capacity}
                  </h3>
                  <span className="text-gray-400 font-medium text-lg">
                    Capacity
                  </span>
                  <div className="w-12 h-1 bg-[#F27A22] mx-auto rounded-full mt-4" />
                </div>

                <p className="text-gray-600 text-base leading-relaxed mb-8 text-center">
                  {product.desc}
                </p>

                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#F27A22] shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────────────── */}
      <section className="w-full bg-[#DCE8F6] py-16 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="max-w-225 mx-auto px-4 sm:px-6 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-black text-[#282F5A] mb-3 md:mb-4 leading-tight">
            Need Custom FRP <span className="text-[#F27A22]">Components?</span>
          </h2>
          <p className="text-[#1b2a52] text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-10 px-2">
            Get in touch with our engineering team for custom quotes and
            technical feasibility studies.
          </p>
          <Link href="/contact" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1b2a52] text-white px-8 sm:px-12 py-3 sm:py-4 rounded font-bold text-sm sm:text-base hover:bg-[#F27A22] transition-colors shadow-lg shadow-black/20"
            >
              Request a Quote
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
