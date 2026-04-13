"use client";
import { motion } from "framer-motion";

const clients = [
  { src: "/clients/ashokleyland.png", alt: "Ashok Leyland" },
  { src: "/clients/mungi.png", alt: "Mungi" },
  { src: "/clients/navistar.png", alt: "Mahindra Navistar" },
  { src: "/clients/rise.png", alt: "Mahindra Rise" },
  { src: "/clients/ashokleyland.png", alt: "Ashok Leyland" },
  { src: "/clients/mungi.png", alt: "Mungi" },
  { src: "/clients/navistar.png", alt: "Mahindra Navistar" },
  { src: "/clients/rise.png", alt: "Mahindra Rise" },
];

export default function ClientsCarousel() {
  return (
    <section className="w-full bg-gray-50 py-20 overflow-hidden relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12">
        <h2 className="text-3xl font-black text-[#1b2a52] mb-2">
          Our <span className=" text-[#F27A22]">Clients</span>
        </h2>
        <div className="w-16 h-1 bg-[#F27A22] mx-auto rounded-full" />
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10 w-max"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {clients.map(({ src, alt }, idx) => (
            <div
              key={`track1-${idx}`}
              className="w-44 md:w-56 h-28 shrink-0 flex items-center justify-center rounded-2xl bg-white px-6 py-5 cursor-pointer border border-gray-100 shadow-sm transition-all duration-300 hover:border-orange-200 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={src}
                alt={alt}
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
          {clients.map(({ src, alt }, idx) => (
            <div
              key={`track2-${idx}`}
              className="w-44 md:w-56 h-28 shrink-0 flex items-center justify-center rounded-2xl bg-white px-6 py-5 cursor-pointer border border-gray-100 shadow-sm transition-all duration-300 hover:border-orange-200 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={src}
                alt={alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
