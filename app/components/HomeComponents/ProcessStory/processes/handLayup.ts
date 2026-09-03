import type { ProcessDefinition } from "../types";

// Content for the hand lay-up FRP process — the only file in this feature that
// knows this is hand lay-up. Collapsed from an earlier 8-narrative-beat
// version down to 5 stages, one per real GLB "hero shot" the client supplied
// (public/3d/*.glb) — each GLB depicts an actual mold/hand/tool moment, not
// abstract layer geometry, so pairs of the old beats that shared one real
// visual (mold prep + release agent; surface veil + chopped strand; woven
// roving + back coat) are merged into one stage, combining both halves'
// copy rather than dropping either side.
//
// scrollWeight tuning (UX audit fix, post-launch): the 3D transitions are
// time-damped (settle within ~1s of real time regardless of scroll speed —
// see ProcessEngineeringScene.tsx's TransitionController), so every stage
// previously getting an equal, generous scrollWeight left a large "dead"
// scroll range once each transition had already finished playing —
// mold-prep worst of all, since it has no incoming transition at all.
//
// Important mechanics: ProcessStorySection's pinned wrapper height is
// `stages.length * 100vh` — a fixed total tied to stage COUNT, not to the
// sum of scrollWeight (see ProcessStorySection.tsx). scrollWeight only
// redistributes that fixed total via getStageBoundaries (types.ts); it
// can't shrink the section overall without changing that formula, which is
// out of scope here. So: mold-prep is cut hardest (pure static read, no
// motion to perceive — down to roughly half its old share), gel-coat/
// fiberglass-layup/structural-cure are tightened moderately (~15% less each
// — their settle/roller motions still need enough distance to read
// clearly), and the scroll distance freed up by those cuts flows into
// reveal rather than evaporating — which is exactly where the UX audit's
// other finding (Stage 5's payoff needing room to breathe before the exit
// buffer) wants it anyway.
const MOLD_PREP_WEIGHT = 0.55;
const MID_STAGE_WEIGHT = 0.85; // gel-coat, fiberglass-layup, structural-cure
const REVEAL_WEIGHT = 5 - MOLD_PREP_WEIGHT - MID_STAGE_WEIGHT * 3; // = 1.9 — absorbs what the cuts above free up
export const handLayupProcess: ProcessDefinition = {
  id: "hand-lay-up",
  label: "Hand Lay-Up Method",
  productBenefits: [
    { icon: "Feather", label: "Lightweight" },
    { icon: "Shield", label: "High Strength" },
    { icon: "Droplet", label: "Corrosion Resistant" },
    { icon: "Clock", label: "Long Life" },
    { icon: "Wrench", label: "Low Maintenance" },
  ],
  stages: [
    {
      id: "mold-prep",
      order: 0,
      shortLabel: "Mold Prep",
      title: "Mold Preparation & Release Agent",
      description:
        "Every FRP component starts on a precision mold surface, cleaned and inspected, then treated with a release agent (wax or PVA) — forming the base against which every subsequent layer is built.",
      heroIllustrationId: "apply-release-agent",
      modelUrl: "/3d/mold-prep.glb",
      // Tightened ~10% from the original [2.0, 1.6, 3.2] — at that distance
      // the mold read noticeably smaller/further-back than the other 4
      // stages, undercutting its "hero" weight next to Gel Coat/Fiberglass
      // Layup. Same target/FOV, just pulled in along the existing sightline.
      camera: { position: [1.8, 1.45, 2.88], target: [0, 0.05, 0], fov: 40 },
      cameraMotion: { type: "orbit", periodSeconds: 24, amplitude: 6 },
      objects: [],
      accentColor: "#4a5568",
      insights: {
        tools: ["Release Agent (Wax/PVA)"],
        outcome:
          "A cleaned, precision mold treated with a release agent — a slick, defect-free surface that lets the finished part release cleanly once cured, and the foundation every subsequent layer builds on.",
      },
      // Cut hardest: no incoming transition at all (nothing to perceive
      // taking time), so the full ~100vh a default weight would give was
      // pure static dead scroll.
      scrollWeight: MOLD_PREP_WEIGHT,
    },
    {
      id: "gel-coat",
      order: 1,
      shortLabel: "Gel Coat",
      title: "Gel Coat",
      description:
        "A pigmented, UV- and corrosion-resistant resin layer sprayed directly onto the mold surface, forming the finished part's outer skin.",
      heroIllustrationId: "apply-gel-coat",
      modelUrl: "/3d/gel-coat.glb",
      camera: { position: [2.0, 1.7, 3.4], target: [0, 0.05, 0], fov: 42 },
      cameraMotion: { type: "pushIn", periodSeconds: 14, amplitude: 0.04 },
      objects: [],
      accentColor: "#f47c20",
      insights: {
        illustrationId: "gel-coat-spray",
        tools: ["Spray Gun"],
        whyItMatters:
          "The gel coat is the only layer visible to the customer, and the first line of defense against weather and wear.",
        keyBenefits: ["Corrosion resistance", "UV protection", "Class-A cosmetic finish"],
        outcome: "A smooth, pigmented outer skin ready to receive the structural laminate layers.",
      },
      // Moderately tightened — the spread-reveal shader still needs enough
      // scroll distance to read clearly, just without the long static tail.
      scrollWeight: MID_STAGE_WEIGHT,
    },
    {
      id: "fiberglass-layup",
      order: 2,
      shortLabel: "Fiberglass Layup",
      title: "Fiberglass Mat Layup",
      description:
        "A thin continuous-strand glass veil is laid over the gel coat to prevent fiber print-through, followed by non-directional chopped strand mat — hand-laid and rolled with resin for bulk thickness and isotropic strength.",
      heroIllustrationId: "roll-chopped-strand",
      modelUrl: "/3d/fiberglass-layup.glb",
      camera: { position: [1.8, 1.6, 3.2], target: [0, 0.15, 0], fov: 36 },
      cameraMotion: { type: "orbit", periodSeconds: 26, amplitude: 5 },
      objects: [],
      accentColor: "#ffc169",
      insights: {
        illustrationId: "chopped-strand-roller",
        tools: ["Laminating Roller", "Consolidation Roller"],
        whyItMatters:
          "Without this veil, the coarser structural fibers beneath would telegraph through the finished surface — and rolling the chopped strand layer that follows compacts the fibers and drives out trapped air, critical for the laminate's structural integrity.",
        keyBenefits: [
          "Prevents fiber print-through",
          "Resin-rich protective barrier",
          "Eliminates air pockets",
          "Improves structural strength",
        ],
        outcome:
          "A uniform, bubble-free veil bonded tightly to the gel coat, with a dense, void-free chopped strand layer fully wetted through above it.",
      },
      // Moderately tightened — the fiberglass sheet's descend/settle motion
      // still needs enough scroll distance to read clearly.
      scrollWeight: MID_STAGE_WEIGHT,
    },
    {
      id: "structural-cure",
      order: 3,
      shortLabel: "Roving & Cure",
      title: "Structural Roving & Resin Sealing",
      description:
        "Heavy bidirectional fiberglass cloth is positioned for high tensile and impact strength along the part's primary structural axes, then sealed with a back coat resin layer that locks in the laminate stack as it cures at room temperature until fully hardened and ready for demolding.",
      heroIllustrationId: "place-woven-roving",
      modelUrl: "/3d/structural-cure.glb",
      // Reframed + tightened from the original [1.9, 1.7, 3.3] / target
      // [0, 0.2, 0] — at that framing the resin pot (the lowest part of this
      // GLB) was partially hidden behind CaptionOverlay's bottom-left card.
      // Lowering the look-at target (verified iteratively in-browser) raises
      // the whole composition on screen until the pot fully clears the card.
      camera: { position: [1.75, 1.18, 3.04], target: [0, -0.2, 0], fov: 36 },
      cameraMotion: { type: "orbit", periodSeconds: 26, amplitude: 5 },
      objects: [],
      accentColor: "#1a3a6b",
      insights: {
        illustrationId: "woven-roving-orientation",
        tools: ["Laminating Roller", "Finishing Roller"],
        whyItMatters:
          "Correct fiber orientation along the part's primary load paths gives the laminate its directional strength, and sealing it afterward locks out moisture and completes the chemical cure that gives the part its final hardness — at room temperature, with no oven curing involved.",
        keyBenefits: [
          "High tensile strength",
          "Impact resistance",
          "Moisture sealing",
          "Locks in laminate structure",
        ],
        outcome: "A thick, aligned structural layer, fully sealed and curing at room temperature until ready for demolding.",
      },
      // Moderately tightened — the layer approach/settle + roller
      // consolidation sweep (see ProcessEngineeringScene.tsx's
      // LAYER_APPROACH_END/LAYER_SETTLE_END/ROLLER_WINDOW_*) still needs
      // enough scroll distance for both phases to read clearly in sequence.
      scrollWeight: MID_STAGE_WEIGHT,
    },
    {
      id: "reveal",
      order: 4,
      shortLabel: "Finished Part",
      title: "Precision, Built by Hand",
      description:
        "Every FRP product we manufacture — from automotive panels to defence-grade components — begins with this same hand lay-up discipline.",
      heroIllustrationId: "finished-part",
      modelUrl: "/3d/reveal.glb",
      camera: { position: [0, 1.8, 4.2], target: [0, 0.3, 0], fov: 40 },
      cameraMotion: { type: "orbit", periodSeconds: 30, amplitude: 4 },
      objects: [],
      accentColor: "#112240",
      // The whole GLB (hands, lid, finished part) is one uniform glossy
      // dark-navy material under the shared low-key rig, so the silhouette
      // collapses — a first-time visitor can't easily tell hand from lid
      // from product. Lifts only the fill/ambient/ground lights (not key/rim,
      // which define the directional modeling and highlights) to separate
      // the mid-tones without going glossier/more "cinematic".
      lightBoost: 1.6,
      insights: {
        outcome: "A finished, demolded FRP component — precision engineered and ready for the real world.",
      },
      // Absorbs the scroll distance freed up by the cuts above — this is the
      // final payoff (demold lift + settle) and gets the most room to
      // breathe of any stage, not just "kept the same".
      scrollWeight: REVEAL_WEIGHT,
    },
  ],
};
