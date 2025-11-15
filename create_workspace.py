import base64
import json

workspace_data = {
    "workspace": {
        "blocks": {
            "languageVersion": 0,
            "blocks": [
                {
                    "type": "set_isometric_camera",
                    "id": "cam",
                    "x": 0,
                    "y": 0,
                    "next": {
                        "block": {
                            "type": "create_ground",
                            "id": "ground",
                            "fields": {
                                "NAME": "ground"
                            },
                            "inputs": {
                                "WIDTH": {
                                    "block": {
                                        "type": "math_number",
                                        "id": "g_w",
                                        "fields": {
                                            "NUM": 30
                                        }
                                    }
                                },
                                "HEIGHT": {
                                    "block": {
                                        "type": "math_number",
                                        "id": "g_h",
                                        "fields": {
                                            "NUM": 30
                                        }
                                    }
                                }
                            },
                            "next": {
                                "block": {
                                    "type": "variables_set",
                                    "id": "set_player_var",
                                    "fields": {
                                        "VAR": {
                                            "id": "player_var"
                                        }
                                    },
                                    "inputs": {
                                        "VALUE": {
                                            "block": {
                                                "type": "create_box",
                                                "id": "player_box",
                                                "fields": {
                                                    "NAME": "player"
                                                },
                                                "inputs": {
                                                    "X": {
                                                        "block": {
                                                            "type": "math_number",
                                                            "id": "p_x",
                                                            "fields": {
                                                                "NUM": 0
                                                            }
                                                        }
                                                    },
                                                    "Y": {
                                                        "block": {
                                                            "type": "math_number",
                                                            "id": "p_y",
                                                            "fields": {
                                                                "NUM": 1
                                                            }
                                                        }
                                                    },
                                                    "Z": {
                                                        "block": {
                                                            "type": "math_number",
                                                            "id": "p_z",
                                                            "fields": {
                                                                "NUM": 0
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "next": {
                                        "block": {
                                            "type": "variables_set",
                                            "id": "set_angle_var",
                                            "fields": {
                                                "VAR": {
                                                    "id": "turret_angle_var"
                                                }
                                            },
                                            "inputs": {
                                                "VALUE": {
                                                    "block": {
                                                        "type": "math_number",
                                                        "id": "angle_init",
                                                        "fields": {
                                                            "NUM": 0
                                                        }
                                                    }
                                                }
                                            },
                                            "next": {
                                                "block": {
                                                    "type": "set_as_player",
                                                    "id": "set_as_player",
                                                    "inputs": {
                                                        "OBJECT": {
                                                            "block": {
                                                                "type": "variables_get",
                                                                "id": "get_player1",
                                                                "fields": {
                                                                    "VAR": {
                                                                        "id": "player_var"
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
                        }}
                },
                {
                    "type": "on_button_press",
                    "id": "rotate_left",
                    "x": 0,
                    "y": 350,
                    "fields": {
                        "BUTTON": "Left"
                    },
                    "inputs": {
                        "DO": {
                            "block": {
                                "type": "variables_set",
                                "id": "dec_angle",
                                "fields": {
                                    "VAR": {
                                        "id": "turret_angle_var"
                                    }
                                },
                                "inputs": {
                                    "VALUE": {
                                        "block": {
                                            "type": "math_arithmetic",
                                            "id": "sub_angle",
                                            "fields": {
                                                "OP": "MINUS"
                                            },
                                            "inputs": {
                                                "A": {
                                                    "block": {
                                                        "type": "variables_get",
                                                        "id": "get_angle1",
                                                        "fields": {
                                                            "VAR": {
                                                                "id": "turret_angle_var"
                                                            }
                                                        }
                                                    }
                                                },
                                                "B": {
                                                    "block": {
                                                        "type": "math_number",
                                                        "id": "dec_val",
                                                        "fields": {
                                                            "NUM": 5
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "next": {
                                    "block": {
                                        "type": "rotate_object",
                                        "id": "do_rotate_left",
                                        "inputs": {
                                            "NAME": {
                                                "block": {
                                                    "type": "variables_get",
                                                    "id": "get_player2",
                                                    "fields": {
                                                        "VAR": {
                                                            "id": "player_var"
                                                        }
                                                    }
                                                }
                                            },
                                            "X": {
                                                "block": {
                                                    "type": "math_number",
                                                    "id": "rot_x_l",
                                                    "fields": {
                                                        "NUM": 0
                                                    }
                                                }
                                            },
                                            "Y": {
                                                "block": {
                                                    "type": "variables_get",
                                                    "id": "get_angle2",
                                                    "fields": {
                                                        "VAR": {
                                                            "id": "turret_angle_var"
                                                        }
                                                    }
                                                }
                                            },
                                            "Z": {
                                                "block": {
                                                    "type": "math_number",
                                                    "id": "rot_z_l",
                                                    "fields": {
                                                        "NUM": 0
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
                    "type": "on_button_press",
                    "id": "rotate_right",
                    "x": 0,
                    "y": 500,
                    "fields": {
                        "BUTTON": "Right"
                    },
                    "inputs": {
                        "DO": {
                            "block": {
                                "type": "variables_set",
                                "id": "inc_angle",
                                "fields": {
                                    "VAR": {
                                        "id": "turret_angle_var"
                                    }
                                },
                                "inputs": {
                                    "VALUE": {
                                        "block": {
                                            "type": "math_arithmetic",
                                            "id": "add_angle",
                                            "fields": {
                                                "OP": "ADD"
                                            },
                                            "inputs": {
                                                "A": {
                                                    "block": {
                                                        "type": "variables_get",
                                                        "id": "get_angle3",
                                                        "fields": {
                                                            "VAR": {
                                                                "id": "turret_angle_var"
                                                            }
                                                        }
                                                    }
                                                },
                                                "B": {
                                                    "block": {
                                                        "type": "math_number",
                                                        "id": "inc_val",
                                                        "fields": {
                                                            "NUM": 5
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "next": {
                                    "block": {
                                        "type": "rotate_object",
                                        "id": "do_rotate_right",
                                        "inputs": {
                                            "NAME": {
                                                "block": {
                                                    "type": "variables_get",
                                                    "id": "get_player3",
                                                    "fields": {
                                                        "VAR": {
                                                            "id": "player_var"
                                                        }
                                                    }
                                                }
                                            },
                                            "X": {
                                                "block": {
                                                    "type": "math_number",
                                                    "id": "rot_x_r",
                                                    "fields": {
                                                        "NUM": 0
                                                    }
                                                }
                                            },
                                            "Y": {
                                                "block": {
                                                    "type": "variables_get",
                                                    "id": "get_angle4",
                                                    "fields": {
                                                        "VAR": {
                                                            "id": "turret_angle_var"
                                                        }
                                                    }
                                                }
                                            },
                                            "Z": {
                                                "block": {
                                                    "type": "math_number",
                                                    "id": "rot_z_r",
                                                    "fields": {
                                                        "NUM": 0
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
                    "type": "on_button_press",
                    "id": "shoot",
                    "x": 0,
                    "y": 650,
                    "fields": {
                        "BUTTON": "A"
                    },
                    "inputs": {
                        "DO": {
                            "block": {
                                "type": "variables_set",
                                "id": "set_proj",
                                "fields": {
                                    "VAR": {
                                        "id": "projectile_var"
                                    }
                                },
                                "inputs": {
                                    "VALUE": {
                                        "block": {
                                            "type": "create_sphere",
                                            "id": "proj_sphere",
                                            "fields": {
                                                "NAME": "projectile"
                                            },
                                            "inputs": {
                                                "X": {
                                                    "block": {
                                                        "type": "math_number",
                                                        "id": "proj_x",
                                                        "fields": {
                                                            "NUM": 0
                                                        }
                                                    }
                                                },
                                                "Y": {
                                                    "block": {
                                                        "type": "math_number",
                                                        "id": "proj_y",
                                                        "fields": {
                                                            "NUM": 1
                                                        }
                                                    }
                                                },
                                                "Z": {
                                                    "block": {
                                                        "type": "math_number",
                                                        "id": "proj_z",
                                                        "fields": {
                                                            "NUM": 2
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "next": {
                                    "block": {
                                        "type": "enable_physics",
                                        "id": "proj_phys",
                                        "inputs": {
                                            "NAME": {
                                                "block": {
                                                    "type": "variables_get",
                                                    "id": "get_proj1",
                                                    "fields": {
                                                        "VAR": {
                                                            "id": "projectile_var"
                                                        }
                                                    }
                                                }
                                            },
                                            "MASS": {
                                                "block": {
                                                    "type": "math_number",
                                                    "id": "proj_mass",
                                                    "fields": {
                                                        "NUM": 0.1
                                                    }
                                                }
                                            }
                                        },
                                        "next": {
                                            "block": {
                                                "type": "apply_force",
                                                "id": "apply_f",
                                                "inputs": {
                                                    "NAME": {
                                                        "block": {
                                                            "type": "variables_get",
                                                            "id": "get_proj2",
                                                            "fields": {
                                                                "VAR": {
                                                                    "id": "projectile_var"
                                                                }
                                                            }
                                                        }
                                                    },
                                                    "FX": {
                                                        "block": {
                                                            "type": "math_arithmetic",
                                                            "id": "calc_fx",
                                                            "fields": {
                                                                "OP": "MULTIPLY"
                                                            },
                                                            "inputs": {
                                                                "A": {
                                                                    "block": {
                                                                        "type": "math_trig",
                                                                        "id": "sin_angle",
                                                                        "fields": {
                                                                            "OP": "SIN"
                                                                        },
                                                                        "inputs": {
                                                                            "NUM": {
                                                                                "block": {
                                                                                    "type": "variables_get",
                                                                                    "id": "get_angle5",
                                                                                    "fields": {
                                                                                        "VAR": {
                                                                                            "id": "turret_angle_var"
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                "B": {
                                                                    "block": {
                                                                        "type": "math_number",
                                                                        "id": "force_mag_x",
                                                                        "fields": {
                                                                            "NUM": 100
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    "FY": {
                                                        "block": {
                                                            "type": "math_number",
                                                            "id": "force_y",
                                                            "fields": {
                                                                "NUM": 0
                                                            }
                                                        }
                                                    },
                                                    "FZ": {
                                                        "block": {
                                                            "type": "math_arithmetic",
                                                            "id": "calc_fz",
                                                            "fields": {
                                                                "OP": "MULTIPLY"
                                                            },
                                                            "inputs": {
                                                                "A": {
                                                                    "block": {
                                                                        "type": "math_trig",
                                                                        "id": "cos_angle",
                                                                        "fields": {
                                                                            "OP": "COS"
                                                                        },
                                                                        "inputs": {
                                                                            "NUM": {
                                                                                "block": {
                                                                                    "type": "variables_get",
                                                                                    "id": "get_angle6",
                                                                                    "fields": {
                                                                                        "VAR": {
                                                                                            "id": "turret_angle_var"
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                "B": {
                                                                    "block": {
                                                                        "type": "math_number",
                                                                        "id": "force_mag_zf",
                                                                        "fields": {
                                                                            "NUM": 100
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    "PX": {
                                                        "block": {
                                                            "type": "math_number",
                                                            "id": "point_x",
                                                            "fields": {
                                                                "NUM": 0
                                                            }
                                                        }
                                                    },
                                                    "PY": {
                                                        "block": {
                                                            "type": "math_number",
                                                            "id": "point_y",
                                                            "fields": {
                                                                "NUM": 0
                                                            }
                                                        }
                                                    },
                                                    "PZ": {
                                                        "block": {
                                                            "type": "math_number",
                                                            "id": "point_z",
                                                            "fields": {
                                                                "NUM": 0
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
                }
            ],
            "variables": [
                {
                    "name": "player",
                    "id": "player_var"
                },
                {
                    "name": "turret_angle",
                    "id": "turret_angle_var"
                },
                {
                    "name": "new_projectile",
                    "id": "projectile_var"
                }
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
title: "Space Shooter"
workspace_data: "{base64_encoded_data}"
---
"""

with open("_workspaces/space-shooter.md", "w") as f:
    f.write(markdown_content)
