"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const OCTAGON_CLIP =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

// Visual-only layer definitions, in real hand lay-up build order.
// Full titles/descriptions for the info card live in HeroSction.tsx (layerDescriptions);
// layerLabels (short names for the per-layer hover tag) are passed down as a prop from there
// so all copy stays centralized in one place.
const LAYER_COLORS = [
  "#4a5568", // Mold Surface — neutral tool-steel grey
  "#f47c20", // Gel Coat — brand orange
  "#ff9a45", // Surface Mat — brand orange light
  "#ffc169", // Chopped Strand Mat — pale gold
  "#1a3a6b", // Woven Roving — brand navy light
  "#112240", // Back Coat / Final Cure — brand navy mid
];

const ROTATE_Y_MIN = -45;
const ROTATE_Y_MAX = 45;
const ROTATE_X_MIN = 35;
const ROTATE_X_MAX = 75;
const DRAG_SENSITIVITY = 0.3;
const IDLE_SPIN_DURATION = 22; // seconds per full 360° rotation

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

interface HandLayupLayerStackProps {
  onStageChange: (index: number | null) => void;
  onIntroComplete?: () => void;
  layerLabels: string[];
}

export default function HandLayupLayerStack({ onStageChange, onIntroComplete, layerLabels }: HandLayupLayerStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const onStageChangeRef = useRef(onStageChange);
  const onIntroCompleteRef = useRef(onIntroComplete);
  useEffect(() => {
    onStageChangeRef.current = onStageChange;
    onIntroCompleteRef.current = onIntroComplete;
  });

  const introDoneRef = useRef(false);
  const isDraggingRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const setRotateYRef = useRef<((v: number) => void) | null>(null);
  const setRotateXRef = useRef<((v: number) => void) | null>(null);
  const dragStateRef = useRef({ startX: 0, startY: 0, startRotY: 0, startRotX: 0 });

  const stopIdleSpin = () => {
    gsap.killTweensOf(groupRef.current, "rotateY");
  };

  const startIdleSpin = () => {
    if (prefersReducedMotionRef.current) return;
    gsap.to(groupRef.current, {
      rotateY: "+=360",
      duration: IDLE_SPIN_DURATION,
      repeat: -1,
      ease: "none",
    });
  };

  useGSAP(
    () => {
      const layers = layerRefs.current.filter((el): el is HTMLDivElement => el !== null);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      prefersReducedMotionRef.current = prefersReducedMotion;

      setRotateYRef.current = gsap.quickSetter(groupRef.current, "rotateY", "deg") as (v: number) => void;
      setRotateXRef.current = gsap.quickSetter(groupRef.current, "rotateX", "deg") as (v: number) => void;

      if (prefersReducedMotion) {
        gsap.set(layers, { opacity: 0 });
        const tl = gsap.timeline({
          onComplete: () => {
            introDoneRef.current = true;
            onIntroCompleteRef.current?.();
            onStageChangeRef.current(null);
          },
        });
        layers.forEach((el, i) => {
          tl.to(
            el,
            {
              opacity: 1,
              duration: 0.5,
              onStart: () => onStageChangeRef.current(i),
            },
            i * 0.4
          );
        });
        return;
      }

      // Evaluated once at mount — this is a one-shot intro animation, not a
      // continuously-responsive layout, so a plain width check at mount time
      // is the right tool (gsap.matchMedia() is for animations that must
      // re-configure themselves live as the viewport crosses a breakpoint).
      const isMobile = window.innerWidth < 768;
      const depthPerLayer = isMobile ? 6 : 14;
      const introY = isMobile ? 20 : 40;
      const introZ = isMobile ? -30 : -60;

      gsap.set(layers, { opacity: 0, y: introY, z: introZ });

      const tl = gsap.timeline({
        onComplete: () => {
          introDoneRef.current = true;
          onIntroCompleteRef.current?.();
          onStageChangeRef.current(null);
          startIdleSpin();
        },
      });

      layers.forEach((el, i) => {
        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            z: i * depthPerLayer,
            duration: 1.15,
            ease: "power2.out",
            onStart: () => onStageChangeRef.current(i),
          },
          i * 0.85
        );
      });

      // Lightweight scroll-out touch: fade/tilt as the hero scrolls out of view (desktop only)
      if (!isMobile) {
        gsap.to(groupRef.current, {
          opacity: 0.6,
          rotateX: "+=8",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom center",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  // Billboard the per-layer labels: the object now spins continuously (item 2),
  // so a label that simply inherited the parent's live 3D rotation would drift
  // through unreadable/skewed angles depending on when the user hovers.
  // Counter-rotating via separate rotateX/rotateY Euler values doesn't work here —
  // 3D rotations don't commute, so negating each axis independently is not the
  // true inverse of the combined rotation. Instead, read the group's actual
  // rendered matrix each frame and apply its mathematical inverse (via the
  // browser's own DOMMatrix) as the label's transform — this exactly cancels
  // whatever the group's current orientation is, keeping labels flat and facing
  // the viewer while their position (inherited from the layer they're anchored
  // to) still tracks correctly.
  useEffect(() => {
    const tick = () => {
      const group = groupRef.current;
      if (!group) return;
      const computed = window.getComputedStyle(group).transform;
      if (computed === "none") return;
      const inverse = new DOMMatrix(computed).inverse();
      const transformStr = inverse.toString();
      labelRefs.current.forEach((el) => {
        if (el) el.style.transform = transformStr;
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  // Drag-to-rotate — mouse only. Touch pointers are ignored entirely and fall
  // through to native scroll untouched: this is inline hero content, not an
  // isolated widget, so we never want to risk trapping a mobile scroll gesture.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!introDoneRef.current || e.pointerType !== "mouse") return;
    isDraggingRef.current = true;
    stopIdleSpin();
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startRotY: Number(gsap.getProperty(groupRef.current, "rotateY")) || 0,
      startRotX: Number(gsap.getProperty(groupRef.current, "rotateX")) || 55,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    gsap.to(labelRefs.current, { opacity: 0, duration: 0.15, overwrite: true });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStateRef.current.startX;
    const dy = e.clientY - dragStateRef.current.startY;
    const nextRotY = clamp(dragStateRef.current.startRotY + dx * DRAG_SENSITIVITY, ROTATE_Y_MIN, ROTATE_Y_MAX);
    const nextRotX = clamp(dragStateRef.current.startRotX - dy * DRAG_SENSITIVITY, ROTATE_X_MIN, ROTATE_X_MAX);
    setRotateYRef.current?.(nextRotY);
    setRotateXRef.current?.(nextRotX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    startIdleSpin();
  };

  // Whole-diagram hover: pause/resume the idle spin so it holds still while inspected.
  const handleGroupEnter = () => {
    if (!introDoneRef.current) return;
    stopIdleSpin();
  };

  const handleGroupLeave = () => {
    if (!introDoneRef.current || isDraggingRef.current) return;
    startIdleSpin();
  };

  // Per-layer hover: updates the shared caption (via onStageChange) and fades in
  // that layer's own quick-glance label.
  const handleLayerEnter = (i: number) => {
    if (!introDoneRef.current || isDraggingRef.current) return;
    onStageChangeRef.current(i);
    gsap.to(labelRefs.current[i], { opacity: 1, duration: 0.2, overwrite: true });
  };

  const handleLayerLeave = (i: number) => {
    if (!introDoneRef.current || isDraggingRef.current) return;
    onStageChangeRef.current(null);
    gsap.to(labelRefs.current[i], { opacity: 0, duration: 0.2, overwrite: true });
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center [perspective:1200px]">
      <div
        ref={groupRef}
        className="relative w-56 h-56 sm:w-72 sm:h-72 [transform-style:preserve-3d]"
        style={{ transform: "rotateX(55deg)" }}
        onPointerEnter={handleGroupEnter}
        onPointerLeave={handleGroupLeave}
      >
        {LAYER_COLORS.map((color, i) => (
          <div
            key={i}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute inset-0 [transform-style:preserve-3d]"
          >
            {/* Clipped octagon surface — kept separate from the label below so the
                label (anchored outside this box via left-full) never gets clipped
                along with it. Drag + hover handlers live here (not on the unclipped
                wrapper above) so clip-path's native hit-testing constrains both to
                the actual visible shape, not the full square bounding box — you
                can't drag or trigger a hover on the empty background/corners. */}
            <div
              className="absolute inset-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)] border border-white/10 cursor-grab active:cursor-grabbing"
              style={{
                backgroundColor: color,
                clipPath: OCTAGON_CLIP,
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerEnter={() => handleLayerEnter(i)}
              onPointerLeave={() => handleLayerLeave(i)}
            />
            <div
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap opacity-0 pointer-events-none"
            >
              <span className="inline-block bg-brand-navy-mid/90 border border-brand-orange/40 px-2 py-0.5 text-[10px] font-cond font-bold uppercase tracking-wider text-white shadow-md">
                {layerLabels[i]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
