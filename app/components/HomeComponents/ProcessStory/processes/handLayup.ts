import type { ProcessDefinition } from "../types";

// Content for the hand lay-up FRP process — the only file in this feature that
// knows this is hand lay-up. Collapsed from an earlier 8-narrative-beat
// version down to 5 stages, one per real GLB "hero shot" the client supplied
// (public/3d/*.glb) — each GLB depicts an actual mold/hand/tool moment, not
// abstract layer geometry, so pairs of the old beats that shared one real
// visual (mold prep + release agent; surface veil + chopped strand; woven
// roving + back coat) are merged into one stage, combining both halves'
// copy rather than dropping either side. All 5 stages carry equal
// scrollWeight — none of them are a sparse camera-only beat anymore, every
// stage now has real content and its own model.
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
      camera: { position: [2.0, 1.6, 3.2], target: [0, 0.05, 0], fov: 40 },
      cameraMotion: { type: "orbit", periodSeconds: 24, amplitude: 6 },
      objects: [],
      accentColor: "#4a5568",
      insights: {
        tools: ["Release Agent (Wax/PVA)"],
        outcome:
          "A cleaned, precision mold treated with a release agent — a slick, defect-free surface that lets the finished part release cleanly once cured, and the foundation every subsequent layer builds on.",
      },
      scrollWeight: 1,
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
      camera: { position: [1.9, 1.7, 3.3], target: [0, 0.2, 0], fov: 36 },
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
      insights: {
        outcome: "A finished, demolded FRP component — precision engineered and ready for the real world.",
      },
    },
  ],
};
