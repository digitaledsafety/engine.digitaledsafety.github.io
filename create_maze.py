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
                                "WIDTH": { "block": { "type": "math_number", "fields": { "NUM": 20 }}},
                                "HEIGHT": { "block": { "type": "math_number", "fields": { "NUM": 20 }}}
                            },
                            "next": {
                                "block": {
                                    "type": "variables_set",
                                    "id": "player_set",
                                    "fields": { "VAR": { "id": "player_var" }},
                                    "inputs": {
                                        "VALUE": {
                                            "block": {
                                                "type": "create_sphere",
                                                "id": "player_sphere",
                                                "fields": { "NAME": "player" },
                                                "inputs": {
                                                    "X": { "block": { "type": "math_number", "fields": { "NUM": -9 }}},
                                                    "Y": { "block": { "type": "math_number", "fields": { "NUM": 1 }}},
                                                    "Z": { "block": { "type": "math_number", "fields": { "NUM": 9 }}}
                                                }
                                            }
                                        }
                                    },
                                    "next": {
                                        "block": {
                                            "type": "enable_physics",
                                            "id": "player_physics",
                                            "inputs": {
                                                "NAME": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "player_var" }}}},
                                                "MASS": { "block": { "type": "math_number", "fields": { "NUM": 1 }}}
                                            },
                                            "next": {
                                                "block": {
                                                    "type": "set_as_player",
                                                    "id": "set_player",
                                                    "inputs": {
                                                        "OBJECT": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "player_var" }}}}
                                                    },
                                                    "next": {
                                                        "block": {
                                                            "type": "camera_follow",
                                                            "id": "camera_follow_player",
                                                            "inputs": {
                                                                "OBJECT": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "player_var" }}}}
                                                            }
                                                        }
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
                    "type": "controls_for",
                    "id": "maze_loop",
                    "x": 0,
                    "y": 400,
                    "fields": { "VAR": { "id": "i_var" }},
                    "inputs": {
                        "FROM": { "block": { "type": "math_number", "fields": { "NUM": -10 }}},
                        "TO": { "block": { "type": "math_number", "fields": { "NUM": 10 }}},
                        "BY": { "block": { "type": "math_number", "fields": { "NUM": 2 }}},
                        "DO": {
                            "block": {
                                "type": "controls_for",
                                "id": "inner_loop",
                                "fields": { "VAR": { "id": "j_var" }},
                                "inputs": {
                                    "FROM": { "block": { "type": "math_number", "fields": { "NUM": -10 }}},
                                    "TO": { "block": { "type": "math_number", "fields": { "NUM": 10 }}},
                                    "BY": { "block": { "type": "math_number", "fields": { "NUM": 2 }}},
                                    "DO": {
                                        "block": {
                                            "type": "variables_set",
                                            "id": "wall_set",
                                            "fields": { "VAR": { "id": "wall_var" }},
                                            "inputs": {
                                                "VALUE": {
                                                    "block": {
                                                        "type": "create_box",
                                                        "id": "wall_box",
                                                        "fields": { "NAME": "wall" },
                                                        "inputs": {
                                                            "X": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "i_var" }}}},
                                                            "Y": { "block": { "type": "math_number", "fields": { "NUM": 1 }}},
                                                            "Z": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "j_var" }}}}
                                                        }
                                                    }
                                                }
                                            },
                                            "next": {
                                                "block": {
                                                    "type": "enable_physics",
                                                    "id": "wall_physics",
                                                    "inputs": {
                                                        "NAME": { "block": { "type": "variables_get", "fields": { "VAR": { "id": "wall_var" }}}},
                                                        "MASS": { "block": { "type": "math_number", "fields": { "NUM": 0 }}}
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
                    "type": "on_button_press", "id": "move_f", "x": 0, "y": 800, "fields": { "BUTTON": "Up" },
                    "inputs": { "DO": { "block": { "type": "player_move", "id": "pm_f", "fields": { "DIRECTION": "FORWARD" }, "inputs": { "SPEED": { "block": { "type": "math_number", "fields": { "NUM": 5 }}}}}}}
                },
                {
                    "type": "on_button_press", "id": "move_b", "x": 0, "y": 900, "fields": { "BUTTON": "Down" },
                    "inputs": { "DO": { "block": { "type": "player_move", "id": "pm_b", "fields": { "DIRECTION": "BACKWARD" }, "inputs": { "SPEED": { "block": { "type": "math_number", "fields": { "NUM": 5 }}}}}}}
                },
                {
                    "type": "on_button_press", "id": "move_l", "x": 0, "y": 1000, "fields": { "BUTTON": "Left" },
                    "inputs": { "DO": { "block": { "type": "player_move", "id": "pm_l", "fields": { "DIRECTION": "LEFT" }, "inputs": { "SPEED": { "block": { "type": "math_number", "fields": { "NUM": 5 }}}}}}}
                },
                {
                    "type": "on_button_press", "id": "move_r", "x": 0, "y": 1100, "fields": { "BUTTON": "Right" },
                    "inputs": { "DO": { "block": { "type": "player_move", "id": "pm_r", "fields": { "DIRECTION": "RIGHT" }, "inputs": { "SPEED": { "block": { "type": "math_number", "fields": { "NUM": 5 }}}}}}}
                }
            ],
            "variables": [
                { "name": "player", "id": "player_var" },
                { "name": "i", "id": "i_var" },
                { "name": "j", "id": "j_var" },
                { "name": "wall", "id": "wall_var" }
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
title: "Maze"
workspace_data: "{base64_encoded_data}"
---
"""

with open("_workspaces/maze.md", "w") as f:
    f.write(markdown_content)
