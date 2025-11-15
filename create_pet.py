import base64
import json

workspace_data = {
    "workspace": {
        "blocks": {
            "languageVersion": 0,
            "blocks": [
                {
                    "type": "set_isometric_camera",
                    "id": "camera_setup",
                    "x": 0,
                    "y": 0,
                    "next": {
                        "block": {
                            "type": "create_ground",
                            "id": "ground_create",
                            "fields": { "NAME": "ground" },
                            "inputs": {
                                "WIDTH": { "block": { "type": "math_number", "fields": { "NUM": 10 }}},
                                "HEIGHT": { "block": { "type": "math_number", "fields": { "NUM": 10 }}}
                            },
                            "next": {
                                "block": {
                                    "type": "variables_set",
                                    "id": "pet_set",
                                    "fields": { "VAR": { "id": "pet_var" }},
                                    "inputs": {
                                        "VALUE": {
                                            "block": {
                                                "type": "create_sphere",
                                                "id": "pet_sphere",
                                                "fields": { "NAME": "pet" },
                                                "inputs": {
                                                    "X": { "block": { "type": "math_number", "fields": { "NUM": 0 }}},
                                                    "Y": { "block": { "type": "math_number", "fields": { "NUM": 1 }}},
                                                    "Z": { "block": { "type": "math_number", "fields": { "NUM": 0 }}}
                                                }
                                            }
                                        }
                                    },
                                    "next": {
                                        "block": {
                                            "type": "enable_physics",
                                            "id": "pet_physics",
                                            "inputs": {
                                                "NAME": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "pet_var" }}}},
                                                "MASS": { "block": { "type": "math_number", "fields": { "NUM": 1 }}}
                                            },
                                            "next": {
                                                "block": {
                                                    "type": "camera_follow",
                                                    "id": "camera_follow_pet",
                                                    "inputs": {
                                                        "OBJECT": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "pet_var" }}}}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    "type": "event_on_click",
                    "id": "feed_pet",
                    "x": 0,
                    "y": 400,
                    "inputs": {
                        "OBJECT_SELECTOR": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "pet_var" }}}},
                        "DO": {
                            "block": {
                                "type": "play_note",
                                "id": "feed_sound",
                                "fields": { "NOTE": "440.00" },
                                "inputs": {
                                    "DURATION": { "block": { "type": "math_number", "fields": { "NUM": 0.5 }}}
                                }
                            }
                        }
                    }
                },
                {
                    "type": "event_every_frame",
                    "id": "pet_movement",
                    "x": 0,
                    "y": 550,
                    "inputs": {
                        "OBJECT_SELECTOR": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "pet_var" }}}},
                        "DO": {
                            "block": {
                                "type": "controls_if",
                                "id": "random_move",
                                "inputs": {
                                    "IF0": {
                                        "block": {
                                            "type": "logic_compare",
                                            "id": "random_check",
                                            "fields": { "OP": "GT" },
                                            "inputs": {
                                                "A": { "block": { "type": "math_random_float", "id": "random_num" }},
                                                "B": { "block": { "type": "math_number", "id": "threshold", "fields": { "NUM": 0.95 }}}
                                            }
                                        }
                                    },
                                    "DO0": {
                                        "block": {
                                            "type": "apply_force",
                                            "id": "jump_force",
                                            "inputs": {
                                                "NAME": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "pet_var" }}}},
                                                "FX": { "block": { "type": "math_random_int", "inputs": { "FROM": { "block": { "type": "math_number", "fields": { "NUM": -5 }}}, "TO": { "block": { "type": "math_number", "fields": { "NUM": 5 }}} }}},
                                                "FY": { "block": { "type": "math_number", "fields": { "NUM": 5 }}},
                                                "FZ": { "block": { "type": "math_random_int", "inputs": { "FROM": { "block": { "type": "math_number", "fields": { "NUM": -5 }}}, "TO": { "block": { "type": "math_number", "fields": { "NUM": 5 }}} }}},
                                                "PX": { "block": { "type": "math_number", "fields": { "NUM": 0 }}},
                                                "PY": { "block": { "type": "math_number", "fields": { "NUM": 0 }}},
                                                "PZ": { "block": { "type": "math_number", "fields": { "NUM": 0 }}}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ],
            "variables": [
                { "name": "pet", "id": "pet_var" }
            ]
        }
    },
    "assets": [],
    "version": "1.0"
}

json_string = json.dumps(workspace_data)
base64_encoded_data = base64.b64encode(json_string.encode('utf-8')).decode('utf-8')

markdown_content = f"""---
layout: "default"
title: "Virtual Pet"
workspace_data: "{base64_encoded_data}"
---
"""

with open("_workspaces/virtual-pet.md", "w") as f:
    f.write(markdown_content)
