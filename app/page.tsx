"use client";

import HeroSction from "./components/HomeComponents/HeroSction";
import FeatureBar from "./components/HomeComponents/FeatureBar";
import { FRPTankSVG, FRPDuctSVG, FRPProfileSVG, FRPGratingPanelSVG } from "./components/BackgroundDrawings";
import Image from "next/image";
import {
  CheckCircle2,
  Star,
  Settings2,
  UserCog,
  Car,
  Shield,
  Cog,
  BarChart2,
  Award,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  User,
  MessageSquare,
  Play,
  X,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

// ─── Animation Variants ───────────────────────────────────────────────────────
const sectionViewport = { once: true, amount: 0.15 };
const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-4.5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
      >
        <span className="font-cond font-bold text-brand-navy hover:text-brand-orange text-base md:text-lg transition-colors uppercase tracking-wide">
          {question}
        </span>
        {open ? (
          <ChevronUp className="w-4.5 h-4.5 text-brand-orange shrink-0" />
        ) : (
          <ChevronDown className="w-4.5 h-4.5 text-white/40 group-hover:text-brand-orange shrink-0 transition-colors" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 10 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden text-gray-500 text-sm md:text-base leading-relaxed pr-8"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo]);

  const factoryVideos = [
    {
      title: "Hand Lay-up & Manual Lamination",
      desc: "Our skilled technicians performing manual lamination and lay-up, illustrating the dedicated hand craftsmanship required for molding durable composite structures.",
      videoSrc: "/videos/1.mp4",
      thumbnail: "/bus.png",
      tag: "Hand Craftsmanship"
    },
    {
      title: "Robotic Spraying & Oversight",
      desc: "Industrial robotic arms applying paint and gel coats, combining automation with manual lamination and human quality checks.",
      videoSrc: "/videos/2.mp4",
      thumbnail: "/robot.png",
      tag: "Robotic Automation"
    },
    {
      title: "Manual Assembly & Final Detailing",
      desc: "Our team manually assembling components, trimming edges, and carrying out visual inspection on the factory floor.",
      videoSrc: "/videos/3.mp4",
      thumbnail: "/bus2.png",
      tag: "Manual Detailing"
    }
  ];

  const industries = [
    {
      icon: Car,
      slug: "automobile",
      label: "Automobile Products",
      desc: "Lightweight FRP body panels for buses, trucks & commercial vehicles. OEM-grade precision.",
      num: "01",
    },
    {
      icon: Shield,
      slug: "defence",
      label: "Defence & Strategic",
      desc: "Blast-resistant composite components meeting defence specifications. Built for strategic applications.",
      num: "02",
    },
    {
      icon: Cog,
      slug: "engineering",
      label: "Engineering Industries",
      desc: "Custom FRP solutions for heavy engineering & infrastructure. Ducts, tanks, and enclosures.",
      num: "03",
    },
  ];

  const faqs = [
    {
      question: "What are the advantages of FRP over traditional materials?",
      answer:
        "FRP composites offer superior strength-to-weight ratio, corrosion resistance, and design flexibility compared to steel or aluminium, making them ideal for automotive and industrial applications.",
    },
    {
      question: "What is the lead time for custom FRP composite manufacturing?",
      answer:
        "Lead times vary based on complexity and volume. Typically, tooling takes 2–4 weeks, followed by production. We work with clients to ensure timely delivery without compromising quality.",
    },
    {
      question: "What is the surface finish quality of your FRP products?",
      answer:
        "Our products are finished to Class A surface standards using vacuum infusion and controlled gel-coat techniques, ensuring smooth, paint-ready surfaces suitable for automotive exteriors.",
    },
    {
      question: "Can VENKATESHWARA FIBREGLASS PRODUCTS handle large-scale production runs?",
      answer:
        "Yes. Our automated production lines and vacuum resin infusion infrastructure are designed for both prototype and high-volume batch production to meet diverse client demands.",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Sr. Procurement Manager, AutoCorp",
      text: "The precision and durability of composite panels delivered by VFG have significantly improved our vehicle performance. An outstanding partner.",
    },
    {
      name: "Vishal R.",
      role: "Project Lead, L&T Infrastructure",
      text: "Their team's deep knowledge of FRP solutions and quick turnaround time helped us meet critical project deadlines without any compromise on quality.",
    },
    {
      name: "Col. Amit Singh",
      role: "Strategic Sourcing, Defence Division",
      text: "One of the most reliable FRP manufacturers in India. Their technical team is highly knowledgeable about defence-grade composite specifications.",
    },
  ];

  const clientsList = [
    { src: "/clients/ashokleyland.png", alt: "Ashok Leyland" },
    { src: "/clients/mungi.png", alt: "Mungi" },
    { src: "/clients/navistar.png", alt: "Mahindra Navistar" },
    { src: "/clients/rise.png", alt: "Mahindra Rise" },
    { src: "/clients/ashokleyland.png", alt: "Ashok Leyland 2" },
    { src: "/clients/mungi.png", alt: "Mungi 2" },
    { src: "/clients/navistar.png", alt: "Mahindra Navistar 2" },
    { src: "/clients/rise.png", alt: "Mahindra Rise 2" },
  ];

  const featuredProducts = [
    {
      img: "/bus3.png",
      title: "Bus Body Parts",
      desc: "Precision-engineered FRP bus body parts for commercial vehicles.",
      code: "FRP–001"
    },
    {
      img: "/bodydouble.png",
      title: "Body Double",
      desc: "High-impact resistant front and rear safety bumper assemblies.",
      code: "FRP–002"
    },
    {
      img: "/loadtestingbox.png",
      title: "Load Testing Box",
      desc: "Lightweight insulating panels for modular testing enclosures.",
      code: "FRP–003"
    },
  ];

  return (
    <main className="overflow-x-hidden bg-white">
      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <HeroSction />

      {/* ── FEATURE BAR ──────────────────────────────────────────────── */}
      <div className="hidden md:block">
        <FeatureBar />
      </div>

      {/* ── TECHNICAL SCROLLING TICKER ───────────────────────────────── */}
      <div className="w-full bg-brand-orange py-3.5 overflow-hidden border-y border-white/10 relative z-10 shadow-md">
        <div className="relative flex overflow-x-hidden">
          <motion.div
            className="flex items-center gap-10 w-max whitespace-nowrap text-white font-mono text-xs font-bold tracking-widest uppercase"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 18, repeat: Infinity }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-10">
                <span>Fiberglass Reinforced Plastic</span>
                <span className="w-2 h-2 bg-white rotate-45 opacity-60" />
                <span>Vacuum Infusion Technology</span>
                <span className="w-2 h-2 bg-white rotate-45 opacity-60" />
                <span>ISO 9001:2015 Certified Manufacturing</span>
                <span className="w-2 h-2 bg-white rotate-45 opacity-60" />
                <span>OEM Automobile Supplier</span>
                <span className="w-2 h-2 bg-white rotate-45 opacity-60" />
                <span>Defence Grade Composites</span>
                <span className="w-2 h-2 bg-white rotate-45 opacity-60" />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── ABOUT / LEGACY (Light Hybrid) ────────────────────────────── */}
      <section className="relative w-full py-20 overflow-hidden bg-fiber-weave bg-white border-b border-gray-100">
        {/* Subtle CAD profile watermark inside background */}
        <FRPProfileSVG className="absolute left-6 top-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.05] text-brand-navy pointer-events-none" />
        <div 
          className="absolute right-0 bottom-0 w-[45%] h-[80%] opacity-[0.04] pointer-events-none bg-contain bg-no-repeat bg-right-bottom mix-blend-multiply select-none"
          style={{ backgroundImage: "url('/lab.png')" }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeRight}
          >

            <h2 className="font-cond font-black tracking-tight text-brand-navy text-4xl sm:text-5xl leading-none uppercase mb-6">
              Leading <span className="text-brand-orange">FRP Manufacturers</span>
              <br />
              in Hyderabad – India
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              VENKATESHWARA FIBREGLASS PRODUCTS is a unit set up for manufacturing FRP composites for Automobiles and other Engineering Industrial applications. The unit has been promoted by dedicated, technically experienced first-generation entrepreneurs. VFG is located at Plot No 6, R.I.E, Zaheerabad — the heart of Zaheerabad&apos;s industrial hub.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Advanced Vacuum Infusion Technology",
                "In-house R&D and Tooling Facility",
                "End-to-end Project Management",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                  <span className="font-cond font-bold text-brand-navy tracking-wider text-sm sm:text-base uppercase">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/about_us" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand-orange hover:bg-brand-orange-light text-white font-cond font-bold tracking-widest uppercase text-xs px-8 py-3.5 rounded-none transition-colors shadow-lg shadow-brand-orange/10"
              >
                Read More
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Image Frame */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeLeft}
            className="relative"
          >
            {/* Technical CAD-style framing */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-brand-orange opacity-40" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-brand-navy opacity-40" />
            <img
              src="/lab.png"
              alt="State-of-the-art lamination facility"
              className="w-full h-auto object-cover relative z-10 shadow-md rounded-none border border-gray-100"
            />
            {/* Engineering Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-8 -right-4 bg-brand-navy border border-brand-orange/40 text-white p-5 rounded-none shadow-xl z-20 text-center min-w-[170px]"
            >
              <span className="font-cond font-black text-3xl text-brand-orange leading-none">#1</span>
              <p className="font-cond font-bold text-[10px] tracking-widest uppercase text-white/50 mt-1">
                COMPOSITE PARTNER
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ─────────────────────────────────────────── */}
      <section className="relative w-full py-20 overflow-hidden bg-composite-layers bg-[#fcfcfd] border-b border-gray-100">
        {/* Subtle CAD duct SVG overlay */}
        <FRPDuctSVG className="absolute right-6 top-10 w-72 h-72 opacity-[0.05] text-brand-navy pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeUp}
            className="text-center mb-16"
          >

            <h2 className="font-cond font-black text-brand-navy text-4xl sm:text-5xl leading-none uppercase">
              Industries <span className="text-brand-orange">We Serve</span>
            </h2>
            <div className="h-1 bg-brand-navy w-16 mx-auto mt-4" />
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4 max-w-lg mx-auto font-sans">
              From automobile bodywork to military shelters — our composite structures power the industries that build the future.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {industries.map(({ icon: Icon, slug, label, desc, num }) => (
              <motion.div
                key={slug}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white border border-gray-100 hover:border-brand-orange/30 p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col items-start"
              >
                {/* Tech indicator numbers */}
                <div className="absolute top-6 right-6 font-mono text-2xl font-bold text-brand-orange/10 group-hover:text-brand-orange/25 transition-colors">
                  {num}
                </div>

                <div className="w-12 h-12 bg-brand-navy flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-cond font-black text-brand-navy text-lg sm:text-xl uppercase tracking-wider mb-2.5">
                  {label}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-sans flex-grow">
                  {desc}
                </p>

                <Link
                  href={`/industries/${slug}`}
                  className="font-mono text-[10px] font-bold tracking-widest text-brand-orange uppercase flex items-center gap-1.5 hover:text-brand-navy transition-colors mt-auto group/link"
                >
                  Explore sector
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR PRODUCTS (Light Hybrid) ────────────────────────────────── */}
      <section className="relative w-full py-20 overflow-hidden bg-fiber-weave bg-white border-b border-gray-100">
        {/* Subtle molded component blueprint watermark */}
        <div 
          className="absolute -left-10 bottom-0 w-80 h-80 opacity-[0.04] pointer-events-none bg-contain bg-no-repeat bg-left-bottom select-none rotate-12"
          style={{ backgroundImage: "url('/parts/Snorkel-Mesh-Cover.png')" }}
        />
        <FRPTankSVG className="absolute right-6 top-10 w-64 h-96 opacity-[0.05] text-brand-navy pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeUp}
            className="text-center mb-16"
          >

            <h2 className="font-cond font-black text-brand-navy text-4xl sm:text-5xl leading-none uppercase">
              Our <span className="text-brand-orange">Featured Products</span>
            </h2>
            <div className="h-1 bg-brand-navy w-16 mx-auto mt-4" />
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4 max-w-lg mx-auto font-sans">
              High-strength composite assemblies engineered to meet demanding structural constraints and weight thresholds.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredProducts.map(({ img, title, desc, code }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white border border-gray-100 hover:border-brand-orange/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <Link href="/product" className="block relative group flex-grow">
                  {/* Image wrapper with blueprint watermark background */}
                  <div className="h-56 overflow-hidden bg-slate-50 relative flex items-center justify-center border-b border-gray-100 bg-blueprint-grid-light opacity-90">
                    <img
                      src={img}
                      alt={title}
                      className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 font-mono text-[9px] font-bold bg-brand-navy text-white px-2 py-0.5 tracking-wider">
                      {code}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-cond font-black text-brand-navy text-lg uppercase tracking-wider mb-2 group-hover:text-brand-orange transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-sans">
                      {desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (Dark Navy/Blueprint Grid) ───────────────────── */}
      <section className="relative w-full bg-[#0a1628] py-20 overflow-hidden bg-blueprint-grid border-b border-white/10">
        {/* Glow zone */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-brand-orange/5 via-transparent to-transparent blur-3xl" />
        <FRPGratingPanelSVG className="absolute left-6 top-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.06] text-white pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10 text-white">
          {/* Left: Text & Progress */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeRight}
          >

            <h2 className="font-cond font-black text-white text-4xl leading-none uppercase mb-6">
              Why Choose <span className="text-brand-orange">Us</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              We combine engineering expertise with automated processing lines and rigid QA protocols to ensure consistent material quality.
            </p>

            <div className="space-y-5">
              {[
                { label: "Quality Assurance", val: 98 },
                { label: "On-Time Delivery", val: 94 },
                { label: "Client Satisfaction", val: 97 },
                { label: "R&D Investment", val: 85 },
              ].map(({ label, val }, idx) => (
                <div key={label}>
                  <div className="flex justify-between text-xs font-cond font-bold uppercase tracking-wider mb-1.5 text-white/80">
                    <span>{label}</span>
                    <span className="text-brand-orange">{val}%</span>
                  </div>
                  <div className="h-1 bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full bg-brand-orange"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Technical feature cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
          >
            {[
              {
                icon: Settings2,
                label: "Advanced Production",
                desc: "Automated laminates & temperature-controlled infusion plants.",
              },
              {
                icon: BarChart2,
                label: "OEM Approvals",
                desc: "Reliable production scales matching major automotive demands.",
              },
              {
                icon: Award,
                label: "Strict QA Testing",
                desc: "Rigorous physical lamination structural validation checks.",
              },
              {
                icon: UserCog,
                label: "Bespoke Moldings",
                desc: "CNC customized plug preparation and tooling facilities.",
              },
            ].map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-brand-navy-mid border border-white/10 p-6 flex flex-col items-start hover:border-brand-orange/40 transition-colors"
              >
                <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-orange" />
                </div>
                <h4 className="font-cond font-bold text-white text-base uppercase tracking-wider mb-2">{label}</h4>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-sans">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── UNIQUE PRODUCT ────────────────────────────────────────────── */}
      <section className="relative w-full py-20 overflow-hidden bg-composite-layers bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeRight}
          >

            <h2 className="font-cond font-black text-brand-navy text-4xl leading-none uppercase mb-6">
              Our <span className="text-brand-orange">Unique Product</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              Our flagship FRP composite load box is engineered to deliver heavy load carrying capabilities at one-third the weight of steel. Constructed via vacuum infusion to minimize void fraction.
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              Class A surface finishes, standardized sizes, and integrated structural ribbing make it ready for tactical, strategic, and high-impact industrial deployment.
            </p>

            <Link href="/product" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand-navy hover:bg-brand-navy-light text-white font-cond font-bold tracking-widest uppercase text-xs px-8 py-3.5 rounded-none transition-colors shadow-lg"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeLeft}
            className="flex justify-center relative"
          >
            {/* Outline box */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-brand-orange/20 border-dashed z-0" />
            <img
              src="/loadtestingbox.png"
              alt="FRP Load testing assembly panel box"
              className="w-full max-w-sm h-auto relative z-10 drop-shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE: MANUFACTURING PROCESS (Light Blueprint) ─────────── */}
      <section className="relative w-full py-20 overflow-hidden bg-blueprint-grid-light bg-slate-50 border-b border-gray-100">
        <FRPGratingPanelSVG className="absolute right-6 top-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.05] text-brand-navy pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeUp}
            className="mb-16"
          >

            <h2 className="font-cond font-black text-brand-navy text-4xl sm:text-5xl leading-none uppercase">
              Our Manufacturing <span className="text-brand-orange">Process</span>
            </h2>
            <div className="h-1 bg-brand-navy w-16 mx-auto mt-4" />
          </motion.div>

          <div className="relative" onMouseLeave={() => setHoveredStep(null)}>
            {/* Timeline base connector line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-brand-navy/10 -z-10" />

            {/* Filled connector line */}
            <div
              className="hidden lg:block absolute top-10 left-[10%] h-[1px] bg-brand-orange -z-10 origin-left transition-all duration-500"
              style={{
                width: hoveredStep !== null ? `${(hoveredStep / 4) * 80}%` : "0%",
              }}
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4"
            >
              {[
                {
                  num: "01",
                  title: "Concept",
                  desc: "CAD translation & laminate layup scheduling.",
                },
                {
                  num: "02",
                  title: "Tooling",
                  desc: "Precision plug milling & mold preparation.",
                },
                {
                  num: "03",
                  title: "Fabrication",
                  desc: "Vacuum infusion lamination or RTM assembly.",
                },
                {
                  num: "04",
                  title: "Testing",
                  desc: "Void evaluation & structural load tests.",
                },
                {
                  num: "05",
                  title: "Delivery",
                  desc: "ISO logging & final site dispatch.",
                },
              ].map((step, idx) => {
                const isActive = hoveredStep !== null ? idx <= hoveredStep : idx === 0;

                return (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    className="flex flex-col items-center cursor-pointer group"
                    onMouseEnter={() => setHoveredStep(idx)}
                  >
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 bg-white border flex items-center justify-center mb-5 transition-all duration-300 ${
                        isActive ? "border-brand-orange bg-brand-orange/5" : "border-slate-200"
                      }`}
                    >
                      <span className={`font-cond font-black text-lg sm:text-xl transition-colors duration-300 ${isActive ? "text-brand-orange" : "text-brand-navy"}`}>
                        {step.num}
                      </span>
                    </div>

                    <h4 className="font-cond font-black text-xs uppercase tracking-widest text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm px-2 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ + CONTACT FORM ──────────────────────────────────────────── */}
      <section className="w-full py-0 overflow-hidden bg-[#fafafa] border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side: FAQ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeRight}
            className="bg-white px-8 md:px-16 py-20"
          >

            <h2 className="font-cond font-black text-brand-navy text-4xl leading-none uppercase mb-6">
              Learn From <span className="text-brand-orange">Our FAQ</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              Detailed explanations covering FRP tooling schedules, structural benefits, and parameters.
            </p>

            <div className="divide-y divide-gray-100">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} {...faq} />
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact form styled as technical sheet */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeLeft}
            className="bg-[#f3f5f8] bg-blueprint-grid-light px-8 md:px-16 py-20 border-t lg:border-t-0 border-l-0 lg:border-l border-gray-200/50"
          >

            <h2 className="font-cond font-black text-brand-navy text-4xl leading-none uppercase mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 font-sans">
              Provide your dimension parameters, and our design team will assess feasibility.
            </p>

            <div className="space-y-4 font-cond">
              {[
                { label: "Your Name", icon: User, type: "text", placeholder: "John Doe" },
                { label: "Your Email", icon: Mail, type: "email", placeholder: "john@company.com" },
                { label: "Phone Number", icon: Phone, type: "tel", placeholder: "+91 98765 43210" },
              ].map(({ label, icon: Icon, type, placeholder }) => (
                <div key={label}>
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-1.5 font-mono">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/50" />
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="w-full bg-white border border-slate-200 px-4 pl-9 py-2.5 text-xs text-brand-navy placeholder:text-gray-400 focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-1.5 font-mono">
                  Message Details
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-brand-navy/50" />
                  <textarea
                    rows={4}
                    placeholder="Provide thickness specs, load parameters, or tooling design demands..."
                    className="w-full bg-white border border-slate-200 px-4 pl-9 py-2.5 text-xs text-brand-navy placeholder:text-gray-400 focus:outline-none focus:border-brand-orange transition-colors resize-none font-sans"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-cond font-bold tracking-widest uppercase text-xs py-3.5 transition-colors shadow-lg shadow-brand-orange/20 cursor-pointer"
              >
                Send Specifications
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS (Dark Navy) ───────────────────────────────────── */}
      <section className="relative w-full bg-[#060e1a] py-20 overflow-hidden bg-blueprint-grid border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeUp}
            className="text-center mb-16"
          >

            <h2 className="font-cond font-black text-white text-4xl leading-none uppercase">
              What <span className="text-brand-orange">Clients Say</span>
            </h2>
            <div className="h-1 bg-brand-orange w-16 mx-auto mt-4" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map(({ name, role, text }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="bg-brand-navy-mid border border-white/10 p-8 hover:border-brand-orange/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 italic font-sans">
                    &ldquo;{text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-white/5 pt-5 mt-auto">
                  <div className="w-9 h-9 bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center">
                    <User className="w-4.5 h-4.5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-cond font-bold text-white uppercase tracking-wider text-sm">{name}</p>
                    <p className="font-cond text-[10px] tracking-widest uppercase text-white/40 mt-0.5">
                      {role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FACTORY VIDEO GALLERY (Light Mesh) ─────────────────────────── */}
      <section className="relative w-full py-20 overflow-hidden bg-frp-mesh bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeUp}
            className="text-center mb-16"
          >

            <h2 className="font-cond font-black text-brand-navy text-4xl sm:text-5xl leading-none uppercase">
              Factory <span className="text-brand-orange">Video Gallery</span>
            </h2>
            <div className="h-1 bg-brand-navy w-16 mx-auto mt-4" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {factoryVideos.map((video, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                onClick={() => setActiveVideo(video.videoSrc)}
                whileHover={{ y: -6 }}
                className="group border border-gray-100 hover:border-brand-orange/30 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
              >
                {/* Visual Cover */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#0a1628]/40 group-hover:bg-[#0a1628]/55 transition-colors duration-300" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 bg-brand-orange text-white flex items-center justify-center shadow-lg transition-transform duration-300"
                    >
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </motion.div>
                  </div>
                  
                  {/* Category tag */}
                  <div className="absolute top-4 left-4 bg-brand-navy border border-white/10 text-white font-cond text-[9px] font-bold tracking-widest uppercase px-3 py-1">
                    {video.tag}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-cond font-black text-brand-navy text-lg uppercase tracking-wider mb-2 group-hover:text-brand-orange transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-sans">
                    {video.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CLIENTS INF marque (Light Grid) ───────────────────────────── */}
      <section className="w-full py-16 overflow-hidden bg-[#fafbfc] border-b border-gray-100 relative">
        <div className="absolute inset-0 bg-blueprint-grid-light opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-10 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeUp}
          >
            <h2 className="font-cond font-black text-brand-navy text-3xl leading-none uppercase">
              Our <span className="text-brand-orange">Clients</span>
            </h2>
            <div className="h-0.5 bg-brand-navy w-12 mx-auto mt-3" />
          </motion.div>
        </div>

        {/* Seamless Marquee Container */}
        <div className="relative flex overflow-x-hidden group z-10">
          {/* Fading side edges */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#fafbfc] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#fafbfc] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-8 pr-8 w-max"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {clientsList.map(({ src, alt }, idx) => (
              <div
                key={`${alt}-${idx}`}
                className="w-48 h-24 shrink-0 flex items-center justify-center bg-white px-6 py-4 border border-gray-100 hover:border-brand-orange/30 shadow-sm transition-all duration-300"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={150}
                  height={60}
                  className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex items-center gap-8 pr-8 w-max"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {clientsList.map(({ src, alt }, idx) => (
              <div
                key={`dup-${alt}-${idx}`}
                className="w-48 h-24 shrink-0 flex items-center justify-center bg-white px-6 py-4 border border-gray-100 hover:border-brand-orange/30 shadow-sm transition-all duration-300"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={150}
                  height={60}
                  className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CALL TO ACTION (FRP Mesh Backdrop) ───────────────────────── */}
      <section className="relative w-full py-20 bg-[#DCE8F6] bg-frp-mesh border-b border-gray-200">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={fadeUp}
          className="max-w-3xl mx-auto px-6 text-center relative z-10"
        >
          <h2 className="font-cond font-black text-brand-navy text-3xl sm:text-[40px] leading-tight uppercase mb-4">
            Looking for High Performance FRP <span className="text-brand-orange">Components?</span>
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

      {/* ── VIDEO LIGHTBOX MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0a1628]/80 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-brand-navy border border-white/10 shadow-2xl rounded-none overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-none transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Video Player */}
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                <video
                  src={activeVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
