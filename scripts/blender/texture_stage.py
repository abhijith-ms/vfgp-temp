# UV-unwraps a stage GLB (public/3d/*.glb — trimesh point-cloud exports with
# only a POSITION attribute), applies a per-stage PBR material matching that
# stage's accentColor in handLayup.ts, bakes a procedural bump network down
# to a real normal map, and re-exports as GLB with NORMAL/TEXCOORD_0/material
# baked in. Re-run whenever a stage's material recipe (CONFIGS below) changes.
#
# Usage (per stage):
#   blender --background --python scripts/blender/texture_stage.py -- \
#     <stage-id> <in.glb> <out.glb> <texture-output-dir>
#
# e.g. for all 5 stages:
#   for s in mold-prep gel-coat fiberglass-layup structural-cure reveal; do
#     blender --background --python scripts/blender/texture_stage.py -- \
#       "$s" "public/3d/$s.glb" "/tmp/out/$s.glb" "/tmp/out/textures"
#   done
#   # then copy /tmp/out/*.glb back over public/3d/*.glb once reviewed.

import bpy
import sys
import math

argv = sys.argv[sys.argv.index("--") + 1:]
stage_id, in_path, out_path, tex_dir = argv[0], argv[1], argv[2], argv[3]

# Per-stage physical material recipe. Colors are the same hex family as each
# stage's accentColor in handLayup.ts, converted toward a plausible wet/dry
# material look for that step of the hand lay-up process. "detail" picks
# which procedural bump network to bake into the normal map.
def srgb_to_linear(c):
    return tuple(
        (v / 12.92) if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
        for v in c
    )

# base_color_srgb matches each stage's accentColor in handLayup.ts (as 0-1
# sRGB, the space hex colors/CSS/three.js's default color input live in) -
# converted to linear below before it's fed to the Principled BSDF, which
# expects linear values. Skipping that conversion produces a washed-out render.
#
# A stage may instead declare "regions": a list of {name, predicate(x,y,z),
# base_color_srgb, roughness} entries painted onto the mesh as real per-part
# color/finish (e.g. a glove distinct from the resin it's applying), plus one
# stage-level "metallic"/"clearcoat"/"clearcoat_roughness" shared by every
# region (kept flat rather than per-region, matching the single stage-level
# "detail" bump network below - only Base Color and Roughness vary by part).
# Each region's predicate runs against LOCAL mesh-space vertex coordinates
# and must be mutually exclusive/exhaustive across all of a stage's regions.
CONFIGS = {
    "mold-prep": {
        "base_color_srgb": (0.29, 0.32, 0.36),  # ~#4a5568
        "roughness": 0.30,
        "metallic": 0.12,
        "clearcoat": 0.25,
        "clearcoat_roughness": 0.15,
        "detail": "polished",
    },
    "gel-coat": {
        # Two-region pilot: threshold calibrated by rendering the stage with
        # a debug rainbow height-gradient, then a binary red/green split at a
        # few candidate Z values (see plan) - z=0.4 (local mesh space) lands
        # exactly at the wrist, cleanly separating the whole hand/glove from
        # the brush + tray + pooling gel coat below it, across all 4 viewing
        # angles checked. The brush itself stays in the "tray" region - a
        # brush dipped in resin plausibly reads as resin-coated anyway, and
        # cleanly isolating just the brush would need a cylinder-around-the-
        # shaft-axis predicate for a modest gain, not worth it for this pilot.
        "metallic": 0.0,
        "clearcoat": 0.25,
        "clearcoat_roughness": 0.35,
        "detail": "spray",
        "regions": [
            {
                "name": "applicator",
                "predicate": lambda x, y, z: z >= 0.4,
                "base_color_srgb": (0.42, 0.55, 0.68),  # nitrile blue-gray glove
                "roughness": 0.42,
            },
            {
                "name": "tray",
                "predicate": lambda x, y, z: z < 0.4,
                "base_color_srgb": (0.96, 0.49, 0.13),  # #f47c20, same as before
                "roughness": 0.12,
            },
        ],
    },
    "fiberglass-layup": {
        "base_color_srgb": (1.0, 0.76, 0.41),  # ~#ffc169
        "roughness": 0.45,
        "metallic": 0.0,
        "clearcoat": 0.25,
        "clearcoat_roughness": 0.3,
        "detail": "weave_fine",
    },
    "structural-cure": {
        "base_color_srgb": (0.10, 0.23, 0.42),  # #1a3a6b
        "roughness": 0.35,
        "metallic": 0.0,
        "clearcoat": 0.4,
        "clearcoat_roughness": 0.2,
        "detail": "weave_heavy",
    },
    "reveal": {
        "base_color_srgb": (0.067, 0.133, 0.251),  # #112240
        "roughness": 0.10,
        "metallic": 0.0,
        "clearcoat": 0.8,
        "clearcoat_roughness": 0.05,
        "detail": "polished_fine",
    },
}

cfg = CONFIGS[stage_id]
has_regions = "regions" in cfg
if not has_regions:
    cfg["base_color"] = srgb_to_linear(cfg["base_color_srgb"])


def bake_to_image(nt, name, width, height, bake_type, colorspace=None):
    """Create an image, bake the active material into it, save to tex_dir,
    return the ShaderNodeTexImage wired up to read it back. Caller is
    responsible for wiring whatever the bake_type reads (Base Color for
    DIFFUSE, the Output node's Surface for EMIT, Normal for NORMAL) *before*
    calling this."""
    img = bpy.data.images.new(name, width=width, height=height, alpha=False)
    if colorspace:
        img.colorspace_settings.name = colorspace
    node = nt.nodes.new("ShaderNodeTexImage")
    node.image = img
    # Bake targets whichever image node is active+selected - with 3 bakes
    # now happening in sequence, every earlier node must be deselected first
    # or Blender sees multiple selected image nodes and errors/picks wrong.
    for n in nt.nodes:
        n.select = False
    nt.nodes.active = node
    node.select = True
    bpy.ops.object.bake(type=bake_type, margin=8)
    img.filepath_raw = f"{tex_dir}/{name}.png"
    img.file_format = "PNG"
    img.save()
    return node


def paint_regions(obj, regions):
    """Classify every vertex into exactly one region via its predicate
    (first match wins), then paint two color-attribute layers - one holding
    that vertex's target Base Color (already sRGB->linear), one holding its
    target Roughness as a grayscale value - ready to bake to real images.
    Uses the modern `color_attributes` API, not the legacy `vertex_colors`
    one: the legacy API silently corrupted data here when two layers
    coexisted on the same mesh (every read off either layer returned the
    *other* layer's values) - confirmed as a real Blender 5.2 bug via an
    isolated repro, not a mistake in this script's own read/write logic."""
    mesh = obj.data
    color_layer = mesh.color_attributes.new(name="region_basecolor", type="FLOAT_COLOR", domain="CORNER")
    rough_layer = mesh.color_attributes.new(name="region_roughness", type="FLOAT_COLOR", domain="CORNER")
    region_by_vertex = {}
    for v in mesh.vertices:
        match = next((r for r in regions if r["predicate"](v.co.x, v.co.y, v.co.z)), regions[-1])
        region_by_vertex[v.index] = match
    for poly in mesh.polygons:
        for loop_idx in poly.loop_indices:
            region = region_by_vertex[mesh.loops[loop_idx].vertex_index]
            lin = srgb_to_linear(region["base_color_srgb"])
            color_layer.data[loop_idx].color = (*lin, 1.0)
            r = region["roughness"]
            rough_layer.data[loop_idx].color = (r, r, r, 1.0)

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=in_path)

mesh_objs = [o for o in bpy.data.objects if o.type == "MESH"]
obj = mesh_objs[0]
bpy.context.view_layer.objects.active = obj
for o in bpy.data.objects:
    o.select_set(o == obj)

# Clean up duplicate verts from the point-cloud reconstruction, recompute
# normals, then UV unwrap so we have somewhere to bake a normal map into.
bpy.ops.object.mode_set(mode="EDIT")
bpy.ops.mesh.select_all(action="SELECT")
bpy.ops.mesh.remove_doubles(threshold=0.0001)
bpy.ops.mesh.normals_make_consistent(inside=False)
bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.02)
bpy.ops.object.mode_set(mode="OBJECT")
obj.data.shade_smooth()

# Build the shader: scalar Principled BSDF inputs carry the base look
# (exported as plain glTF material scalars / KHR_materials_clearcoat), and a
# procedural bump network (never exported directly - glTF has no procedural
# nodes) is baked down to a real normal-map image so the surface reads as
# more than a flat color once in three.js.
mat = bpy.data.materials.new(name=f"{stage_id}-material")
mat.use_nodes = True
nt = mat.node_tree
nt.nodes.clear()

bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
bsdf.location = (400, 0)
out = nt.nodes.new("ShaderNodeOutputMaterial")
out.location = (700, 0)
nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])

if has_regions:
    # paint_regions needs the mesh in OBJECT mode with final (post-cleanup)
    # topology, which is exactly where we are right now.
    paint_regions(obj, cfg["regions"])
    attr_basecolor = nt.nodes.new("ShaderNodeAttribute")
    attr_basecolor.attribute_name = "region_basecolor"
    attr_basecolor.location = (-500, 400)
    nt.links.new(attr_basecolor.outputs["Color"], bsdf.inputs["Base Color"])
    attr_roughness = nt.nodes.new("ShaderNodeAttribute")
    attr_roughness.attribute_name = "region_roughness"
    attr_roughness.location = (-500, 250)
    nt.links.new(attr_roughness.outputs["Color"], bsdf.inputs["Roughness"])
else:
    bsdf.inputs["Base Color"].default_value = (*cfg["base_color"], 1.0)
    bsdf.inputs["Roughness"].default_value = cfg["roughness"]
bsdf.inputs["Metallic"].default_value = cfg["metallic"]
if "Coat Weight" in bsdf.inputs:  # Blender 4.x+ renamed Clearcoat -> Coat
    bsdf.inputs["Coat Weight"].default_value = cfg["clearcoat"]
    bsdf.inputs["Coat Roughness"].default_value = cfg["clearcoat_roughness"]
else:
    bsdf.inputs["Clearcoat"].default_value = cfg["clearcoat"]
    bsdf.inputs["Clearcoat Roughness"].default_value = cfg["clearcoat_roughness"]

tex_coord = nt.nodes.new("ShaderNodeTexCoord")
tex_coord.location = (-800, 0)

def add_noise(scale, detail_val, roughness_val, loc):
    n = nt.nodes.new("ShaderNodeTexNoise")
    n.location = loc
    n.inputs["Scale"].default_value = scale
    n.inputs["Detail"].default_value = detail_val
    n.inputs["Roughness"].default_value = roughness_val
    nt.links.new(tex_coord.outputs["Object"], n.inputs["Vector"])
    return n

def add_wave(scale, distortion, loc, rotate=0.0):
    mapping = nt.nodes.new("ShaderNodeMapping")
    mapping.location = (loc[0] - 200, loc[1])
    mapping.inputs["Rotation"].default_value = (0, 0, rotate)
    nt.links.new(tex_coord.outputs["Object"], mapping.inputs["Vector"])
    w = nt.nodes.new("ShaderNodeTexWave")
    w.location = loc
    w.inputs["Scale"].default_value = scale
    w.inputs["Distortion"].default_value = distortion
    nt.links.new(mapping.outputs["Vector"], w.inputs["Vector"])
    return w

detail = cfg["detail"]
if detail == "polished":
    height = add_noise(60.0, 6.0, 0.6, (-500, 200))
    strength = 0.15
elif detail == "polished_fine":
    height = add_noise(90.0, 4.0, 0.5, (-500, 200))
    strength = 0.06
elif detail == "spray":
    height = add_noise(140.0, 8.0, 0.7, (-500, 200))
    strength = 0.12
elif detail in ("weave_fine", "weave_heavy"):
    scale = 22.0 if detail == "weave_fine" else 12.0
    w1 = add_wave(scale, 0.0, (-500, 300), rotate=0.0)
    w2 = add_wave(scale, 0.0, (-500, 100), rotate=math.radians(90))
    combine = nt.nodes.new("ShaderNodeMixRGB")
    combine.location = (-250, 200)
    combine.blend_type = "MULTIPLY"
    combine.inputs["Fac"].default_value = 1.0
    nt.links.new(w1.outputs["Color"], combine.inputs["Color1"])
    nt.links.new(w2.outputs["Color"], combine.inputs["Color2"])
    height = combine
    strength = 0.35 if detail == "weave_fine" else 0.5
else:
    height = add_noise(50.0, 6.0, 0.6, (-500, 200))
    strength = 0.1

bump = nt.nodes.new("ShaderNodeBump")
bump.location = (100, 0)
bump.inputs["Strength"].default_value = strength
height_out = height.outputs["Color"] if "Color" in height.outputs else height.outputs[0]
nt.links.new(height_out, bump.inputs["Height"])
nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

obj.data.materials.clear()
obj.data.materials.append(mat)

bpy.context.scene.render.engine = "CYCLES"
bpy.context.scene.cycles.device = "CPU"
bpy.context.scene.cycles.samples = 4

# Bake the procedural bump network to a real normal-map image so it survives
# glTF export (which has no concept of procedural shader nodes).
normal_img_node = bake_to_image(nt, f"{stage_id}-normal", 512, 512, "NORMAL", colorspace="Non-Color")

# Rewire the material to read the baked image instead of the procedural
# network - this is what actually gets exported to glTF.
normal_map_node = nt.nodes.new("ShaderNodeNormalMap")
normal_map_node.location = (250, -150)
nt.links.new(normal_img_node.outputs["Color"], normal_map_node.inputs["Color"])
nt.links.new(normal_map_node.outputs["Normal"], bsdf.inputs["Normal"])

keep_nodes = [bsdf, out, normal_img_node, normal_map_node]

if has_regions:
    # Base Color: DIFFUSE bake with only the "Color" pass enabled captures
    # exactly the (already sRGB->linear) vertex-painted Base Color input, no
    # lighting baked in. Leave the image's default colorspace (sRGB) as-is -
    # unlike the Normal/Roughness data textures below, a glTF baseColorTexture
    # is sRGB-encoded, so Blender needs to gamma-encode these linear values
    # on save, which only happens if the image stays in the sRGB colorspace.
    bake_settings = bpy.context.scene.render.bake
    bake_settings.use_pass_direct = False
    bake_settings.use_pass_indirect = False
    bake_settings.use_pass_color = True
    basecolor_img_node = bake_to_image(nt, f"{stage_id}-basecolor", 512, 512, "DIFFUSE")
    nt.links.new(basecolor_img_node.outputs["Color"], bsdf.inputs["Base Color"])
    keep_nodes.append(basecolor_img_node)

    # Roughness: Cycles has no native "bake this arbitrary value" pass, so
    # the standard workaround is to temporarily route the value through an
    # Emission shader straight into Material Output and bake type=EMIT (the
    # raw, unlit value) - then restore the real Principled BSDF connection.
    emission = nt.nodes.new("ShaderNodeEmission")
    nt.links.new(attr_roughness.outputs["Color"], emission.inputs["Color"])
    nt.links.new(emission.outputs["Emission"], out.inputs["Surface"])
    roughness_img_node = bake_to_image(nt, f"{stage_id}-roughness", 512, 512, "EMIT", colorspace="Non-Color")
    nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])  # restore real material
    nt.links.new(roughness_img_node.outputs["Color"], bsdf.inputs["Roughness"])
    keep_nodes.append(roughness_img_node)

# Remove the now-unused procedural/attribute/temporary nodes so the exported
# material graph is clean (glTF export only cares about what's wired into
# the BSDF anyway, but keeps the file tidy).
for n in list(nt.nodes):
    if n not in keep_nodes:
        nt.nodes.remove(n)
nt.links.new(normal_img_node.outputs["Color"], normal_map_node.inputs["Color"])
nt.links.new(normal_map_node.outputs["Normal"], bsdf.inputs["Normal"])
if has_regions:
    nt.links.new(basecolor_img_node.outputs["Color"], bsdf.inputs["Base Color"])
    nt.links.new(roughness_img_node.outputs["Color"], bsdf.inputs["Roughness"])

bpy.ops.export_scene.gltf(
    filepath=out_path,
    export_format="GLB",
    export_image_format="AUTO",
    export_materials="EXPORT",
    use_selection=False,
)

print(f"DONE:{stage_id}")
