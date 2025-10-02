// Initialize Blockly with Drag-and-Drop Enabled

var toolbox = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Logic',
            categorystyle: 'logic_category',
            contents: [
                {
                    kind: 'category',
                    name: 'If',
                    categorystyle: 'logic_category',
                    contents: [
                        {
                            kind: 'block',
                            type: 'controls_if',
                        },
                        {
                            kind: 'block',
                            type: 'controls_if',
                            extraState: {
                                hasElse: 'true',
                            },
                        },
                        {
                            kind: 'block',
                            type: 'controls_if',
                            extraState: {
                                hasElse: 'true',
                                elseIfCount: 1,
                            },
                        },
                    ],
                },
                {
                    kind: 'category',
                    name: 'Boolean',
                    categorystyle: 'logic_category',
                    contents: [
                        {
                            kind: 'block',
                            type: 'logic_compare',
                        },
                        {
                            kind: 'block',
                            type: 'logic_operation',
                        },
                        {
                            kind: 'block',
                            type: 'logic_negate',
                        },
                        {
                            kind: 'block',
                            type: 'logic_boolean',
                        },
                        {
                            kind: 'block',
                            type: 'logic_null',
                        },
                        {
                            kind: 'block',
                            type: 'logic_ternary',
                        },
                    ],
                },
                {
                    kind: 'sep',
                },
                {
                    kind: 'category',
                    name: 'Scripting',
                    categorystyle: 'logic_category', // Or a new custom style
                    contents: [
                        {
                            kind: 'block',
                            type: 'select_object',
                        },
                        // { // attach_script_to_object - REMOVED
                        //     kind: 'block',
                        //     type: 'attach_script_to_object',
                        // },
                        {
                            kind: 'block',
                            type: 'event_on_click',
                        },
                        {
                            kind: 'block',
                            type: 'event_every_frame',
                        },
                        {
                            kind: 'block',
                            type: 'action_rotate_continuously',
                        },
                    ],
                },
            ],
        },

        {
            kind: 'category',
            name: 'Audio',
            categorystyle: 'audio_category',
            contents: [
                {
                    kind: 'block',
                    type: 'play_sound_url',
                },
                {
                    kind: 'block',
                    type: 'play_note',
                },
            ]
        },

        {
            kind: 'category',
            name: 'Game Variables',
            categorystyle: 'variable_category',
            contents: [
                { kind: 'block', type: 'set_game_variable' },
                { kind: 'block', type: 'change_game_variable_by' },
                { kind: 'block', type: 'get_game_variable' },
                { kind: 'block', type: 'show_variable_monitor' },
                { kind: 'block', type: 'hide_variable_monitor' },
            ]
        },

        {
            kind: 'category',
            name: 'Controller',
            categorystyle: 'logic_category',
            contents: [
                {
                    kind: 'block',
                    type: 'on_button_press',
                },
                {
                    kind: 'block',
                    type: 'get_joystick_direction',
                },
                {
                    kind: 'block',
                    type: 'get_joystick_force',
                }
            ]
        },
        {
            kind: 'category',
            name: 'Player',
            categorystyle: 'logic_category',
            contents: [
                {
                    kind: 'block',
                    type: 'set_as_player',
                },
                {
                    kind: 'block',
                    type: 'player_jump',
                },
                {
                    kind: 'block',
                    type: 'player_move',
                },
            ]
        },

        {
            kind: 'category',
            name: 'Camera',
            categorystyle: 'math_category',
            contents: [
                {
                    kind: 'block',
                    type: 'create_camera',
                },
                {
                    kind: 'block',
                    type: 'set_isometric_camera',
                },
                {
                    kind: 'block',
                    type: 'point_camera_at_mesh'
                },
                {
                    kind: 'block',
                    type: 'camera_follow',
                },
            ]
        },

        {
            kind: 'category',
            name: 'Objects',
            categorystyle: 'math_category',
            contents: [
                {
                    "kind": "category",
                    "name": "Transform",
                    "contents": [
                        { "kind": "block", "type": "position_model" }
                    ]
                },
                {
                    "kind": "block",
                    "type": "save_3d_model_with_position",
                    "inputs": {
                        "POS_X": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0
                                }
                            }
                        },
                        "POS_Y": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0
                                }
                            }
                        },
                        "POS_Z": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'import_3d_file_url_with_position',
                },
                {
                    kind: 'block',
                    type: 'import_3d_file_url',
                },
                {
                    kind: 'block',
                    type: 'import_3d_file',
                },
                {
                    kind: 'block',
                    type: 'create_box',
                },
                {
                    kind: 'block',
                    type: 'create_sphere',
                },
                {
                    kind: 'block',
                    type: 'move_object',
                },

                {
                    kind: 'block',
                    type: 'change_object_color',
                },
                {
                    kind: 'block',
                    type: 'rotate_object',
                },
                {
                    kind: 'block',
                    type: 'animate_object',
                }
            ]
        },

        {
            kind: 'category',
            name: 'Scene',
            categorystyle: 'math_category',
            contents: [
                {
                    kind: 'block',
                    type: 'create_camera',
                },
                {
                    kind: 'block',
                    type: 'set_isometric_camera',
                },
                {
                    kind: 'block',
                    type: 'point_camera_at_mesh'
                },
                {
                    kind: 'block',
                    type: 'create_ground',
                },
                {
                    kind: 'block',
                    type: 'set_ground_material',
                },
                {
                    kind: 'block',
                    type: 'set_ground_physics',
                },
                {
                    kind: 'block',
                    type: 'create_light',
                },
                {
                    kind: 'block',
                    type: 'set_gravity',
                },
            ]
        },

        {
            kind: 'category',
            name: 'Physics',
            categorystyle: 'math_category',
            contents: [
                {
                    kind: 'block',
                    type: 'enable_physics',
                },
                {
                    kind: 'block',
                    type: 'apply_force',
                },
                {
                    kind: 'block',
                    type: 'set_physics_impostor',
                }
            ]
        },

        {
            kind: 'category',
            name: 'Gameplay',
            categorystyle: 'logic_category',
            contents: [
                {
                    kind: 'block',
                    type: 'on_collision',
                },
                {
                    kind: 'block',
                    type: 'destroy_object',
                },
            ]
        },

        {
            kind: 'category',
            name: 'Loops',
            categorystyle: 'loop_category',
            contents: [
                {
                    kind: 'block',
                    type: 'controls_repeat_ext',
                    inputs: {
                        TIMES: {
                            block: {
                                type: 'math_number',
                                fields: {
                                    NUM: 10,
                                },
                            },
                        },
                    },
                },
                {
                    kind: 'block',
                    type: 'controls_whileUntil',
                },
                {
                    kind: 'block',
                    type: 'controls_for',
                    fields: {
                        VAR: 'i',
                    },
                    inputs: {
                        FROM: {
                            block: {
                                type: 'math_number',
                                fields: {
                                    NUM: 1,
                                },
                            },
                        },
                        TO: {
                            block: {
                                type: 'math_number',
                                fields: {
                                    NUM: 10,
                                },
                            },
                        },
                        BY: {
                            block: {
                                type: 'math_number',
                                fields: {
                                    NUM: 1,
                                },
                            },
                        },
                    },
                },
                {
                    kind: 'block',
                    type: 'controls_forEach',
                },
                {
                    kind: 'block',
                    type: 'controls_flow_statements',
                },
            ],
        },
        {
            kind: 'category',
            name: 'Math',
            categorystyle: 'math_category',
            contents: [
                {
                    kind: 'block',
                    type: 'math_number',
                    fields: {
                        NUM: 123,
                    },
                },
                {
                    kind: 'block',
                    type: 'math_arithmetic',
                    fields: {
                        OP: 'ADD',
                    },
                },
                {
                    kind: 'block',
                    type: 'math_single',
                    fields: {
                        OP: 'ROOT',
                    },
                },
                {
                    kind: 'block',
                    type: 'math_trig',
                    fields: {
                        OP: 'SIN',
                    },
                },
                {
                    kind: 'block',
                    type: 'math_constant',
                    fields: {
                        CONSTANT: 'PI',
                    },
                },
                {
                    kind: 'block',
                    type: 'math_number_property',
                    extraState: '<mutation divisor_input="false"></mutation>',
                    fields: {
                        PROPERTY: 'EVEN',
                    },
                },
                {
                    kind: 'block',
                    type: 'math_round',
                    fields: {
                        OP: 'ROUND',
                    },
                },
                {
                    kind: 'block',
                    type: 'math_on_list',
                    extraState: '<mutation op="SUM"></mutation>',
                    fields: {
                        OP: 'SUM',
                    },
                },
                {
                    kind: 'block',
                    type: 'math_modulo',
                },
                {
                    kind: 'block',
                    type: 'math_constrain',
                    inputs: {
                        LOW: {
                            block: {
                                type: 'math_number',
                                fields: {
                                    NUM: 1,
                                },
                            },
                        },
                        HIGH: {
                            block: {
                                type: 'math_number',
                                fields: {
                                    NUM: 100,
                                },
                            },
                        },
                    },
                },
                {
                    kind: 'block',
                    type: 'math_random_int',
                    inputs: {
                        FROM: {
                            block: {
                                type: 'math_number',
                                fields: {
                                    NUM: 1,
                                },
                            },
                        },
                        TO: {
                            block: {
                                type: 'math_number',
                                fields: {
                                    NUM: 100,
                                },
                            },
                        },
                    },
                },
                {
                    kind: 'block',
                    type: 'math_random_float',
                },
                {
                    kind: 'block',
                    type: 'math_atan2',
                },
            ],
        },
        {
            kind: 'category',
            name: 'Lists',
            categorystyle: 'list_category',
            contents: [
                {
                    kind: 'block',
                    type: 'lists_create_empty',
                },
                {
                    kind: 'block',
                    type: 'lists_create_with',
                    extraState: {
                        itemCount: 3,
                    },
                },
                {
                    kind: 'block',
                    type: 'lists_repeat',
                    inputs: {
                        NUM: {
                            block: {
                                type: 'math_number',
                                fields: {
                                    NUM: 5,
                                },
                            },
                        },
                    },
                },
                {
                    kind: 'block',
                    type: 'lists_length',
                },
                {
                    kind: 'block',
                    type: 'lists_isEmpty',
                },
                {
                    kind: 'block',
                    type: 'lists_indexOf',
                    fields: {
                        END: 'FIRST',
                    },
                },
                {
                    kind: 'block',
                    type: 'lists_getIndex',
                    fields: {
                        MODE: 'GET',
                        WHERE: 'FROM_START',
                    },
                },
                {
                    kind: 'block',
                    type: 'lists_setIndex',
                    fields: {
                        MODE: 'SET',
                        WHERE: 'FROM_START',
                    },
                },
            ],
        },
        {
            kind: 'sep',
        },
        {
            kind: 'category',
            name: 'Variables',
            categorystyle: 'variable_category',
            custom: 'VARIABLE',
        },
        {
            kind: 'category',
            name: 'Functions',
            categorystyle: 'procedure_category',
            custom: 'PROCEDURE',
        },
        {
            kind: 'category',
            name: 'Library',
            expanded: 'true',
            contents: [
                {
                    kind: 'category',
                    name: 'Randomize',
                    contents: [
                        {
                            kind: 'block',
                            type: 'procedures_defnoreturn',
                            extraState: {
                                params: [
                                    {
                                        name: 'list',
                                    },
                                ],
                            },
                            icons: {
                                comment: {
                                    text: 'Describe this function...',
                                    pinned: false,
                                    height: 80,
                                    width: 160,
                                },
                            },
                            fields: {
                                NAME: 'randomize',
                            },
                            inputs: {
                                STACK: {
                                    block: {
                                        type: 'controls_for',
                                        fields: {
                                            VAR: {
                                                name: 'x',
                                            },
                                        },
                                        inputs: {
                                            FROM: {
                                                block: {
                                                    type: 'math_number',
                                                    fields: {
                                                        NUM: 1,
                                                    },
                                                },
                                            },
                                            TO: {
                                                block: {
                                                    type: 'lists_length',
                                                    inline: false,
                                                    inputs: {
                                                        VALUE: {
                                                            block: {
                                                                type: 'variables_get',
                                                                fields: {
                                                                    VAR: {
                                                                        name: 'list',
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                            BY: {
                                                block: {
                                                    type: 'math_number',
                                                    fields: {
                                                        NUM: 1,
                                                    },
                                                },
                                            },
                                            DO: {
                                                block: {
                                                    type: 'variables_set',
                                                    inline: false,
                                                    fields: {
                                                        VAR: {
                                                            name: 'y',
                                                        },
                                                    },
                                                    inputs: {
                                                        VALUE: {
                                                            block: {
                                                                type: 'math_random_int',
                                                                inputs: {
                                                                    FROM: {
                                                                        block: {
                                                                            type: 'math_number',
                                                                            fields: {
                                                                                NUM: 1,
                                                                            },
                                                                        },
                                                                    },
                                                                    TO: {
                                                                        block: {
                                                                            type: 'lists_length',
                                                                            inline: false,
                                                                            inputs: {
                                                                                VALUE: {
                                                                                    block: {
                                                                                        type: 'variables_get',
                                                                                        fields: {
                                                                                            VAR: {
                                                                                                name: 'list',
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                    next: {
                                                        block: {
                                                            type: 'variables_set',
                                                            inline: false,
                                                            fields: {
                                                                VAR: {
                                                                    name: 'temp',
                                                                },
                                                            },
                                                            inputs: {
                                                                VALUE: {
                                                                    block: {
                                                                        type: 'lists_getIndex',
                                                                        fields: {
                                                                            MODE: 'GET',
                                                                            WHERE: 'FROM_START',
                                                                        },
                                                                        inputs: {
                                                                            VALUE: {
                                                                                block: {
                                                                                    type: 'variables_get',
                                                                                    fields: {
                                                                                        VAR: {
                                                                                            name: 'list',
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                            AT: {
                                                                                block: {
                                                                                    type: 'variables_get',
                                                                                    fields: {
                                                                                        VAR: {
                                                                                            name: 'y',
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                            next: {
                                                                block: {
                                                                    type: 'lists_setIndex',
                                                                    inline: false,
                                                                    fields: {
                                                                        MODE: 'SET',
                                                                        WHERE: 'FROM_START',
                                                                    },
                                                                    inputs: {
                                                                        LIST: {
                                                                            block: {
                                                                                type: 'variables_get',
                                                                                fields: {
                                                                                    VAR: {
                                                                                        name: 'list',
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                        AT: {
                                                                            block: {
                                                                                type: 'variables_get',
                                                                                fields: {
                                                                                    VAR: {
                                                                                        name: 'y',
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                        TO: {
                                                                            block: {
                                                                                type: 'lists_getIndex',
                                                                                fields: {
                                                                                    MODE: 'GET',
                                                                                    WHERE: 'FROM_START',
                                                                                },
                                                                                inputs: {
                                                                                    VALUE: {
                                                                                        block: {
                                                                                            type: 'variables_get',
                                                                                            fields: {
                                                                                                VAR: {
                                                                                                    name: 'list',
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    AT: {
                                                                                        block: {
                                                                                            type: 'variables_get',
                                                                                            fields: {
                                                                                                VAR: {
                                                                                                    name: 'x',
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                    },
                                                                    next: {
                                                                        block: {
                                                                            type: 'lists_setIndex',
                                                                            inline: false,
                                                                            fields: {
                                                                                MODE: 'SET',
                                                                                WHERE: 'FROM_START',
                                                                            },
                                                                            inputs: {
                                                                                LIST: {
                                                                                    block: {
                                                                                        type: 'variables_get',
                                                                                        fields: {
                                                                                            VAR: {
                                                                                                name: 'list',
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                },
                                                                                AT: {
                                                                                    block: {
                                                                                        type: 'variables_get',
                                                                                        fields: {
                                                                                            VAR: {
                                                                                                name: 'x',
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                },
                                                                                TO: {
                                                                                    block: {
                                                                                        type: 'variables_get',
                                                                                        fields: {
                                                                                            VAR: {
                                                                                                name: 'temp',
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        {
                            kind: 'category',
                            name: 'Jabberwocky',
                            contents: [
                                {
                                    kind: 'block',
                                    type: 'text_print',
                                    inputs: {
                                        TEXT: {
                                            block: {
                                                type: 'text',
                                                fields: {
                                                    TEXT: "'Twas brillig, and the slithy toves",
                                                },
                                            },
                                        },
                                    },
                                    next: {
                                        block: {
                                            type: 'text_print',
                                            inputs: {
                                                TEXT: {
                                                    block: {
                                                        type: 'text',
                                                        fields: {
                                                            TEXT: '  Did gyre and gimble in the wabe:',
                                                        },
                                                    },
                                                },
                                            },
                                            next: {
                                                block: {
                                                    type: 'text_print',
                                                    inputs: {
                                                        TEXT: {
                                                            block: {
                                                                type: 'text',
                                                                fields: {
                                                                    TEXT: 'All mimsy were the borogroves,',
                                                                },
                                                            },
                                                        },
                                                    },
                                                    next: {
                                                        block: {
                                                            type: 'text_print',
                                                            inputs: {
                                                                TEXT: {
                                                                    block: {
                                                                        type: 'text',
                                                                        fields: {
                                                                            TEXT: '  And the mome raths outgrabe.',
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    kind: 'block',
                                    type: 'text_print',
                                    inputs: {
                                        TEXT: {
                                            block: {
                                                type: 'text',
                                                fields: {
                                                    TEXT: '"Beware the Jabberwock, my son!',
                                                },
                                            },
                                        },
                                    },
                                    next: {
                                        block: {
                                            type: 'text_print',
                                            inputs: {
                                                TEXT: {
                                                    block: {
                                                        type: 'text',
                                                        fields: {
                                                            TEXT: '  The jaws that bite, the claws that catch!',
                                                        },
                                                    },
                                                },
                                            },
                                            next: {
                                                block: {
                                                    type: 'text_print',
                                                    inputs: {
                                                        TEXT: {
                                                            block: {
                                                                type: 'text',
                                                                fields: {
                                                                    TEXT: 'Beware the Jubjub bird, and shun',
                                                                },
                                                            },
                                                        },
                                                    },
                                                    next: {
                                                        block: {
                                                            type: 'text_print',
                                                            inputs: {
                                                                TEXT: {
                                                                    block: {
                                                                        type: 'text',
                                                                        fields: {
                                                                            TEXT: '  The frumious Bandersnatch!"',
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    ]
};

class BabylonSceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.objects = {};
        this.materials = {};
        this.player = null;
        this.moveDirection = new BABYLON.Vector3(0, 0, 0);
        this.playerSpeed = 5;
        this.perFrameFunctions = [];
        this.buttonPressActions = {};
        this.inputState = { keys: {} };
        this.joystick = null;
        this.joystick_state = {
            up: false,
            down: false,
            left: false,
            right: false,
            pressed: false,
            angle: 0,
            force: 0
        };
        this.inputMap = {
            ' ': 'A',
            'a': 'Left',
            'd': 'Right',
            'w': 'Up',
            's': 'Down'
        };
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.uiElements = [];
        this.inactivityTimer = null;
        this.gameVariables = {};
        this.variableMonitors = {};
        this.variableMonitorsContainer = document.getElementById('variable-monitors-container');

        this.initScene();
        this.initInputListeners();
        this.initJoystick();
        this.initAutoHide();
        this.runRenderLoop();
    }

    initJoystick() {
        const joystickContainer = document.getElementById('joystick-container');
        if (joystickContainer) {
            this.joystick = nipplejs.create({
                zone: joystickContainer,
                mode: 'static',
                position: { left: '50%', top: '50%' },
                color: 'grey',
                size: 120
            });

            this.joystick.on('move', (evt, data) => {
                const angle = data.angle.radian;
                const force = data.force;

                this.joystick_state.angle = data.angle.degree;
                this.joystick_state.force = data.force;

                // Reset states
                this.joystick_state.up = false;
                this.joystick_state.down = false;
                this.joystick_state.left = false;
                this.joystick_state.right = false;

                if (force > 0.5) { // Threshold to prevent accidental movement
                    if (angle > Math.PI * 0.25 && angle < Math.PI * 0.75) {
                        this.joystick_state.up = true;
                    } else if (angle > Math.PI * 1.25 && angle < Math.PI * 1.75) {
                        this.joystick_state.down = true;
                    } else if (angle > Math.PI * 0.75 && angle < Math.PI * 1.25) {
                        this.joystick_state.left = true;
                    } else if (angle < Math.PI * 0.25 || angle > Math.PI * 1.75) {
                        this.joystick_state.right = true;
                    }
                }
            });

            this.joystick.on('start', () => {
                this.joystick_state.pressed = true;
            });

            this.joystick.on('end', () => {
                this.joystick_state.up = false;
                this.joystick_state.down = false;
                this.joystick_state.left = false;
                this.joystick_state.right = false;
                this.joystick_state.pressed = false;
                this.joystick_state.angle = 0;
                this.joystick_state.force = 0;
            });
        }
    }

    initAutoHide() {
        this.uiElements = document.querySelectorAll('.interactive-ui');
        const canvasContainer = document.querySelector('.canvas-container');

        const resetTimer = () => {
            this.uiElements.forEach(el => el.classList.remove('hidden'));
            clearTimeout(this.inactivityTimer);
            this.inactivityTimer = setTimeout(() => {
                this.uiElements.forEach(el => el.classList.add('hidden'));
            }, 3000); // Hide after 3 seconds of inactivity
        };

        // Initial call to start the timer
        resetTimer();

        // Reset timer on user interaction
        canvasContainer.addEventListener('mousemove', resetTimer, false);
        canvasContainer.addEventListener('touchstart', resetTimer, { passive: true });
        canvasContainer.addEventListener('click', resetTimer, false);
    }

    // High-level API for cleaner code generation
    createBox(name, x, y, z) {
        const boxMesh = BABYLON.MeshBuilder.CreateBox(name, {}, this.scene);
        boxMesh.position.set(x, y, z);
        this.objects[name] = boxMesh;
        return boxMesh;
    }

    createSphere(name, x, y, z) {
        const sphereMesh = BABYLON.MeshBuilder.CreateSphere(name, { diameter: 1 }, this.scene);
        sphereMesh.position.set(x, y, z);
        this.objects[name] = sphereMesh;
        return sphereMesh;
    }

    async importModel(name, url, x, y, z) {
        const result = await BABYLON.SceneLoader.ImportMeshAsync(null, '', url, this.scene);
        if (result.meshes.length > 0) {
            const rootMesh = result.meshes[0];
            rootMesh.name = name;
            if (x !== undefined && y !== undefined && z !== undefined) {
                rootMesh.position = new BABYLON.Vector3(x, y, z);
            }
            this.objects[name] = rootMesh;
            return rootMesh;
        }
        return null;
    }

    move(name, x, y, z) {
        if (this.objects[name]) {
            this.objects[name].position.set(x, y, z);
        }
    }

    changeColor(name, color) {
        if (this.objects[name]) {
            if (!this.objects[name].material) {
                this.objects[name].material = new BABYLON.StandardMaterial(`${name}_material`, this.scene);
            }
            this.objects[name].material.diffuseColor = BABYLON.Color3.FromHexString(color);
        }
    }

    rotate(name, x, y, z) {
        if (this.objects[name]) {
            this.objects[name].rotation = new BABYLON.Vector3(
                BABYLON.Tools.ToRadians(x),
                BABYLON.Tools.ToRadians(y),
                BABYLON.Tools.ToRadians(z)
            );
        }
    }

    enablePhysics(name, mass, impostorType = 'BoxImpostor') {
        if (this.objects[name]) {
            const impostor = BABYLON.PhysicsImpostor[impostorType];
            this.objects[name].physicsImpostor = new BABYLON.PhysicsImpostor(this.objects[name], impostor, { mass: mass, restitution: 0.9 }, this.scene);
        }
    }

    onCollision(object1_name, object2_name, callback) {
        const obj1Mesh = this.objects[object1_name];
        const obj2Mesh = this.objects[object2_name];

        if (obj1Mesh && obj2Mesh && obj1Mesh.physicsImpostor && obj2Mesh.physicsImpostor) {
            obj1Mesh.physicsImpostor.registerOnPhysicsCollide(obj2Mesh.physicsImpostor, (main, collided) => {
                // Check if the collided object is the one we are interested in
                if (collided.object === obj2Mesh) {
                    callback();
                }
            });
        }
    }

    onClick(name, callback) {
        let targetMesh = this.objects[name];
        if (targetMesh) {
            if (!targetMesh.actionManager) {
                targetMesh.actionManager = new BABYLON.ActionManager(this.scene);
            }
            targetMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => callback(targetMesh))
            );
        }
    }

    everyFrame(name, callback) {
        let targetMesh = this.objects[name];
        if (targetMesh) {
            this.perFrameFunctions.push({
                targetMesh: targetMesh,
                func: (thisMesh, deltaTime) => callback(thisMesh, deltaTime)
            });
        }
    }

    playerJump(force) {
        if (this.player && this.player.physicsImpostor) {
            const verticalVelocity = this.player.physicsImpostor.getLinearVelocity().y;
            if (Math.abs(verticalVelocity) < 0.1) { // Simple ground check
                this.player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, force, 0), this.player.getAbsolutePosition());
            }
        }
    }

    playerMove(direction, speed) {
        if (this.player) {
            if (speed !== undefined) {
                this.playerSpeed = speed;
            }
            switch (direction) {
                case 'FORWARD': this.moveDirection.z += 1; break;
                case 'BACKWARD': this.moveDirection.z -= 1; break;
                case 'LEFT': this.moveDirection.x -= 1; break;
                case 'RIGHT': this.moveDirection.x += 1; break;
            }
        }
    }

    createGround(name, width, height) {
        const groundMesh = BABYLON.MeshBuilder.CreateGround(name, { width: width, height: height }, this.scene);
        this.objects[name] = groundMesh;
        this.setGroundPhysics(name); // Automatically add physics
        return groundMesh;
    }

    setGroundPhysics(name) {
        if (this.objects[name]) {
            this.objects[name].physicsImpostor = new BABYLON.PhysicsImpostor(this.objects[name], BABYLON.PhysicsImpostor.PlaneImpostor, { mass: 0, restitution: 0.9 }, this.scene);
        }
    }

    setGravity(x, y, z) {
        const physicsEngine = this.scene.getPhysicsEngine();
        if (physicsEngine) {
            physicsEngine.setGravity(new BABYLON.Vector3(x, y, z));
        }
    }

    createLight(name, x, y, z) {
        const light = new BABYLON.PointLight(name, new BABYLON.Vector3(x, y, z), this.scene);
        return light;
    }

    setAsPlayer(name) {
        if (this.objects[name]) {
            this.player = this.objects[name];
        }
    }

    cameraFollow(name) {
        if (this.objects[name] && this.scene.activeCamera) {
            this.scene.activeCamera.lockedTarget = this.objects[name];
        }
    }

    setIsometricCamera() {
        let camera = this.scene.activeCamera;
        if (camera) {
            camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
            const aspectRatio = this.engine.getRenderingCanvas().width / this.engine.getRenderingCanvas().height;
            const orthoSize = 10;
            camera.orthoLeft = -orthoSize * aspectRatio;
            camera.orthoRight = orthoSize * aspectRatio;
            camera.orthoBottom = -orthoSize;
            camera.orthoTop = orthoSize;
            camera.alpha = BABYLON.Tools.ToRadians(45);
            camera.beta = BABYLON.Tools.ToRadians(35.264); // Classic isometric angle
            camera.radius = 20;
            camera.setTarget(BABYLON.Vector3.Zero());
        }
    }

    // --- Game Variable Methods ---
    setGameVariable(name, value) {
        this.gameVariables[name] = value;
        if (this.variableMonitors[name]) {
            this.variableMonitors[name].querySelector('.value').textContent = value;
        }
    }

    changeGameVariable(name, delta) {
        if (typeof this.gameVariables[name] !== 'number') {
            this.gameVariables[name] = 0;
        }
        this.setGameVariable(name, this.gameVariables[name] + delta);
    }

    getGameVariable(name) {
        return this.gameVariables[name] || 0;
    }

    showVariableMonitor(name) {
        if (!this.variableMonitors[name] && this.variableMonitorsContainer) {
            const monitor = document.createElement('div');
            monitor.className = 'variable-monitor';
            monitor.innerHTML = `<span class="name">${name}:</span> <span class="value">${this.getGameVariable(name)}</span>`;
            this.variableMonitorsContainer.appendChild(monitor);
            this.variableMonitors[name] = monitor;
        }
    }

    hideVariableMonitor(name) {
        if (this.variableMonitors[name]) {
            this.variableMonitors[name].remove();
            delete this.variableMonitors[name];
        }
    }

    destroyObject(name) {
        if (this.objects[name]) {
            this.objects[name].dispose();
            delete this.objects[name];
        }
    }

    onButtonPress(button, callback) {
        if (!this.buttonPressActions[button]) {
            this.buttonPressActions[button] = [];
        }
        this.buttonPressActions[button].push(callback);
    }

    playSound(url) {
        // Create a new sound and play it.
        const sound = new BABYLON.Sound("sound", url, this.scene, null, {
            loop: false,
            autoplay: true
        });
    }

    playNote(frequency, duration) {
        if (!this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine'; // 'sine', 'square', 'sawtooth', 'triangle'
        oscillator.frequency.value = frequency;

        // Fade out to avoid clicking
        gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    initInputListeners() {
        window.addEventListener('keydown', (event) => {
            this.inputState.keys[event.key.toLowerCase()] = true;
        });
        window.addEventListener('keyup', (event) => {
            this.inputState.keys[event.key.toLowerCase()] = false;
        });
    }

    initScene() {
        const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), this.scene);
        camera.attachControl(this.canvas, true);
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), this.scene);
        const physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), physicsPlugin);
    }

    runRenderLoop() {
        let lastTime = performance.now();
        this.engine.runRenderLoop(() => {
            const currentTime = performance.now();
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            // Reset movement direction at the start of the frame
            this.moveDirection.set(0, 0, 0);

            // Handle continuous button presses via input map
            for (const key in this.inputState.keys) {
                if (this.inputState.keys[key]) { // If the physical key is pressed
                    const button = this.inputMap[key]; // Find the logical button
                    if (button && this.buttonPressActions[button]) {
                        this.buttonPressActions[button].forEach(action => action());
                    }
                }
            }

            // Handle joystick state
            if (this.joystick_state.left && this.buttonPressActions['Left']) {
                this.buttonPressActions['Left'].forEach(action => action());
            }
            if (this.joystick_state.right && this.buttonPressActions['Right']) {
                this.buttonPressActions['Right'].forEach(action => action());
            }
            if (this.joystick_state.up && this.buttonPressActions['Up']) {
                this.buttonPressActions['Up'].forEach(action => action());
            }
            if (this.joystick_state.down && this.buttonPressActions['Down']) {
                this.buttonPressActions['Down'].forEach(action => action());
            }

            // Apply calculated movement
            if (this.player && this.player.physicsImpostor) {
                const currentVelocity = this.player.physicsImpostor.getLinearVelocity();
                let newVelocity = new BABYLON.Vector3(0, currentVelocity.y, 0);

                if (this.moveDirection.lengthSquared() > 0) {
                    // Normalize to prevent faster diagonal movement and apply speed
                    const normalizedMove = this.moveDirection.normalize().scale(this.playerSpeed);
                    newVelocity.x = normalizedMove.x;
                    newVelocity.z = normalizedMove.z;
                } else {
                    // If no input, stop horizontal movement
                    newVelocity.x = 0;
                    newVelocity.z = 0;
                }

                this.player.physicsImpostor.setLinearVelocity(newVelocity);
            }

            this.perFrameFunctions.forEach(task => {
                if (task.targetMesh && !task.targetMesh.isDisposed() && typeof task.func === 'function') {
                    try {
                        task.func(task.targetMesh, deltaTime);
                    } catch (e) {
                        console.error(`Error executing per-frame function for mesh ${task.targetMesh.name}:`, e);
                    }
                }
            });
            this.scene.render();
        });
    }

    clear() {
        this.scene.dispose();
        this.scene = new BABYLON.Scene(this.engine);
        this.initScene();
        this.objects = {};
        this.materials = {};
        this.player = null;
        this.perFrameFunctions = [];
        this.buttonPressActions = {};
        this.inputState = { keys: {} }; // Reset state on clear

        // Clear game variables and monitors
        this.gameVariables = {};
        if (this.variableMonitorsContainer) {
            this.variableMonitorsContainer.innerHTML = '';
        }
        this.variableMonitors = {};
    }

    dispose() {
        this.scene.dispose();
        this.engine.dispose();
    }
}

// Define a custom theme for Digital Education Safety
Blockly.Themes.DigitalEducationSafety = Blockly.Theme.defineTheme('digital-education-safety', {
    'base': Blockly.Themes.Classic,
    'categoryStyles': {
        'logic_category': { 'colour': '#4C97FF' },
        'loop_category': { 'colour': '#5BA55B' },
        'math_category': { 'colour': '#A55B80' },
        'text_category': { 'colour': '#5B80A5' },
        'list_category': { 'colour': '#745BA5' },
        'colour_category': { 'colour': '#A5745B' },
        'variable_category': { 'colour': '#A55B5B' },
        'procedure_category': { 'colour': '#8A5BA5' },
        'audio_category': { 'colour': '#5B80A5' }
    },
    'blockStyles': {
        'logic_blocks': { 'colourPrimary': '#4C97FF', 'colourSecondary': '#6CA7FF', 'colourTertiary': '#3C87EF' },
        'loop_blocks': { 'colourPrimary': '#5BA55B', 'colourSecondary': '#7BB57B', 'colourTertiary': '#4B954B' },
        'math_blocks': { 'colourPrimary': '#A55B80', 'colourSecondary': '#B57B90', 'colourTertiary': '#954B70' },
        'list_blocks': { 'colourPrimary': '#745BA5', 'colourSecondary': '#947BB5', 'colourTertiary': '#644B95' },
        'variable_blocks': { 'colourPrimary': '#A55B5B', 'colourSecondary': '#B57B7B', 'colourTertiary': '#954B4B' },
        'procedure_blocks': { 'colourPrimary': '#8A5BA5', 'colourSecondary': '#A07BB5', 'colourTertiary': '#7A4B95' }
    },
    'componentStyles': {
        'workspaceBackgroundColour': '#F0F0F0',
        'toolboxBackgroundColour': '#E0E0E0',
        'toolboxForegroundColour': '#333333',
        'flyoutBackgroundColour': '#D0D0D0',
        'flyoutForegroundColour': '#333333',
        'scrollbarColour': '#B0B0B0',
        'insertionMarkerColour': '#FFCC00',
    },
    'fontStyle': { 'family': 'Arial, sans-serif', 'weight': 'normal', 'size': 12 }
});


        const workspace = Blockly.inject('blocklyDiv', {
            toolbox: toolbox,
            theme: Blockly.Themes.DigitalEducationSafety,
            renderer: 'thrasos',            
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2,
                pinch: true
            },
            trashcan: true
        });

        // Define Blockly Blocks
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "position_model",
                "message0": "position model %1 at X %2 Y %3 Z %4",
                "args0": [
                    {
                        "type": "field_variable",
                        "name": "MODEL",
                        "variable": "model"
                    },
                    {
                        "type": "input_value",
                        "name": "X"
                    },
                    {
                        "type": "input_value",
                        "name": "Y"
                    },
                    {
                        "type": "input_value",
                        "name": "Z"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": 160,
                "tooltip": "Sets the position of the model to the specified X, Y, and Z coordinates",
                "helpUrl": ""
            },
            {
                "type": "point_camera_at_mesh",
                "message0": "point camera at mesh %1",
                "args0": [
                    {
                        "type": "field_variable",
                        "name": "MESH",
                        "variable": "mesh"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
                "tooltip": "Points the camera at the specified mesh",
                "helpUrl": ""
            },

            {
                type: 'save_3d_model_with_position',
                message0: 'Import model URL %1 as %2\r\n',
                args0: [
                    {
                        type: 'field_input',
                        name: 'MODEL_URL',
                        text: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
                    },
                    {
                        type: 'field_variable',
                        name: 'MODEL_VAR',
                        variable: 'model',
                    },
                ],
                message1: 'Place at X %1 Y %2 Z %3',
                args1: [
                    {
                        type: 'input_value',
                        name: 'POS_X',
                    },
                    {
                        type: 'input_value',
                        name: 'POS_Y',
                    },
                    {
                        type: 'input_value',
                        name: 'POS_Z',
                    },
                ],
                inputsInline: true,
                previousStatement: null,
                nextStatement: null,
                colour: 230,
                tooltip: 'Imports a 3D model and saves it as a variable for later use, with dynamic position.',
                helpUrl: '',
                extensions: [
                    'set_max_display_length',
                ],
            },
            {
                type: 'import_3d_file_url_with_position',
                message0: 'Import 3D file from URL %1',
                args0: [
                    {
                        type: 'field_input',
                        name: 'FILE_URL',
                        text: 'https://example.com/model.gltf',
                    },
                ],
                message1: 'Place at X %1 Y %2 Z %3',
                args1: [
                    {
                        type: 'field_number',
                        name: 'POS_X',
                        value: 0,
                    },
                    {
                        type: 'field_number',
                        name: 'POS_Y',
                        value: 0,
                    },
                    {
                        type: 'field_number',
                        name: 'POS_Z',
                        value: 0,
                    },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 200,
                tooltip: 'Imports a 3D file from a URL, places it in the scene, and executes actions on success.',
                helpUrl: '',
            },
            {
                type: 'import_3d_file_url',
                message0: 'Import model URL %1 as %2\r\n',
                args0: [
                    {
                        type: 'field_input',
                        name: 'MODEL_URL',
                        text: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
                    },
                    {
                        type: 'field_variable',
                        name: 'MODEL_VAR',
                        variable: 'model',
                    },
                ],
                message1: 'Do on success %1',
                args1: [
                    {
                        type: 'input_statement',
                        name: 'ON_SUCCESS',
                    },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 200,
                tooltip: 'Imports a 3D file from a URL and executes actions on success.',
                helpUrl: '',
                extensions: [
                    'set_max_display_length',
                ],
            },

            {
                type: 'import_3d_file',
                message0: 'Import 3D file %1 from path %2',
                args0: [
                    {
                        type: 'field_input',
                        name: 'FILE_NAME',
                        text: 'filename.gltf',
                    },
                    {
                        type: 'field_input',
                        name: 'ROOT_PATH',
                        text: './models/',
                    },
                ],
                message1: 'Do on success %1',
                args1: [
                    {
                        type: 'input_statement',
                        name: 'ON_SUCCESS',
                    },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 200,
                tooltip: 'Imports a 3D file and executes actions on success.',
                helpUrl: '',
            },
            {
                type: 'set_isometric_camera',
                message0: 'Set camera to isometric view',
                args0: [],
                previousStatement: null,
                nextStatement: null,
                colour: 160,
                tooltip: 'Sets the active camera to an isometric angle pointing at the origin.',
                helpUrl: '',
            },
            {
                type: 'create_box',
                message0: 'Create box named %1 at x %2 y %3 z %4',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'box' },
                    { type: 'input_value', name: 'X', check: 'Number' },
                    { type: 'input_value', name: 'Y', check: 'Number' },
                    { type: 'input_value', name: 'Z', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 160,
                tooltip: 'Creates a box at the specified position',
            },
            {
                type: 'create_sphere',
                message0: 'Create sphere named %1 at x %2 y %3 z %4',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'sphere' },
                    { type: 'input_value', name: 'X', check: 'Number' },
                    { type: 'input_value', name: 'Y', check: 'Number' },
                    { type: 'input_value', name: 'Z', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 160,
                tooltip: 'Creates a sphere at the specified position',
            },
            {
                type: 'move_object',
                message0: 'Move object %1 to x %2 y %3 z %4',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'object' },
                    { type: 'input_value', name: 'X', check: 'Number' },
                    { type: 'input_value', name: 'Y', check: 'Number' },
                    { type: 'input_value', name: 'Z', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 210,
                tooltip: 'Moves an object to the specified position',
            },
            {
                type: 'create_light',
                message0: 'Create light named %1 at x %2 y %3 z %4',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'light' },
                    { type: 'input_value', name: 'X', check: 'Number' },
                    { type: 'input_value', name: 'Y', check: 'Number' },
                    { type: 'input_value', name: 'Z', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 65,
                tooltip: 'Creates a light at the specified position',
            },
            {
                type: 'change_object_color',
                message0: 'Change color of %1 to %2',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'object' },
                    { type: 'field_colour', name: 'COLOR', colour: '#ff0000' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 210,
                tooltip: 'Changes the color of the specified object',
            },
            {
                type: 'rotate_object',
                message0: 'Rotate %1 by x %2 y %3 z %4 degrees',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'object' },
                    { type: 'input_value', name: 'X', check: 'Number' },
                    { type: 'input_value', name: 'Y', check: 'Number' },
                    { type: 'input_value', name: 'Z', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 120,
                tooltip: 'Rotates an object by the specified angles',
            },
            {
                type: 'animate_object',
                message0: 'Animate %1 from x %2 y %3 z %4 to x %5 y %6 z %7',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'object' },
                    { type: 'input_value', name: 'X1', check: 'Number' },
                    { type: 'input_value', name: 'Y1', check: 'Number' },
                    { type: 'input_value', name: 'Z1', check: 'Number' },
                    { type: 'input_value', name: 'X2', check: 'Number' },
                    { type: 'input_value', name: 'Y2', check: 'Number' },
                    { type: 'input_value', name: 'Z2', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 300,
                tooltip: 'Animates an object from one position to another',
            },
            {
                type: 'enable_physics',
                message0: 'Enable physics on %1 with mass %2',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'object' },
                    { type: 'input_value', name: 'MASS', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 120,
                tooltip: 'Enables physics on the specified object with the given mass',
            },
            {
                type: 'apply_force',
                message0: 'Apply force to %1 x: %2 y: %3 z: %4 at point x: %5 y: %6 z: %7',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'object' },
                    { type: 'input_value', name: 'FX', check: 'Number' },
                    { type: 'input_value', name: 'FY', check: 'Number' },
                    { type: 'input_value', name: 'FZ', check: 'Number' },
                    { type: 'input_value', name: 'PX', check: 'Number' },
                    { type: 'input_value', name: 'PY', check: 'Number' },
                    { type: 'input_value', name: 'PZ', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 120,
                tooltip: 'Applies a force to the specified object at a given point',
            },
            {
                type: 'set_gravity',
                message0: 'Set scene gravity to x: %1 y: %2 z: %3',
                args0: [
                    { type: 'input_value', name: 'GX', check: 'Number' },
                    { type: 'input_value', name: 'GY', check: 'Number' },
                    { type: 'input_value', name: 'GZ', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 120,
                tooltip: 'Sets the gravity for the entire scene',
            },
            {
                type: 'set_physics_impostor',
                message0: 'Set physics impostor for %1 to %2',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'object' },
                    {
                        type: 'field_dropdown',
                        name: 'IMPOSTOR',
                        options: [
                            ['Box', 'BABYLON.PhysicsImpostor.BoxImpostor'],
                            ['Sphere', 'BABYLON.PhysicsImpostor.SphereImpostor'],
                            ['Plane', 'BABYLON.PhysicsImpostor.PlaneImpostor'],
                            ['Mesh', 'BABYLON.PhysicsImpostor.MeshImpostor']
                        ],
                    },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 120,
                tooltip: 'Sets the physics impostor type for the specified object',
            },
            {
                type: 'create_camera',
                message0: 'Create camera named %1 and save as %2',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'camera' },
                    {
                        type: 'field_variable',
                        name: 'MODEL_VAR',
                        variable: 'camera',
                    },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 180,
                tooltip: 'Creates a scene camera',
            },
            {
                type: 'create_ground',
                message0: 'Create ground named %1 with width %2 and height %3',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'ground' },
                    { type: 'input_value', name: 'WIDTH', check: 'Number' },
                    { type: 'input_value', name: 'HEIGHT', check: 'Number' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 180,
                tooltip: 'Creates a ground mesh with specified width and height',
            },
            {
                type: 'set_ground_material',
                message0: 'Set material %1 on ground %2',
                args0: [
                    { type: 'field_input', name: 'MATERIAL', text: 'material' },
                    { type: 'field_input', name: 'NAME', text: 'ground' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 180,
                tooltip: 'Sets a material on the specified ground object',
            },
            {
                type: 'set_ground_physics',
                message0: 'Enable physics on ground %1 with impostor %2',
                args0: [
                    { type: 'field_input', name: 'NAME', text: 'ground' },
                    {
                        type: 'field_dropdown',
                        name: 'IMPOSTOR',
                        options: [
                            ['Plane', 'BABYLON.PhysicsImpostor.PlaneImpostor'],
                            ['Box', 'BABYLON.PhysicsImpostor.BoxImpostor'],
                        ],
                    },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 180,
                tooltip: 'Enables physics on the ground object with the selected impostor',
            },
            // Scripting Blocks
            {
                "type": "select_object",
                "message0": "object named %1",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "OBJECT_NAME",
                        "text": "myObject" // Default text
                    }
                ],
                "output": "String", // Outputs the object name/ID as a string
                "colour": "%{BKY_LOGIC_HUE}", // Using logic hue for now
                "tooltip": "Selects an object from the scene by its name.",
                "helpUrl": ""
            },
            // { // attach_script_to_object JSON Definition - REMOVED
            //     "type": "attach_script_to_object",
            //     "message0": "attach script to %1 %2 do %3",
            //     "args0": [
            //         {
            //             "type": "input_value",
            //             "name": "OBJECT_SELECTOR",
            //             "check": "String"
            //         },
            //         {
            //             "type": "input_dummy"
            //         },
            //         {
            //             "type": "input_statement",
            //             "name": "SCRIPT_CODE"
            //         }
            //     ],
            //     "previousStatement": null,
            //     "nextStatement": null,
            //     "colour": "%{BKY_LOGIC_HUE}",
            //     "tooltip": "Attaches a script to the specified object.",
            //     "helpUrl": ""
            // },
            // Phase 2 Blockly Blocks
            {
                "type": "event_on_click",
                "message0": "when %1 is clicked %2 do %3",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "OBJECT_SELECTOR",
                        "check": "String"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "DO_CODE"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "%{BKY_LOOPS_HUE}",
                "tooltip": "Executes code when the specified object is clicked.",
                "helpUrl": ""
            },
            {
                "type": "event_every_frame",
                "message0": "for %1 every frame %2 do %3",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "OBJECT_SELECTOR",
                        "check": "String"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "DO_CODE"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "%{BKY_LOOPS_HUE}",
                "tooltip": "Executes code for the specified object every frame.",
                "helpUrl": ""
            },
            {
                "type": "action_rotate_continuously",
                "message0": "rotate current object continuously by x %1 y %2 z %3 deg/sec",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ROTATE_X_SPEED",
                        "check": "Number"
                    },
                    {
                        "type": "input_value",
                        "name": "ROTATE_Y_SPEED",
                        "check": "Number"
                    },
                    {
                        "type": "input_value",
                        "name": "ROTATE_Z_SPEED",
                        "check": "Number"
                    }
                ],
                "inputsInline": false,
                "previousStatement": null,
                "nextStatement": null,
                "colour": "%{BKY_MATH_HUE}",
                "tooltip": "Continuously rotates the object. Use inside an 'every frame' block for the target object.",
                "helpUrl": ""
            },
            // Controller Block
            {
                "type": "on_button_press",
                "message0": "on %1 button pressed %2 do %3",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "BUTTON",
                        "options": [
                            ["A", "A"],
                            ["B", "B"],
                            ["Left", "Left"],
                            ["Right", "Right"],
                            ["Up", "Up"],
                            ["Down", "Down"]
                        ]
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "DO"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "%{BKY_LOOPS_HUE}",
                "tooltip": "Executes code when a controller button is pressed.",
                "helpUrl": ""
            },
            {
                "type": "get_joystick_direction",
                "message0": "joystick direction",
                "output": "Number",
                "colour": "%{BKY_LOGIC_HUE}",
                "tooltip": "Gets the current direction of the joystick in degrees.",
                "helpUrl": ""
            },
            {
                "type": "get_joystick_force",
                "message0": "joystick force",
                "output": "Number",
                "colour": "%{BKY_LOGIC_HUE}",
                "tooltip": "Gets the current force of the joystick (0 to 1).",
                "helpUrl": ""
            },
            {
                "type": "player_jump",
                "message0": "make player jump with force %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "FORCE",
                        "check": "Number"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#4C97FF",
                "tooltip": "Makes the player character jump.",
                "helpUrl": ""
            },
            {
                "type": "player_move",
                "message0": "move player with speed %1 in direction %2",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "SPEED",
                        "check": "Number"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "DIRECTION",
                        "options": [
                            ["forward", "FORWARD"],
                            ["backward", "BACKWARD"],
                            ["left", "LEFT"],
                            ["right", "RIGHT"]
                        ]
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#4C97FF",
                "tooltip": "Moves the player character in a direction.",
                "helpUrl": ""
            },
            // Gameplay Blocks
            {
                "type": "on_collision",
                "message0": "when %1 collides with %2 %3 do %4",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "OBJECT1",
                        "check": "String"
                    },
                    {
                        "type": "input_value",
                        "name": "OBJECT2",
                        "check": "String"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "DO"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#5BA55B",
                "tooltip": "Executes code when two objects collide.",
                "helpUrl": ""
            },
            {
                "type": "destroy_object",
                "message0": "destroy object %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "OBJECT",
                        "check": "String"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#5BA55B",
                "tooltip": "Destroys the specified object.",
                "helpUrl": ""
            },
        // --- Game Variable Blocks ---
        {
            "type": "set_game_variable",
            "message0": "set %1 to %2",
            "args0": [
                {"type": "field_input", "name": "VAR_NAME", "text": "variable_name"},
                {"type": "input_value", "name": "VALUE"}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "%{BKY_VARIABLE_HUE}",
            "tooltip": "Sets a game variable to a specific value."
        },
        {
            "type": "change_game_variable_by",
            "message0": "change %1 by %2",
            "args0": [
                {"type": "field_input", "name": "VAR_NAME", "text": "variable_name"},
                {"type": "input_value", "name": "DELTA", "check": "Number"}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "%{BKY_VARIABLE_HUE}",
            "tooltip": "Changes a game variable by a certain amount."
        },
        {
            "type": "get_game_variable",
            "message0": "%1",
            "args0": [
                {"type": "field_input", "name": "VAR_NAME", "text": "variable_name"}
            ],
            "output": null,
            "colour": "%{BKY_VARIABLE_HUE}",
            "tooltip": "Gets the value of a game variable."
        },
        {
            "type": "show_variable_monitor",
            "message0": "show variable %1",
            "args0": [
                {"type": "field_input", "name": "VAR_NAME", "text": "variable_name"}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "%{BKY_VARIABLE_HUE}",
            "tooltip": "Shows a variable monitor on the screen."
        },
        {
            "type": "hide_variable_monitor",
            "message0": "hide variable %1",
            "args0": [
                {"type": "field_input", "name": "VAR_NAME", "text": "variable_name"}
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "%{BKY_VARIABLE_HUE}",
            "tooltip": "Hides a variable monitor from the screen."
        },
            {
                "type": "set_as_player",
                "message0": "set %1 as player",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "OBJECT",
                        "check": "String"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#4C97FF",
                "tooltip": "Designates the specified object as the player character.",
                "helpUrl": ""
            },
            {
                "type": "camera_follow",
                "message0": "make camera follow %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "OBJECT",
                        "check": "String"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#A55B80",
                "tooltip": "Makes the camera follow the specified object.",
                "helpUrl": ""
            },
            {
                "type": "play_sound_url",
                "message0": "play sound from URL %1",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "URL",
                        "text": "https://example.com/sound.mp3"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#5B80A5",
                "tooltip": "Plays a sound from a URL.",
                "helpUrl": ""
            },
            {
                "type": "play_note",
                "message0": "play note %1 for %2 seconds",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "NOTE",
                        "options": [
                            ["C4", "261.63"],
                            ["D4", "293.66"],
                            ["E4", "329.63"],
                            ["F4", "349.23"],
                            ["G4", "392.00"],
                            ["A4", "440.00"],
                            ["B4", "493.88"]
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "DURATION",
                        "check": "Number"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#5B80A5",
                "tooltip": "Plays a musical note for a given duration.",
                "helpUrl": ""
            }
        ]);

        {

            // --- Scripting Block Generators ---
            javascript.javascriptGenerator.forBlock['event_on_click'] = function(block, generator) {
                const objectName = generator.valueToCode(block, 'OBJECT_SELECTOR', generator.ORDER_ATOMIC) || 'null';
                const doCode = generator.statementToCode(block, 'DO_CODE');
                const callback = `function(thisMesh) {\n${doCode}\n}`;
                return `sceneManager.onClick(${objectName}, ${callback});\n`;
            };

            javascript.javascriptGenerator.forBlock['event_every_frame'] = function(block, generator) {
                const objectName = generator.valueToCode(block, 'OBJECT_SELECTOR', generator.ORDER_ATOMIC) || 'null';
                const doCode = generator.statementToCode(block, 'DO_CODE');
                const callback = `function(thisMesh, deltaTime) {\n${doCode}\n}`;
                return `sceneManager.everyFrame(${objectName}, ${callback});\n`;
            };

            javascript.javascriptGenerator.forBlock['action_rotate_continuously'] = function(block, generator) {
                const rotateXSpeed = generator.valueToCode(block, 'ROTATE_X_SPEED', generator.ORDER_ATOMIC) || 0;
                const rotateYSpeed = generator.valueToCode(block, 'ROTATE_Y_SPEED', generator.ORDER_ATOMIC) || 0;
                const rotateZSpeed = generator.valueToCode(block, 'ROTATE_Z_SPEED', generator.ORDER_ATOMIC) || 0;

                return `
if (thisMesh) {
    thisMesh.rotation.x += (${rotateXSpeed} * (Math.PI / 180)) * (deltaTime / 1000);
    thisMesh.rotation.y += (${rotateYSpeed} * (Math.PI / 180)) * (deltaTime / 1000);
    thisMesh.rotation.z += (${rotateZSpeed} * (Math.PI / 180)) * (deltaTime / 1000);
}
`;
            };

            javascript.javascriptGenerator.forBlock['select_object'] = function(block, generator) {
                const objectName = block.getFieldValue('OBJECT_NAME');
                return [`'${objectName}'`, generator.ORDER_ATOMIC];
            };

            // --- Player and Camera Block Generators ---
            javascript.javascriptGenerator.forBlock['set_as_player'] = function(block, generator) {
                const objectName = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC) || 'null';
                return `sceneManager.setAsPlayer(${objectName});\n`;
            };

            javascript.javascriptGenerator.forBlock['camera_follow'] = function(block, generator) {
                const objectName = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC) || 'null';
                return `sceneManager.cameraFollow(${objectName});\n`;
            };

            // --- Gameplay Block Generators ---
            javascript.javascriptGenerator.forBlock['on_collision'] = function(block, generator) {
                const obj1 = generator.valueToCode(block, 'OBJECT1', generator.ORDER_ATOMIC) || 'null';
                const obj2 = generator.valueToCode(block, 'OBJECT2', generator.ORDER_ATOMIC) || 'null';
                const doCode = generator.statementToCode(block, 'DO');
                const callback = `function() {\n${doCode}\n}`;
                return `sceneManager.onCollision(${obj1}, ${obj2}, ${callback});\n`;
            };

            javascript.javascriptGenerator.forBlock['destroy_object'] = function(block, generator) {
                const objectName = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC) || 'null';
                return `sceneManager.destroyObject(${objectName});\n`;
            };

            // --- Game Variable Block Generators ---
            javascript.javascriptGenerator.forBlock['set_game_variable'] = function(block, generator) {
                const varName = block.getFieldValue('VAR_NAME');
                const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || '0';
                return `sceneManager.setGameVariable('${varName}', ${value});\n`;
            };

            javascript.javascriptGenerator.forBlock['change_game_variable_by'] = function(block, generator) {
                const varName = block.getFieldValue('VAR_NAME');
                const delta = generator.valueToCode(block, 'DELTA', generator.ORDER_ATOMIC) || '0';
                return `sceneManager.changeGameVariable('${varName}', ${delta});\n`;
            };

            javascript.javascriptGenerator.forBlock['get_game_variable'] = function(block, generator) {
                const varName = block.getFieldValue('VAR_NAME');
                return [`sceneManager.getGameVariable('${varName}')`, generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['show_variable_monitor'] = function(block, generator) {
                const varName = block.getFieldValue('VAR_NAME');
                return `sceneManager.showVariableMonitor('${varName}');\n`;
            };

            javascript.javascriptGenerator.forBlock['hide_variable_monitor'] = function(block, generator) {
                const varName = block.getFieldValue('VAR_NAME');
                return `sceneManager.hideVariableMonitor('${varName}');\n`;
            };

            // --- Controller Block Generator ---
            javascript.javascriptGenerator.forBlock['on_button_press'] = function(block, generator) {
                const button = block.getFieldValue('BUTTON');
                const doCode = generator.statementToCode(block, 'DO');
                const callback = `function() {\n${doCode}\n}`;
                return `sceneManager.onButtonPress('${button}', ${callback});\n`;
            };

            javascript.javascriptGenerator.forBlock['get_joystick_direction'] = function(block, generator) {
                return ['sceneManager.joystick_state.angle', generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['get_joystick_force'] = function(block, generator) {
                return ['sceneManager.joystick_state.force', generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['player_jump'] = function(block, generator) {
                const force = generator.valueToCode(block, 'FORCE', generator.ORDER_ATOMIC) || '5';
                return `sceneManager.playerJump(${force});\n`;
            };

            javascript.javascriptGenerator.forBlock['player_move'] = function(block, generator) {
                const speed = generator.valueToCode(block, 'SPEED', generator.ORDER_ATOMIC) || '1';
                const direction = block.getFieldValue('DIRECTION');
                return `sceneManager.playerMove('${direction}', ${speed});\n`;
            };

            // --- Simplified JavaScript Generators ---
            javascript.javascriptGenerator.forBlock['position_model'] = function (block, generator) {
                const modelVar = generator.nameDB_.getName(block.getFieldValue('MODEL'), Blockly.Variables.NAME_TYPE);
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0';
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0';
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || '0';
                return `sceneManager.move(${modelVar}.name, ${x}, ${y}, ${z});\n`;
            };

            javascript.javascriptGenerator.forBlock['create_camera'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                // This block is now mostly for semantic purpose, as camera is initialized.
                // We can consider removing it or making it switch between camera types.
                return `// Camera is managed by the sceneManager\n`;
            };

            javascript.javascriptGenerator.forBlock['point_camera_at_mesh'] = function (block, generator) {
                const meshVar = generator.nameDB_.getName(block.getFieldValue('MESH'), Blockly.Variables.NAME_TYPE);
                return `sceneManager.cameraFollow(${meshVar}.name);\n`;
            };

            javascript.javascriptGenerator.forBlock['save_3d_model_with_position'] = function (block, generator) {
                const modelUrl = block.getFieldValue('MODEL_URL');
                const modelVarName = generator.nameDB_.getName(block.getFieldValue('MODEL_VAR'), Blockly.Variables.NAME_TYPE);
                const posX = generator.valueToCode(block, 'POS_X', generator.ORDER_ATOMIC) || '0';
                const posY = generator.valueToCode(block, 'POS_Y', generator.ORDER_ATOMIC) || '0';
                const posZ = generator.valueToCode(block, 'POS_Z', generator.ORDER_ATOMIC) || '0';
                return `var ${modelVarName} = await sceneManager.importModel('${modelVarName}', '${modelUrl}', ${posX}, ${posY}, ${posZ});\n`;
            };

            javascript.javascriptGenerator.forBlock['import_3d_file_url_with_position'] = function (block, generator) {
                const fileUrl = block.getFieldValue('FILE_URL');
                const posX = block.getFieldValue('POS_X');
                const posY = block.getFieldValue('POS_Y');
                const posZ = block.getFieldValue('POS_Z');
                const baseName = (fileUrl.substring(fileUrl.lastIndexOf('/') + 1) || 'importedModel').replace(/[^a-zA-Z0-9]/g, '_');
                return `await sceneManager.importModel('${baseName}', '${fileUrl}', ${posX}, ${posY}, ${posZ});\n`;
            };

            javascript.javascriptGenerator.forBlock['import_3d_file_url'] = function (block, generator) {
                const modelUrl = block.getFieldValue('MODEL_URL');
                const modelVarName = generator.nameDB_.getName(block.getFieldValue('MODEL_VAR'), Blockly.Variables.NAME_TYPE);
                const onSuccessCode = generator.statementToCode(block, 'ON_SUCCESS') || '';
                let code = `var ${modelVarName} = await sceneManager.importModel('${modelVarName}', '${modelUrl}');\n`;
                if (onSuccessCode) {
                    code += `if (${modelVarName}) {\n${onSuccessCode}}\n`;
                }
                return code;
            };

            javascript.javascriptGenerator.forBlock['set_isometric_camera'] = function (block, generator) {
                return `sceneManager.setIsometricCamera();\n`;
            };

            javascript.javascriptGenerator.forBlock['import_3d_file'] = function (block, generator) {
                const fileName = block.getFieldValue('FILE_NAME');
                const rootPath = block.getFieldValue('ROOT_PATH');
                const onSuccessCode = generator.statementToCode(block, 'ON_SUCCESS') || '';
                const baseName = (fileName.replace(/[^a-zA-Z0-9]/g, '_') || 'importedFileModel');
                return `// Local file import is not supported in this environment.\n// Please use URL-based import blocks.\n`;
            };

            javascript.javascriptGenerator.forBlock['create_ground'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const width = generator.valueToCode(block, 'WIDTH', generator.ORDER_ATOMIC) || 10;
                const height = generator.valueToCode(block, 'HEIGHT', generator.ORDER_ATOMIC) || 10;
                return `sceneManager.createGround('${name}', ${width}, ${height});\n`;
            };

            javascript.javascriptGenerator.forBlock['set_ground_material'] = function (block, generator) {
                // This block is less relevant now, could be replaced with a generic color/texture block.
                return `// Material settings can be adjusted with changeColor or future texture blocks.\n`;
            };

            javascript.javascriptGenerator.forBlock['set_ground_physics'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                return `sceneManager.setGroundPhysics('${name}');\n`;
            };

            javascript.javascriptGenerator.forBlock['create_box'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || 0;
                return `sceneManager.createBox('${name}', ${x}, ${y}, ${z});\n`;
            };

            javascript.javascriptGenerator.forBlock['create_sphere'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || 0;
                return `sceneManager.createSphere('${name}', ${x}, ${y}, ${z});\n`;
            };

            javascript.javascriptGenerator.forBlock['move_object'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || 0;
                return `sceneManager.move('${name}', ${x}, ${y}, ${z});\n`;
            };

            javascript.javascriptGenerator.forBlock['create_light'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || 0;
                return `sceneManager.createLight('${name}', ${x}, ${y}, ${z});\n`;
            };

            javascript.javascriptGenerator.forBlock['change_object_color'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const color = block.getFieldValue('COLOR');
                return `sceneManager.changeColor('${name}', '${color}');\n`;
            };

            javascript.javascriptGenerator.forBlock['rotate_object'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || 0;
                return `sceneManager.rotate('${name}', ${x}, ${y}, ${z});\n`;
            };

            javascript.javascriptGenerator.forBlock['animate_object'] = function (block, generator) {
                 // This block is complex and would require a dedicated helper in the SceneManager.
                 // For now, we'll leave its generation logic but acknowledge it's not fully abstracted.
                const name = block.getFieldValue('NAME');
                const x1 = generator.valueToCode(block, 'X1', generator.ORDER_ATOMIC) || 0;
                const y1 = generator.valueToCode(block, 'Y1', generator.ORDER_ATOMIC) || 0;
                const z1 = generator.valueToCode(block, 'Z1', generator.ORDER_ATOMIC) || 0;
                const x2 = generator.valueToCode(block, 'X2', generator.ORDER_ATOMIC) || 0;
                const y2 = generator.valueToCode(block, 'Y2', generator.ORDER_ATOMIC) || 0;
                const z2 = generator.valueToCode(block, 'Z2', generator.ORDER_ATOMIC) || 0;
                return `// Animation for '${name}' needs a dedicated helper function.\n`;
            };

            javascript.javascriptGenerator.forBlock['enable_physics'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const mass = generator.valueToCode(block, 'MASS', generator.ORDER_ATOMIC) || 1;
                return `sceneManager.enablePhysics('${name}', ${mass});\n`;
            };

            javascript.javascriptGenerator.forBlock['apply_force'] = function (block, generator) {
                // This is a more advanced physics function. A helper could be added if needed frequently.
                const name = block.getFieldValue('NAME');
                const fx = generator.valueToCode(block, 'FX', generator.ORDER_ATOMIC) || 0;
                const fy = generator.valueToCode(block, 'FY', generator.ORDER_ATOMIC) || 0;
                const fz = generator.valueToCode(block, 'FZ', generator.ORDER_ATOMIC) || 0;
                return `// Apply force requires direct physics access, consider a high-level alternative.\n`;
            };

            javascript.javascriptGenerator.forBlock['set_gravity'] = function (block, generator) {
                const gx = generator.valueToCode(block, 'GX', generator.ORDER_ATOMIC) || 0;
                const gy = generator.valueToCode(block, 'GY', generator.ORDER_ATOMIC) || -9.81;
                const gz = generator.valueToCode(block, 'GZ', generator.ORDER_ATOMIC) || 0;
                return `sceneManager.setGravity(${gx}, ${gy}, ${gz});\n`;
            };

            javascript.javascriptGenerator.forBlock['set_physics_impostor'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const impostorField = block.getFieldValue('IMPOSTOR');
                // Extract the type from the full BABYLON path
                const impostorType = impostorField.split('.').pop();
                return `// Physics impostor is now set via enablePhysics. For '${name}', you can specify type.\n`;
            };

            // --- Audio Block Generators ---
            javascript.javascriptGenerator.forBlock['play_sound_url'] = function(block, generator) {
                const url = block.getFieldValue('URL');
                return `sceneManager.playSound('${url}');\n`;
            };

            javascript.javascriptGenerator.forBlock['play_note'] = function(block, generator) {
                const note = block.getFieldValue('NOTE');
                const duration = generator.valueToCode(block, 'DURATION', generator.ORDER_ATOMIC) || '0.5';
                return `sceneManager.playNote(${note}, ${duration});\n`;
            };
        }

        // Convert Blockly Code to JavaScript
        function generateCode() {
            return javascript.javascriptGenerator.workspaceToCode(workspace);
        }

        // Resize canvas to fit its container
        function resizeCanvas() {
            const container = document.querySelector('.canvas-container');
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            if (sceneManager && sceneManager.engine) {
                sceneManager.engine.resize();
            }

            // Adjust orthographic camera parameters if in isometric mode
            if (sceneManager && sceneManager.scene && sceneManager.scene.activeCamera) {
                const camera = sceneManager.scene.activeCamera;
                if (camera.mode === BABYLON.Camera.ORTHOGRAPHIC_CAMERA) {
                    const aspectRatio = canvas.width / canvas.height;
                    const orthoSize = 10;
                    camera.orthoLeft = -orthoSize * aspectRatio;
                    camera.orthoRight = orthoSize * aspectRatio;
                    camera.orthoBottom = -orthoSize;
                    camera.orthoTop = orthoSize;
                }  
            } 
        }

        function saveWorkspace() {
            var workspace = Blockly.getMainWorkspace();
            var state = Blockly.serialization.workspaces.save(workspace);
            console.log(state);
            localStorage.setItem('myProgram', JSON.stringify(state));
        }

        function loadWorkspace(button) {
            const state = localStorage.getItem('myProgram');
            var workspace = Blockly.getMainWorkspace();
            Blockly.serialization.workspaces.load(JSON.parse(state), workspace);
        }

        function loadWorkspaceDefault() {
            let state = {
                "blocks": {
                    "languageVersion": 0,
                    "blocks": [
                        // Setup Scene
                        {
                            "type": "set_isometric_camera",
                            "next": {
                                "block": {
                                    "type": "create_ground", "id": "ground", "x": 50, "y": 50,
                                    "fields": { "NAME": "ground" },
                                    "inputs": {
                                        "WIDTH": { "block": { "type": "math_number", "fields": { "NUM": 20 } } },
                                        "HEIGHT": { "block": { "type": "math_number", "fields": { "NUM": 20 } } }
                                    },
                                    "next": {
                                        "block": {
                                            "type": "create_box", "id": "p_box",
                                            "fields": { "NAME": "player" },
                                            "inputs": {
                                                "X": { "block": { "type": "math_number", "fields": { "NUM": 0 } } },
                                                "Y": { "block": { "type": "math_number", "fields": { "NUM": 5 } } },
                                                "Z": { "block": { "type": "math_number", "fields": { "NUM": 0 } } }
                                            },
                                            "next": {
                                                "block": {
                                                    "type": "enable_physics", "id": "p_phys",
                                                    "fields": { "NAME": "player" },
                                                    "inputs": {
                                                        "MASS": { "block": { "type": "math_number", "fields": { "NUM": 1 } } }
                                                    },
                                                    "next": {
                                                        "block": {
                                                            "type": "set_as_player", "id": "p_set",
                                                            "inputs": { "OBJECT": { "block": { "type": "text", "fields": { "TEXT": "player" } } } },
                                                            "next": {
                                                                "block": {
                                                                    "type": "camera_follow", "id": "cam_f",
                                                                    "inputs": { "OBJECT": { "block": { "type": "text", "fields": { "TEXT": "player" } } } }
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
                        // Controls
                        {
                            "type": "on_button_press", "id": "jump_ctl", "x": 50, "y": 350, "fields": { "BUTTON": "A" },
                            "inputs": { "DO": { "block": { "type": "player_jump", "id": "jump_act", "inputs": { "FORCE": { "block": { "type": "math_number", "fields": { "NUM": 8 } } } } } } }
                        },
                        {
                            "type": "on_button_press", "id": "left_ctl", "x": 50, "y": 450, "fields": { "BUTTON": "Left" },
                            "inputs": { "DO": { "block": { "type": "player_move", "id": "left_act", "fields": { "DIRECTION": "LEFT" }, "inputs": { "SPEED": { "block": { "type": "math_number", "fields": { "NUM": 5 } } } } } } }
                        },
                        {
                            "type": "on_button_press", "id": "right_ctl", "x": 50, "y": 550, "fields": { "BUTTON": "Right" },
                            "inputs": { "DO": { "block": { "type": "player_move", "id": "right_act", "fields": { "DIRECTION": "RIGHT" }, "inputs": { "SPEED": { "block": { "type": "math_number", "fields": { "NUM": 5 } } } } } } }
                        },
                        {
                            "type": "on_button_press", "id": "up_ctl", "x": 50, "y": 650, "fields": { "BUTTON": "Up" },
                            "inputs": { "DO": { "block": { "type": "player_move", "id": "up_act", "fields": { "DIRECTION": "FORWARD" }, "inputs": { "SPEED": { "block": { "type": "math_number", "fields": { "NUM": 5 } } } } } } }
                        },
                        {
                            "type": "on_button_press", "id": "down_ctl", "x": 50, "y": 750, "fields": { "BUTTON": "Down" },
                            "inputs": { "DO": { "block": { "type": "player_move", "id": "down_act", "fields": { "DIRECTION": "BACKWARD" }, "inputs": { "SPEED": { "block": { "type": "math_number", "fields": { "NUM": 5 } } } } } } }
                        },
                        // Coin
                        {
                            "type": "create_box", "id": "coin", "x": 400, "y": 50,
                            "fields": { "NAME": "coin" },
                            "inputs": {
                                "X": { "block": { "type": "math_number", "fields": { "NUM": 5 } } },
                                "Y": { "block": { "type": "math_number", "fields": { "NUM": 2 } } },
                                "Z": { "block": { "type": "math_number", "fields": { "NUM": 0 } } }
                            },
                             "next": {
                                 "block": {
                                     "type": "change_object_color", "id": "c_color", "fields": { "NAME": "coin", "COLOR": "#FFD700" },
                                     "next": {
                                         "block": {
                                             "type": "enable_physics", "id": "c_phys",
                                             "fields": { "NAME": "coin" },
                                             "inputs": {
                                                 "MASS": { "block": { "type": "math_number", "fields": { "NUM": 0 } } }
                                             }
                                         }
                                     }
                                 }
                             }
                        },
                        // Score variable setup
                        {
                            "type": "set_game_variable", "x": 50, "y": 850,
                            "fields": { "VAR_NAME": "score" },
                            "inputs": {
                                "VALUE": { "block": { "type": "math_number", "fields": { "NUM": 0 } } }
                            },
                            "next": {
                                "block": {
                                    "type": "show_variable_monitor",
                                    "fields": { "VAR_NAME": "score" }
                                }
                            }
                        },
                        // Collision logic
                        {
                            "type": "on_collision", "x": 400, "y": 150,
                            "inputs": {
                                "OBJECT1": { "block": { "type": "select_object", "fields": { "OBJECT_NAME": "player" } } },
                                "OBJECT2": { "block": { "type": "select_object", "fields": { "OBJECT_NAME": "coin" } } },
                                "DO": {
                                    "block": {
                                        "type": "change_game_variable_by",
                                        "fields": { "VAR_NAME": "score" },
                                        "inputs": {
                                            "DELTA": { "block": { "type": "math_number", "fields": { "NUM": 1 } } }
                                        },
                                        "next": {
                                            "block": {
                                                "type": "destroy_object",
                                                "inputs": {
                                                    "OBJECT": { "block": { "type": "select_object", "fields": { "OBJECT_NAME": "coin" } } }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            };
            var workspace = Blockly.getMainWorkspace();
            Blockly.serialization.workspaces.load(state, workspace);
            doRun();
        }

        async function doRun() {
            let codeToRun = '';
            if (currentView === 'blockly') {
                codeToRun = generateCode();
            } else if (currentView === 'javascript' && monacoEditorInstance) {
                codeToRun = monacoEditorInstance.getValue();
            } else {
                console.error("No valid code source found.");
                return;
            }

            sceneManager.clear();

            try {
                const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
                const userGeneratedCode = new AsyncFunction('sceneManager', codeToRun);
                await userGeneratedCode(sceneManager);
            } catch (error) {
                console.error('Error executing code:', error);
            }
        }

        const helper = function () {
            this.getField('MODEL_URL').maxDisplayLength = 16;
        }
        Blockly.Extensions.register('set_max_display_length', helper);

        const canvas = document.getElementById('gameCanvas');
        let sceneManager = new BabylonSceneManager(canvas);


        document.getElementById('runButton').addEventListener('click', () => {
            doRun();
        });
        document.getElementById('saveButton').addEventListener('click', () => {
            saveWorkspace();
        });
        document.getElementById('loadButton').addEventListener('click', () => {
            loadWorkspace();
        });

        document.getElementById('shareButton').addEventListener('click', () => {
            const workspace = Blockly.getMainWorkspace();
            const state = Blockly.serialization.workspaces.save(workspace);
            const jsonState = JSON.stringify(state);
            const base64State = btoa(jsonState);
            const url = new URL(window.location.href);
            url.searchParams.set('project', base64State);
            console.log('Shareable URL:', url.href);
            navigator.clipboard.writeText(url.href).then(() => {
                alert('Shareable link copied to clipboard!');
            }, (err) => {
                console.error('Could not copy text: ', err);
                alert('Failed to copy link. Please copy it manually from the console.');
            });
        });

        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            const canvasContainer = document.querySelector('.canvas-container');
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                if (canvasContainer.requestFullscreen) {
                    canvasContainer.requestFullscreen();
                } else if (canvasContainer.mozRequestFullScreen) { /* Firefox */
                    canvasContainer.mozRequestFullScreen();
                } else if (canvasContainer.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    canvasContainer.webkitRequestFullscreen();
                } else if (canvasContainer.msRequestFullscreen) { /* IE/Edge */
                    canvasContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE/Edge */
                    document.msExitFullscreen();
                }
            }
        });

        document.addEventListener('fullscreenchange', resizeCanvas);
        document.addEventListener('webkitfullscreenchange', resizeCanvas);
        document.addEventListener('mozfullscreenchange', resizeCanvas);
        document.addEventListener('MSFullscreenChange', resizeCanvas);


        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // --- Monaco Editor & View Switching Logic ---
        const blocklyDiv = document.getElementById('blocklyDiv');
        const monacoEditorContainer = document.getElementById('monacoEditorContainer');
        const showBlocksButton = document.getElementById('showBlocksButton');
        const showJsButton = document.getElementById('showJsButton');
        let monacoEditorInstance = null;
        let currentView = 'blockly'; // 'blockly' or 'javascript'

        // Initialize Monaco Editor
        require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs' }});
        require(['vs/editor/editor.main'], function() {
            monacoEditorInstance = monaco.editor.create(monacoEditorContainer, {
                language: 'javascript',
                theme: 'vs-light', // Or 'vs-dark'
                readOnly: false, // Allow editing
                automaticLayout: true // Adjusts editor layout on container resize
            });
            // Initial population when editor is ready
            if (currentView === 'javascript') {
                populateMonacoWithBlocklyCode();
            }
        });

        function populateMonacoWithBlocklyCode() {
            if (monacoEditorInstance) {
                const blocklyJsCode = generateCode(); // generateCode() is already defined
                monacoEditorInstance.setValue(blocklyJsCode);
            }
        }

        showBlocksButton.addEventListener('click', () => {
            if (currentView === 'javascript') {
                blocklyDiv.style.display = 'block';
                monacoEditorContainer.style.display = 'none';
                currentView = 'blockly';
                // Potentially trigger a resize/refresh for Blockly if needed
                Blockly.svgResize(workspace);
                console.log("Switched to Blockly view");
            }
        });

        showJsButton.addEventListener('click', () => {
            if (currentView === 'blockly') {
                populateMonacoWithBlocklyCode(); // Update Monaco content before showing
                blocklyDiv.style.display = 'none';
                monacoEditorContainer.style.display = 'block';
                currentView = 'javascript';
                if (monacoEditorInstance) {
                     // It's good practice to explicitly tell Monaco to layout itself
                     // when its container becomes visible or changes size,
                     // especially if automaticLayout isn't perfectly handling all cases.
                    monacoEditorInstance.layout();
                }
                console.log("Switched to JavaScript view");
            }
        });

        // Adjust save/load/run if they need to be aware of the current view
        // For now, run will always use Blockly code, save/load workspace.
        // This will be updated in later steps.

        // --- Touch Control Event Listeners ---
        const touchJump = document.getElementById('touch-jump');

        const handleTouch = (key, isPressed) => {
            sceneManager.inputState.keys[key] = isPressed;
        };

        // Jump Button
        touchJump.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch(' ', true); }, { passive: false });
        touchJump.addEventListener('touchend', (e) => { e.preventDefault(); handleTouch(' ', false); }, { passive: false });
        touchJump.addEventListener('touchcancel', (e) => { e.preventDefault(); handleTouch(' ', false); }, { passive: false });

        function loadProjectFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            const projectData = urlParams.get('project');

            if (projectData) {
                try {
                    const decodedState = atob(projectData);
                    const jsonState = JSON.parse(decodedState);
                    const workspace = Blockly.getMainWorkspace();
                    Blockly.serialization.workspaces.load(jsonState, workspace);
                    doRun();
                } catch (e) {
                    console.error("Failed to load project from URL:", e);
                    alert("Could not load project from URL. Loading default project instead.");
                    loadWorkspaceDefault();
                }
            } else {
                loadWorkspaceDefault();
            }
        }

        loadProjectFromUrl();