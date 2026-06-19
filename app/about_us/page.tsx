"use client";

import {
  Rocket,
  Eye,
  BadgeCheck,
  Gavel,
  Handshake,
  Lightbulb,
  Compass,
  Microscope,
  Sliders,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import ClientsCarousel from "../components/AboutComponents/ClientsCarousel";
import Link from "next/link";
import { motion } from "framer-motion";
import { FRPTankSVG, FRPDuctSVG, FRPProfileSVG } from "../components/BackgroundDrawings";

// Animated counter component
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref} className="font-cond font-black text-brand-orange">
      {count}
      {suffix}
    </span>
  );
}

export default function Page() {
  return (
    <div className="font-sans antialiased text-brand-navy bg-white">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-72 sm:h-80 md:h-96 w-full flex items-center justify-center bg-[#0a1628] overflow-hidden">
        {/* Weave & Grid Background */}
        <div className="absolute inset-0 bg-fiber-weave opacity-20" />
        <div className="absolute inset-0 bg-blueprint-grid opacity-70" />
        
        {/* Glow zone */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-radial from-brand-orange/10 via-transparent to-transparent blur-2xl" />

        {/* Technical framing */}
        <div className="absolute top-8 left-8 w-6 h-6 opacity-30">
          <div className="absolute top-0 left-0 w-6 h-[1.5px] bg-brand-orange" />
          <div className="absolute top-0 left-0 w-[1.5px] h-6 bg-brand-orange" />
        </div>
        <div className="absolute bottom-8 right-8 w-6 h-6 opacity-30">
          <div className="absolute bottom-0 right-0 w-6 h-[1.5px] bg-brand-orange" />
          <div className="absolute bottom-0 right-0 w-[1.5px] h-6 bg-brand-orange" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-cond font-black text-white uppercase tracking-tight mb-4">
            About Us
          </h1>
          <div className="w-16 h-1 bg-brand-orange mx-auto mb-6" />
          <p className="text-white/80 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed font-sans px-2">
            Pioneering the future of industrial composite lamination with high-precision fiber-reinforced plastic solutions for over 30 years.
          </p>
        </div>
      </section>

      {/* ─── TWO DECADES ──────────────────────────────────────── */}
      <section className="relative w-full bg-white py-16 md:py-24 bg-fiber-weave overflow-hidden border-b border-gray-100">
        {/* Watermarks */}
        <FRPProfileSVG className="absolute left-4 bottom-4 w-72 h-72 opacity-[0.05] text-brand-navy pointer-events-none rotate-6" />
        <div 
          className="absolute right-0 top-0 w-[40%] h-full opacity-[0.04] pointer-events-none bg-contain bg-no-repeat bg-right-bottom mix-blend-multiply select-none"
          style={{ backgroundImage: "url('/lab.png')" }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-brand-orange opacity-40" />
              <img
                src="about/collage.png"
                alt="Two Decades of Excellence Collage"
                className="w-full h-auto object-cover shadow-sm border border-gray-100 rounded-none relative z-10"
              />
            </div>
            
            <div className="flex flex-col">

              
              <h2 className="text-3xl sm:text-4xl font-cond font-black text-brand-navy uppercase mb-6 leading-none">
                Two Decades of Excellence
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                VFGP delivers world-class FRP composites for automobiles and strategic engineering applications from Zaheerabad&apos;s industrial hub. Founded in 2003 as a small-scale unit, we have grown steadily by staying true to our vision of consistent quality and timely delivery, guided by first-generation entrepreneurs committed to innovation and reliability.
              </p>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 font-sans">
                Today, our facility houses advanced lamination and tooling setups. We don&apos;t just manufacture products; we engineer solutions that stand the test of time in the harshest industrial and military environments.
              </p>
              
              <div>
                <Link
                  href="/contact"
                  className="border border-brand-navy hover:bg-brand-navy hover:text-white text-brand-navy px-8 py-3 font-cond font-bold text-xs uppercase tracking-widest transition-colors inline-block"
                >
                  Contact Our Engineers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section className="w-full bg-[#0a1628] py-12 md:py-16 bg-blueprint-grid border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            {[
              { target: 30, suffix: "+", label: "Years Experience" },
              { target: 150, suffix: "+", label: "Employees" },
              { target: 500, suffix: "+", label: "Projects Completed" },
              { target: 100, suffix: "+", label: "Global Clients" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-cond font-black text-brand-orange mb-2">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </span>
                <span className="text-white/45 font-cond text-[10px] tracking-widest uppercase font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION / VISION ─────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-24 bg-gradient-mesh border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Rocket,
                title: "Our Mission",
                desc: "To empower global infrastructure and industry through innovative composite solutions that provide unmatched durability, sustainability, and performance parameters.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To be the most trusted name in composite engineering worldwide, setting the standard for quality, lamination tooling, and technical advancements in the FRP domain.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-brand-navy p-8 sm:p-12 hover:border-brand-orange/40 border border-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <item.icon className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-cond font-black text-white uppercase tracking-wider mb-4">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ──────────────────────────────────────── */}
      <section className="relative w-full bg-white py-16 md:py-24 bg-composite-layers overflow-hidden border-b border-gray-100">
        <FRPTankSVG className="absolute left-6 top-1/2 -translate-y-1/2 w-64 h-96 opacity-[0.05] text-brand-navy pointer-events-none" />
        <FRPDuctSVG className="absolute right-6 top-1/2 -translate-y-1/2 w-72 h-72 opacity-[0.05] text-brand-navy pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">

            
            <h2 className="text-3xl sm:text-4xl font-cond font-black text-brand-navy uppercase">
              Our Core Values
            </h2>
            <div className="h-0.5 bg-brand-navy w-12 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: BadgeCheck, title: "Quality", desc: "Unyielding commitment to precision in every layer." },
              { icon: Gavel, title: "Integrity", desc: "Honest engineering and transparent partnerships." },
              { icon: Lightbulb, title: "Innovation", desc: "Pushing the boundaries of material sciences." },
              { icon: Handshake, title: "Commitment", desc: "Dedicated to the structural success of your projects." },
            ].map((value, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-brand-navy flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-cond font-bold text-brand-navy uppercase tracking-wider mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed px-4 font-sans">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP TEAM (Light Mesh) ─────────────────────── */}
      <section className="w-full bg-[#f3f5f8] py-16 md:py-24 bg-frp-mesh border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-16">

            
            <h2 className="text-3xl sm:text-4xl font-cond font-black text-brand-navy uppercase">
              Leadership Team
            </h2>
            <div className="h-0.5 bg-brand-navy w-12 mx-auto mt-4" />
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-gray-600 font-sans px-2">
              Working in a dedicated partnership that delivers technically superior fiberglass components and verified structural standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto justify-items-center text-center">
            {[
              { name: "Chandu CH", role: "Founder & President", img: "/about/chandu_ch.png" },
              { name: "Rameshan KIV", role: "Vice President", img: "/vicepresident.jpeg" },
            ].map((member, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-56 sm:w-64 h-64 sm:h-76 overflow-hidden mb-6 border border-gray-200/50 shadow-sm relative group">
                  {/* Decorative corner indicators on the photo border */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/40 z-20" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/40 z-20" />
                  
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-cond font-black text-brand-navy uppercase tracking-wider mb-1">
                  {member.name}
                </h3>
                <p className="text-brand-orange font-cond text-xs tracking-widest uppercase font-bold">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTION (Dark Navy) ───────────────────────────── */}
      <section className="w-full bg-brand-navy sm:bg-white py-0 sm:py-16 md:py-24 border-b border-gray-100 sm:bg-composite-layers">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 md:px-12">
          <div className="flex flex-col lg:flex-row bg-brand-navy text-white shadow-2xl relative overflow-hidden">
            {/* Tech watermark */}
            <div className="absolute inset-0 bg-blueprint-grid opacity-35 pointer-events-none" />
            
            <div className="lg:w-[50%] min-h-[300px] relative">
              <img
                src="/about/production.jpg"
                alt="State-of-the-Art Production Facility"
                className="absolute inset-0 w-full h-full object-cover z-10"
              />
            </div>
            
            <div className="lg:w-[50%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-20">

              
              <h2 className="text-3xl sm:text-4xl font-cond font-black text-brand-orange uppercase leading-none mb-6">
                State-of-the-Art
                <br />
                Production Setup
              </h2>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 font-sans">
                Our tooling facility features temperature-regulated curing zones for precise composite layup configurations, ensuring minimum void levels and consistent fiber stacking ratios.
              </p>

              <ul className="space-y-4">
                {[
                  { icon: Sliders, text: "Precision Custom Tooling Setup" },
                  { icon: Compass, text: "Advanced Vacuum Resin Infusion" },
                  { icon: Microscope, text: "In-house Layer Validation Laboratory" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3.5">
                    <item.icon className="w-5 h-5 text-brand-orange shrink-0" />
                    <span className="text-white font-cond font-bold text-sm tracking-widest uppercase">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLIENTS CAROUSEL ─────────────────────────────────── */}
      <div className="bg-[#fafafa] border-b border-gray-100">
        <ClientsCarousel />
      </div>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="w-full bg-[#DCE8F6] py-16 md:py-20 bg-frp-mesh border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-cond font-black text-brand-navy text-3xl sm:text-[40px] leading-tight uppercase mb-4">
            Looking for High Performance FRP <span className="text-brand-orange">Components?</span>
          </h2>
          <p className="text-brand-navy/80 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans leading-relaxed">
            Get in touch with our design and development engineering staff for custom pricing details and laminate modeling checks.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-navy hover:bg-brand-navy-light text-white px-10 py-4 font-cond font-bold text-xs uppercase tracking-widest transition-colors shadow-lg shadow-black/10"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
