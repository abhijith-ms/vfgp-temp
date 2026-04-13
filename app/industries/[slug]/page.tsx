"use client";
import { use } from "react";
import { motion, easeOut } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

// ─── CONTENT DATABASE ────────────────────────────────────────────────────────
const industriesData: Record<string, any> = {
  automobile: {
    title: "FRP Automobile Products",
    subtitle: "Automotive Solutions",
    heroImg: "/industries/bus.jpg",
    intro1:
      "We at VFGP have been involved for over more than three decade in developing workable solutions using FRP, for AUTOMOTIVE applications. Using FRP’s distinctive advantage of enhanced life and minimum maintenance we have earned the loyalty of thousands of users nationwide. Due to the design flexibility of FRP, the aesthetics of these is far better than those of their counterpart and are available in ready to use conditions.",
    intro2:
      "Our clients can avail from us FRP Automobile Accessories that are manufactured using premium grade raw material. These FRP made accessories are offered by us in different sizes and can be easily customized as per the details specified by the clients. Moreover, we assure to keep our clients completely contented with our range.",
    intro3:
      "Our expertise lies in manufacturing FRP Automobile Products that have been manufactured using superior quality raw material. These material enables us to ensure durability and strength of the product. Available in customized ranges, these FRP Automobile Products are provided to our clients at industry leading prices.",
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
    subtitle: "Defence & Aerospace",
    heroImg: "/industries/defence.png",
    intro1:
      "VFG is leader in manufacturing FRP defence Products in India. We have a wide variety of defence products. We offer high-grade FRP Shelters using superior quality FRP, which are supplied to the Defence Army in high altitude areas.",
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────
export default function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 1. Get the data for the current URL slug
  const { slug: currentSlug } = use(params);

  // 2. Get the data for the current URL slug
  const data = industriesData[currentSlug];

  // 3. If the URL slug doesn't exist, show a 404 page
  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center pt-16 md:pt-0">
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImg}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#0c1221]/85 z-10" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mt-8 md:mt-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-[#F27A22] font-black tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs md:text-sm mb-3 md:mb-4"
            >
              {data.subtitle}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black text-white leading-[1.1] tracking-tight mb-6 max-w-4xl"
            >
              {data.title}
            </motion.h1>
            <motion.div
              variants={fadeUp}
              className="w-16 md:w-20 h-1 md:h-1.5 bg-[#F27A22] rounded-full mb-4 md:mb-8"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── MAIN CONTENT SECTION ─────────────────────────────────────── */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Content (Left Side - 8 Columns) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="lg:col-span-8"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-black text-[#1b2a52] mb-6 md:mb-8"
            >
              Industry <span className=" text-[#F27A22]">Overview</span>
            </motion.h2>

            {/* Replaced prose with direct tailwind classes for better consistency */}
            <div className="text-gray-500 text-base md:text-lg leading-relaxed space-y-6 md:space-y-8 mb-10 md:mb-12">
              <motion.p variants={fadeUp}>{data.intro1}</motion.p>
              <motion.p variants={fadeUp}>{data.intro2}</motion.p>
              <motion.p variants={fadeUp}>{data.intro3}</motion.p>
            </div>

            {/* Feature List */}
            <motion.div
              variants={fadeUp}
              className="bg-slate-50 border border-gray-100 rounded-2xl p-6 sm:p-8 md:p-10"
            >
              <h3 className="text-xl md:text-2xl font-black text-[#1b2a52] mb-6 md:mb-8">
                {data.listTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {data.list.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#F27A22] shrink-0 mt-0.5 md:mt-0" />
                    <span className="font-semibold text-gray-700 text-sm md:text-base leading-snug">
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
            className="lg:col-span-4 space-y-6 md:space-y-8"
          >
            {/* Quick Navigation / Other Industries */}
            <div className="bg-[#1b2a52] rounded-2xl p-6 sm:p-8 shadow-xl">
              <h4 className="text-white font-black text-xl md:text-2xl mb-6">
                Explore Industries
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Automobile Products", slug: "automobile" },
                  { name: "Defence Products", slug: "defence" },
                  { name: "Engineering Products", slug: "engineering" },
                ].map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/industries/${link.slug}`}
                      // Added "group" class here to fix the hover arrow animation
                      className={`group flex items-center justify-between p-3.5 md:p-4 rounded-xl font-bold text-sm md:text-base transition-all ${
                        currentSlug === link.slug
                          ? "bg-[#F27A22] text-white shadow-md"
                          : "bg-white/5 text-gray-300 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      {link.name}
                      <ArrowRight
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          currentSlug === link.slug
                            ? "opacity-100"
                            : "opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Box */}
            <div className="bg-[#F27A22] rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-orange-900/10">
              <h4 className="font-black text-xl md:text-2xl mb-3 md:mb-4">
                Need Custom Solutions?
              </h4>
              <p className="text-orange-100 mb-6 md:mb-8 font-medium text-sm md:text-base leading-relaxed">
                Our engineering team is ready to assist you with specifications
                and bespoke manufacturing requirements.
              </p>

              {/* FIX: Added "block text-center" so the Link stretches and centers text like a button */}
              <Link
                href="/contact"
                className="block text-center w-full bg-white text-[#F27A22] py-3.5 md:py-4 rounded-xl font-black text-sm md:text-base hover:bg-gray-50 transition-colors shadow-md"
              >
                Contact Technical Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
