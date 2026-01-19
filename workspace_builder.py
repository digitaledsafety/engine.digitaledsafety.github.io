import json
import base64

def create_block(type, id, fields=None, inputs=None, next=None, extraState=None):
    block = {"type": type, "id": id}
    if fields: block["fields"] = fields
    if inputs: block["inputs"] = inputs
    if next: block["next"] = {"block": next}
    if extraState: block["extraState"] = extraState
    return block

# --- Setup Section ---
init_env = create_block("create_environment", "env1",
    fields={"ENABLE_SKYBOX": "TRUE", "ENABLE_GROUND": "TRUE"},
    next=create_block("set_background", "bg1",
        inputs={"BACKGROUND": {"block": {"type": "procedural_texture", "fields": {"TEXTURE": "clouds"}}}},
        next=create_block("variables_set", "set_player",
            fields={"VAR": "player"},
            inputs={"VALUE": {"block": {"type": "import_3d_file_url", "fields": {"MODEL_URL": "https://cdn.digitaleducationsafety.org/assets/models/vrm/Kohen.vrm"}}}},
            next=create_block("set_as_player", "sap1",
                inputs={"OBJECT": {"block": {"type": "variables_get", "fields": {"VAR": "player"}}}},
                next=create_block("variables_set", "set_hp",
                    fields={"VAR": "player_hp"},
                    inputs={"VALUE": {"block": {"type": "create_health_bar", "inputs": {"OBJECT": {"block": {"type": "variables_get", "fields": {"VAR": "player"}}}}}}}
                )
            )
        )
    )
)

# --- Animation Loading ---
load_anims = create_block("import_animation", "load_idle",
    fields={"URL": "https://cdn.digitaleducationsafety.org/assets/models/animations/idle.fbx", "VAR": "anim_idle"},
    next=create_block("import_animation", "load_walk",
        fields={"URL": "https://cdn.digitaleducationsafety.org/assets/models/animations/run_forward.fbx", "VAR": "anim_run"},
        next=create_block("import_animation", "load_attack",
            fields={"URL": "https://cdn.digitaleducationsafety.org/assets/models/animations/cast.fbx", "VAR": "anim_attack"}
        )
    )
)

# --- Controls ---
controls = create_block("on_button_press", "btn_space",
    fields={"BUTTON": "A"},
    inputs={"DO": {"block": create_block("apply_mixamo_animation", "apply_atk",
        inputs={
            "ANIMATION": {"block": {"type": "variables_get", "fields": {"VAR": "anim_attack"}}},
            "MODEL": {"block": {"type": "variables_get", "fields": {"VAR": "player"}}}
        },
        next=create_block("play_animation_by_index", "play_atk",
            fields={"LOOP": False},
            inputs={
                "INDEX": {"block": {"type": "math_number", "fields": {"NUM": 0}}},
                "OBJECT": {"block": {"type": "variables_get", "fields": {"VAR": "player"}}}
            }
        )
    )}}
)

# Combine all top-level blocks
workspace = {
    "blocks": {
        "languageVersion": 0,
        "blocks": [
            {**init_env, "x": 10, "y": 10},
            {**load_anims, "x": 10, "y": 300},
            {**controls, "x": 10, "y": 500}
        ]
    }
}

project_data = {
    "workspace": workspace,
    "assets": [],
    "version": "1.0"
}

print(base64.b64encode(json.dumps(project_data).encode()).decode())
