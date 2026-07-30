import type { ProcessDefinition } from "../types";

// Content for the hand lay-up FRP process — the only file in this feature that
// knows this is hand lay-up. Camera keyframes and progress ranges are sourced
// from /Storyboard.md (8 stages: intro, 6 lamination stages, outro reveal).
// Camera radii were widened ~1.8x from the storyboard's first-draft numbers
// after Phase 2 browser verification showed the original mid-story radii put
// the camera almost inside the object (near-clipping, no framing headroom) —
// azimuth/elevation/target/fov are unchanged, only distance was corrected.
//
// "intro" and "mold-surface" carry scrollWeight: 0.5 (half the default scroll
// time of the other 6 stages) so visitors reach the richer material stages
// sooner. Total weight across all 8 stages is 7 (0.5+0.5+1+1+1+1+1+1), so
// weighted stage boundaries are: intro [0, .0714], mold-surface
// [.0714, .1429], gel-coat [.1429, .2857], surface-mat [.2857, .4286],
// chopped-strand-mat [.4286, .5714], woven-roving [.5714, .7143], back-coat
// [.7143, .8571], reveal [.8571, 1]. Every object's visibilityRange below is
// anchored to its own stage's weighted start — if scrollWeight changes again,
// these need recalculating via getStageBoundaries (types.ts).
export const handLayupProcess: ProcessDefinition = {
  id: "hand-lay-up",
  label: "Hand Lay-Up Method",
  stages: [
    {
      id: "intro",
      order: 0,
      shortLabel: "Mold",
      title: "Where Every Part Begins",
      description:
        "Every FRP component starts on a precision mold surface, prepared and inspected before a single layer is applied.",
      camera: { position: [2.78, 2.25, 4.82], target: [0, 0, 0], fov: 45 },
      objects: [
        {
          id: "mold",
          assetType: "proceduralExtrude",
          color: "#4a5568",
          materialProps: { roughness: 0.35, metalness: 0.6 },
          height: 0.05,
          elevation: 0,
          visibilityRange: [0, 0.02],
        },
      ],
      insights: {
        outcome: "A cleaned, precision mold — the foundation every subsequent layer builds on.",
      },
      // Sparse, camera-only-adjacent beat — shorter scroll time so visitors
      // reach the richer material stages sooner (see plan/memory notes).
      scrollWeight: 0.5,
    },
    {
      id: "mold-surface",
      order: 1,
      shortLabel: "Mold Surface",
      title: "Mold Surface & Release Agent",
      description:
        "The polished mold surface is cleaned and treated with a release agent (wax or PVA), forming the base against which every subsequent layer is built.",
      camera: { position: [1.54, 1.69, 4.24], target: [0, 0.05, 0], fov: 40 },
      objects: [],
      insights: {
        tools: ["Release Agent (Wax/PVA)"],
        outcome: "A slick, defect-free surface that lets the finished part release cleanly once cured.",
      },
      scrollWeight: 0.5,
    },
    {
      id: "gel-coat",
      order: 2,
      shortLabel: "Gel Coat",
      title: "Gel Coat",
      description:
        "A pigmented, UV- and corrosion-resistant resin layer sprayed directly onto the mold surface, forming the finished part's outer skin.",
      camera: { position: [0.33, 1.83, 3.82], target: [0, 0.12, 0], fov: 36 },
      objects: [
        {
          id: "gel-coat",
          assetType: "proceduralExtrude",
          color: "#f47c20",
          materialProps: { roughness: 0.25, metalness: 0.1 },
          height: 0.07,
          elevation: 0.05,
          visibilityRange: [0.143, 0.193],
        },
      ],
      insights: {
        illustrationId: "gel-coat-spray",
        tools: ["Spray Gun"],
        whyItMatters:
          "The gel coat is the only layer visible to the customer, and the first line of defense against weather and wear.",
        keyBenefits: ["Corrosion resistance", "UV protection", "Class-A cosmetic finish"],
        outcome: "A smooth, pigmented outer skin ready to receive the structural laminate layers.",
      },
    },
    {
      id: "surface-mat",
      order: 3,
      shortLabel: "Surface Mat",
      title: "Surface Mat",
      description:
        "A thin continuous-strand glass veil laid over the gel coat, creating a smooth, resin-rich barrier that prevents fiber print-through.",
      camera: { position: [-0.59, 1.87, 3.36], target: [0, 0.2, 0], fov: 34 },
      objects: [
        {
          id: "surface-mat",
          assetType: "proceduralExtrude",
          color: "#ff9a45",
          materialProps: { roughness: 0.55, metalness: 0.05 },
          height: 0.08,
          elevation: 0.12,
          visibilityRange: [0.286, 0.336],
        },
      ],
      insights: {
        illustrationId: "surface-mat-veil",
        tools: ["Laminating Roller"],
        whyItMatters:
          "Without this veil, the coarser structural fibers beneath would telegraph through the finished surface.",
        keyBenefits: ["Prevents fiber print-through", "Resin-rich protective barrier", "Paint-ready smoothness"],
        outcome: "A uniform, bubble-free veil bonded tightly to the gel coat.",
      },
    },
    {
      id: "chopped-strand-mat",
      order: 4,
      shortLabel: "Chopped Strand Mat",
      title: "Chopped Strand Mat",
      description:
        "Non-directional glass fibers hand-laid and rolled with resin, adding bulk thickness and isotropic strength through the laminate.",
      camera: { position: [-1.34, 1.99, 2.88], target: [0, 0.3, 0], fov: 32 },
      objects: [
        {
          id: "chopped-strand-mat",
          assetType: "proceduralExtrude",
          color: "#ffc169",
          materialProps: { roughness: 0.75, metalness: 0 },
          height: 0.1,
          elevation: 0.2,
          visibilityRange: [0.429, 0.479],
        },
      ],
      insights: {
        illustrationId: "chopped-strand-roller",
        tools: ["Consolidation Roller"],
        whyItMatters:
          "Rolling compacts the fibers and drives out trapped air — critical for the laminate's structural integrity.",
        keyBenefits: ["Eliminates air pockets", "Improves structural strength", "Ensures proper resin-to-fiber bond"],
        outcome: "A dense, void-free layer with fibers fully wetted through.",
      },
    },
    {
      id: "woven-roving",
      order: 5,
      shortLabel: "Woven Roving",
      title: "Woven Roving",
      description:
        "Heavy bidirectional fiberglass cloth positioned for high tensile and impact strength along the part's primary structural axes.",
      camera: { position: [-2.53, 2.17, 3.01], target: [0, 0.42, 0], fov: 34 },
      objects: [
        {
          id: "woven-roving",
          assetType: "proceduralExtrude",
          color: "#1a3a6b",
          materialProps: { roughness: 0.5, metalness: 0.15 },
          height: 0.12,
          elevation: 0.3,
          visibilityRange: [0.571, 0.621],
        },
      ],
      insights: {
        illustrationId: "woven-roving-orientation",
        tools: ["Laminating Roller"],
        whyItMatters:
          "Correct fiber orientation along the part's primary load paths is what gives the laminate its directional strength.",
        keyBenefits: ["High tensile strength", "Impact resistance", "Reinforcement along load axes"],
        outcome: "A thick, aligned structural layer locked in place with the layers beneath it.",
      },
    },
    {
      id: "back-coat",
      order: 6,
      shortLabel: "Back Coat",
      title: "Back Coat & Final Cure",
      description:
        "A sealing resin layer locks in the laminate stack, which then cures at room temperature until fully hardened and ready for demolding.",
      camera: { position: [-3.62, 2.16, 2.53], target: [0, 0.55, 0], fov: 36 },
      objects: [
        {
          id: "back-coat",
          assetType: "proceduralExtrude",
          color: "#112240",
          materialProps: { roughness: 0.3, metalness: 0.2 },
          height: 0.13,
          elevation: 0.42,
          visibilityRange: [0.714, 0.764],
        },
      ],
      insights: {
        illustrationId: "back-coat-seal",
        tools: ["Finishing Roller"],
        whyItMatters:
          "Sealing the laminate locks out moisture and completes the chemical cure that gives the part its final strength.",
        keyBenefits: ["Moisture sealing", "Locks in laminate structure", "Enables full cure to final hardness"],
        outcome: "A fully sealed laminate, curing at room temperature until ready for demolding.",
      },
    },
    {
      id: "reveal",
      order: 7,
      shortLabel: "Finished Part",
      title: "Precision, Built by Hand",
      description:
        "Every FRP product we manufacture — from automotive panels to defence-grade components — begins with this same hand lay-up discipline.",
      camera: { position: [0, 2.49, 7.24], target: [0, 0.55, 0], fov: 40 },
      objects: [],
      insights: {
        outcome: "A finished, demolded FRP component — precision engineered and ready for the real world.",
      },
    },
  ],
};
