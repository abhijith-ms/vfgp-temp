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
}

export interface ProcessDefinition {
  id: string;
  label: string;
  stages: ProcessStage[];
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
