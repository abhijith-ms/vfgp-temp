# Exports a "context-only" variant of a stage GLB with its action region
# (hand/tool, e.g. z>=0.4 local — same boundary texture_stage.py's region
# split uses) permanently deleted, geometry-only (no material/texture
# export — the ProcessStory Three.js scene applies its own controlled
# MeshStandardMaterial, not whatever baked material the source GLB carries).
#
# Why this exists: the source GLBs are single fused meshes (confirmed via
# inspection — one mesh object, no scene-graph hierarchy to hide parts of at
# runtime), a leftover of the original point-cloud reconstruction. There is
# no "hide the hand node" option in Three.js because the hand was never a
# separate node. This script is the one-time fix: actually delete those
# vertices and re-export, rather than trying to mask/clip them at runtime.
#
# Usage:
#   blender --background --python scripts/blender/strip_action_region.py -- \
#     <in.glb> <out.glb> [z_threshold]
#
# e.g.:
#   blender --background --python scripts/blender/strip_action_region.py -- \
#     public/3d/gel-coat.glb public/3d/gel-coat-mold.glb 0.4

import bpy
import bmesh
import sys

argv = sys.argv[sys.argv.index("--") + 1:]
in_path, out_path = argv[0], argv[1]
z_threshold = float(argv[2]) if len(argv) > 2 else 0.4

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=in_path)
obj = [o for o in bpy.data.objects if o.type == "MESH"][0]
bpy.context.view_layer.objects.active = obj
for o in bpy.data.objects:
    o.select_set(o == obj)

bpy.ops.object.mode_set(mode="EDIT")
bpy.ops.mesh.select_all(action="SELECT")
bpy.ops.mesh.remove_doubles(threshold=0.0001)
bpy.ops.mesh.normals_make_consistent(inside=False)
bpy.ops.object.mode_set(mode="OBJECT")

bm = bmesh.new()
bm.from_mesh(obj.data)
bm.verts.ensure_lookup_table()
to_delete = [v for v in bm.verts if v.co.z >= z_threshold]
bmesh.ops.delete(bm, geom=to_delete, context="VERTS")

# The z-threshold cut can leave tiny disconnected fragments of the deleted
# region sitting just under the cutoff (floating-point boundary noise in the
# original scan) — keep only the largest connected component (the real
# context body) rather than fine-tuning the threshold per stage.
bm.verts.ensure_lookup_table()
visited = set()
components = []
for start in bm.verts:
    if start in visited:
        continue
    comp = set()
    queue = [start]
    visited.add(start)
    while queue:
        cur = queue.pop()
        comp.add(cur)
        for e in cur.link_edges:
            other = e.other_vert(cur)
            if other not in visited:
                visited.add(other)
                queue.append(other)
    components.append(comp)
components.sort(key=len, reverse=True)
stray_verts = [v for comp in components[1:] for v in comp]
if stray_verts:
    bmesh.ops.delete(bm, geom=stray_verts, context="VERTS")

bm.to_mesh(obj.data)
bm.free()
obj.data.update()
obj.data.shade_smooth()

# Strip materials — the destination scene applies its own controlled
# MeshStandardMaterial in code, not whatever baked PBR this source carries.
obj.data.materials.clear()

bpy.ops.export_scene.gltf(
    filepath=out_path,
    export_format="GLB",
    export_materials="NONE",
    use_selection=False,
)
print(f"DONE:{out_path}")
