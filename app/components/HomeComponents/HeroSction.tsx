"use client";
import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-130 md:min-h-150 w-full flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-right"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-100/40 via-[#16294d]/70 to-[#0b1d3a]/90" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <h1
          className="font-black leading-[1.1] tracking-tight
          text-[40px]
          sm:text-[42px]
          md:text-5xl
          lg:text-[64px]"
        >
          <span className="text-[#F27A22] md:text-[#1b2a52] ">
            Advanced FRP
          </span>{" "}
          <br />
          <span className="text-[#1b2a52] md:text-[#F27A22] ">
            Composite
          </span>{" "}
          <br />
          <span className="text-[#F27A22] md:text-[#1b2a52] ">
            Manufacturing
          </span>
        </h1>

        <p
          className="mt-4 md:mt-6 text-gray-100 max-w-lg
          text-sm
          sm:text-base
          md:text-lg
          leading-relaxed"
        >
          Delivering high-performance fibreglass solutions for Automotive,
          Defence and Engineering industries with precision and durability.
        </p>

        {/* Buttons */}
        <div className="mt-12 md:mt-8 flex  gap-4">
          <Link
            href="/product"
            className="bg-[#F27A22] text-white
              px-6 sm:px-8
              py-3
              rounded-md
              font-semibold
              text-center
              hover:bg-orange-600
              transition"
          >
            Explore Products
          </Link>

          <Link
            href="/contact"
            className="border-2 border-white text-white
              px-6 sm:px-8
              py-3
              rounded-md
              font-semibold
              text-center
              hover:bg-white hover:text-[#1b2a52]
              transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
