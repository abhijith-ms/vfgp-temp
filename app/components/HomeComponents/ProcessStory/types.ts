// Generic scroll-story engine schema — intentionally has no knowledge of hand lay-up
// (or any other specific manufacturing process). Process content lives in ./processes/*.

export type AssetType = "proceduralExtrude" | "glb";

export interface MaterialProps {
  roughness?: number;
  metalness?: number;
}

export interface SceneObject {
  id: string;
  assetType: AssetType;
  color: string;
  materialProps?: MaterialProps;
  /** Extrusion depth for proceduralExtrude objects, in scene units. */
  height: number;
  /** Base Y offset (bottom of this object) in scene units. */
  elevation: number;
  /** Reserved for assetType "glb" — path under /public, e.g. "/models/roller.glb". */
  modelUrl?: string;
  /** [start, end] scroll progress (0..1) over which this object fades/rises in. Stays fully revealed after `end`. */
  visibilityRange: [number, number];
}

export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

/** Subtle, continuous per-stage camera motion applied around a stage's own
 *  base `camera` keyframe while that stage is active. Each stage's GLB is
 *  its own independent coordinate space (not one shared scene), so this is
 *  deliberately scoped to a single stage rather than a cross-stage lerp
 *  path — see ProcessModelViewer.tsx. */
export interface CameraMotion {
  type: "orbit" | "pushIn";
  /** Seconds for one full oscillation cycle. Keep large (14-30s) for subtlety. */
  periodSeconds: number;
  /** "orbit": max azimuth swing in degrees each side of the base position.
   *  "pushIn": max fractional distance change each side of the base radius. */
  amplitude: number;
}

export interface StageInsights {
  /** Registry key resolved by the companion panel's illustration lookup —
   *  never a literal SVG/JSX/path, so swapping the diagram style or later
   *  moving to Blender renders needs no change here or in the renderer. */
  illustrationId?: string;
  /** Tool(s)/equipment used, as short label(s). Plural so a process needing
   *  multiple concurrent tools (e.g. a mandrel + fiber-feed eye) doesn't need
   *  a shape change later. */
  tools?: string[];
  whyItMatters?: string;
  /** Short bullet phrases, not full sentences. Empty array treated as absent. */
  keyBenefits?: string[];
  /** Visitor-focused: the concrete physical result this step produces —
   *  distinct from whyItMatters (the reasoning) and keyBenefits (bullet
   *  advantages). */
  outcome?: string;
  /** Overrides the panel's default brand accent for this stage only. */
  highlightColor?: string;
}

export interface ProcessStage {
  id: string;
  order: number;
  shortLabel: string;
  title: string;
  description: string;
  camera: CameraKeyframe;
  /** Subtle idle motion around `camera` while this stage is the active one. */
  cameraMotion: CameraMotion;
  /** Path under /public to this stage's GLB, e.g. "/3d/gel-coat.glb" — the
   *  pinned story's primary 3D hero visual (ProcessModelViewer.tsx). Each
   *  file is its own independent coordinate space/shot, generated
   *  independently — no shared pedestal or scale across stages. */
  modelUrl: string;
  /** Optional per-model orientation correction (radians, [x,y,z]). These
   *  GLBs are trimesh exports from arbitrary point-cloud scans with no
   *  guaranteed Y-up convention — use this to correct orientation instead of
   *  fighting it with camera position. Calibrated per stage in-browser. */
  modelRotation?: [number, number, number];
  /** Legacy field, retained only so the orphaned ProcessCanvas.tsx /
   *  SceneObjectMesh.tsx (kept on disk, unused, per standing no-preemptive-
   *  deletion rule) still typecheck. Always [] for GLB-backed stages — do
   *  not populate for new content. */
  objects: SceneObject[];
  /** Optional supplementary insights for the companion panel. Absent for
   *  camera-only narrative beats (e.g. "mold-surface", "reveal") — the panel
   *  must render gracefully with this undefined. */
  insights?: StageInsights;
  /** Relative scroll-time weight for this stage; defaults to 1 when omitted.
   *  A stage with weight 0.5 consumes half the scroll distance of a
   *  default-weight stage — lets sparse/narrative-only beats pass quickly
   *  while richer stages get more scroll time, without assuming every stage
   *  occupies equal scroll length. */
  scrollWeight?: number;
  /** Registry key for this stage's hero illustration (flat SVG) — used only
   *  by ProcessStoryFallback.tsx's reduced-motion path now that the pinned
   *  story's primary visual is the GLB model above. Resolved via
   *  illustrations/hero's registry — never imported directly. */
  heroIllustrationId: string;
  /** Explicit per-stage accent color for ProcessStoryFallback's accent bar
   *  (and the default for insights.highlightColor when unset). Replaces the
   *  old implicit signal via objects[0].color, which no longer carries real
   *  data now that objects is always []. */
  accentColor: string;
}

export interface ProductBenefit {
  /** lucide-react icon component name, e.g. "Feather", "Shield". */
  icon: string;
  label: string;
}

export interface ProcessDefinition {
  id: string;
  label: string;
  stages: ProcessStage[];
  /** Whole-process benefit summary (e.g. Lightweight, High Strength) for the
   *  static overview banner — distinct from StageInsights.keyBenefits, which
   *  are per-stage. Optional: a process without banner content simply omits it. */
  productBenefits?: ProductBenefit[];
}

/** Cumulative weighted stage boundaries as fractions of total progress
 *  (0..1), length stages.length + 1. Single source of truth for both "which
 *  stage is active" (useProcessScroll) and "how far through this stage"
 *  (CameraRig) — keeps the two perfectly in sync even when stages have
 *  uneven scroll weight. */
export function getStageBoundaries(stages: ProcessStage[]): number[] {
  const weights = stages.map((stage) => stage.scrollWeight ?? 1);
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  const boundaries = [0];
  let cumulative = 0;
  for (const weight of weights) {
    cumulative += weight;
    boundaries.push(cumulative / total);
  }
  return boundaries;
}

export interface StageProgress {
  index: number;
  nextIndex: number;
  /** Fraction (0..1) through the active stage's own weighted span. */
  t: number;
}

export function getStageProgress(boundaries: number[], progress: number): StageProgress {
  const clamped = Math.min(1, Math.max(0, progress));
  const lastIndex = boundaries.length - 2;
  let index = lastIndex;
  for (let i = 0; i < lastIndex; i++) {
    if (clamped < boundaries[i + 1]) {
      index = i;
      break;
    }
  }
  const nextIndex = Math.min(lastIndex, index + 1);
  const start = boundaries[index];
  const end = boundaries[index + 1];
  const t = end > start ? (clamped - start) / (end - start) : 0;
  return { index, nextIndex, t };
}

export function getStageAtProgress(stages: ProcessStage[], progress: number): number {
  return getStageProgress(getStageBoundaries(stages), progress).index;
}
