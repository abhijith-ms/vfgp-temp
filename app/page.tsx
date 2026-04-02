"use client"
import HeroSction from "./components/HomeComponents/HeroSction";
import FeatureBar from "./components/HomeComponents/FeatureBar";
import Image from "next/image";
import {
  CheckCircle2, ArrowRight, ChevronRight, Star, Feather,
  Headset, Settings2, UserCog, Car, Shield, Cog,
  Lightbulb, ShieldCheck, Clock, BarChart2, Award,
  ChevronDown, ChevronUp, Mail, Phone, User, MessageSquare
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
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
        <span className="font-bold text-[#1b2a52] text-sm md:text-base">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-[#F27A22] shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden text-gray-500 text-sm leading-relaxed pr-8"
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
  const industries = [
    { icon: Car,          label: "Automobile",           desc: "Lightweight FRP body panels for buses, trucks & commercial vehicles." },
    { icon: Shield,       label: "Defence",              desc: "Blast-resistant composite components meeting defence specifications." },
    { icon: Cog,          label: "Engineering Industries",desc: "Custom FRP solutions for heavy engineering & infrastructure sectors." },
    { icon: Lightbulb,    label: "Creative Ideas",        desc: "Bespoke composite fabrication for unique design applications." },
    { icon: ShieldCheck,  label: "Super Safety",          desc: "Safety-certified panels and enclosures for hazardous environments." },
    { icon: Clock,        label: "24/7 Support",          desc: "Round-the-clock technical support and after-sales service." },
  ];

  const faqs = [
    { question: "What are the advantages of FRP over traditional materials?", answer: "FRP composites offer superior strength-to-weight ratio, corrosion resistance, and design flexibility compared to steel or aluminium, making them ideal for automotive and industrial applications." },
    { question: "What is the lead time for custom FRP composite manufacturing?", answer: "Lead times vary based on complexity and volume. Typically, tooling takes 2–4 weeks, followed by production. We work with clients to ensure timely delivery without compromising quality." },
    { question: "What is the surface finish quality of your FRP products?", answer: "Our products are finished to Class A surface standards using vacuum infusion and controlled gel-coat techniques, ensuring smooth, paint-ready surfaces suitable for automotive exteriors." },
    { question: "Can Venkateshwara FRP handle large-scale production runs?", answer: "Yes. Our automated production lines and vacuum resin infusion infrastructure are designed for both prototype and high-volume batch production to meet diverse client demands." },
  ];

  const testimonials = [
    { name: "Rajesh Kumar",  role: "Sr. Procurement Manager, AutoCorp",     text: "The precision and durability of composite panels delivered by VFG have significantly improved our vehicle performance. An outstanding partner." },
    { name: "Vishal R.",     role: "Project Lead, L&T Infrastructure",       text: "Their team's deep knowledge of FRP solutions and quick turnaround time helped us meet critical project deadlines without any compromise on quality." },
    { name: "Col. Amit Singh", role: "Strategic Sourcing, Defence Division", text: "One of the most reliable FRP manufacturers in India. Their technical team is highly knowledgeable about defence-grade composite specifications." },
  ];

  return (
    <main className="overflow-x-hidden">
      <HeroSction />
      <FeatureBar />

      {/* ── ABOUT / LEGACY ─────────────────────────────────────────────── */}
      <section className="w-full bg-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1b2a52] leading-tight mb-4">
              We are leading <span className="text-[#F27A22]">manufacturers of FRP</span> in{" "}
              <span className="text-[#1b2a52]">Hyderabad – India.</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Venkateshwara Fibreglass Products is a unit set up for manufacturing FRP composites for Automobiles
              and other Engineering Industrial applications. The unit has been promoted by dedicated, young and
              technically experienced first-generation entrepreneurs. VFG is located at Plot No 6, R.I.E,
              Zaheerabad — the heart of the Industrial hub of Zaheerabad.
            </p>
            <ul className="space-y-3 mb-8">
              {["Advanced Vacuum Infusion Technology", "In-house R&D and Tooling Facility", "End-to-end Project Management"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F27A22] shrink-0" />
                  <span className="font-semibold text-[#1b2a52] text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F27A22] text-white px-8 py-3 rounded font-bold text-sm hover:bg-[#c96414] transition-colors"
            >
              Read More
            </motion.button>
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
            <img src="/lab.png" alt="Manufacturing" className="w-full h-auto rounded-lg shadow-md object-cover relative z-10" />
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute -bottom-8 -right-6 bg-[#1b2a52] text-white p-6 rounded-xl shadow-xl z-20 text-center min-w-45"
            >
              <span className="text-4xl font-black">#1</span>
              <p className="text-[10px] font-bold tracking-widest uppercase mt-1">Composite Partner</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ─────────────────────────────────────────── */}
      <section className="w-full bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-[38px] font-black text-[#1b2a52]">
              <span className="italic text-[#F27A22]">Industries</span> We Serve{" "}
              <span className="text-[#F27A22]">——</span>
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
              From automobiles to defence — our composite solutions power the industries that power India.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {industries.map(({ icon: Icon, label, desc }, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="flex gap-4 items-start p-5 border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className={`shrink-0 w-14 h-14 rounded-lg flex items-center justify-center ${i % 2 === 0 ? "bg-[#F27A22]" : "bg-[#1b2a52]"}`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-[#1b2a52] text-sm mb-1">{label}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR PRODUCTS ────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1b2a52]">
              Our <span className="italic text-[#F27A22]">Products</span>{" "}
              <span className="text-[#F27A22]">——</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Precision moulded FRP components that set new benchmarks in durability and finish.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { img: "/bus3.png",         title: "Bus Body Parts",    desc: "Precision-engineered FRP bus body for commercial vehicles." },
              { img: "/bodydouble.png",   title: "Body Double",       desc: "High-impact resistant front and rear bumper assemblies." },
              { img: "/loadtestingbox.png", title: "Load Testing Box", desc: "Lightweight insulating panels for modular enclosures." },
            ].map(({ img, title, desc }) => (
              <motion.div 
                key={title} 
                variants={fadeUp}
                className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="h-55 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={img} 
                    alt={title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-[22px] font-black text-[#1b2a52] mb-2 leading-tight">{title}</h3>
                  <p className="text-[#F27A22] text-sm md:text-[15px] font-semibold leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US — DARK ────────────────────────────────────────── */}
      <section className="w-full bg-[#111827] py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Text + Progress Bars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
          >
            <h2 className="text-3xl md:text-[38px] font-black text-white mb-2">
              Why choose <span className="italic text-[#F27A22]">us</span>{" "}
              <span className="text-[#F27A22]">——</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              We combine engineering excellence with advanced manufacturing infrastructure to deliver
              FRP composites that exceed industry benchmarks.
            </p>

            {[
              { label: "Quality Assurance",   val: 98 },
              { label: "On-Time Delivery",    val: 94 },
              { label: "Client Satisfaction", val: 97 },
              { label: "R&D Investment",       val: 85 },
            ].map(({ label, val }, i) => (
              <div key={label} className="mb-5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-semibold">{label}</span>
                  <span className="text-[#F27A22] font-bold">{val}%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${val}%` }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
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
              { icon: Settings2, label: "Advanced Infrastructure", desc: "Automated lines & vacuum resin infusion plants." },
              { icon: BarChart2, label: "Business Growth",          desc: "Consistent expansion with marquee industry partners." },
              { icon: Award,     label: "Zero-Defect Quality",      desc: "Rigorous QA at every stage of the process." },
              { icon: UserCog,   label: "Custom Engineering",       desc: "Bespoke designs tailored to your specifications." },
            ].map(({ icon: Icon, label, desc }, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 hover:border-[#F27A22] transition-colors"
              >
                <div className="w-11 h-11 bg-[#F27A22]/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#F27A22]" />
                </div>
                <h4 className="font-bold text-white text-sm mb-2">{label}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── OUR UNIQUE PRODUCT ──────────────────────────────────────────── */}
      <section className="w-full bg-white py-20 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
          >
            <h2 className="text-3xl md:text-[36px] font-black text-[#1b2a52] mb-2">
              Our <span className="italic text-[#F27A22]">Unique Product</span>
            </h2>
            <div className="w-16 h-1 bg-[#F27A22] mb-6 rounded-full" />
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Our flagship FRP composite enclosure sets a new standard for industrial applications.
              Built using advanced vacuum infusion, it delivers unmatched structural integrity at
              one-third the weight of conventional materials.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Short delivery windows, competitive pricing, and exceptional surface quality make this
              a preferred choice across automotive and defence procurement channels.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1b2a52] text-white px-8 py-3 rounded font-bold text-sm hover:bg-[#F27A22] transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeLeft}
            className="flex justify-center"
          >
            <img src="/loadtestingbox.png" alt="Unique Product" className="w-full max-w-md h-auto object-contain drop-shadow-xl" />
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
            className="bg-white px-8 md:px-16 py-20"
          >
            <h2 className="text-3xl font-black text-[#1b2a52] mb-2">
              Learn more from our{" "}
              <span className="italic text-[#F27A22]">FAQ</span>
            </h2>
            <div className="w-12 h-1 bg-[#F27A22] mb-6 rounded-full" />
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Frequently asked questions about FRP composites, manufacturing timelines, and our capabilities.
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
            className="bg-[#f8f9fb] px-8 md:px-16 py-20 border-l border-gray-100"
          >
            <h2 className="text-2xl font-black text-[#1b2a52] mb-2">Get In Touch</h2>
            <div className="w-12 h-1 bg-[#F27A22] mb-6 rounded-full" />
            <div className="space-y-4">
              {[
                { label: "Your Name",    icon: User,           type: "text",  placeholder: "John Doe" },
                { label: "Your Email",   icon: Mail,           type: "email", placeholder: "you@email.com" },
                { label: "Phone Number", icon: Phone,          type: "tel",   placeholder: "+91 98765 43210" },
              ].map(({ label, icon: Icon, type, placeholder }) => (
                <div key={label}>
                  <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#F27A22] bg-white transition-colors"
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#F27A22] bg-white resize-none transition-colors"
                  />
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#F27A22] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#c96414] transition-colors"
              >
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS — DARK ─────────────────────────────────────────── */}
      <section className="w-full bg-[#111827] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-[36px] font-black text-white text-center mb-2">
              Clients say <span className="italic text-[#F27A22]">about us</span>{" "}
              <span className="text-[#F27A22]">——</span>
            </h2>
            <p className="text-gray-400 text-sm text-center mb-12">
              Trusted by leading OEMs and defence contractors across India
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map(({ name, role, text }) => (
              <motion.div 
                key={name} 
                variants={fadeUp}
                className="bg-[#1e293b] border border-gray-700 rounded-xl p-7 hover:border-gray-500 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#F27A22]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F27A22]/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#F27A22]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{name}</p>
                    <p className="text-gray-500 text-[11px] uppercase tracking-wide mt-0.5">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FACTORY VIDEO GALLERY ────────────────────────────────────────── */}
      <section className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-black text-[#1b2a52] text-center mb-2">
              Factory <span className="italic text-[#F27A22]">Video</span> gallery
            </h2>
            <div className="w-16 h-1 bg-[#F27A22] mx-auto mb-12 rounded-full" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {["/bus.png", "/robot.png", "/bus2.png"].map((src, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="relative rounded-xl overflow-hidden group cursor-pointer"
              >
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-[#F27A22] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
                {i === 1 && (
                  <div className="absolute top-3 left-3 bg-[#F27A22] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                    Painting Section
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR PROMOTERS ────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-20 border-t border-gray-100">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-6 md:px-12 text-center"
        >
          <h2 className="text-3xl font-black text-[#1b2a52] mb-2">
            Our <span className="italic text-[#F27A22]">Promoters</span>
          </h2>
          <div className="w-16 h-1 bg-[#F27A22] mx-auto mb-6 rounded-full" />
          <p className="text-gray-500 text-sm mb-10 max-w-lg mx-auto">
            Venkateshwara FRP is driven by first-generation entrepreneurs with deep technical expertise
            in advanced composite manufacturing.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F27A22] text-white px-12 py-4 rounded font-black text-base hover:bg-[#c96414] transition-colors min-w-50"
            >
              Chandu CH
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F27A22] text-white px-12 py-4 rounded font-black text-base hover:bg-[#c96414] transition-colors min-w-50"
            >
              Sreenath RY
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── OUR CLIENTS ──────────────────────────────────────────────────── */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-black text-[#1b2a52] mb-2">
              Our <span className="italic text-[#F27A22]">Clients</span>
            </h2>
            <div className="w-16 h-1 bg-[#F27A22] mx-auto mb-12 rounded-full" />
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8"
          >
            {[
              { src: "/clients/ashokleyland.png", alt: "Ashok Leyland" },
              { src: "/clients/mungi.png", alt: "Mungi" },
              { src: "/clients/navistar.png", alt: "Mahindra Navistar" },
              { src: "/clients/rise.png", alt: "Mahindra Rise" },
            ].map(({ src, alt }) => (
              <motion.div 
                key={alt} 
                variants={fadeUp}
                className="group flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={180}
                  height={72}
                  className="h-10 md:h-14 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MANUFACTURING PROCESS ────────────────────────────────────────── */}
      <section className="w-full bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-[38px] font-black text-[#1b2a52] mb-2">
              Our Manufacturing Process
            </h2>
            <p className="text-gray-500 text-sm mb-16">How we turn concepts into high-performance composites</p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-orange-100 -z-10" />
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-4"
            >
              {[
                { num: "01", title: "CONCEPT",     desc: "Requirement analysis and design modeling." },
                { num: "02", title: "TOOLING",     desc: "Precision mold fabrication using CNC tech." },
                { num: "03", title: "FABRICATION", desc: "Lamination and resin infusion process." },
                { num: "04", title: "TESTING",     desc: "Rigorous QA and load-bearing tests." },
                { num: "05", title: "DELIVERY",    desc: "Final finishing and global logistics." },
              ].map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col items-center">
                  <div className={`w-20 h-20 bg-white rounded-full border-2 ${i === 0 ? "border-[#F27A22]" : "border-blue-200"} flex items-center justify-center mb-5 shadow-sm`}>
                    <span className="text-2xl font-black text-[#1b2a52]">{step.num}</span>
                  </div>
                  <h4 className="text-xs font-black tracking-widest text-[#1b2a52] mb-2 uppercase">{step.title}</h4>
                  <p className="text-gray-500 text-xs px-2">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#1b2a52] py-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="max-w-225 mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-[40px] font-black text-white mb-4 leading-tight">
            Looking for High Performance FRP Components?
          </h2>
          <p className="text-blue-200 text-sm md:text-base max-w-2xl mx-auto mb-10">
            Get in touch with our engineering team for custom quotes and technical feasibility studies.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F27A22] text-white px-12 py-4 rounded font-bold text-base hover:bg-[#c96414] transition-colors shadow-lg shadow-black/20"
          >
            Request a Quote
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}

