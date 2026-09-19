const OCTAGON_CLIP =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

// Static nested-octagon badge — the original Hero visual, kept as the
// fallback for the 3D process visual (HeroProcessVisual): reduced motion,
// a WebGL/render error, and the brief dynamic-import loading gap all resolve
// to this same known-good mark rather than three separate pieces of art.
export default function HeroOctagonBadge() {
  return (
    <div className="relative w-full h-full" aria-hidden="true">
      <div
        className="absolute inset-0 shadow-[0_10px_18px_rgba(0,0,0,0.35)] border border-white/10"
        style={{ backgroundColor: "#f47c20", clipPath: OCTAGON_CLIP }}
      />
      <div
        className="absolute inset-6 sm:inset-8 border border-white/10"
        style={{ backgroundColor: "#0a1628", clipPath: OCTAGON_CLIP }}
      />
      <div
        className="absolute inset-12 sm:inset-16 border border-brand-orange/30"
        style={{ backgroundColor: "#112240", clipPath: OCTAGON_CLIP }}
      />
    </div>
  );
}
