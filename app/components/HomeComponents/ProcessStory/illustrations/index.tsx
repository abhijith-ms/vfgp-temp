import type { SVGProps } from "react";
import type { ComponentType } from "react";

interface DiagramProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

// Miniature technical/blueprint diagrams for the companion panel — extend the
// site's existing CAD line-art convention (see BackgroundDrawings.tsx's
// FRPTankSVG/FRPDuctSVG: thin currentColor stroke, dashed construction lines,
// small dimension/arrow ticks) rather than filled isometric icons. Looked up
// by ILLUSTRATION_REGISTRY key only — content files never import these
// directly, so the diagram style (or a later Blender-rendered swap) can
// change without touching processes/*.ts or CompanionPanel.tsx.

function baseProps(className?: string): DiagramProps {
  return {
    viewBox: "0 0 120 100",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };
}

export function GelCoatSprayDiagram({ className }: { className?: string }) {
  return (
    <svg {...baseProps(className)}>
      <line x1="10" y1="80" x2="110" y2="80" strokeWidth="1.6" />
      <path d="M 48,22 L 70,22 L 70,34 L 62,34 L 62,40 L 58,40 L 58,34 L 48,34 Z" />
      <path d="M 60,40 L 42,74 M 60,40 L 60,74 M 60,40 L 78,74" strokeDasharray="3 3" opacity="0.7" />
      <g opacity="0.6" strokeWidth="0.8">
        <line x1="98" y1="74" x2="98" y2="80" />
        <line x1="94" y1="74" x2="102" y2="74" />
        <line x1="94" y1="80" x2="102" y2="80" />
      </g>
    </svg>
  );
}

export function SurfaceMatVeilDiagram({ className }: { className?: string }) {
  return (
    <svg {...baseProps(className)}>
      <line x1="12" y1="82" x2="108" y2="82" strokeWidth="1.6" />
      <path d="M 15,74 L 27,68 L 39,74 L 51,68 L 63,74 L 75,68 L 87,74 L 99,68 L 108,72" />
      <g opacity="0.6" strokeWidth="0.8">
        <line x1="106" y1="68" x2="112" y2="68" />
        <line x1="106" y1="82" x2="112" y2="82" />
        <line x1="109" y1="68" x2="109" y2="82" />
      </g>
    </svg>
  );
}

export function ChoppedStrandRollerDiagram({ className }: { className?: string }) {
  return (
    <svg {...baseProps(className)}>
      <line x1="10" y1="76" x2="110" y2="76" strokeWidth="1.6" />
      <circle cx="46" cy="52" r="13" />
      <line x1="46" y1="52" x2="46" y2="39" strokeDasharray="2 2" opacity="0.6" />
      <line x1="46" y1="65" x2="46" y2="76" />
      <path d="M 64,52 L 84,52 M 84,52 L 79,48 M 84,52 L 79,56" />
      <g opacity="0.6" strokeDasharray="2 3">
        <path d="M 40,66 L 32,74" />
        <path d="M 52,66 L 58,74" />
      </g>
    </svg>
  );
}

export function WovenRovingOrientationDiagram({ className }: { className?: string }) {
  return (
    <svg {...baseProps(className)}>
      <g strokeWidth="1">
        <line x1="30" y1="20" x2="30" y2="70" />
        <line x1="48" y1="20" x2="48" y2="70" />
        <line x1="66" y1="20" x2="66" y2="70" />
        <line x1="84" y1="20" x2="84" y2="70" />
        <line x1="20" y1="30" x2="94" y2="30" />
        <line x1="20" y1="45" x2="94" y2="45" />
        <line x1="20" y1="60" x2="94" y2="60" />
      </g>
      <path d="M 20,84 L 94,84 M 94,84 L 88,80 M 94,84 L 88,88" strokeWidth="1.3" />
      <path d="M 8,70 L 8,20 M 8,20 L 4,26 M 8,20 L 12,26" strokeWidth="1.3" />
    </svg>
  );
}

export function BackCoatSealDiagram({ className }: { className?: string }) {
  return (
    <svg {...baseProps(className)}>
      <line x1="14" y1="78" x2="106" y2="78" strokeWidth="1.6" />
      <rect x="24" y="58" width="72" height="20" strokeDasharray="3 3" opacity="0.7" />
      <path d="M 60,30 L 60,20 M 54,24 L 60,18 L 66,24" strokeWidth="1.3" />
      <path d="M 44,34 L 76,34" strokeWidth="1" opacity="0.6" />
      <circle cx="60" cy="34" r="3" />
    </svg>
  );
}

export const ILLUSTRATION_REGISTRY: Record<string, ComponentType<{ className?: string }>> = {
  "gel-coat-spray": GelCoatSprayDiagram,
  "surface-mat-veil": SurfaceMatVeilDiagram,
  "chopped-strand-roller": ChoppedStrandRollerDiagram,
  "woven-roving-orientation": WovenRovingOrientationDiagram,
  "back-coat-seal": BackCoatSealDiagram,
};
