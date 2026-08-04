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
        "base_color_srgb": (0.96, 0.49, 0.13),  # #f47c20
        "roughness": 0.12,
        "metallic": 0.0,
        "clearcoat": 0.75,
        "clearcoat_roughness": 0.08,
        "detail": "spray",
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
cfg["base_color"] = srgb_to_linear(cfg["base_color_srgb"])

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

# Bake the procedural bump network to a real normal-map image so it survives
# glTF export (which has no concept of procedural shader nodes).
img_name = f"{stage_id}-normal"
img = bpy.data.images.new(img_name, width=512, height=512, alpha=False)
img.colorspace_settings.name = "Non-Color"

img_node = nt.nodes.new("ShaderNodeTexImage")
img_node.location = (100, -300)
img_node.image = img
nt.nodes.active = img_node
img_node.select = True

bpy.context.scene.render.engine = "CYCLES"
bpy.context.scene.cycles.device = "CPU"
bpy.context.scene.cycles.samples = 4

bpy.ops.object.bake(type="NORMAL", margin=8)

img.filepath_raw = f"{tex_dir}/{img_name}.png"
img.file_format = "PNG"
img.save()

# Rewire the material to read the baked image instead of the procedural
# network - this is what actually gets exported to glTF.
normal_map_node = nt.nodes.new("ShaderNodeNormalMap")
normal_map_node.location = (250, -150)
nt.links.new(img_node.outputs["Color"], normal_map_node.inputs["Color"])
nt.links.new(normal_map_node.outputs["Normal"], bsdf.inputs["Normal"])

# Remove the now-unused procedural nodes so the exported material graph is
# clean (glTF export only cares about what's wired into the BSDF anyway, but
# keeps the file tidy).
for n in list(nt.nodes):
    if n not in (bsdf, out, img_node, normal_map_node):
        nt.nodes.remove(n)
nt.links.new(img_node.outputs["Color"], normal_map_node.inputs["Color"])
nt.links.new(normal_map_node.outputs["Normal"], bsdf.inputs["Normal"])

bpy.ops.export_scene.gltf(
    filepath=out_path,
    export_format="GLB",
    export_image_format="AUTO",
    export_materials="EXPORT",
    use_selection=False,
)

print(f"DONE:{stage_id}")
