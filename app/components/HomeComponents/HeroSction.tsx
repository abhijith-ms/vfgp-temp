"use client"
import React from 'react'

export default function HeroSection() {
  return (
    // 1. Changed height from 80vh to a fixed min-height closer to Figma's 521px
    <section className="relative min-h-137.5 w-full flex items-center">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      {/* 2. Fixed Overlay: Changed to a gradient. 
        It's lighter on the left so the dark blue text stays visible, 
        and fades to darker blue on the right. 
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-[#16294d]/60 to-[#0b1d3a]/90" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12">

        {/* 3. Typography tweaks: Added font-black, adjusted sizes, 
          and tightened the line-height (leading-[1.1]) to match Figma 
        */}
        <h1 className="text-5xl md:text-[64px] font-black leading-[1.1] tracking-tight">
          <span className="text-[#1b2a52]">Advanced FRP</span> <br />
          <span className="text-[#F27A22]">Composite</span> <br />
          <span className="text-[#1b2a52]">Manufacturing</span>
        </h1>

        {/* 4. Description: Made it slightly larger and ensured it's a bright white/gray for contrast */}
        <p className="mt-6 text-gray-100 max-w-lg text-base md:text-lg leading-relaxed">
          Delivering high-performance fibreglass solutions for Automotive,
          Defence and Engineering industries with precision and durability.
        </p>

        {/* 5. Buttons: Added more padding (px-8 py-3.5) to match Figma proportions */}
        <div className="mt-8 flex gap-4">
          <button className="bg-[#F27A22] text-white px-8 py-3.5 rounded-md font-semibold hover:bg-orange-600 transition">
            Explore Products
          </button>

          <button className="border-2 border-white text-white px-8 py-3.5 rounded-md font-semibold hover:bg-white hover:text-[#1b2a52] transition">
            Contact Us
          </button>
        </div>

      </div>

    </section>
  )
}