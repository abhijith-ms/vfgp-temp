"use client";

import React from "react";
import { MapPin, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#060e1a] pt-12 md:pt-20 pb-6 md:pb-8 bg-blueprint-grid border-t border-white/10 relative">
      {/* Decorative technical line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-8 mb-10 md:mb-16">
          {/* Company Info */}
          <div className="md:col-span-5 lg:col-span-6">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 bg-white flex items-center justify-center p-1.5">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <Link
                href="/"
                className="text-white hover:text-brand-orange font-cond font-bold text-lg leading-tight tracking-widest uppercase transition-colors"
              >
                VENKATESHWARA
                <br />
                <span className="text-brand-orange">FIBREGLASS</span> PRODUCTS
              </Link>
            </div>

            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-5 md:mb-8 max-w-sm">
              Providing the global industrial sector with superior fibre
              reinforced plastic solutions for over 30 years from Zaheerabad, Telangana.
            </p>

            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Globe className="w-4 h-4" />
              </a>

              <a
                href="mailto:info@vfgp.in"
                className="w-9 h-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 transition-all duration-300"
                aria-label="Email"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 hidden md:block lg:col-span-3">
            <h3 className="text-brand-orange font-cond font-bold text-xs tracking-widest uppercase mb-4 md:mb-6">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3 font-cond uppercase text-xs tracking-wider">
              <li>
                <Link
                  href="/"
                  className="text-white/60 hover:text-brand-orange transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about_us"
                  className="text-white/60 hover:text-brand-orange transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/product"
                  className="text-white/60 hover:text-brand-orange transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-brand-orange transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-brand-orange font-cond font-bold text-xs tracking-widest uppercase mb-4 md:mb-6">
              Contact Detail
            </h3>
            <ul className="flex flex-col gap-4 text-xs md:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-white/60 leading-relaxed font-mono">
                  Plot No 6, R.I.E, Zaheerabad,
                  <br />
                  Sangareddy Dist., Telangana - 502220,
                  <br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-brand-orange shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-white/60 hover:text-brand-orange transition-colors font-mono"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-brand-orange shrink-0" />
                <a
                  href="mailto:info@vfgp.in"
                  className="text-white/60 hover:text-brand-orange transition-colors font-mono"
                >
                  info@vfgp.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/40">
          <p>© 2026 Venkateshwara Fibreglass Products. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <div className="border border-brand-orange/30 text-brand-orange px-2.5 py-0.5 tracking-widest uppercase text-[9px] font-cond font-bold">
              ISO CERTIFIED
            </div>
            <div className="flex gap-4">
              <Link href="/contact" className="hover:text-brand-orange transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-brand-orange transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
