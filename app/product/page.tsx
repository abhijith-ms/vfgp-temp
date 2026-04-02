import React from 'react';

export default function Page() {
  const parts = [
    { id: 1, name: "Front Bumper Assembly", img: "/parts/1-1.png" },
    { id: 2, name: "Rear Panel", img: "/parts/2-1.png" },
    { id: 3, name: "Side Skirt", img: "/parts/3-1.png" },
    { id: 4, name: "Roof Hatch", img: "/parts/4-1.png" },
    { id: 5, name: "Dashboard Assembly", img: "/parts/5-1.png" },
    { id: 6, name: "Interior Trim", img: "/parts/6.png" },
    { id: 7, name: "Side Panel Assembly", img: "/parts/7.png" },
    { id: 8, name: "FRP Cover Component", img: "/parts/8.png" },
    { id: 9, name: "Molded Panel", img: "/parts/9.png" },
    { id: 10, name: "Access Door", img: "/parts/10.png" },
    { id: 11, name: "FRP Enclosure", img: "/parts/11.png" },
    { id: 12, name: "Cluster Bezel", img: "/parts/Cluster-Bezel.png" },
    { id: 13, name: "Engine Hood", img: "/parts/Engine-Hood-A.png" },
    { id: 14, name: "Podest with Stiffener", img: "/parts/Podest-with-stifner.png" },
    { id: 15, name: "Snorkel Mesh Cover", img: "/parts/Snorkel-Mesh-Cover.png" },
    { id: 16, name: "VehicleDashboard and podest assembly with front inner dome.png", img: "/parts/VehicleDashboard-and-podest-assembly-with-front-inner-dome.png" },
  ];

  return (
    <main className="min-h-screen bg-white">
      
      {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-137.5 flex items-center">
        
        {/* Background Image Layer (z-0) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/parts/hero/producthero.png"
            alt="Bus Body Parts"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Dark Overlay Layer (z-10) */}
        <div className="absolute inset-0 bg-[#0c1221]/80 z-10" />
        
        {/* Hero Content Layer (z-20) */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            <span className="text-[#e0e7ff]">Bus Body</span> <br />
            <span className="text-[#F27A22]">Parts</span>
          </h1>
            <p className="text-gray-300 font-medium max-w-2xl text-lg md:text-xl leading-relaxed mb-8">
            High-quality FRP components designed for durability, lightweight
            performance, and modern bus manufacturing.
          </p>
            <button className="bg-[#F27A22] text-white px-8 py-3.5 rounded-md font-bold text-base md:text-lg hover:bg-[#d96b1c] transition-colors flex items-center gap-2 shadow-lg shadow-orange-900/20">
            Request a Quote 
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ─── OUR PRODUCTS / PARTS GRID ────────────────────────────────── */}
      <section className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1b2a52] mb-4">
              Our <span className="italic text-[#F27A22]">Products</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#F27A22] mx-auto rounded-full mb-6" />
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              You will find yourself working in a true partnership that results in an incredible 
              experience, and an end product that is the best.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-8 border-b border-gray-200 mb-16">
            <button className="pb-4 border-b-2 border-[#F27A22] text-[#F27A22] font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              All Cases
            </button>
            <button className="pb-4 border-b-2 border-transparent text-gray-400 font-bold hover:text-[#1b2a52] transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Automobile
            </button>
          </div>

          {/* Parts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {parts.map((part) => (
              <div 
                key={part.id} 
                className="group cursor-pointer flex flex-col items-center"
              >
                {/* Clean Image Container - No backgrounds or borders */}
                <div className="w-full aspect-4/3 flex items-center justify-center overflow-hidden mb-6">
                  <img 
                    src={part.img} 
                    alt={part.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                
                {/* Part Details */}
                <div className="text-center">
                  <h3 className="text-[#1b2a52] font-black text-sm md:text-[15px] tracking-[0.18em] uppercase mb-2 group-hover:text-[#F27A22] transition-colors">
                    {part.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-gray-200 mx-auto group-hover:bg-[#F27A22] transition-colors" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}