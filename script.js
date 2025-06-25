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
                        {
                            kind: 'block',
                            type: 'attach_script_to_object', // This might become less central or change
                        },
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
                            ],
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
        };

        const workspace = Blockly.inject('blocklyDiv', {
            toolbox: toolbox,
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
                "message0": "point camera %1 at mesh %2",
                "args0": [
                    {
                        "type": "field_variable",
                        "name": "CAMERA",
                        "variable": "camera"
                    },
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
                    'set_max_display_length',  // This line added!!
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
                    'set_max_display_length',  // This line added!!
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
                message0: 'Set camera %1 to isometric view',
                args0: [
                    { type: 'field_input', name: 'CAMERA', text: 'camera' },
                ],
                previousStatement: null,
                nextStatement: null,
                colour: 160,
                tooltip: 'Sets the specified camera to an isometric angle pointing at the origin.',
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
            }
        ]);

        {

            // --- Scripting Block Generators ---

            javascript.javascriptGenerator.forBlock['event_on_click'] = function(block, generator) {
                const objectNameValue = generator.valueToCode(block, 'OBJECT_SELECTOR', generator.ORDER_ATOMIC) || 'null';
                const doCode = generator.statementToCode(block, 'DO_CODE');
                // Important: The generated code from 'DO_CODE' needs to be executable in the context of the action.
                // We might need to wrap it or ensure it uses 'thisMesh' correctly.
                // For simplicity, we'll assume 'doCode' can reference 'thisMesh'.

                let code = `
let onClickTargetName = ${objectNameValue};
let onClickTargetMesh = objects[onClickTargetName] || scene.getMeshByName(onClickTargetName) || scene.getMeshById(onClickTargetName);

if (onClickTargetMesh) {
    if (!onClickTargetMesh.actionManager) {
        onClickTargetMesh.actionManager = new BABYLON.ActionManager(scene);
    }
    onClickTargetMesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function(evt) { // evt contains pointerX, pointerY, meshUnderPointer, etc.
                const thisMesh = onClickTargetMesh; // Make 'thisMesh' available to the executed code
                console.log('Clicked on ' + thisMesh.name);
                try {
                    ${doCode}
                } catch (e) {
                    console.error('Error in OnClick script for ' + thisMesh.name + ':', e);
                }
            }
        )
    );
    // Also mark this object as having a blockly script, even if it's just an event
    if (!onClickTargetMesh.metadata) onClickTargetMesh.metadata = {};
    onClickTargetMesh.metadata.scriptType = 'blockly';
    onClickTargetMesh.metadata.scriptAttached = true;
    console.log('On-click event attached to: ' + onClickTargetName);
} else {
    console.warn('On-click event: Could not find object: ' + onClickTargetName);
}
`;
                return code; // This code sets up the event listener when the main Blockly script runs.
            };

            javascript.javascriptGenerator.forBlock['event_every_frame'] = function(block, generator) {
                const objectNameValue = generator.valueToCode(block, 'OBJECT_SELECTOR', generator.ORDER_ATOMIC) || 'null';
                const doCode = generator.statementToCode(block, 'DO_CODE');

                let code = `
let frameLoopTargetName = ${objectNameValue};
let frameLoopTargetMesh = objects[frameLoopTargetName] || scene.getMeshByName(frameLoopTargetName) || scene.getMeshById(frameLoopTargetName);

if (frameLoopTargetMesh) {
    if (!frameLoopTargetMesh.metadata) {
        frameLoopTargetMesh.metadata = {};
    }
    frameLoopTargetMesh.metadata.scriptType = 'blockly';
    // Store the specific code for the frame loop
    frameLoopTargetMesh.metadata.blocklyFrameLoop = ${JSON.stringify(doCode)};
    frameLoopTargetMesh.metadata.scriptAttached = true; // Mark as having a script
    console.log('Every-frame script metadata set for: ' + frameLoopTargetName);
} else {
    console.warn('Every-frame event: Could not find object: ' + frameLoopTargetName);
}
`;
                return code;
            };

            javascript.javascriptGenerator.forBlock['action_rotate_continuously'] = function(block, generator) {
                // This block assumes 'thisMesh' and 'deltaTime' are in scope,
                // as it's intended to be used inside 'event_every_frame'.
                const rotateXSpeed = generator.valueToCode(block, 'ROTATE_X_SPEED', generator.ORDER_ATOMIC) || 0;
                const rotateYSpeed = generator.valueToCode(block, 'ROTATE_Y_SPEED', generator.ORDER_ATOMIC) || 0;
                const rotateZSpeed = generator.valueToCode(block, 'ROTATE_Z_SPEED', generator.ORDER_ATOMIC) || 0;

                // Convert degrees per second to radians per frame.
                // deltaTime is in milliseconds.
                let code = `
if (thisMesh) { // thisMesh should be defined by the calling event_every_frame context
    thisMesh.rotation.x += (${rotateXSpeed} * (Math.PI / 180)) * (deltaTime / 1000);
    thisMesh.rotation.y += (${rotateYSpeed} * (Math.PI / 180)) * (deltaTime / 1000);
    thisMesh.rotation.z += (${rotateZSpeed} * (Math.PI / 180)) * (deltaTime / 1000);
} else {
    // console.warn('action_rotate_continuously: thisMesh is not defined in this context.');
}
`;
                return code;
            };

            javascript.javascriptGenerator.forBlock['select_object'] = function(block, generator) {
                const objectName = block.getFieldValue('OBJECT_NAME');
                // This will return the object's name (or unique ID in the future).
                // The actual object retrieval will happen in the 'attach_script_to_object' or execution phase.
                return [objectName, generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['attach_script_to_object'] = function(block, generator) {
                const objectNameValue = generator.valueToCode(block, 'OBJECT_SELECTOR', generator.ORDER_ATOMIC) || 'null';
                const bLocklyScriptContent = generator.statementToCode(block, 'SCRIPT_CODE');

                // This code will be executed when the main "Run" button is pressed,
                // effectively setting up the script metadata on the object.
                let code = `
let scriptingTargetObjName = ${objectNameValue};
let scriptingTargetObj = objects[scriptingTargetObjName] || scene.getMeshByName(scriptingTargetObjName) || scene.getMeshById(scriptingTargetObjName);

if (scriptingTargetObj) {
    if (!scriptingTargetObj.metadata) {
        scriptingTargetObj.metadata = {};
    }
    scriptingTargetObj.metadata.scriptType = 'blockly';
    // Storing the generated JS for now. Ideally, this would be Blockly XML or a script ID.
    // This is a simplified approach for this step.
    scriptingTargetObj.metadata.scriptContent = ${JSON.stringify(bLocklyScriptContent)};
    scriptingTargetObj.metadata.scriptAttached = true;
    console.log('Blockly script metadata set for object: ' + scriptingTargetObjName);
} else {
    console.warn('Attach Script: Could not find object: ' + scriptingTargetObjName);
}
`;
                return code; // This generated code sets up the metadata. Execution happens later.
            };

            // --- Existing JavaScript Generators ---
            javascript.javascriptGenerator.forBlock['position_model'] = function (block, generator) {
                const modelVar = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('MODEL'), Blockly.Variables.NAME_TYPE);
                const x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
                const y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
                const z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC) || '0';

                const code = `

      scene.meshes[0].position.set(${x}, ${y}, ${z});\n
      `;
                return code;
            };

            javascript.javascriptGenerator.forBlock['create_camera'] = function (block, generator) {
                const name = block.getFieldValue('NAME');

                return `
          const ${name} = new BABYLON.ArcRotateCamera('${name}', Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
          ${name}.attachControl(canvas, true);
          `;
            };


            javascript.javascriptGenerator.forBlock['point_camera_at_mesh'] = function (block, generator) {
                const cameraVar = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('CAMERA'), Blockly.Variables.NAME_TYPE);
                const meshVar = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('MESH'), Blockly.Variables.NAME_TYPE);

                // Generate code to set the camera target
                const code = `


      camera.setTarget(scene.meshes[0].position);\n
      `;
                return code;
            };

            javascript.javascriptGenerator.forBlock['save_3d_model_with_position'] = function (block, generator) {
                const modelUrl = block.getFieldValue('MODEL_URL');
                const modelVarName = generator.nameDB_.getName(block.getFieldValue('MODEL_VAR'), Blockly.Variables.NAME_TYPE);
                const posX = generator.valueToCode(block, 'POS_X', javascript.javascriptGenerator.ORDER_ATOMIC) || '0';
                const posY = generator.valueToCode(block, 'POS_Y', javascript.javascriptGenerator.ORDER_ATOMIC) || '0';
                const posZ = generator.valueToCode(block, 'POS_Z', javascript.javascriptGenerator.ORDER_ATOMIC) || '0';
                const uniqueId = modelVarName + '_' + BABYLON.Tools.RandomId();

                return `
    BABYLON.SceneLoader.ImportMeshAsync(null, '', '${modelUrl}', scene).then(
      function(result) {
          if (result.meshes.length > 0) {
            let rootMesh = result.meshes[0];
            rootMesh.id = '${uniqueId}';
            rootMesh.name = '${modelVarName}';
            rootMesh.position = new BABYLON.Vector3(${posX}, ${posY}, ${posZ});
            objects['${uniqueId}'] = rootMesh;
            objects['${modelVarName}'] = rootMesh;
            ${modelVarName} = rootMesh;
            console.log('3D model saved as variable "${modelVarName}", ID "${uniqueId}", and placed at (${posX}, ${posY}, ${posZ}).');
            if (typeof populateObjectSelector === 'function') { setTimeout(populateObjectSelector, 100); }
          } else {
            console.warn('No meshes were imported from the URL: ${modelUrl}.');
          }
      }).catch(function(error) {
          console.error('Error importing model: ${modelUrl}', error);
      });
      `;
            };

            javascript.javascriptGenerator.forBlock['import_3d_file_url_with_position'] = function (block, generator) {
                const fileUrl = block.getFieldValue('FILE_URL');
                const posX = block.getFieldValue('POS_X');
                const posY = block.getFieldValue('POS_Y');
                const posZ = block.getFieldValue('POS_Z');
                const baseName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1) || 'importedModel';
                const uniqueId = baseName.replace(/[^a-zA-Z0-9]/g, '_') + '_' + BABYLON.Tools.RandomId();

                return `
    BABYLON.SceneLoader.ImportMeshAsync(null, '', '${fileUrl}', scene).then(
      function (result) {
        if (result.meshes.length > 0) {
          let rootMesh = result.meshes[0];
          rootMesh.id = '${uniqueId}';
          rootMesh.name = '${baseName}';
          rootMesh.position = new BABYLON.Vector3(${posX}, ${posY}, ${posZ});
          objects['${uniqueId}'] = rootMesh;
          objects['${baseName}'] = rootMesh;
          console.log('3D file imported and placed successfully at (${posX}, ${posY}, ${posZ}). ID: ${uniqueId}');
          if (typeof populateObjectSelector === 'function') { setTimeout(populateObjectSelector, 100); }
        } else {
          console.warn('No meshes were imported from the 3D file: ${fileUrl}');
        }
      }).catch(function(error) {
        console.error('Failed to load 3D file: ${fileUrl}', error);
      });
    `;
            };

            javascript.javascriptGenerator.forBlock['import_3d_file_url'] = function (block, generator) {
                const modelUrl = block.getFieldValue('MODEL_URL');
                const modelVarName = generator.nameDB_.getName(block.getFieldValue('MODEL_VAR'), Blockly.Variables.NAME_TYPE);
                const onSuccessCode = generator.statementToCode(block, 'ON_SUCCESS') || '';
                const uniqueId = modelVarName + '_' + BABYLON.Tools.RandomId();

                return `
        BABYLON.SceneLoader.ImportMeshAsync(null, '', '${modelUrl}', scene)
          .then(function (result) {
            if (result.meshes.length > 0) {
              let rootMesh = result.meshes[0];
              rootMesh.id = '${uniqueId}';
              rootMesh.name = '${modelVarName}';
              objects['${uniqueId}'] = rootMesh;
              objects['${modelVarName}'] = rootMesh;
              ${modelVarName} = rootMesh;
              console.log('3D model imported as variable "${modelVarName}", ID "${uniqueId}".');
              if (typeof populateObjectSelector === 'function') { setTimeout(populateObjectSelector, 100); }
              ${onSuccessCode}
            } else {
              console.warn('No meshes were imported from URL: ${modelUrl}');
            }
          })
          .catch(function(error) {
            console.error('Error importing model for variable ${modelVarName} from URL: ${modelUrl}', error);
          });
      `;
            };

            javascript.javascriptGenerator.forBlock['set_isometric_camera'] = function (block, generator) {
                const cameraName = block.getFieldValue('CAMERA');

                return `
          let camera = scene.cameras.find(camera => camera.name === '${cameraName}');
          if (camera) {
            camera.position = new BABYLON.Vector3(10, 10, 10);
            camera.setTarget(new BABYLON.Vector3(0, 0, 0));
          }
          `;
            };

            javascript.javascriptGenerator.forBlock['import_3d_file'] = function (block, generator) {
                const fileName = block.getFieldValue('FILE_NAME');
                const rootPath = block.getFieldValue('ROOT_PATH');
                const onSuccessCode = generator.statementToCode(block, 'ON_SUCCESS') || '';
                const baseName = fileName.replace(/[^a-zA-Z0-9]/g, '_') || 'importedFileModel';
                const uniqueId = baseName + '_' + BABYLON.Tools.RandomId();

                return `
      BABYLON.SceneLoader.ImportMeshAsync(null, '${rootPath}', '${fileName}', scene)
        .then(function (result) {
          if (result.meshes.length > 0) {
            let rootMesh = result.meshes[0];
            rootMesh.id = '${uniqueId}';
            rootMesh.name = '${baseName}';
            objects['${uniqueId}'] = rootMesh;
            objects['${baseName}'] = rootMesh;
            console.log('3D file "${fileName}" imported successfully. ID: ${uniqueId}');
            if (typeof populateObjectSelector === 'function') { setTimeout(populateObjectSelector, 100); }
            ${onSuccessCode}
          } else {
            console.warn('No meshes were imported from file: ${fileName}');
          }
        })
        .catch(function(error) {
          console.error('Failed to load 3D file: ${fileName}', error);
        });
    `;
            };

            javascript.javascriptGenerator.forBlock['create_ground'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const width = generator.valueToCode(block, 'WIDTH', javascript.javascriptGenerator.ORDER_ATOMIC) || 10;
                const height = generator.valueToCode(block, 'HEIGHT', javascript.javascriptGenerator.ORDER_ATOMIC) || 10;
                const uniqueId = name + '_' + BABYLON.Tools.RandomId();
                return `
          const groundMesh = BABYLON.MeshBuilder.CreateGround('${name}', { width: ${width}, height: ${height} }, scene);
          groundMesh.id = '${uniqueId}';
          groundMesh.name = '${name}';
          objects['${uniqueId}'] = groundMesh;
          objects['${name}'] = groundMesh;
          if (typeof populateObjectSelector === 'function') { populateObjectSelector(); }
          `;
            };

            javascript.javascriptGenerator.forBlock['set_ground_material'] = function (block, generator) {
                const material = block.getFieldValue('MATERIAL');
                const name = block.getFieldValue('NAME');

                return `
          if (materials['${material}'] && objects['${name}']) {
            objects['${name}'].material = materials['${material}'];
          }
          `;
            };

            javascript.javascriptGenerator.forBlock['set_ground_physics'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const impostor = block.getFieldValue('IMPOSTOR');

                return `
          if (objects['${name}']) {
            objects['${name}'].physicsImpostor = new BABYLON.PhysicsImpostor(
              objects['${name}'],
              ${impostor},
              { mass: 0, restitution: 0.9 },
              scene
            );
          }
          `;
            };

            javascript.javascriptGenerator.forBlock['create_box'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = generator.valueToCode(block, 'X', javascript.javascriptGenerator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', javascript.javascriptGenerator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', javascript.javascriptGenerator.ORDER_ATOMIC) || 0;
                const uniqueId = name + '_' + BABYLON.Tools.RandomId();
                return `
          const boxMesh = BABYLON.MeshBuilder.CreateBox('${name}', {}, scene);
          boxMesh.id = '${uniqueId}';
          boxMesh.name = '${name}';
          boxMesh.position.set(${x}, ${y}, ${z});
          objects['${uniqueId}'] = boxMesh;
          objects['${name}'] = boxMesh;
          if (typeof populateObjectSelector === 'function') { populateObjectSelector(); }
          \n`;
            };

            javascript.javascriptGenerator.forBlock['create_sphere'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = generator.valueToCode(block, 'X', javascript.javascriptGenerator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', javascript.javascriptGenerator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', javascript.javascriptGenerator.ORDER_ATOMIC) || 0;
                const uniqueId = name + '_' + BABYLON.Tools.RandomId();
                return `
          const sphereMesh = BABYLON.MeshBuilder.CreateSphere('${name}', { diameter: 2 }, scene);
          sphereMesh.id = '${uniqueId}';
          sphereMesh.name = '${name}';
          sphereMesh.position.set(${x}, ${y}, ${z});
          objects['${uniqueId}'] = sphereMesh;
          objects['${name}'] = sphereMesh;
          if (typeof populateObjectSelector === 'function') { populateObjectSelector(); }
          \n`;
            };

            javascript.javascriptGenerator.forBlock['move_object'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                return `if (objects['${name}']) objects['${name}'].position.set(${x}, ${y}, ${z});\n`;
            };


            javascript.javascriptGenerator.forBlock['create_light'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                return `const ${name} = new BABYLON.PointLight('${name}', new BABYLON.Vector3(${x}, ${y}, ${z}), scene);\n`;
            };

            javascript.javascriptGenerator.forBlock['change_object_color'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const color = block.getFieldValue('COLOR');
                return `if (objects['${name}']) objects['${name}'].material = new BABYLON.StandardMaterial('${name}_material', scene);\n` +
                    `objects['${name}'].material.diffuseColor = BABYLON.Color3.FromHexString('${color}');\n`;
            };

            javascript.javascriptGenerator.forBlock['rotate_object'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                return `if (objects['${name}']) objects['${name}'].rotation = new BABYLON.Vector3(${x} * Math.PI / 180, ${y} * Math.PI / 180, ${z} * Math.PI / 180);\n`;
            };

            javascript.javascriptGenerator.forBlock['animate_object'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const z1 = Blockly.JavaScript.valueToCode(block, 'Z1', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const x2 = Blockly.JavaScript.valueToCode(block, 'X2', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const y2 = Blockly.JavaScript.valueToCode(block, 'Y2', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const z2 = Blockly.JavaScript.valueToCode(block, 'Z2', Blockly.JavaScript.ORDER_ATOMIC) || 0;

                return `
    if (objects['${name}']) {
      BABYLON.Animation.CreateAndStartAnimation(
        '${name}_animation',
        objects['${name}'],
        'position',
        30,
        60,
        new BABYLON.Vector3(${x1}, ${y1}, ${z1}),
        new BABYLON.Vector3(${x2}, ${y2}, ${z2}),
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
    }
    `;
            };

            javascript.javascriptGenerator.forBlock['enable_physics'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const mass = Blockly.JavaScript.valueToCode(block, 'MASS', Blockly.JavaScript.ORDER_ATOMIC) || 1;
                return `
        if (objects['${name}']) {
          objects['${name}'].physicsImpostor = new BABYLON.PhysicsImpostor(
            objects['${name}'],
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: ${mass}, restitution: 0.9 },
            scene
          );
        }
        `;
            };

            javascript.javascriptGenerator.forBlock['apply_force'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const fx = Blockly.JavaScript.valueToCode(block, 'FX', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const fy = Blockly.JavaScript.valueToCode(block, 'FY', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const fz = Blockly.JavaScript.valueToCode(block, 'FZ', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const px = Blockly.JavaScript.valueToCode(block, 'PX', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const py = Blockly.JavaScript.valueToCode(block, 'PY', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const pz = Blockly.JavaScript.valueToCode(block, 'PZ', Blockly.JavaScript.ORDER_ATOMIC) || 0;

                return `
        if (objects['${name}'] && objects['${name}'].physicsImpostor) {
          objects['${name}'].physicsImpostor.applyForce(
            new BABYLON.Vector3(${fx}, ${fy}, ${fz}),
            new BABYLON.Vector3(${px}, ${py}, ${pz})
          );
        }
        `;
            };

            javascript.javascriptGenerator.forBlock['set_gravity'] = function (block, generator) {
                const gx = Blockly.JavaScript.valueToCode(block, 'GX', Blockly.JavaScript.ORDER_ATOMIC) || 0;
                const gy = Blockly.JavaScript.valueToCode(block, 'GY', Blockly.JavaScript.ORDER_ATOMIC) || -9.8;
                const gz = Blockly.JavaScript.valueToCode(block, 'GZ', Blockly.JavaScript.ORDER_ATOMIC) || 0;

                return `scene.gravity = new BABYLON.Vector3(${gx}, ${gy}, ${gz});\n`;
            };

            javascript.javascriptGenerator.forBlock['set_physics_impostor'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const impostor = block.getFieldValue('IMPOSTOR');

                return `
        if (objects['${name}']) {
          objects['${name}'].physicsImpostor = new BABYLON.PhysicsImpostor(
            objects['${name}'],
            ${impostor},
            { mass: 1, restitution: 0.9 },
            scene
          );
        }
        `;
            };

        }

        // Convert Blockly Code to JavaScript
        function generateCode() {
            return javascript.javascriptGenerator.workspaceToCode(workspace);
        }

        function clearScene(currentScene) { // Renamed 'scene' to 'currentScene'

            while (currentScene.meshes.length) { // Use 'currentScene'
                var mesh = currentScene.meshes[0]; // Use 'currentScene'
                console.log('Disposing mesh:', mesh.name, 'ID:', mesh.id);
                // Clear script metadata before disposing
                if (mesh.metadata) {
                    mesh.metadata.scriptType = null;
                    mesh.metadata.scriptContent = null;
                    mesh.metadata.scriptAttached = false;
                    mesh.metadata.blocklyFrameLoop = null; // Clear frame loop content
                }
                mesh.dispose();
            }

            while (currentScene.materials.length) { // Use 'currentScene'
                var material = currentScene.materials[0]; // Use 'currentScene'
                console.log(material.name);
                material.dispose();
            }

            // Clear any objects or materials tracked in global objects
            Object.keys(objects).forEach(key => delete objects[key]);
            Object.keys(materials).forEach(key => delete materials[key]);

            if (typeof populateObjectSelector === 'function') { populateObjectSelector(); } // Refresh dropdown
        }


        // Resize canvas to fit its container
        function resizeCanvas() {
            const container = document.querySelector('.canvas-container');
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }

        function saveWorkspace() {
            var workspace = Blockly.getMainWorkspace();
            var state = Blockly.serialization.workspaces.save(workspace);
            console.log(state);
            localStorage.setItem('myProgram', JSON.stringify(state));
        }

        function loadWorkspace(button) {
            // Get your saved state from somewhere, e.g. local storage.
            const state = localStorage.getItem('myProgram');

            var workspace = Blockly.getMainWorkspace();

            // Deserialize the state.
            Blockly.serialization.workspaces.load(JSON.parse(state), workspace);
        }

        function loadWorkspaceDefault() {
            let state = {
                "blocks": {
                    "languageVersion": 0,
                    "blocks": [
                        {
                            "type": "import_3d_file_url",
                            "id": "-xy:B4jNLPcdjK9qYqjf",
                            "x": 26,
                            "y": 10,
                            "fields": {
                                "MODEL_URL": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb",
                                "MODEL_VAR": {
                                    "id": "Tw=U+h6sN{r/zUez!;j8"
                                }
                            },
                            "inputs": {
                                "ON_SUCCESS": {
                                    "block": {
                                        "type": "create_camera",
                                        "id": "P@8M:RocH3uoSQ04_F14",
                                        "fields": {
                                            "NAME": "camera",
                                            "MODEL_VAR": {
                                                "id": "EZe?g.{eh_}M^PAF=wxy"
                                            }
                                        },
                                        "next": {
                                            "block": {
                                                "type": "point_camera_at_mesh",
                                                "id": "E{8BD5:R^4;nqCvlCbL)",
                                                "fields": {
                                                    "CAMERA": {
                                                        "id": "EZe?g.{eh_}M^PAF=wxy"
                                                    },
                                                    "MESH": {
                                                        "id": "Tw=U+h6sN{r/zUez!;j8"
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
                        "name": "model",
                        "id": "Tw=U+h6sN{r/zUez!;j8"
                    },
                    {
                        "name": "camera",
                        "id": "EZe?g.{eh_}M^PAF=wxy"
                    },
                    {
                        "name": "mesh",
                        "id": "j;nQCHM[i@HS@uJ1|kNe"
                    }
                ]
            }

            var workspace = Blockly.getMainWorkspace();

            // Deserialize the state.
            Blockly.serialization.workspaces.load(state, workspace);

            doRun();
        }

        function doRun() {
            const code = generateCode();
            clearScene(scene); // Pass the global 'scene' object
            try {
                eval(code);
            } catch (error) {
                console.error('Error executing code:', error);
            }
        }



        const helper = function () {
            // `this` is the block.
            this.getField('MODEL_URL').maxDisplayLength = 16;
        }
        Blockly.Extensions.register('set_max_display_length', helper);


        // Object Registry
        const objects = {};
        const materials = {};

        // Babylon.js Initialization
        const canvas = document.getElementById('gameCanvas');
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine); // This is the global 'scene' object
        const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);

        const physicsPlugin = new BABYLON.CannonJSPlugin(); // Or AmmoJSPlugin
        scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), physicsPlugin);


        // Execute Blockly Code
        document.getElementById('runButton').addEventListener('click', () => {
            doRun();
        });

        document.getElementById('saveButton').addEventListener('click', () => {
            saveWorkspace();
        });

        document.getElementById('loadButton').addEventListener('click', () => {
            loadWorkspace();
        });

        // Game Loop
        scene.registerBeforeRender(function () {
            const deltaTime = engine.getDeltaTime(); // Get delta time in milliseconds

            scene.meshes.forEach(mesh => {
                if (mesh.metadata && mesh.metadata.scriptAttached && mesh.metadata.scriptContent) {
                    try {
                        if (mesh.metadata.scriptType === 'javascript') {
                            // Execute raw JavaScript
                            // 'this' inside the script will refer to 'mesh'
                            // It also gets 'scene', 'BABYLON', and 'deltaTime' (in ms) as arguments
                            new Function('thisMesh', 'scene', 'BABYLON', 'deltaTime', mesh.metadata.scriptContent)
                                .call(mesh, mesh, scene, BABYLON, deltaTime);
                        } else if (mesh.metadata.scriptType === 'blockly') {
                            // Check for specific frame loop code from 'event_every_frame'
                            if (mesh.metadata.blocklyFrameLoop) {
                                new Function('thisMesh', 'scene', 'BABYLON', 'deltaTime', mesh.metadata.blocklyFrameLoop)
                                    .call(mesh, mesh, scene, BABYLON, deltaTime);
                            }
                            // The generic mesh.metadata.scriptContent for 'blockly' type (from attach_script_to_object)
                            // might still be relevant if it contains setup or non-looping logic.
                            // However, running it every frame is usually not what's intended for general script attachments.
                            // For now, we prioritize blocklyFrameLoop for per-frame execution.
                            // If 'attach_script_to_object' is meant for one-time setup, its generated code
                            // (currently in scriptContent) is already run when the main Blockly workspace is evaluated.
                        }
                    } catch (e) {
                        console.error(`Error executing script for object ${mesh.name} (ID: ${mesh.id}):`, e);
                        // Optionally, disable the script to prevent repeated errors
                        // mesh.metadata.scriptAttached = false;
                    }
                }
            });
        });
        engine.runRenderLoop(() => scene.render());

        // Resize canvas on window resize
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Initial resize

        // --- Object Scripting UI Logic ---
        const scriptingObjectSelector = document.getElementById('scriptingObjectSelector');
        const rawJsTextarea = document.getElementById('rawJsTextarea');
        const saveJsScriptButton = document.getElementById('saveJsScriptButton');
        const clearObjectScriptButton = document.getElementById('clearObjectScriptButton');
        const currentScriptTypeIndicator = document.getElementById('currentScriptTypeIndicator');

        function populateObjectSelector() {
            console.log('Attempting to populate object selector. Current scene.meshes count:', scene.meshes.length);
            const currentSelectedId = scriptingObjectSelector.value; // Preserve selection if possible
            scriptingObjectSelector.innerHTML = '<option value="">-- Select Object --</option>';

            let foundMeshes = 0;
            scene.meshes.forEach(mesh => {
                if (mesh.id && mesh.name) { // Ensure both id and name are present
                    // console.log(`Found mesh for selector: Name: ${mesh.name}, ID: ${mesh.id}`);
                    const option = document.createElement('option');
                    option.value = mesh.id;
                    option.textContent = `${mesh.name} (ID: ...${mesh.id.slice(-6)})`;
                    scriptingObjectSelector.appendChild(option);
                    foundMeshes++;
                } else {
                    // console.log('Mesh skipped (no ID or name):', mesh.name);
                }
            });
            console.log(`Populated object selector with ${foundMeshes} meshes.`);
            if (currentSelectedId && scriptingObjectSelector.querySelector(`option[value="${currentSelectedId}"]`)) {
                scriptingObjectSelector.value = currentSelectedId; // Restore selection
            }
            updateScriptingUIForSelectedObject(); // Refresh editor based on new list/selection
        }

        function updateScriptingUIForSelectedObject() {
            const selectedObjectId = scriptingObjectSelector.value;
            rawJsTextarea.value = ''; // Clear textarea
            currentScriptTypeIndicator.textContent = 'None';
            rawJsTextarea.disabled = true;
            saveJsScriptButton.disabled = true;

            if (selectedObjectId) {
                const selectedMesh = scene.getMeshById(selectedObjectId);
                if (selectedMesh && selectedMesh.metadata) {
                    currentScriptTypeIndicator.textContent = selectedMesh.metadata.scriptType || 'None';
                    if (selectedMesh.metadata.scriptType === 'javascript') {
                        rawJsTextarea.value = selectedMesh.metadata.scriptContent || '';
                        rawJsTextarea.disabled = false;
                        saveJsScriptButton.disabled = false;
                    } else if (selectedMesh.metadata.scriptType === 'blockly') {
                        rawJsTextarea.value = "// This object is scripted using Blockly.\n// Edit in Blockly workspace or clear script to use JavaScript.";
                        // Textarea remains disabled for Blockly scripts
                    } else {
                        // No script or unknown type, allow JS editing
                        rawJsTextarea.disabled = false;
                        saveJsScriptButton.disabled = false;
                    }
                } else if (selectedMesh) { // Mesh exists but no metadata yet
                     rawJsTextarea.disabled = false;
                     saveJsScriptButton.disabled = false;
                }
            }
        }

        scriptingObjectSelector.addEventListener('change', updateScriptingUIForSelectedObject);

        saveJsScriptButton.addEventListener('click', () => {
            const selectedObjectId = scriptingObjectSelector.value;
            if (!selectedObjectId) {
                alert('Please select an object first.');
                return;
            }
            const selectedMesh = scene.getMeshById(selectedObjectId);
            if (selectedMesh) {
                if (!selectedMesh.metadata) {
                    selectedMesh.metadata = {};
                }
                selectedMesh.metadata.scriptType = 'javascript';
                selectedMesh.metadata.scriptContent = rawJsTextarea.value;
                selectedMesh.metadata.scriptAttached = true;
                console.log(`Saved JavaScript to object: ${selectedMesh.name} (ID: ${selectedMesh.id})`);
                updateScriptingUIForSelectedObject(); // Refresh UI
                alert('JavaScript saved to object!');
            } else {
                alert('Selected object not found in scene.');
            }
        });

        clearObjectScriptButton.addEventListener('click', () => {
            const selectedObjectId = scriptingObjectSelector.value;
            if (!selectedObjectId) {
                alert('Please select an object first.');
                return;
            }
            const selectedMesh = scene.getMeshById(selectedObjectId);
            if (selectedMesh) {
                if (selectedMesh.metadata) {
                    selectedMesh.metadata.scriptType = null;
                    selectedMesh.metadata.scriptContent = null;
                    selectedMesh.metadata.scriptAttached = false;
                    console.log(`Cleared script from object: ${selectedMesh.name} (ID: ${selectedMesh.id})`);
                }
                updateScriptingUIForSelectedObject(); // Refresh UI
                alert('Script cleared from object!');
            } else {
                alert('Selected object not found in scene.');
            }
        });

        // Override doRun to refresh the object selector after code execution
        const originalDoRun = doRun;
        doRun = function() {
            originalDoRun();
            // populateObjectSelector will now be called by creation blocks or by the fallback initial call.
            // We still might want to refresh the UI state if an object that was previously selected is re-selected or still valid.
            setTimeout(updateScriptingUIForSelectedObject, 150);
        }

        // Initial population
        loadWorkspaceDefault();
        // Fallback populate after a delay, in case default workspace creates objects without triggering individual populates.
        setTimeout(populateObjectSelector, 600);

        // More robust way: Observe when new meshes are added to the scene
        if (scene && scene.onNewMeshAddedObservable) {
            scene.onNewMeshAddedObservable.add((mesh) => {
                console.log(`New mesh added observable: ${mesh.name}, ID: ${mesh.id}. Refreshing selector.`);
                // Ensure the mesh has an ID and name, which our creation blocks should be doing.
                // If not, this won't add them, which is fine.
                if (mesh.id && mesh.name) {
                     // Give a very slight delay for any final setup on the mesh if needed by other systems
                    setTimeout(populateObjectSelector, 50);
                }
            });
        }
        if (scene && scene.onMeshRemovedObservable) {
            scene.onMeshRemovedObservable.add((mesh) => {
                console.log(`Mesh removed observable: ${mesh.name}, ID: ${mesh.id}. Refreshing selector.`);
                setTimeout(populateObjectSelector, 50); // Refresh after removal
            });
        }