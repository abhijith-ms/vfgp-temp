import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Technical blueprint schematic of a vertical FRP Chemical Storage Tank
 */
export function FRPTankSVG({ className, ...props }: SVGProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* CAD Center Line */}
      <line x1="200" y1="20" x2="200" y2="580" strokeDasharray="5 5" opacity="0.4" />
      
      {/* Tank Outer Shell */}
      <rect x="80" y="100" width="240" height="360" rx="10" strokeWidth="1.5" />
      
      {/* Domed Top detail */}
      <path d="M 80,100 A 120,40 0 0,1 320,100" strokeWidth="1.5" />
      <path d="M 80,100 A 120,20 0 0,0 320,100" strokeDasharray="3 3" />
      
      {/* Bottom Cone or Dish */}
      <path d="M 80,460 A 120,30 0 0,0 320,460" strokeWidth="1.5" />
      <path d="M 80,460 A 120,15 0 0,1 320,460" strokeDasharray="3 3" />
      
      {/* Support Legs */}
      <path d="M 100,475 L 90,550 L 110,550 Z" strokeWidth="1.2" />
      <path d="M 300,475 L 310,550 L 290,550 Z" strokeWidth="1.2" />
      <path d="M 200,480 L 200,550" strokeWidth="1" strokeDasharray="2 2" />
      
      {/* Leg baseplates */}
      <line x1="80" y1="550" x2="120" y2="550" strokeWidth="2" />
      <line x1="280" y1="550" x2="320" y2="550" strokeWidth="2" />
      
      {/* Top Inlet Nozzle with Flange */}
      <rect x="180" y="60" width="40" height="20" />
      <line x1="170" y1="60" x2="230" y2="60" strokeWidth="2" />
      
      {/* Side Manhole / Hatch */}
      <circle cx="200" cy="280" r="30" strokeWidth="1.2" />
      <circle cx="200" cy="280" r="24" strokeDasharray="2 2" />
      <line x1="170" y1="280" x2="230" y2="280" />
      <line x1="200" y1="250" x2="200" y2="310" />
      
      {/* Level Indicator Gauge */}
      <line x1="300" y1="140" x2="300" y2="420" strokeWidth="1.5" />
      <line x1="295" y1="140" x2="305" y2="140" />
      <line x1="295" y1="210" x2="305" y2="210" />
      <line x1="295" y1="280" x2="305" y2="280" />
      <line x1="295" y1="350" x2="305" y2="350" />
      <line x1="295" y1="420" x2="305" y2="420" />
      
      {/* Dimension Lines & CAD Markings */}
      <g opacity="0.6" strokeWidth="0.8" className="text-xs font-mono">
        {/* Height Dimension */}
        <line x1="45" y1="100" x2="45" y2="460" />
        <path d="M 45,100 L 42,110 M 45,100 L 48,110" />
        <path d="M 45,460 L 42,450 M 45,460 L 48,450" />
        <line x1="40" y1="100" x2="80" y2="100" strokeDasharray="2 2" />
        <line x1="40" y1="460" x2="80" y2="460" strokeDasharray="2 2" />
        
        {/* Diameter Dimension */}
        <line x1="80" y1="490" x2="320" y2="490" />
        <path d="M 80,490 L 90,487 M 80,490 L 90,493" />
        <path d="M 320,490 L 310,487 M 320,490 L 310,493" />
        <line x1="80" y1="465" x2="80" y2="500" strokeDasharray="2 2" />
        <line x1="320" y1="465" x2="320" y2="500" strokeDasharray="2 2" />
      </g>
      
      {/* CAD Monospace Text Overlay */}
      <text x="12" y="290" fill="currentColor" fontSize="10" fontFamily="monospace" transform="rotate(-90 12 290)" opacity="0.5" stroke="none">
        H = 4500 mm
      </text>
      <text x="170" y="510" fill="currentColor" fontSize="10" fontFamily="monospace" opacity="0.5" stroke="none">
        Ø 2400 mm
      </text>
      <text x="95" y="140" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.4" stroke="none">
        FRP CHEMICAL TANK SECTION
      </text>
      <text x="95" y="155" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.3" stroke="none">
        DESIGN CODE: BS EN 13121
      </text>
    </svg>
  );
}

/**
 * Technical blueprint schematic of industrial FRP Duct Elbow & Pipe Joint
 */
export function FRPDuctSVG({ className, ...props }: SVGProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* CAD Centerlines */}
      <path d="M 50,150 L 300,150 A 150,150 0 0,1 450,300 L 450,450" strokeDasharray="5 5" opacity="0.4" />
      
      {/* Flange 1 (Left) */}
      <rect x="50" y="80" width="16" height="140" rx="2" strokeWidth="1.5" />
      <line x1="58" y1="80" x2="58" y2="220" />
      {/* Bolt details */}
      <circle cx="58" cy="95" r="3" fill="currentColor" />
      <circle cx="58" cy="120" r="3" fill="currentColor" />
      <circle cx="58" cy="150" r="3" fill="currentColor" />
      <circle cx="58" cy="180" r="3" fill="currentColor" />
      <circle cx="58" cy="205" r="3" fill="currentColor" />
      
      {/* Horizontal Pipe Body */}
      <line x1="66" y1="90" x2="300" y2="90" strokeWidth="1.5" />
      <line x1="66" y1="210" x2="300" y2="210" strokeWidth="1.5" />
      
      {/* Elbow Bend Outer & Inner curves */}
      <path d="M 300,90 A 150,150 0 0,1 450,240" strokeWidth="1.5" />
      <path d="M 300,210 A 30,30 0 0,1 330,240" strokeWidth="1.5" />
      
      {/* Vertical Pipe Body */}
      <line x1="450" y1="240" x2="450" y2="400" strokeWidth="1.5" />
      <line x1="330" y1="240" x2="330" y2="400" strokeWidth="1.5" />
      
      {/* Flange 2 (Bottom) */}
      <rect x="310" y="400" width="160" height="16" rx="2" strokeWidth="1.5" />
      <line x1="310" y1="408" x2="470" y2="408" />
      {/* Bolt details */}
      <circle cx="330" cy="408" r="3" fill="currentColor" />
      <circle cx="360" cy="408" r="3" fill="currentColor" />
      <circle cx="390" cy="408" r="3" fill="currentColor" />
      <circle cx="420" cy="408" r="3" fill="currentColor" />
      <circle cx="450" cy="408" r="3" fill="currentColor" />
      
      {/* Laminate layer reinforcement lines (technical texture detail) */}
      <path d="M 100,98 L 100,202" opacity="0.3" strokeDasharray="2 2" />
      <path d="M 180,98 L 180,202" opacity="0.3" strokeDasharray="2 2" />
      <path d="M 260,98 L 260,202" opacity="0.3" strokeDasharray="2 2" />
      
      <path d="M 338,300 L 442,300" opacity="0.3" strokeDasharray="2 2" />
      <path d="M 338,360 L 442,360" opacity="0.3" strokeDasharray="2 2" />
      
      {/* CAD labels */}
      <text x="120" y="80" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0.5" stroke="none">
        DN 300 FRP DUCT
      </text>
      <text x="350" y="440" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0.5" stroke="none">
        FLANGE DETAIL
      </text>
      <text x="305" y="175" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.4" stroke="none">
        R = 1.5D ELBOW
      </text>
    </svg>
  );
}

/**
 * Blueprint vector showing standard FRP Structural Profiles:
 * Stacked isometric views of I-Beam, Channel, and Angle profiles.
 */
export function FRPProfileSVG({ className, ...props }: SVGProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Isometric Grid Hints */}
      <g opacity="0.1" strokeWidth="0.5">
        <line x1="50" y1="250" x2="450" y2="450" />
        <line x1="50" y1="250" x2="450" y2="50" />
        <line x1="150" y1="50" x2="150" y2="450" />
        <line x1="250" y1="50" x2="250" y2="450" />
        <line x1="350" y1="50" x2="350" y2="450" />
      </g>

      {/* 1. I-Beam Profile (Isometric) */}
      <g transform="translate(80, 80)">
        {/* Front End Profile */}
        <path d="M 10,20 L 50,20 L 50,30 L 35,30 L 35,70 L 50,70 L 50,80 L 10,80 L 10,70 L 25,70 L 25,30 L 10,30 Z" fill="none" strokeWidth="1.5" />
        
        {/* Extrusion lines going back and right at 30 degrees (isometric dx=150, dy=86.6) */}
        <line x1="50" y1="20" x2="200" y2="106.6" />
        <line x1="50" y1="30" x2="200" y2="116.6" />
        <line x1="50" y1="70" x2="200" y2="156.6" />
        <line x1="50" y1="80" x2="200" y2="166.6" />
        <line x1="10" y1="80" x2="160" y2="166.6" />
        <line x1="10" y1="20" x2="160" y2="106.6" />
        
        {/* Back End Profile lines (partial) */}
        <path d="M 160,106.6 L 200,106.6 L 200,116.6 L 185,116.6 L 185,156.6 L 200,156.6 L 200,166.6 L 160,166.6" />
        
        <text x="60" y="55" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.5" stroke="none">
          PULTRUDED I-BEAM
        </text>
      </g>

      {/* 2. C-Channel Profile (Isometric) */}
      <g transform="translate(60, 240)">
        {/* Front End Profile */}
        <path d="M 10,20 L 45,20 L 45,30 L 22,30 L 22,70 L 45,70 L 45,80 L 10,80 Z" fill="none" strokeWidth="1.5" />
        
        {/* Extrusion lines */}
        <line x1="45" y1="20" x2="195" y2="106.6" />
        <line x1="45" y1="30" x2="195" y2="116.6" />
        <line x1="45" y1="70" x2="195" y2="156.6" />
        <line x1="45" y1="80" x2="195" y2="166.6" />
        <line x1="10" y1="80" x2="160" y2="166.6" />
        <line x1="10" y1="20" x2="160" y2="106.6" />
        
        {/* Back Profile lines (partial) */}
        <path d="M 160,106.6 L 195,106.6 L 195,116.6 L 172,116.6" />
        <path d="M 195,156.6 L 195,166.6 L 160,166.6" />
        
        <text x="55" y="55" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.5" stroke="none">
          C-CHANNEL
        </text>
      </g>
      
      {/* CAD notes */}
      <text x="280" y="380" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0.5" stroke="none">
        STRUCTURAL SHAPES
      </text>
      <text x="280" y="395" fill="currentColor" fontSize="7.5" fontFamily="monospace" opacity="0.4" stroke="none">
        ASTM D3917 STANDARDS
      </text>
    </svg>
  );
}

/**
 * Detailed 3D isometric blueprint schematic of an FRP Grating panel
 */
export function FRPGratingPanelSVG({ className, ...props }: SVGProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* 3D Grating Panel outline and mesh grid */}
      <g transform="translate(50, 80)">
        {/* Isometric Grating Top mesh face */}
        {/* Draw a grid with perspective/isometric angles (30 degrees dx, dy) */}
        {/* Iso horizontal lines (heading back-right) */}
        {Array.from({ length: 9 }).map((_, idx) => {
          const startX = 0 + idx * 30;
          const startY = 150 - idx * 17.3;
          const endX = startX + 150;
          const endY = startY + 86.6;
          return (
            <line key={`h-${idx}`} x1={startX} y1={startY} x2={endX} y2={endY} strokeWidth="1" opacity={0.6} />
          );
        })}
        
        {/* Iso vertical lines (heading front-right) */}
        {Array.from({ length: 6 }).map((_, idx) => {
          const startX = 0 + idx * 30;
          const startY = 150 + idx * 17.3;
          const endX = startX + 240;
          const endY = startY - 138.5;
          return (
            <line key={`v-${idx}`} x1={startX} y1={startY} x2={endX} y2={endY} strokeWidth="1" opacity={0.6} />
          );
        })}
        
        {/* Side extrusion thickness */}
        {/* Left edge thickness */}
        <path d="M 0,150 L 0,180 L 150,266.6 L 150,236.6 Z" fill="none" strokeWidth="1.2" />
        {/* Right edge thickness */}
        <path d="M 150,266.6 L 390,128.1 L 390,98.1 L 150,236.6" fill="none" strokeWidth="1.2" />
        
        {/* Intermediate thickness ribs inside */}
        <line x1="30" y1="197.3" x2="30" y2="212.3" opacity="0.4" />
        <line x1="60" y1="214.6" x2="60" y2="229.6" opacity="0.4" />
        <line x1="90" y1="231.9" x2="90" y2="246.9" opacity="0.4" />
        <line x1="120" y1="249.2" x2="120" y2="264.2" opacity="0.4" />
        
        {/* Text annotation for grating details */}
        <text x="220" y="220" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0.5" stroke="none">
          MOLDED GRATINGS
        </text>
        <text x="220" y="235" fill="currentColor" fontSize="7.5" fontFamily="monospace" opacity="0.4" stroke="none">
          MESH SIZE: 38 x 38 mm
        </text>
        <text x="220" y="250" fill="currentColor" fontSize="7.5" fontFamily="monospace" opacity="0.4" stroke="none">
          THICKNESS: 38 mm standard
        </text>
      </g>
    </svg>
  );
}
