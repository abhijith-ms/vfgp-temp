"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { ChevronDown } from "lucide-react";
import { handLayupProcess } from "./ProcessStory/processes/handLayup";
import { useProcessScroll } from "./ProcessStory/useProcessScroll";
import { usePrefersReducedMotion } from "./ProcessStory/usePrefersReducedMotion";
import CanvasErrorBoundary from "./ProcessStory/CanvasErrorBoundary";
import ProcessIllustration from "./ProcessStory/ProcessIllustration";
import HeroStageCaption from "./ProcessStory/HeroStageCaption";
import HeroOctagonBadge from "./HeroOctagonBadge";

// Same dynamic-import pattern as ProcessStorySection.tsx (the only other
// place @react-three/fiber is used) — keeps three/r3f/drei out of the
// initial page bundle. Loading fallback matches the octagon badge since the
// Hero's loading gap is guaranteed visible on every page load.
const ProcessModelViewer = dynamic(() => import("./ProcessStory/ProcessEngineeringScene"), {
  ssr: false,
  loading: () => <HeroOctagonBadge />,
});

// Zoomed out from the old badge-sized preview's 295 — that value cropped
// the top/bottom of taller stages (e.g. mold-prep) since one fixed
// orthographic framing has to safely contain every stage's geometry, not
// just the ones it happened to fit. Paired with the larger, non-square
// container below so the whole model is visible with margin at every stage.
const HERO_CAMERA_ZOOM = 185;
const HERO_CAMERA_BASE_POSITION = new THREE.Vector3(2.5, 2.05, 3.1);
const HERO_CAMERA_TARGET = new THREE.Vector3(-0.25, -0.12, -0.1);

function HeroBackgroundChrome() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Weave texture layer */}
      <div className="absolute inset-0 bg-fiber-weave opacity-25" />
      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-75" />

      {/* Glow zones */}
      <div className="absolute left-[-150px] top-[10%] w-[600px] h-[600px] rounded-full bg-radial from-brand-orange/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute right-[-100px] top-[20%] w-[700px] h-[700px] rounded-full bg-radial from-brand-navy-light/60 via-transparent to-transparent blur-3xl" />

      {/* Diagonal accent bars */}
      <div className="absolute top-[25%] left-0 w-[45%] h-[2px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent -skew-y-3" />
      <div className="absolute top-[60%] right-0 w-[30%] h-[2px] bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent skew-y-2" />

      {/* Blueprint corner marks */}
      <div className="absolute top-10 left-10 w-8 h-8 opacity-30 hidden md:block">
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-brand-orange" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-brand-orange" />
      </div>
      <div className="absolute top-10 right-10 w-8 h-8 opacity-30 hidden md:block">
        <div className="absolute top-0 right-0 w-8 h-[2px] bg-brand-orange" />
        <div className="absolute top-0 right-0 w-[2px] h-8 bg-brand-orange" />
      </div>
    </div>
  );
}

function HeroLeftColumn() {
  return (
    <div className="lg:col-span-7 flex flex-col items-start text-white">
      <h1 className="font-cond font-black leading-[1.0] text-5xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight uppercase mb-2">
        Advanced <span className="text-brand-orange">FRP</span>
        <br />
        <span className="font-light text-white/80">Composites</span>
      </h1>
      <div className="h-1 bg-brand-orange w-24 mb-6" />

      <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mb-8 font-sans">
        Delivering high-performance fiberglass solutions for Automobile, Defence, and Engineering sectors with hand
        lay-up and pultrusion excellence for over 30 years.
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/product"
          className="bg-brand-orange hover:bg-brand-orange-light text-white font-cond font-bold text-xs uppercase tracking-widest px-8 py-3.5 transition-colors shadow-lg shadow-brand-orange/20"
        >
          Explore Products
        </Link>

        <Link
          href="/contact"
          className="border border-white/30 hover:border-white text-white font-cond font-bold text-xs uppercase tracking-widest px-8 py-3.5 bg-white/5 hover:bg-white/10 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

// Reduced-motion / above-the-fold-safe variant: no pin, no scroll-driven 3D
// — the static octagon badge plus a plain, non-animated list of the 5
// stage titles, exactly like the old fallback path did for HeroProcessVisual.
function HeroStatic() {
  return (
    <section className="relative min-h-[95vh] w-full flex items-center bg-[#0a1628] overflow-hidden">
      <HeroBackgroundChrome />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <HeroLeftColumn />

        <div className="lg:col-span-5 flex flex-col justify-center items-center relative min-h-[560px]">
          <h3 className="font-cond font-bold text-white/70 text-xs sm:text-sm uppercase tracking-[0.25em] mb-4">
            Hand Lay-Up <span className="text-brand-orange">Method</span>
          </h3>

          <div className="relative w-56 h-56 sm:w-72 sm:h-72 overflow-hidden">
            <HeroOctagonBadge />
          </div>

          <ul className="mt-6 flex flex-col gap-1.5 items-center">
            {handLayupProcess.stages.map((stage) => (
              <li key={stage.id} className="text-white/50 text-[10px] font-mono uppercase tracking-widest">
                {stage.shortLabel}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// The real experience: the whole Hero is now the pinned/scrubbed 5-stage
// 3D story (promoted up from the old ProcessStorySection, which is retired
// — see the approved plan). Left column (headline/CTA) stays static for the
// whole pin, visible immediately at scroll 0 alongside stage 0 — satisfies
// the standing rule that above-the-fold content must never be hidden until
// the visitor scrolls. Right column now holds the 3D on top with
// HeroStageCaption (title/description/stepper) stacked directly beneath it.
function HeroPinned() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [canvasFailed, setCanvasFailed] = useState(false);

  useProcessScroll({
    wrapperRef,
    pinRef,
    stages: handLayupProcess.stages,
    onStageChange: setActiveStageIndex,
  });

  return (
    <>
      {/* Below lg, the full headline+CTA+3D+caption stack doesn't fit inside
          one 100dvh pinned viewport (confirmed via a real mobile-viewport
          Playwright check — content was clipped with no way to reach it,
          since a pinned section can't internally scroll). So below lg, the
          headline/CTA render here in normal flow instead — visible
          immediately without scrolling, per the standing hero-content rule —
          and only the 3D+caption+stepper block is pinned/scroll-driven. At
          lg+, this block is hidden and the headline instead renders inside
          the pin's left column (see `hidden lg:contents` below). */}
      <section className="lg:hidden relative w-full bg-[#0a1628] overflow-hidden px-6 py-16">
        <HeroBackgroundChrome />
        <div className="relative z-10">
          <HeroLeftColumn />
        </div>
      </section>

      <section
        ref={wrapperRef}
        className="relative w-full bg-[#0a1628]"
        style={{ height: `${handLayupProcess.stages.length * 100}vh` }}
      >
        {/* h-[100dvh], not h-screen — see ProcessStorySection.tsx for why
            (mobile browser toolbar clipping). */}
        <div ref={pinRef} className="relative w-full h-[100dvh] overflow-hidden flex items-center">
          <HeroBackgroundChrome />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="hidden lg:contents">
              <HeroLeftColumn />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-center relative">
              <h3 className="font-cond font-bold text-white/70 text-xs sm:text-sm uppercase tracking-[0.25em] mb-4">
                Hand Lay-Up <span className="text-brand-orange">Method</span>
              </h3>

              <div className="relative w-full max-w-sm sm:max-w-md aspect-square overflow-hidden">
                {canvasFailed ? (
                  <ProcessIllustration stages={handLayupProcess.stages} activeStageIndex={activeStageIndex} />
                ) : (
                  <CanvasErrorBoundary onError={() => setCanvasFailed(true)}>
                    <ProcessModelViewer
                      stages={handLayupProcess.stages}
                      activeStageIndex={activeStageIndex}
                      showAnnotations={false}
                      transparentBackground
                      cameraZoom={HERO_CAMERA_ZOOM}
                      cameraBasePosition={HERO_CAMERA_BASE_POSITION}
                      cameraTarget={HERO_CAMERA_TARGET}
                    />
                  </CanvasErrorBoundary>
                )}
              </div>

              <div className="w-full max-w-sm sm:max-w-md">
                <HeroStageCaption stages={handLayupProcess.stages} activeStageIndex={activeStageIndex} />
              </div>

              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="text-white/50 text-[10px] uppercase font-mono tracking-widest">Keep scrolling</span>
                <ChevronDown className="w-4 h-4 text-brand-orange animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <HeroStatic />;
  }

  return <HeroPinned />;
}
