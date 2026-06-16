"use client";

import { use } from "react";
import { motion, easeOut } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FRPDuctSVG, FRPProfileSVG } from "../../components/BackgroundDrawings";

// ─── CONTENT DATABASE ────────────────────────────────────────────────────────
const industriesData: Record<string, any> = {
  automobile: {
    title: "FRP Automobile Products",
    subtitle: "Automotive Solutions",
    heroImg: "/industries/bus.jpg",
    intro1:
      "We at VFGP have been involved for over more than three decades in developing workable solutions using FRP, for AUTOMOTIVE applications. Using FRP’s distinctive advantage of enhanced life and minimum maintenance we have earned the loyalty of thousands of users nationwide. Due to the design flexibility of FRP, the aesthetics of these is far better than those of their counterparts and are available in ready to use conditions.",
    intro2:
      "Our clients can avail from us FRP Automobile Accessories that are manufactured using premium grade raw materials. These FRP made accessories are offered by us in different sizes and can be easily customized as per the details specified by the clients. Moreover, we assure to keep our clients completely contented with our range.",
    intro3:
      "Our expertise lies in manufacturing FRP Automobile Products that have been manufactured using superior quality raw materials. These materials enable us to ensure durability and strength of the product. Available in customized ranges, these FRP Automobile Products are provided to our clients at industry leading prices.",
    listTitle: "Our range of automobile accessories includes:",
    list: [
      "Rear Facia",
      "Rear Bumper",
      "Front Facia",
      "Front Inner with A-Pillars",
      "Rear Inner dome",
      "Dashboard Child Parts",
      "Podest with Top Lid",
      "Mahindra Bolero Wheel Arch",
    ],
  },
  defence: {
    title: "FRP Defence Products",
    subtitle: "Defence & Strategic",
    heroImg: "/industries/defence.png",
    intro1:
      "VFG is a leader in manufacturing FRP defence Products in India. We have a wide variety of defence products. We offer high-grade FRP Shelters using superior quality FRP, which are supplied to the Defence Army in high altitude areas.",
    intro2:
      "The defence instrument carrying box manufactured at our end is made using high-grade raw materials. These defense instrument boxes are used to carry defence arms over long distances because of their durable nature and light weight.",
    intro3:
      "Our products are available to clients in varying sizes that can also be customized entirely as per their specific field requirements.",
    listTitle: "Key Defence Applications:",
    list: [
      "High Altitude FRP Shelters",
      "Instrument Carrying Boxes",
      "Lightweight Structural Components",
      "Custom Tactical Deployment Cases",
    ],
  },
  engineering: {
    title: "Engineering Industries Products",
    subtitle: "Industrial Engineering",
    heroImg: "/industries/Engineering.png",
    intro1:
      "At VFGP, our goal is to provide our clients with the industrial engineering FRP products they need right when they need them. We specialize in mature, legacy, and end-of-life products that you won’t find anywhere else, and we keep failure-prone parts in stock to reduce lead times.",
    intro2:
      "Our experienced staff can provide detailed technical support, and our technicians can repair your equipment at our repair shop.",
    intro3:
      "We understand the importance of avoiding costly downtimes; therefore, we’ll stop at nothing to get you the industrial engineering spare parts you need at a great price. Explore our large inventory of Industrial Engineering products and contact our team today if you have any questions.",
    listTitle: "Engineering Solutions:",
    list: [
      "Custom Engineering Enclosures",
      "Legacy Product Replacements",
      "Heavy-Duty FRP Panels",
      "Corrosion-Resistant Industrial Parts",
    ],
  },
};

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────
export default function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: currentSlug } = use(params);
  const data = industriesData[currentSlug];

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white font-sans antialiased text-brand-navy">
      {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[50vh] flex items-center pt-16 md:pt-0 bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImg}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#0a1628]/90 z-10" />
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-50 z-10" />

        {/* Technical crosshairs */}
        <div className="absolute top-8 left-8 w-6 h-6 opacity-30 z-20">
          <div className="absolute top-0 left-0 w-6 h-[1.5px] bg-brand-orange" />
          <div className="absolute top-0 left-0 w-[1.5px] h-6 bg-brand-orange" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mt-8 md:mt-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-brand-orange font-cond font-bold tracking-widest uppercase text-xs md:text-sm mb-3"
            >
              [ {data.subtitle} ]
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-cond font-black text-white leading-none uppercase tracking-tight mb-6 max-w-4xl"
            >
              {data.title}
            </motion.h1>
            <motion.div
              variants={fadeUp}
              className="w-16 h-1 bg-brand-orange mb-4"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── MAIN CONTENT SECTION ─────────────────────────────────────── */}
      <section className="w-full py-16 md:py-24 bg-white bg-fiber-weave overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Content (Left Side - 8 Columns) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="lg:col-span-8 relative"
          >
            {/* Faint technical watermark behind text */}
            <FRPDuctSVG className="absolute right-0 bottom-4 w-72 h-72 opacity-[0.04] text-brand-navy pointer-events-none" />

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-cond font-black text-brand-navy uppercase mb-6"
            >
              Sector <span className="text-brand-orange">Overview</span>
            </motion.h2>

            <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-6 md:space-y-8 mb-12 font-sans relative z-10">
              <motion.p variants={fadeUp}>{data.intro1}</motion.p>
              <motion.p variants={fadeUp}>{data.intro2}</motion.p>
              <motion.p variants={fadeUp}>{data.intro3}</motion.p>
            </div>

            {/* Feature List */}
            <motion.div
              variants={fadeUp}
              className="bg-slate-50 border border-gray-100 p-6 sm:p-10 rounded-none relative z-10 bg-blueprint-grid-light"
            >
              <h3 className="text-xl font-cond font-bold text-brand-navy uppercase tracking-wider mb-6">
                {data.listTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 font-cond text-sm uppercase tracking-wide">
                {data.list.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="font-bold text-gray-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar (Right Side - 4 Columns) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeRight}
            className="lg:col-span-4 space-y-8"
          >
            {/* Quick Navigation */}
            <div className="bg-[#0a1628] border border-white/10 p-6 sm:p-8 shadow-2xl bg-blueprint-grid text-white">
              <h4 className="font-cond font-black text-xl uppercase tracking-wider mb-6">
                Sectors
              </h4>
              <ul className="space-y-3 font-cond uppercase text-xs tracking-wider">
                {[
                  { name: "Automobile Products", slug: "automobile" },
                  { name: "Defence Products", slug: "defence" },
                  { name: "Engineering Products", slug: "engineering" },
                ].map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/industries/${link.slug}`}
                      className={`group flex items-center justify-between p-3.5 border transition-all ${
                        currentSlug === link.slug
                          ? "bg-brand-orange border-brand-orange text-white"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {link.name}
                      <ArrowRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                          currentSlug === link.slug ? "opacity-100" : "opacity-40"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Box */}
            <div className="bg-brand-orange p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
              {/* Subtle mesh background */}
              <div className="absolute inset-0 bg-frp-mesh opacity-20 pointer-events-none" />
              
              <h4 className="font-cond font-black text-xl uppercase tracking-wider mb-3 relative z-10">
                Custom Specs
              </h4>
              <p className="text-orange-50 mb-6 font-sans text-sm leading-relaxed relative z-10">
                Our technical sales team is ready to evaluate draft designs, custom load constraints, and plug tolerances.
              </p>

              <Link
                href="/contact"
                className="block text-center w-full bg-[#0a1628] text-white py-3 font-cond font-bold text-xs uppercase tracking-widest hover:bg-brand-navy-light transition-colors relative z-10 shadow-md"
              >
                Contact Engineering Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
