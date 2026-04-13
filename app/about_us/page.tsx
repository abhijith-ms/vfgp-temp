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
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Page() {
  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative h-72 sm:h-87.5 md:h-100 w-full flex items-center justify-center"
        data-aos="fade-up"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('about/about_hero.png')" }}
        />
        <div className="absolute inset-0 bg-[#1b2a52]/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-[56px] font-black text-white mb-3 md:mb-4 tracking-tight leading-tight">
            About Us
          </h1>
          <div className="w-12 sm:w-16 h-1.5 bg-[#F27A22] mx-auto rounded-full mb-4 md:mb-6" />
          <p className="text-gray-200 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-medium px-2">
            Pioneering the future of industrial manufacturing with superior
            fiber-reinforced plastic solutions for over 30 years.
          </p>
        </div>
      </section>

      {/* ─── TWO DECADES ──────────────────────────────────────── */}
      <section
        className="w-full bg-white py-12 md:py-20 bg-grid-pattern"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            <div className="w-full" data-aos="fade-right" data-aos-delay="100">
              <img
                src="about/collage.png"
                alt="Two Decades of Excellence Collage"
                className="w-full h-auto object-cover shadow-sm border border-gray-100 rounded-lg"
              />
            </div>
            <div
              className="flex flex-col"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h2 className="text-2xl sm:text-3xl md:text-[38px] font-bold text-[#1b2a52] mb-4 md:mb-6 leading-tight">
                Two Decades of Excellence
              </h2>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 md:mb-6">
                VFGP delivers world-class FRP composites for automobiles and
                other applications from Zaheerabad&apos;s industrial hub.
                Founded in 2003 as a small-scale unit, we have grown steadily by
                staying true to our vision of consistent quality and timely
                delivery, guided by first-generation entrepreneurs committed to
                innovation and reliability.
              </p>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 md:mb-10">
                Today, our facility spans over 100,000 square feet, housing the
                most advanced moulding and tooling technology in the industry.
                We don&apos;t just manufacture products; we engineer solutions
                that stand the test of time in the harshest environments.
              </p>
              <div>
                <Link
                  href="/contact"
                  className="border border-[#1b2a52] text-[#1b2a52] px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-semibold text-sm sm:text-base hover:bg-[#1b2a52] hover:text-white transition-colors inline-block"
                >
                  View Our Timeline
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section
        className="w-full bg-[#30335A] py-12 md:py-16"
        data-aos="zoom-in"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div
              className="flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <span className="text-3xl sm:text-5xl md:text-[56px] font-black text-white mb-2 md:mb-3">
                <AnimatedCounter target={20} suffix="+" />
              </span>
              <span className="text-[#DE8A5C] text-xs sm:text-sm font-bold tracking-widest uppercase">
                Years Experience
              </span>
            </div>

            <div
              className="flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="text-3xl sm:text-5xl md:text-[56px] font-black text-white mb-2 md:mb-3">
                <AnimatedCounter target={150} suffix="+" />
              </span>
              <span className="text-[#DE8A5C] text-xs sm:text-sm font-bold tracking-widest uppercase">
                Employees
              </span>
            </div>

            <div
              className="flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span className="text-3xl sm:text-5xl md:text-[56px] font-black text-white mb-2 md:mb-3">
                <AnimatedCounter target={500} suffix="+" />
              </span>
              <span className="text-[#DE8A5C] text-xs sm:text-sm font-bold tracking-widest uppercase">
                Projects Completed
              </span>
            </div>

            <div
              className="flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span className="text-3xl sm:text-5xl md:text-[56px] font-black text-white mb-2 md:mb-3">
                <AnimatedCounter target={100} suffix="+" />
              </span>
              <span className="text-[#DE8A5C] text-xs sm:text-sm font-bold tracking-widest uppercase">
                Global Clients
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION / VISION ─────────────────────────────────── */}
      <section
        className="w-full bg-white py-12 md:py-20 bg-gradient-mesh"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              className="bg-[#24242A] rounded-xl p-6 sm:p-10 md:p-12"
              data-aos="fade-right"
              data-aos-delay="100"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#DCE8F5] rounded-xl flex items-center justify-center mb-6 md:mb-8">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-[#1b2a52]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 md:mb-6">
                Our Mission
              </h3>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                To empower global infrastructure and industry through innovative
                composite solutions that provide unmatched durability,
                sustainability, and performance.
              </p>
            </motion.div>
            <motion.div
              className="bg-[#24242A] rounded-xl p-6 sm:p-10 md:p-12"
              data-aos="fade-left"
              data-aos-delay="200"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#DCE8F5] rounded-xl flex items-center justify-center mb-6 md:mb-8">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-[#1b2a52]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 md:mb-6">
                Our Vision
              </h3>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                To be the most trusted name in composite engineering worldwide,
                setting the standard for quality and technological advancement
                in FRP manufacturing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ──────────────────────────────────────── */}
      <section
        className="w-full bg-white py-16 md:py-24 bg-grid-pattern"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-12 md:mb-20" data-aos="fade-down">
            <h2 className="text-2xl sm:text-4xl md:text-[46px] font-black text-[#1b2a52] mb-4 md:mb-6 leading-tight">
              Our Core Values
            </h2>
            <div className="w-20 sm:w-32 h-1.5 bg-[#C47D34] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            <div
              className="flex flex-col items-center group"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="w-18 h-18 sm:w-22 sm:h-22 bg-[#282F5A] rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#F27A22] transition-colors duration-300">
                <BadgeCheck
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-[#1b2a52] transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg sm:text-[22px] font-bold text-[#1b2a52] mb-2 md:mb-4">
                Quality
              </h3>
              <p className="text-black text-sm sm:text-[15px] leading-relaxed px-2 sm:px-4">
                Unyielding commitment to precision in every layer.
              </p>
            </div>

            <div
              className="flex flex-col items-center group"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-18 h-18 sm:w-22 sm:h-22 bg-[#282F5A] rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#F27A22] transition-colors duration-300">
                <Gavel
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-[#1b2a52] transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg sm:text-[22px] font-bold text-[#1b2a52] mb-2 md:mb-4">
                Integrity
              </h3>
              <p className="text-black text-sm sm:text-[15px] leading-relaxed px-2">
                Honest engineering and transparent partnerships.
              </p>
            </div>

            <div
              className="flex flex-col items-center group"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-18 h-18 sm:w-22 sm:h-22 bg-[#282F5A] rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#F27A22] transition-colors duration-300">
                <Lightbulb
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-[#1b2a52] transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg sm:text-[22px] font-bold text-[#1b2a52] mb-2 md:mb-4">
                Innovation
              </h3>
              <p className="text-black text-sm sm:text-[15px] leading-relaxed px-2">
                Pushing the boundaries of material science.
              </p>
            </div>

            <div
              className="flex flex-col items-center group"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-18 h-18 sm:w-22 sm:h-22 bg-[#282F5A] rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#F27A22] transition-colors duration-300">
                <Handshake
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-[#1b2a52] transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg sm:text-[22px] font-bold text-[#1b2a52] mb-2 md:mb-4">
                Commitment
              </h3>
              <p className="text-black text-sm sm:text-[15px] leading-relaxed px-2">
                Dedicated to the success of our clients&apos; projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP TEAM ──────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-20" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-10 md:mb-16" data-aos="fade-down">
            <h2 className="text-2xl sm:text-4xl md:text-[42px] font-black text-[#1b2a52] mb-3 md:mb-4 leading-tight">
              Leadership Team
            </h2>
            <div className="w-12 sm:w-16 h-1.5 bg-[#C47D34] mx-auto" />
          </div>

          <div
            className="flex flex-col items-center justify-center text-center"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <motion.div
              className="w-48 sm:w-70 h-60 sm:h-85 rounded-2xl overflow-hidden mb-4 md:mb-6"
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <img
                src="/about/chandu_ch.png"
                alt="Chandu CH"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1b2a52] mb-1">
              Chandu CH
            </h3>
            <p className="text-[#1b2a52] font-medium text-sm sm:text-base">
              Founder & President
            </p>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTION ───────────────────────────────────────── */}
      <section className="w-full bg-white py-16 md:py-20" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col lg:flex-row bg-[#2A2E5B] rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="lg:w-[55%] min-h-64 sm:min-h-87.5 lg:min-h-full relative"
              data-aos="fade-right"
            >
              <img
                src="/about/production.jpg"
                alt="State-of-the-Art Production"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div
              className="lg:w-[45%] p-6 sm:p-10 lg:p-14 border-l-0 lg:border-l-10 border-t-10 lg:border-t-0 border-[#C47D34] flex flex-col justify-center"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <h2 className="text-2xl sm:text-3xl md:text-[42px] font-black text-[#D98C21] mb-4 md:mb-6 leading-tight">
                State-of-the-Art
                <br />
                Production
              </h2>

              <p className="text-[#E8AB75] text-sm sm:text-base leading-relaxed mb-6 md:mb-10">
                Our advanced facility features temperature-controlled
                environments for precise moulding, custom tooling workshops, and
                automated production lines that guarantee consistency across
                high-volume orders.
              </p>

              <ul className="space-y-4 md:space-y-6">
                <li className="flex items-center gap-3 md:gap-4">
                  <Sliders className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                  <span className="text-white font-medium text-sm sm:text-[15px]">
                    Precision Custom Tooling
                  </span>
                </li>

                <li className="flex items-center gap-3 md:gap-4">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                  <span className="text-white font-medium text-sm sm:text-[15px]">
                    Advanced Vacuum Infusion
                  </span>
                </li>

                <li className="flex items-center gap-3 md:gap-4">
                  <Microscope className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                  <span className="text-white font-medium text-sm sm:text-[15px]">
                    In-house Quality Testing Lab
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLIENTS CAROUSEL ─────────────────────────────────── */}
      <div data-aos="fade-up">
        <ClientsCarousel />
      </div>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section
        className="w-full bg-[#DCE8F6] py-16 md:py-20"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-[42px] font-black text-[#282F5A] mb-4 md:mb-6 leading-tight">
            Looking for High Performance FRP{" "}
            <span className="text-[#F27A22]">Components?</span>
          </h2>

          <p className="text-[#1b2a52] text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-10 px-2">
            Get in touch with our engineering team for custom quotes and
            technical feasibility studies.
          </p>
          <Link
            href="/contact"
            className="bg-[#1b2a52] text-white px-8 sm:px-12 py-3 sm:py-4 rounded font-bold text-sm sm:text-base hover:bg-[#F27A22] transition-colors shadow-lg shadow-black/20"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
