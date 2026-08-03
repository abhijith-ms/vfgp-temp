import type { ComponentType, ReactNode } from "react";

interface IllustrationProps {
  className?: string;
}

// Large, flat-vector "process action" illustrations — the scroll-story's
// primary visual, replacing the abstract 3D layer geometry per client
// direction ("show the process, not the product"). Shared composition
// across all 8 stages (same tray, same hand anchor point) so the set reads
// as a consistent series, varying only the tool/material/action per stage —
// the same way the client's own reference infographic keeps one visual
// language across its 7 steps. Material colors reuse the exact per-stage
// colors already established on SceneObject.color in processes/handLayup.ts,
// tying this new visual language back to the one it replaces.

const TRAY_TOP = "160,90 240,90 300,138 300,202 240,250 160,250 100,202 100,138";
const TRAY_RIM = "160,106 240,106 300,154 300,218 240,266 160,266 100,218 100,154";

const GLOVE = "#4a90d9";
const GLOVE_SHADE = "#3a75b0";
const TRAY_TOP_COLOR = "#64748b";
const TRAY_RIM_COLOR = "#2a3441";
const TOOL_NEUTRAL = "#d1d5db";
const TOOL_NEUTRAL_SHADE = "#9ca3af";

function Scene({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {children}
    </svg>
  );
}

function Tray({ topColor = TRAY_TOP_COLOR }: { topColor?: string }) {
  return (
    <>
      <polygon points={TRAY_RIM} fill={TRAY_RIM_COLOR} />
      <polygon points={TRAY_TOP} fill={topColor} stroke="#1e2530" strokeWidth="1.5" />
    </>
  );
}

// Inset material patch approximating the tray's interior footprint.
function MaterialPatch({ color, inset = 24 }: { color: string; inset?: number }) {
  return (
    <rect
      x={100 + inset}
      y={90 + inset * 0.72}
      width={200 - inset * 2}
      height={160 - inset * 1.44}
      rx="12"
      fill={color}
      opacity="0.94"
    />
  );
}

function Sparkle({ x, y, size = 7 }: { x: number; y: number; size?: number }) {
  return (
    <path
      d={`M ${x} ${y - size} L ${x + size * 0.35} ${y - size * 0.35} L ${x + size} ${y} L ${x + size * 0.35} ${y + size * 0.35} L ${x} ${y + size} L ${x - size * 0.35} ${y + size * 0.35} L ${x - size} ${y} L ${x - size * 0.35} ${y - size * 0.35} Z`}
      fill="#ffffff"
      opacity="0.75"
    />
  );
}

// Reusable gloved hand anchored near the tray's right edge, reaching in from
// off-canvas bottom-right. Tool geometry is passed as children so it inherits
// the hand's position/rotation and stays correctly gripped across stages.
function GlovedHand({ children }: { children?: ReactNode }) {
  return (
    <g transform="translate(292,178) rotate(32)">
      <rect x="26" y="-20" width="96" height="42" rx="18" fill={GLOVE_SHADE} />
      <ellipse cx="0" cy="0" rx="38" ry="27" fill={GLOVE} />
      <ellipse cx="-16" cy="-27" rx="13" ry="16" fill={GLOVE} />
      {children}
    </g>
  );
}

function Roller() {
  return (
    <>
      <rect x="-96" y="-6" width="60" height="12" rx="6" fill={TOOL_NEUTRAL_SHADE} />
      <rect x="-44" y="-14" width="16" height="28" rx="8" fill={TOOL_NEUTRAL} />
    </>
  );
}

function Brush() {
  return (
    <>
      <rect x="-90" y="-5" width="58" height="10" rx="5" fill={TOOL_NEUTRAL_SHADE} />
      <path d="M -38 -10 L -18 -14 L -14 10 L -38 8 Z" fill="#8b5e34" />
    </>
  );
}

export function EmptyMoldIllustration({ className }: IllustrationProps) {
  return (
    <Scene className={className}>
      <Tray />
      <Sparkle x={140} y={110} size={6} />
      <Sparkle x={270} y={125} size={8} />
      <Sparkle x={190} y={230} size={5} />
    </Scene>
  );
}

export function ApplyReleaseAgentIllustration({ className }: IllustrationProps) {
  return (
    <Scene className={className}>
      <Tray />
      {/* spray bottle resting beside the tray */}
      <rect x="62" y="188" width="26" height="42" rx="6" fill="#a8b8c8" />
      <rect x="68" y="172" width="14" height="18" rx="3" fill="#64748b" />
      <rect x="80" y="176" width="16" height="7" rx="3" fill="#64748b" />
      <GlovedHand>
        <rect x="-72" y="-16" width="38" height="30" rx="6" fill="#e8e4da" />
      </GlovedHand>
    </Scene>
  );
}

export function ApplyGelCoatIllustration({ className }: IllustrationProps) {
  return (
    <Scene className={className}>
      <Tray />
      <MaterialPatch color="#f47c20" />
      <GlovedHand>
        <Brush />
      </GlovedHand>
    </Scene>
  );
}

export function PlaceSurfaceMatIllustration({ className }: IllustrationProps) {
  return (
    <Scene className={className}>
      <Tray />
      <MaterialPatch color="#ff9a45" />
      <path d="M 210 108 Q 230 100 250 112 L 246 132 Q 226 122 214 128 Z" fill="#ffb877" opacity="0.9" />
      <GlovedHand>
        <path d="M -84 -18 L -40 -22 L -36 6 L -80 8 Z" fill="#ffb877" opacity="0.9" />
      </GlovedHand>
    </Scene>
  );
}

export function RollChoppedStrandIllustration({ className }: IllustrationProps) {
  return (
    <Scene className={className}>
      <Tray />
      <MaterialPatch color="#ffc169" />
      <g opacity="0.5" stroke="#c98f2e" strokeWidth="1.5">
        <line x1="150" y1="150" x2="140" y2="170" />
        <line x1="175" y1="150" x2="167" y2="172" />
        <line x1="200" y1="150" x2="196" y2="173" />
      </g>
      <GlovedHand>
        <Roller />
      </GlovedHand>
    </Scene>
  );
}

export function PlaceWovenRovingIllustration({ className }: IllustrationProps) {
  return (
    <Scene className={className}>
      <Tray />
      <MaterialPatch color="#1a3a6b" />
      <g opacity="0.35" stroke="#5b7bab" strokeWidth="1.2">
        <line x1="120" y1="120" x2="120" y2="220" />
        <line x1="150" y1="112" x2="150" y2="228" />
        <line x1="180" y1="108" x2="180" y2="232" />
        <line x1="210" y1="108" x2="210" y2="232" />
        <line x1="240" y1="112" x2="240" y2="228" />
        <line x1="270" y1="120" x2="270" y2="220" />
      </g>
      <GlovedHand>
        <path d="M -84 -20 L -38 -24 L -34 4 L -80 8 Z" fill="#2c4d82" opacity="0.9" />
      </GlovedHand>
    </Scene>
  );
}

export function SealBackCoatIllustration({ className }: IllustrationProps) {
  return (
    <Scene className={className}>
      <Tray />
      <MaterialPatch color="#112240" />
      <GlovedHand>
        <Roller />
      </GlovedHand>
    </Scene>
  );
}

export function FinishedPartIllustration({ className }: IllustrationProps) {
  return (
    <Scene className={className}>
      <polygon points={TRAY_RIM} fill={TRAY_RIM_COLOR} />
      <polygon points={TRAY_TOP} fill="#112240" stroke="#1e2530" strokeWidth="1.5" />
      <polygon points="172,102 228,102 276,140 276,146 224,108 176,108 124,146 124,140 Z" fill="#f47c20" opacity="0.85" />
      <Sparkle x={215} y={135} size={7} />
      <Sparkle x={165} y={165} size={5} />
    </Scene>
  );
}

export const HERO_ILLUSTRATION_REGISTRY: Record<string, ComponentType<IllustrationProps>> = {
  "empty-mold": EmptyMoldIllustration,
  "apply-release-agent": ApplyReleaseAgentIllustration,
  "apply-gel-coat": ApplyGelCoatIllustration,
  "place-surface-mat": PlaceSurfaceMatIllustration,
  "roll-chopped-strand": RollChoppedStrandIllustration,
  "place-woven-roving": PlaceWovenRovingIllustration,
  "seal-back-coat": SealBackCoatIllustration,
  "finished-part": FinishedPartIllustration,
};
