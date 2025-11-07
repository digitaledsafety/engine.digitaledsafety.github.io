---
layout: "default"
title: "workspace-1762533702171"
workspace_data: |
{
  "workspace": {
    "blocks": {
      "languageVersion": 0,
      "blocks": [
        {
          "type": "set_isometric_camera",
          "id": "g,tm7*.V)d{:%kxi3?{p",
          "x": -133,
          "y": -249,
          "next": {
            "block": {
              "type": "create_ground",
              "id": "2LvIlbjY`8,}lIdQdr~0",
              "fields": {
                "NAME": "ground"
              },
              "inputs": {
                "WIDTH": {
                  "block": {
                    "type": "math_number",
                    "id": "WS5}Fyd{uXRQiFi@5{au",
                    "fields": {
                      "NUM": 20
                    }
                  }
                },
                "HEIGHT": {
                  "block": {
                    "type": "math_number",
                    "id": "h8gck+93%_[@-l%tPF^^",
                    "fields": {
                      "NUM": 20
                    }
                  }
                }
              },
              "next": {
                "block": {
                  "type": "variables_set",
                  "id": "Batn~GCEN;XS#u7T+yBs",
                  "fields": {
                    "VAR": {
                      "id": "player_mesh_var"
                    }
                  },
                  "inputs": {
                    "VALUE": {
                      "block": {
                        "type": "create_box",
                        "id": "9~%{sAhq|#d}Bk(A]*P1",
                        "fields": {
                          "NAME": "player"
                        },
                        "inputs": {
                          "X": {
                            "block": {
                              "type": "math_number",
                              "id": "h[%c$p-OX6tc6M(U/1+7",
                              "fields": {
                                "NUM": 0
                              }
                            }
                          },
                          "Y": {
                            "block": {
                              "type": "math_number",
                              "id": "Oe!m.Oke!r`xS6}nWhe)",
                              "fields": {
                                "NUM": 5
                              }
                            }
                          },
                          "Z": {
                            "block": {
                              "type": "math_number",
                              "id": "GGV]_9iy@o?iJ)}shLtp",
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
                      "type": "enable_physics",
                      "id": "(1/Nm)a:wT^l.SSx]#J9",
                      "inputs": {
                        "NAME": {
                          "block": {
                            "type": "variables_get",
                            "id": ")o,PW?o2nU~rLb]=Pih,",
                            "fields": {
                              "VAR": {
                                "id": "player_mesh_var"
                              }
                            }
                          }
                        },
                        "MASS": {
                          "block": {
                            "type": "math_number",
                            "id": ",uL9@:g97U4C#h~TKn!!",
                            "fields": {
                              "NUM": 1
                            }
                          }
                        }
                      },
                      "next": {
                        "block": {
                          "type": "set_as_player",
                          "id": "AWfYHU19{i/(E2:RMzy4",
                          "inputs": {
                            "OBJECT": {
                              "block": {
                                "type": "variables_get",
                                "id": "9%8yEk?D*-rg|-w%;-Uj",
                                "fields": {
                                  "VAR": {
                                    "id": "player_mesh_var"
                                  }
                                }
                              }
                            }
                          },
                          "next": {
                            "block": {
                              "type": "camera_follow",
                              "id": "Et[;K8Z`fpc%){D?U^|+",
                              "inputs": {
                                "OBJECT": {
                                  "block": {
                                    "type": "variables_get",
                                    "id": "aOX10oq6tD~/Lgm(mN4.",
                                    "fields": {
                                      "VAR": {
                                        "id": "player_mesh_var"
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
              }
            }
          }
        },
        {
          "type": "on_button_press",
          "id": "8FtxdP03ZM,@*yHoQiY:",
          "x": 50,
          "y": 350,
          "fields": {
            "BUTTON": "A"
          },
          "inputs": {
            "DO": {
              "block": {
                "type": "player_jump",
                "id": "K|+GDaaqK-/tUMBxwK|]",
                "inputs": {
                  "FORCE": {
                    "block": {
                      "type": "math_number",
                      "id": "O~l~Lh57]}DJNxBZ(I2}",
                      "fields": {
                        "NUM": 8
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
          "id": "]E1Imi(~8OQ|[cppOS32",
          "x": 50,
          "y": 550,
          "fields": {
            "BUTTON": "Right"
          },
          "inputs": {
            "DO": {
              "block": {
                "type": "player_move",
                "id": "HDf|nXFf05%$B{(-L5mu",
                "fields": {
                  "DIRECTION": "RIGHT"
                },
                "inputs": {
                  "SPEED": {
                    "block": {
                      "type": "math_number",
                      "id": "RB]c6_8SRG*6!4?Q({,T",
                      "fields": {
                        "NUM": 5
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
          "id": "g)bKo*hw%de!15hk9^:C",
          "x": 50,
          "y": 650,
          "fields": {
            "BUTTON": "Up"
          },
          "inputs": {
            "DO": {
              "block": {
                "type": "player_move",
                "id": "vCC#kB_rRaV~o0Zs^)rp",
                "fields": {
                  "DIRECTION": "FORWARD"
                },
                "inputs": {
                  "SPEED": {
                    "block": {
                      "type": "math_number",
                      "id": ".dfoJG-YB)CGv5!(AYwg",
                      "fields": {
                        "NUM": 5
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
          "id": "NpC(QJ^.DG0UK3.PW{An",
          "x": 50,
          "y": 750,
          "fields": {
            "BUTTON": "Down"
          },
          "inputs": {
            "DO": {
              "block": {
                "type": "player_move",
                "id": "McR/DAy8jJ{v~7%0(8.0",
                "fields": {
                  "DIRECTION": "BACKWARD"
                },
                "inputs": {
                  "SPEED": {
                    "block": {
                      "type": "math_number",
                      "id": "iz?mKU@uxWIj,5*^EWkz",
                      "fields": {
                        "NUM": 5
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
          "id": "*r:Jf^X|RNemnTaz8:7W",
          "x": 50,
          "y": 450,
          "fields": {
            "BUTTON": "Left"
          },
          "inputs": {
            "DO": {
              "block": {
                "type": "player_move",
                "id": "}sgs(f;*G7S,Je_5O?0N",
                "fields": {
                  "DIRECTION": "LEFT"
                },
                "inputs": {
                  "SPEED": {
                    "block": {
                      "type": "math_number",
                      "id": "k:W5b0-^7=g3`.Ja;_i^",
                      "fields": {
                        "NUM": 5
                      }
                    }
                  }
                }
              }
            }
          }
        }
      ]
    },
    "variables": [
      {
        "name": "player_mesh",
        "id": "player_mesh_var"
      },
      {
        "name": "coin_mesh",
        "id": "coin_mesh_var"
      },
      {
        "name": "score",
        "id": "score_var"
      }
    ]
  },
  "assets": [],
  "version": "1.0"
}
---
