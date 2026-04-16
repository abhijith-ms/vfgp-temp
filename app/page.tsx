"use client";
import HeroSction from "./components/HomeComponents/HeroSction";
import FeatureBar from "./components/HomeComponents/FeatureBar";
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
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
// ─── Animation Variants ───────────────────────────────────────────────────────
const sectionViewport = { once: true, amount: 0.18 };
const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: smoothEase },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: smoothEase },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: smoothEase },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <span className="font-bold text-[#1b2a52] text-base md:text-lg">
          {question}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#F27A22] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden text-gray-500 text-base leading-relaxed pr-8"
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
  const industries = [
    {
      icon: Car,
      slug: "automobile",
      label: "Automobile",
      desc: "Lightweight FRP body panels for buses, trucks & commercial vehicles.",
    },
    {
      icon: Shield,
      slug: "defence",
      label: "Defence",
      desc: "Blast-resistant composite components meeting defence specifications.",
    },
    {
      icon: Cog,
      slug: "engineering",
      label: "Engineering Industries",
      desc: "Custom FRP solutions for heavy engineering & infrastructure sectors.",
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
      question: "Can Venkateshwara FRP handle large-scale production runs?",
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

  // Extended list for seamless marquee loop
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
      desc: "Precision-engineered FRP bus body for commercial vehicles.",
    },
    {
      img: "/bodydouble.png",
      title: "Body Double",
      desc: "High-impact resistant front and rear bumper assemblies.",
    },
    {
      img: "/loadtestingbox.png",
      title: "Load Testing Box",
      desc: "Lightweight insulating panels for modular enclosures.",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-white">
      <HeroSction />
      <div className="hidden md:block">
        <FeatureBar />
      </div>

      {/* ── ABOUT / LEGACY ─────────────────────────────────────────────── */}
      <section className="w-full  py-20 overflow-hidden bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1b2a52] leading-tight mb-4">
              We are leading{" "}
              <span className="text-[#F27A22]">manufacturers of FRP</span> in{" "}
              <span className="text-[#1b2a52]">Hyderabad – India.</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Venkateshwara Fibreglass Products is a unit set up for
              manufacturing FRP composites for Automobiles and other Engineering
              Industrial applications. The unit has been promoted by dedicated,
              young and technically experienced first-generation entrepreneurs.
              VFG is located at Plot No 6, R.I.E, Zaheerabad — the heart of the
              Industrial hub of Zaheerabad.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Advanced Vacuum Infusion Technology",
                "In-house R&D and Tooling Facility",
                "End-to-end Project Management",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F27A22] shrink-0" />
                  <span className="font-semibold text-[#1b2a52] text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/about_us"
              className="flex justify-center items-center "
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#F27A22] text-white px-8 py-3 rounded font-bold text-base hover:bg-[#1b2a52] transition-colors"
              >
                Read More
              </motion.button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeLeft}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-[3px] border-l-[3px] border-[#F27A22]" />
            <img
              src="/lab.png"
              alt="Manufacturing"
              className="w-full h-auto rounded-lg shadow-md object-cover relative z-10"
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute -bottom-8 sm:-right-18  -right-6 bg-[#1b2a52] text-white m-2 md:m-0 p-6 rounded-xl shadow-xl z-20 text-center min-w-45"
            >
              <span className="text-4xl font-black">#1</span>
              <p className="text-sm font-bold tracking-widest uppercase mt-1">
                Composite Partner
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ─────────────────────────────────────────── */}
      <section className="w-full py-12 md:py-20 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-[38px] font-black text-[#1b2a52] leading-tight">
              <span className=" text-[#F27A22]">Industries</span> We Serve
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#F27A22] mx-auto mt-2 mb-3 md:mb-4 rounded-full" />
            <p className="text-gray-500 text-sm sm:text-base mt-2 md:mt-3 max-w-xl mx-auto px-2">
              From automobiles to defence — our composite solutions power the
              industries that power India.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          >
            {industries.map(({ icon: Icon, slug, label, desc }, i) => (
              <motion.div
                key={slug}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: smoothEase }}
                className="rounded-xl border border-gray-200  hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/industries/${slug}`}
                  className="flex gap-3 sm:gap-4 items-start p-4 sm:p-5"
                >
                  <div
                    className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center ${i % 2 === 0 ? "bg-[#F27A22]" : "bg-[#1b2a52]"}`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#1b2a52] text-sm sm:text-base md:text-lg mb-1">
                      {label}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR PRODUCTS ────────────────────────────────────────────────── */}
      <section className="w-full  py-13 md:py-20 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1b2a52] leading-tight">
              Our <span className=" text-[#F27A22]">Products</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#1b2a52] mx-auto mt-2 mb-3 md:mb-4 rounded-full" />
            <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed mt-3 md:mt-4 max-w-2xl mx-auto px-2">
              Precision moulded FRP components that set new benchmarks in
              durability and finish.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {featuredProducts.map(({ img, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: smoothEase }}
                className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow "
              >
                <Link href="/product" className="block">
                  <div className="h-55 overflow-hidden bg-gray-50 flex items-center justify-center">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={img}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 bg-white/40">
                    <h3 className="text-xl md:text-[22px] font-black text-[#1b2a52] mb-2 leading-tight">
                      {title}
                    </h3>
                    <p className="text-[#F27A22] text-base md:text-base  leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US — DARK ────────────────────────────────────────── */}
      <section className="w-full bg-[#111827] py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: Text + Progress Bars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
          >
            <h2 className="text-2xl sm:text-3xl md:text-[38px] md:text-start text-center font-black text-white mb-2 leading-tight">
              Why choose <span className="text-[#F27A22]">us</span>
            </h2>
            <div className="w-16 md:w-22 md:ml-1 h-1 bg-[#F27A22] mb-3  md:mx-0 mx-auto md:mb-4 rounded-full" />

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 md:mb-8">
              We combine engineering excellence with advanced manufacturing
              infrastructure to deliver FRP composites that exceed industry
              benchmarks.
            </p>

            {[
              { label: "Quality Assurance", val: 98 },
              { label: "On-Time Delivery", val: 94 },
              { label: "Client Satisfaction", val: 97 },
              { label: "R&D Investment", val: 85 },
            ].map(({ label, val }, i) => (
              <div key={label} className="mb-5">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300 font-semibold">{label}</span>
                  <span className="text-[#F27A22] font-bold">{val}%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${val}%` }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                    className="h-full bg-[#F27A22] rounded-full"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: 2x2 Feature Boxes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-5"
          >
            {[
              {
                icon: Settings2,
                label: "Advanced Infrastructure",
                desc: "Automated lines & vacuum resin infusion plants.",
              },
              {
                icon: BarChart2,
                label: "Business Growth",
                desc: "Consistent expansion with marquee industry partners.",
              },
              {
                icon: Award,
                label: "Zero-Defect Quality",
                desc: "Rigorous QA at every stage of the process.",
              },
              {
                icon: UserCog,
                label: "Custom Engineering",
                desc: "Bespoke designs tailored to your specifications.",
              },
            ].map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 hover:border-[#F27A22] transition-colors"
              >
                <div className="w-11 h-11 bg-[#F27A22]/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#F27A22]" />
                </div>
                <h4 className="font-bold text-white text-base mb-2">{label}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR UNIQUE PRODUCT ──────────────────────────────────────────── */}
      <section className="w-full bg-grid-pattern py-16 md:py-20 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
          >
            <h2 className="text-2xl sm:text-3xl md:text-[36px] md:text-start text-center font-black text-[#1b2a52] mb-2 leading-tight">
              Our <span className=" text-[#F27A22]">Unique Product</span>
            </h2>
            <div className="w-16 md:w-22 md:ml-1 mx-auto h-1 bg-[#F27A22] mb-4 md:mb-6 rounded-full" />
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-3 md:mb-4">
              Our flagship FRP composite enclosure sets a new standard for
              industrial applications. Built using advanced vacuum infusion, it
              delivers unmatched structural integrity at one-third the weight of
              conventional materials.
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 md:mb-8">
              Short delivery windows, competitive pricing, and exceptional
              surface quality make this a preferred choice across automotive and
              defence procurement channels.
            </p>
            <Link
              href="/product"
              className="flex md:justify-start justify-center items-center"
            >
              {" "}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1b2a52] text-white px-6 sm:px-8 py-3 rounded font-bold text-sm sm:text-base hover:bg-[#F27A22] transition-colors"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeLeft}
            whileHover={{ scale: 1.01 }}
            className="flex justify-center"
          >
            <img
              src="/loadtestingbox.png"
              alt="Unique Product"
              className="w-full max-w-md h-auto group-hover:scale-105 object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FAQ + CONTACT FORM ──────────────────────────────────────────── */}
      <section className="w-full py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: FAQ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
            className="bg-white px-4 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-start text-center font-black text-[#1b2a52] mb-2 leading-tight">
              Learn more from our <span className=" text-[#F27A22]">FAQ</span>
            </h2>
            <div className="w-12 mx-auto md:mx-0 h-1 bg-[#F27A22] mb-4 md:mb-6 rounded-full" />
            <p className="text-gray-500 text-sm sm:text-base mb-6 md:mb-8 leading-relaxed">
              Frequently asked questions about FRP composites, manufacturing
              timelines, and our capabilities.
            </p>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} {...faq} />
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeLeft}
            className="bg-[#f8f9fb] px-4 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20 border-t lg:border-t-0 border-l-0 lg:border-l border-gray-100"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-center md:text-start text-[#1b2a52] mb-2">
              Get In Touch
            </h2>
            <div className="w-12 h-1 bg-[#F27A22] mb-4 mx-auto md:mx-0  md:mb-6 rounded-full" />
            <div className="space-y-4">
              {[
                {
                  label: "Your Name",
                  icon: User,
                  type: "text",
                  placeholder: "John Doe",
                },
                {
                  label: "Your Email",
                  icon: Mail,
                  type: "email",
                  placeholder: "you@email.com",
                },
                {
                  label: "Phone Number",
                  icon: Phone,
                  type: "tel",
                  placeholder: "+91 98765 43210",
                },
              ].map(({ label, icon: Icon, type, placeholder }) => (
                <div key={label}>
                  <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-wide">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-base focus:outline-none focus:border-[#F27A22] bg-white transition-colors"
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-wide">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-base focus:outline-none focus:border-[#F27A22] bg-white resize-none transition-colors"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#F27A22] text-white py-3 rounded-lg font-bold text-base hover:bg-[#1b2a52] transition-colors"
              >
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS — DARK ─────────────────────────────────────────── */}
      <section className="w-full bg-[#111827] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-black text-white text-center mb-2 leading-tight">
              What <span className="text-[#F27A22]">Clients</span> Say
            </h2>
            <div className="w-14 sm:w-18 h-1 bg-[#F27A22] mx-auto mb-3 md:mb-4 rounded-full" />
            <p className="text-gray-400 text-sm sm:text-base text-center mb-8 md:mb-12 px-2">
              Trusted by leading OEMs and defence contractors across India
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {testimonials.map(({ name, role, text }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="bg-[#1e293b] border border-gray-700 rounded-xl p-7 hover:border-gray-500 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current text-[#F27A22]"
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  "{text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F27A22]/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#F27A22]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">{name}</p>
                    <p className="text-gray-500 text-sm uppercase tracking-wide mt-0.5">
                      {role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FACTORY VIDEO GALLERY ────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl font-black text-[#1b2a52] text-center mb-2 leading-tight">
              Factory <span className=" text-[#F27A22]">Video</span> gallery
            </h2>
            <div className="w-14 sm:w-16 h-1 bg-[#F27A22] mx-auto mb-8 md:mb-12 rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {["/bus.png", "/robot.png", "/bus2.png"].map((src, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative rounded-xl overflow-hidden group cursor-pointer border border-gray-200 bg-white"
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-[#F27A22] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg
                      className="w-6 h-6 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
                {i === 1 && (
                  <div className="absolute top-3 left-3 bg-[#F27A22] text-white text-sm font-bold px-2 py-1 rounded uppercase tracking-wide">
                    Painting Section
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR CLIENTS (Animated Marquee & Full Color) ──────────────────────────────────────────────────── */}
      <section className="w-full bg-gradient-mesh py-12 md:py-20 overflow-hidden relative border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center mb-8 md:mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl font-black text-[#1b2a52] mb-2">
              Our <span className=" text-[#F27A22]">Clients</span>
            </h2>
            <div className="w-14 sm:w-16 h-1 bg-[#F27A22] mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Infinite Marquee Container */}
        <div className="relative flex overflow-x-hidden group">
          {/* Fading Edges for smooth entry/exit effect */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          {/* Render 2 identical motion divs side-by-side to create a seamless loop */}
          <motion.div
            className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10 w-max"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {clientsList.map(({ src, alt }, idx) => (
              <div
                key={`${alt}-${idx}`}
                className="w-44 md:w-56 h-28 shrink-0 flex items-center justify-center rounded-2xl bg-white px-6 py-5 cursor-pointer border border-gray-100 shadow-sm transition-all duration-300 hover:border-orange-200 hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={180}
                  height={72}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10 w-max"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {clientsList.map(({ src, alt }, idx) => (
              <div
                key={`dup-${alt}-${idx}`}
                className="w-44 md:w-56 h-28 shrink-0 flex items-center justify-center rounded-2xl bg-white px-6 py-5 cursor-pointer border border-gray-100 shadow-sm transition-all duration-300 hover:border-orange-200 hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={180}
                  height={72}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MANUFACTURING PROCESS ────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20 border-t border-gray-100 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-[38px] font-black text-[#1b2a52] mb-2 leading-tight">
              Our Manufacturing Process
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-10 md:mb-16 px-2">
              How we turn concepts into high-performance composites
            </p>
          </motion.div>

          <div className="relative" onMouseLeave={() => setHoveredStep(null)}>
            {/* ── Static base line (always visible) ── */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-orange-100 -z-10" />

            {/* ── Animated orange fill line ── */}
            <div
              className="hidden lg:block absolute top-10 left-[10%] h-0.5 -z-10 bg-[#F27A22] origin-left transition-all duration-500 ease-in-out"
              style={{
                width:
                  hoveredStep !== null ? `${(hoveredStep / 4) * 80}%` : "0%",
              }}
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4"
            >
              {[
                {
                  num: "01",
                  title: "CONCEPT",
                  desc: "Requirement analysis and design modeling.",
                },
                {
                  num: "02",
                  title: "TOOLING",
                  desc: "Precision mold fabrication using CNC tech.",
                },
                {
                  num: "03",
                  title: "FABRICATION",
                  desc: "Lamination and resin infusion process.",
                },
                {
                  num: "04",
                  title: "TESTING",
                  desc: "Rigorous QA and load-bearing tests.",
                },
                {
                  num: "05",
                  title: "DELIVERY",
                  desc: "Final finishing and global logistics.",
                },
              ].map((step, i) => {
                // On desktop: orange if hovered step covers this index.
                // On mobile: only step 0 is always orange.
                const isActive =
                  hoveredStep !== null ? i <= hoveredStep : i === 0;

                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex flex-col items-center group"
                    onMouseEnter={() => setHoveredStep(i)} // desktop only via CSS pointer check
                  >
                    <div
                      className={`
                        w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full border-2 flex items-center justify-center mb-3 sm:mb-5 shadow-sm
                        transition-all duration-300 ease-in-out
                        ${
                          /* Mobile: always orange for step 0, rest blue */
                          /* Desktop: orange if active (covered by hover), else blue */
                          `lg:border-2 ${isActive ? "border-[#F27A22]" : "border-blue-200"}
                           max-lg:${i === 0 ? "border-[#F27A22]" : "border-blue-200"}`
                        }
                      `}
                    >
                      <span
                        className={`
                          text-xl sm:text-2xl font-black transition-colors duration-300
                          ${isActive ? "text-[#F27A22]" : "text-[#1b2a52]"}
                          max-lg:${i === 0 ? "text-[#F27A22]" : "text-[#1b2a52]"}
                        `}
                      >
                        {step.num}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-black tracking-widest text-[#1b2a52] mb-1 md:mb-2 uppercase">
                      {step.title}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm px-1 md:px-2">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#DCE8F6] py-16 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="max-w-225 mx-auto px-4 sm:px-6 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-black text-[#282F5A] mb-3 md:mb-4 leading-tight">
            Looking for High Performance FRP{" "}
            <span className="text-[#F27A22]">Components?</span>
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
