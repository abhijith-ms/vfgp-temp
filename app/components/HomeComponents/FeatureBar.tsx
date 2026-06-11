import React from 'react';
import { History, BadgeCheck, Settings2, Compass } from 'lucide-react';

export default function FeatureBar() {
  const features = [
    {
      id: 1,
      icon: <History className="w-7 h-7 text-[#1b2a52]" />,
      title: "30+ Years",
      subtitle: "EXPERIENCE",
    },
    {
      id: 2,
      icon: <BadgeCheck className="w-7 h-7 text-[#1b2a52]" />,
      title: "ISO Certified",
      subtitle: "QUALITY STANDARDS",
    },
    {
      id: 3,
      // Note: Settings2 is a placeholder. If you have the exact robot arm SVG from Figma, 
      // you can replace this component with an <img src="/robot-arm.svg" /> or <Image /> tag.
      icon: <Settings2 className="w-7 h-7 text-[#1b2a52]" />, 
      title: "OEM Supplier",
      subtitle: "AUTOMOTIVE",
    },
    {
      id: 4,
      icon: <Compass className="w-7 h-7 text-[#1b2a52]" />,
      title: "Precision",
      subtitle: "ENGINEERING",
    },
  ];

  return (
    // The top and bottom borders match the dark blue framing from your mockup
    <section className="w-full bg-white border-y-2 border-[#1b2a52] py-8 bg-frp-mesh">
      
      {/* Container aligned with your Hero section's max-width */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* Responsive grid: 1 col (mobile) -> 2 cols (tablet) -> 4 cols (desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 justify-between">
          
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center gap-4">
              
              {/* Light Blue Icon Box */}
              <div className="w-16 h-16 rounded-xl bg-[#E5F0FF] flex items-center justify-center shrink-0">
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="text-[22px] font-black text-[#1b2a52] leading-none">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base font-bold tracking-wide text-gray-800 uppercase mt-1.5">
                  {feature.subtitle}
                </p>
              </div>
              
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}