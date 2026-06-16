"use client";

import React, { FormEvent, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    desktopdetail: "+91 98765 43210",
    desktophelper: "Mon - Sat, 9am - 7pm",
    link: "tel:+919876543210",
  },
  {
    icon: Mail,
    title: "Email",
    desktopdetail: "sales@vfgp.in",
    desktophelper: "Reply within 24 hours",
    link: "mailto:sales@vfgp.in",
  },
  {
    icon: MapPin,
    title: "Location",
    desktopdetail: "Plot No 6, R.I.E",
    mobilehelper: "Zaheerabad, TS",
    desktophelper: "Zaheerabad, TS",
    link: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Support",
    desktopdetail: "Technical Desk",
    mobilehelper: "Priority for OEMs",
    desktophelper: "Priority for OEMs",
    link: "#",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");

    const form = event.currentTarget;

    try {
      // Simulated API Call
      await new Promise((res) => setTimeout(res, 1200));
      setSubmitState("success");
      setSubmitMessage(
        "Enquiry received! Our design engineers will contact you shortly.",
      );
      form.reset();
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="w-full bg-[#f8faff] min-h-screen font-sans antialiased text-[#1b2a52]">
      {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a1628] pt-20 pb-12 md:pt-32 md:pb-24 px-6 bg-blueprint-grid border-b border-white/10">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-radial from-brand-orange/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center md:text-left">

          <h1 className="text-4xl md:text-6xl font-cond font-black text-white tracking-tight leading-none uppercase mb-6">
            Plan your next <span className="text-brand-orange">FRP Project</span>
          </h1>
          <div className="h-1 bg-brand-orange w-16 mb-6 md:mx-0 mx-auto" />
          <p className="max-w-2xl text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-12">
            From prototype tooling evaluations to high-volume manufacturing scheduling, our engineers help you validate layout parameters and meet industry quality standards.
          </p>
        </div>

        {/* Contact info cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {contactCards.map(
            ({
              icon: Icon,
              title,
              desktopdetail,
              mobilehelper,
              desktophelper,
              link,
            }) => (
              <a
                href={link}
                key={title}
                className="group flex flex-col p-5 bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-orange/45 transition-all duration-300 rounded-none text-left"
              >
                <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center mb-4 group-hover:bg-brand-orange group-hover:border-brand-orange transition-colors">
                  <Icon className="w-5 h-5 text-brand-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-cond font-bold text-brand-navy uppercase tracking-wider text-sm sm:text-base">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-gray-500 mt-1 truncate">
                  {desktopdetail}
                </p>
                {mobilehelper && (
                  <p className="md:hidden text-xs text-gray-500 mt-1 truncate">
                    {mobilehelper}
                  </p>
                )}
                <p className="hidden md:block text-[9px] text-gray-400 mt-2 uppercase tracking-widest font-bold font-mono">
                  {desktophelper}
                </p>
              </a>
            ),
          )}
        </div>
      </section>

      {/* ─── DESKTOP SECTION ───────────────────────────────────────────── */}
      <section className="hidden md:block w-full bg-fiber-weave py-16 md:py-24 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* LEFT: INFO & MAP */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#0a1628] p-8 text-white shadow-xl relative overflow-hidden bg-blueprint-grid flex-1 flex flex-col justify-between">
              <div>

                
                <h2 className="text-3xl font-cond font-black uppercase mb-4">
                  Visit Our <span className="text-brand-orange">Facility</span>
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-8 font-sans">
                  Located in the industrial hub of Zaheerabad, Telangana, our manufacturing plant is configured for high-precision composite setups and robotic finishing.
                </p>
              </div>

              <div className="border border-white/10 overflow-hidden h-64 lg:h-80 grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
                <iframe
                  title="VFGP Location Map Desktop"
                  className="w-full h-full border-0"
                  src="https://www.google.com/maps?q=Plot%20No%206%2C%20R.I.E%2C%20Zaheerabad%2C%20Telangana%2C%20India&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 p-8 sm:p-10 shadow-lg bg-blueprint-grid-light flex flex-col justify-center">
              <div className="mb-8">

                <h2 className="text-3xl font-cond font-black uppercase text-brand-navy">
                  Request a <span className="text-brand-orange">Quote</span>
                </h2>
                <p className="text-gray-500 text-sm mt-2 font-sans">
                  Fill out the parameters sheet, and our lamination design team will assess structural feasibility.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/60 font-mono ml-1">
                      Full Name
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white border border-slate-200 rounded-none px-4 py-3 text-xs text-brand-navy outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/60 font-mono ml-1">
                      Company Email
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      className="w-full bg-white border border-slate-200 rounded-none px-4 py-3 text-xs text-brand-navy outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/60 font-mono ml-1">
                    Phone Number
                  </label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-slate-200 rounded-none px-4 py-3 text-xs text-brand-navy outline-none focus:border-brand-orange transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/60 font-mono ml-1">
                    Project Brief
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Provide thickness constraints, volume specs, lamination plies, or master tooling designs..."
                    className="w-full bg-white border border-slate-200 rounded-none px-4 py-3 text-xs text-brand-navy outline-none focus:border-brand-orange transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  className="group w-full md:w-auto flex items-center justify-center gap-3 bg-brand-orange hover:bg-brand-orange-light disabled:bg-slate-300 text-white font-cond font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded-none transition-all shadow-lg shadow-brand-orange/20 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying specs...
                    </span>
                  ) : (
                    <>
                      Submit Specifications
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>

                {submitState !== "idle" && (
                  <div
                    className={`flex items-center gap-2 p-4 rounded-none text-xs font-bold font-cond uppercase tracking-wider ${
                      submitState === "success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-red-50 text-red-700 border border-red-100"
                    }`}
                  >
                    {submitState === "success" ? (
                      <CheckCircle2 className="w-4.5 h-4.5" />
                    ) : (
                      <AlertCircle className="w-4.5 h-4.5" />
                    )}
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MOBILE SECTION ────────────────────────────────────────────── */}
      <section className="max-w-7xl md:hidden py-12 px-6 bg-fiber-weave bg-white relative z-10">
        <div className="flex flex-col gap-8">
          {/* MAP */}
          <div className="bg-[#0a1628] text-white shadow-lg relative overflow-hidden bg-blueprint-grid p-6">
            <h2 className="text-2xl font-cond font-black uppercase mb-3">
              Visit Our <span className="text-brand-orange">Facility</span>
            </h2>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
              Located in the industrial hub of Zaheerabad, Telangana, our manufacturing plant is configured for high-precision composite setups.
            </p>

            <div className="border border-white/10 overflow-hidden h-64 grayscale contrast-125">
              <iframe
                title="VFGP Location Map Mobile"
                className="w-full h-full border-0"
                src="https://www.google.com/maps?q=Plot%20No%206%2C%20R.I.E%2C%20Zaheerabad%2C%20Telangana%2C%20India&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* FORM */}
          <div className="bg-slate-50 border border-slate-200 p-6 shadow-md bg-blueprint-grid-light">
            <div className="mb-6">
              <h2 className="text-2xl font-cond font-black uppercase text-brand-navy">
                Request a <span className="text-brand-orange">Quote</span>
              </h2>
              <p className="text-gray-500 text-xs mt-1 font-sans">
                Fill out the parameters sheet, and our lamination design team will assess structural feasibility.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/60 font-mono ml-1">
                  Full Name
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white border border-slate-200 rounded-none px-4 py-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/60 font-mono ml-1">
                  Company Email
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  className="w-full bg-white border border-slate-200 rounded-none px-4 py-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/60 font-mono ml-1">
                  Phone Number
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full bg-white border border-slate-200 rounded-none px-4 py-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/60 font-mono ml-1">
                  Project Brief
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Provide thickness specs, load parameters, or tooling design demands..."
                  className="w-full bg-white border border-slate-200 rounded-none px-4 py-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-orange transition-colors resize-none font-sans"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full bg-brand-orange hover:bg-brand-orange-light disabled:bg-slate-300 text-white font-cond font-bold text-xs uppercase tracking-widest py-3.5 rounded-none transition-colors shadow-lg cursor-pointer"
              >
                {isSubmitting ? "Submitting Specs..." : "Submit Specifications"}
              </button>

              {submitState !== "idle" && (
                <div
                  className={`flex items-center gap-2 p-3 text-xs font-bold font-cond uppercase tracking-wider ${
                    submitState === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
