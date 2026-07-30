# Hand Lay-Up Process Story — Storyboard

Director's storyboard for the scroll-driven, pinned 3D product-story section (`app/components/HomeComponents/ProcessStory/`) that explains the hand lay-up FRP manufacturing process. Approved as the creative/technical basis for implementation — see `/home/abhijithms/.claude/plans/unified-plotting-orbit.md` for full engineering architecture and build phases.

**Scene convention**: mold centered at world origin `(0,0,0)`, laminate stack builds upward along `+Y` as each layer's `layerHeight` accumulates. Camera position given in spherical terms — azimuth (° around Y, 0° = front), elevation (° above horizon), radius (distance from target) — converted to Cartesian during implementation. All numeric values below are creative-intent targets, tunable against the real rendered geometry during Phase 2, not frozen constants.

**Post-Phase-2 update**: radii below were widened ~1.8x from the original draft after browser verification showed the original distances put the camera almost inside the object at the mid-story stages (near-clipping, no framing headroom). Azimuth/elevation/target/FOV are unchanged — only distance was corrected.

## Stage 0 — Intro: Empty Mold (establishing shot)
- **Manufacturing step**: precision mold, cleaned and staged, empty.
- **Visitor objective**: register this as a real physical manufacturing process before any material appears — ground the story.
- **Camera**: az 30°, elev 22°, radius 6.0, target `(0, 0, 0)`, FOV 45° (wide establishing).
- **Lighting**: cool navy ambient fill + one soft key light upper-left, low-intensity brand-orange tint (moody, industrial work-light feel); no rim light yet.
- **Object visibility**: empty mold shell only; all laminate layer objects hidden.
- **Object animation**: near-imperceptible slow turntable drift; nothing "built" yet — a held breath.
- **Transition to next stage**: slow continuous dolly-in + slight elevation drop as scroll begins — signals the process starting.
- **Caption**: "Where Every Part Begins" — "Every FRP component starts on a precision mold surface, prepared and inspected before a single layer is applied."
- **Expected emotional effect**: anticipation, credibility.

## Stage 1 — Mold Surface & Release Agent
- **Visitor objective**: understand the foundation step — surface prep determines final finish quality.
- **Camera**: az 20°, elev 20°, radius 4.8, target `(0, 0.05, 0)`, FOV 40°.
- **Lighting**: key light sharpens slightly; a soft specular sheen sweeps across the mold surface (suggests wax/PVA release agent).
- **Object visibility**: mold surface object, gloss sheen pass fades in.
- **Object animation**: horizontal gloss sweep across the surface.
- **Transition**: gentle +15° orbit while dollying slightly closer, continuous ease.
- **Caption**: "Mold Surface & Release Agent" — "The polished mold surface is cleaned and treated with a release agent (wax or PVA), forming the base against which every subsequent layer is built."
- **Expected emotional effect**: precision, craftsmanship.

## Stage 2 — Gel Coat
- **Visitor objective**: see the first real material layer and understand it becomes the product's visible outer skin.
- **Camera**: az 5°, elev 24°, radius 4.2, target `(0, 0.12, 0)`, FOV 36°.
- **Lighting**: key intensifies with a glossy specular pass, brand-orange tinted (ties directly to gel coat's tone).
- **Object visibility**: gel coat layer object rises/fades in above mold surface.
- **Object animation**: layer settles into place with a slight rise + ease-out; subtle glossy shimmer.
- **Transition**: crane slightly upward as the stack grows, continuing the slow orbit, continuous ease.
- **Caption**: "Gel Coat" — "A pigmented, UV- and corrosion-resistant resin layer sprayed directly onto the mold surface, forming the finished part's outer skin."
- **Expected emotional effect**: first visible progress, quality-consciousness.

## Stage 3 — Surface Mat
- **Visitor objective**: understand this thin veil prevents fiber print-through — a finish-quality detail non-experts wouldn't otherwise know.
- **Camera**: az -10°, elev 26°, radius 3.8, target `(0, 0.20, 0)`, FOV 34°.
- **Lighting**: softer, more diffuse (matte veil, less specular than gel coat).
- **Object visibility**: surface mat layer rises above gel coat.
- **Object animation**: same rise/settle, slightly slower/softer easing (delicate material).
- **Transition**: continued orbit + crane, continuous ease.
- **Caption**: "Surface Mat" — "A thin continuous-strand glass veil laid over the gel coat, creating a smooth, resin-rich barrier that prevents fiber print-through."
- **Expected emotional effect**: reassurance, attention-to-detail.

## Stage 4 — Chopped Strand Mat
- **Visitor objective**: understand structural bulk/strength is now being added, not just cosmetic layers.
- **Camera**: az -25°, elev 28°, radius 3.6, target `(0, 0.30, 0)`, FOV 32° (tightest macro so far, to read fiber texture).
- **Lighting**: harder side/rake light to reveal fiber texture/roughness.
- **Object visibility**: chopped strand mat layer rises; material noticeably rougher/matte.
- **Object animation**: rise/settle + a subtle press/roll compression pulse (scale-Y ~0.98 and back), evoking hand-rolling out air voids.
- **Transition**: orbit continues, slight radius pull-back begins (preparing for the bigger structural reveal next).
- **Caption**: "Chopped Strand Mat" — "Non-directional glass fibers hand-laid and rolled with resin, adding bulk thickness and isotropic strength through the laminate."
- **Expected emotional effect**: confidence in structural integrity, sense of hands-on labor.

## Stage 5 — Woven Roving
- **Visitor objective**: understand this is the primary structural/strength layer — the "engineering" beat of the story.
- **Camera**: az -40°, elev 24°, radius 4.3 (pulls back slightly for a fuller structural view), target `(0, 0.42, 0)`, FOV 34°.
- **Lighting**: strongest key light of the sequence, crisp directional emphasis on the woven crosshatch pattern.
- **Object visibility**: woven roving layer rises, visibly thicker than prior layers.
- **Object animation**: rise/settle with a firmer, more deliberate ease (heavier-material motion curve).
- **Transition**: orbit reverses direction slightly (a deliberate "look from another angle" beat) while craning up, continuous.
- **Caption**: "Woven Roving" — "Heavy bidirectional fiberglass cloth positioned for high tensile and impact strength along the part's primary structural axes."
- **Expected emotional effect**: strength, engineering credibility.
- **Stretch goal, not committed for v1**: a procedural crosshatch/weave surface pattern instead of flat color — flagged, not promised.

## Stage 6 — Back Coat & Final Cure
- **Visitor objective**: understand the laminate is now sealed and curing — the process is complete and becoming solid.
- **Camera**: az -55°, elev 20°, radius 4.7, target `(0, 0.55, 0)`, FOV 36°.
- **Lighting**: warm overall wash intensifies (cure/heat implication), specular sheen returns (sealing resin is glossy); first rim light appears on the stack edge, now that it reads as a complete unit.
- **Object visibility**: back coat layer seals the stack; full assembled stack visible together for the first time.
- **Object animation**: rise/settle, then all layers gently come to rest together — cure reads as stillness.
- **Transition**: camera pulls back and rises (crane up + dolly out) into the outro framing, continuous ease, slower pacing than earlier beats — let it breathe.
- **Caption**: "Back Coat & Final Cure" — "A sealing resin layer locks in the laminate stack, which then cures at room temperature until fully hardened and ready for demolding."
- **Expected emotional effect**: completion, solidity, trust.

## Stage 7 — Outro: Reveal
- **Manufacturing step**: demolded, finished part — bridges the abstract lamination stack back to a real product.
- **Visitor objective**: connect the technique just witnessed to actual VFG products (bus panels, defence components, etc.).
- **Camera**: full pull-back hero shot, az 0° (front-on, symmetrical/confident), elev 15°, radius 7.5, target `(0, 0.55, 0)`, FOV 40°.
- **Lighting**: clean, bright, even "showroom" lighting — raised ambient, neutral-balanced key, strong rim for a premium product-photography silhouette.
- **Object visibility**: full stack as one unified object. (Optional stretch: cross-fade/morph silhouette toward a simplified product outline — not committed for v1; v1 holds the finished stack as a clean hero shot.)
- **Object animation**: gentle continued slow turntable idle; everything else static.
- **Transition to next stage**: none — terminus. Continued scroll un-pins and returns to normal document flow into the ticker/`FeatureBar`.
- **Caption**: "Precision, Built by Hand" — "Every FRP product we manufacture — from automotive panels to defence-grade components — begins with this same hand lay-up discipline."
- **Expected emotional effect**: pride, trust — the conversion-adjacent payoff moment.

## Camera Storyboard (technical companion)

| Stage | Shot type | Movement into stage | Az° | Elev° | Radius | Target Y | FOV |
|---|---|---|---|---|---|---|---|
| 0 Intro | Wide establishing | — (hold, slow drift) | 30 | 22 | 6.0 | 0.00 | 45 |
| 1 Mold Surface | Medium, dolly-in | Continuous dolly + orbit | 20 | 20 | 4.8 | 0.05 | 40 |
| 2 Gel Coat | Medium-close | Crane up + orbit | 5 | 24 | 4.2 | 0.12 | 36 |
| 3 Surface Mat | Close | Crane up + orbit | -10 | 26 | 3.8 | 0.20 | 34 |
| 4 Chopped Strand Mat | Macro | Orbit + slight pull-back begins | -25 | 28 | 3.6 | 0.30 | 32 |
| 5 Woven Roving | Medium (structural) | Orbit reversal + crane up | -40 | 24 | 4.3 | 0.42 | 34 |
| 6 Back Coat | Medium, pulling out | Crane up + dolly out (slow) | -55 | 20 | 4.7 | 0.55 | 36 |
| 7 Outro Reveal | Wide hero shot | Full pull-back, front-on | 0 | 15 | 7.5 | 0.55 | 40 |

**Pacing note**: transitions 0→1 through 5→6 are continuous/scrubbed with scroll (no hard cuts) to keep the "watching it unfold naturally" feel; only the 6→7 move is deliberately slower-paced to mark the emotional shift from "process" to "payoff."
