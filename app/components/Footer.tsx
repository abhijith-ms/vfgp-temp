"use client";

import React from "react";
import { MapPin, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2A2E5B] pt-12 md:pt-20 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-8 mb-10 md:mb-16">
          {/* Company Info */}
          <div className="md:col-span-5 lg:col-span-6" data-aos="fade-up">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="bg-white p-1 w-13 h-13 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="VF Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <Link
                href="/"
                className="text-[#D98C21] font-black text-xl leading-tight tracking-wide hover:opacity-80 transition-opacity"
              >
                VENKATESHWARA
                <br />
                FIBREGLASS PRODUCTS
              </Link>
            </div>

            <p className="text-white text-sm md:text-[17px] leading-relaxed mb-5 md:mb-8 max-w-105">
              Providing the global industrial sector with superior fiber
              reinforced plastic solutions for over 20 years.
            </p>

            <div className="flex gap-3 md:gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#3D426D] flex items-center justify-center text-[#D98C21] hover:bg-[#4A4F7D] hover:scale-110 transition-all duration-300"
              >
                <Globe className="w-4 h-4" />
              </a>

              <a
                href="mailto:info@vfgp.in"
                className="w-11 h-11 rounded-full bg-[#3D426D] flex items-center justify-center text-[#D98C21] hover:bg-[#4A4F7D] hover:scale-110 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="md:col-span-3 hidden md:block lg:col-span-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-[#D98C21] font-bold text-[15px] tracking-widest uppercase mb-4 md:mb-6">
              QUICK LINKS
            </h3>
            <ul className="flex flex-col gap-3 md:gap-4">
              <li>
                <Link
                  href="/about_us"
                  className="text-white hover:text-[#D98C21] transition-colors text-[15px]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/product"
                  className="text-white hover:text-[#D98C21] transition-colors text-[15px]"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/automobile"
                  className="text-white hover:text-[#D98C21] transition-colors text-[15px]"
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-[#D98C21] transition-colors text-[15px]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div
            className="md:col-span-4 lg:col-span-3"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-[#D98C21] font-bold text-[15px] tracking-widest uppercase mb-4 md:mb-6">
              CONTACT
            </h3>
            <ul className="flex flex-col gap-4 md:gap-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-white text-[15px] leading-relaxed">
                  Plot No 6, R.I.E, Zaheerabad,
                  <br />
                  Sangareddy Dist., Telangana - 502220,
                  <br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-white hover:text-[#D98C21] transition-colors text-[15px]"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <a
                  href="mailto:info@vfgp.in"
                  className="text-white hover:text-[#D98C21] transition-colors text-[15px]"
                >
                  info@vfgp.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-white/80 text-[14px]">
            © 2026 Venkateshwara Fibreglass Products. All Rights Reserved.
          </p>
          <div className="flex gap-4 md:gap-6">
            <Link
              href="/contact"
              className="text-white/80 hover:text-[#D98C21] transition-colors text-[14px]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-white/80 hover:text-[#D98C21] transition-colors text-[14px]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
