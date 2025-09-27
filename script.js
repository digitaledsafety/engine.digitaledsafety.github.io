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
            }
        ]);

        {

            // --- Scripting Block Generators ---

            javascript.javascriptGenerator.forBlock['event_on_click'] = function(block, generator) {
                const objectNameValue = generator.valueToCode(block, 'OBJECT_SELECTOR', generator.ORDER_ATOMIC) || 'null';
                const doCode = generator.statementToCode(block, 'DO_CODE');

                // For the new unified script model, this generated code will be part of the single script
                // executed by doRun(). It sets up the event listener.
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
            function(evt) {
                const thisMesh = onClickTargetMesh;
                console.log('Clicked on ' + thisMesh.name);
                try {
                    ${doCode}
                } catch (e) {
                    console.error('Error in OnClick script for ' + thisMesh.name + ':', e);
                }
            }
        )
    );
    // Metadata assignment removed - this block now just sets up the listener.
    console.log('On-click event action registered for: ' + onClickTargetName);
} else {
    console.warn('On-click event: Could not find object: ' + onClickTargetName);
}
`;
                return code;
            };

            javascript.javascriptGenerator.forBlock['event_every_frame'] = function(block, generator) {
                const objectNameValue = generator.valueToCode(block, 'OBJECT_SELECTOR', generator.ORDER_ATOMIC) || 'null';
                const doCode = generator.statementToCode(block, 'DO_CODE');

                let code = `
let frameLoopTargetName = ${objectNameValue};
let frameLoopTargetMesh = objects[frameLoopTargetName] || scene.getMeshByName(frameLoopTargetName) || scene.getMeshById(frameLoopTargetName);

if (frameLoopTargetMesh) {
    // Ensure the global array for per-frame functions exists
    window.sceneSpecificPerFrameFunctions = window.sceneSpecificPerFrameFunctions || [];

    // Define the function to be called each frame for this specific mesh
    const frameFunctionName = \`frameLoop_\${frameLoopTargetMesh.id || frameLoopTargetMesh.name}_\${BABYLON.Tools.RandomId()}\`;
    let perFrameFunction = function(thisMesh, deltaTime) {
        // Note: 'thisMesh' and 'deltaTime' will be provided by the central loop
        ${doCode}
    };

    // Store the function code and target, or directly the function if preferred
    window.sceneSpecificPerFrameFunctions.push({
        targetMesh: frameLoopTargetMesh,
        func: perFrameFunction,
        name: frameFunctionName // For debugging or potential removal later
    });
    console.log('Every-frame function registered for: ' + frameLoopTargetName);

} else {
    console.warn('Every-frame event: Could not find object: ' + frameLoopTargetName);
}
`;
                // This block now just registers a function; it doesn't return executable code directly into the main script flow.
                // The actual execution is handled by the central render loop.
                // However, Blockly expects a string to be returned. We can return a comment or an empty string.
                return '// Registered per-frame function for ' + frameLoopTargetName + '\\n';
            };

            javascript.javascriptGenerator.forBlock['action_rotate_continuously'] = function(block, generator) {
                const rotateXSpeed = generator.valueToCode(block, 'ROTATE_X_SPEED', generator.ORDER_ATOMIC) || 0;
                const rotateYSpeed = generator.valueToCode(block, 'ROTATE_Y_SPEED', generator.ORDER_ATOMIC) || 0;
                const rotateZSpeed = generator.valueToCode(block, 'ROTATE_Z_SPEED', generator.ORDER_ATOMIC) || 0;

                let code = `
if (thisMesh) {
    thisMesh.rotation.x += (${rotateXSpeed} * (Math.PI / 180)) * (deltaTime / 1000);
    thisMesh.rotation.y += (${rotateYSpeed} * (Math.PI / 180)) * (deltaTime / 1000);
    thisMesh.rotation.z += (${rotateZSpeed} * (Math.PI / 180)) * (deltaTime / 1000);
}
`;
                return code;
            };

            javascript.javascriptGenerator.forBlock['select_object'] = function(block, generator) {
                const objectName = block.getFieldValue('OBJECT_NAME');
                return [objectName, generator.ORDER_ATOMIC];
            };

            // javascript.javascriptGenerator.forBlock['attach_script_to_object'] = function(block, generator) { // REMOVED
            //     // ...
            // };

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
                const cameraVar = generator.nameDB_.getName(block.getFieldValue('CAMERA'), Blockly.Variables.NAME_TYPE);
                const meshVar = generator.nameDB_.getName(block.getFieldValue('MESH'), Blockly.Variables.NAME_TYPE);

                return `${cameraVar}.setTarget(${meshVar});\n`;
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
            // populateObjectSelector call removed
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
          // populateObjectSelector call removed
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
              // populateObjectSelector call removed
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
            // populateObjectSelector call removed
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
          // populateObjectSelector call removed
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
          // populateObjectSelector call removed
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
          // populateObjectSelector call removed
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

        function clearScene(currentScene) {
            while (currentScene.meshes.length) {
                var mesh = currentScene.meshes[0];
                console.log('Disposing mesh:', mesh.name, 'ID:', mesh.id);
                // if (mesh.metadata) { // Removed old metadata clearing
                //     mesh.metadata.scriptType = null;
                //     mesh.metadata.scriptContent = null;
                //     mesh.metadata.scriptAttached = false;
                //     mesh.metadata.blocklyFrameLoop = null;
                // }
                mesh.dispose();
            }

            while (currentScene.materials.length) {
                var material = currentScene.materials[0];
                console.log(material.name);
                material.dispose();
            }

            Object.keys(objects).forEach(key => delete objects[key]);
            Object.keys(materials).forEach(key => delete materials[key]);
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
            const state = localStorage.getItem('myProgram');
            var workspace = Blockly.getMainWorkspace();
            Blockly.serialization.workspaces.load(JSON.parse(state), workspace);
        }

        function loadWorkspaceDefault() {
            let state = {
                "blocks": {
                    "languageVersion": 0,
                    "blocks": [
                        {
                            "type": "create_ground",
                            "id": "default_platform",
                            "x": 26,
                            "y": 10,
                            "fields": {
                                "NAME": "platform"
                            },
                            "inputs": {
                                "WIDTH": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 10
                                        }
                                    }
                                },
                                "HEIGHT": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 10
                                        }
                                    }
                                }
                            },
                            "next": {
                                "block": {
                                    "type": "import_3d_file_url",
                                    "id": "-xy:B4jNLPcdjK9qYqjf",
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
            Blockly.serialization.workspaces.load(state, workspace);
            doRun();
        }

        function doRun() {
            let codeToRun = '';
            if (currentView === 'blockly') {
                codeToRun = generateCode(); // Get code from Blockly workspace
                console.log("Running code from Blockly workspace");
            } else if (currentView === 'javascript') {
                if (monacoEditorInstance) {
                    codeToRun = monacoEditorInstance.getValue(); // Get code from Monaco editor
                    console.log("Running code from JavaScript editor (Monaco)");
                } else {
                    console.error("Monaco editor instance not available. Cannot run JS code.");
                    return;
                }
            } else {
                console.error("Unknown view selected. Cannot run code.");
                return;
            }

            clearScene(scene);
            window.sceneSpecificPerFrameFunctions = []; // Clear any existing per-frame functions

            try {
                eval(codeToRun); // This will populate window.sceneSpecificPerFrameFunctions
            } catch (error) {
                console.error('Error executing code:', error);
            }
        }

        const helper = function () {
            this.getField('MODEL_URL').maxDisplayLength = 16;
        }
        Blockly.Extensions.register('set_max_display_length', helper);

        const objects = {};
        const materials = {};
        window.sceneSpecificPerFrameFunctions = []; // Initialize global array for per-frame functions

        const canvas = document.getElementById('gameCanvas');
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);
        const physicsPlugin = new BABYLON.CannonJSPlugin();
        scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), physicsPlugin);

        document.getElementById('runButton').addEventListener('click', () => {
            doRun();
        });
        document.getElementById('saveButton').addEventListener('click', () => {
            saveWorkspace();
        });
        document.getElementById('loadButton').addEventListener('click', () => {
            loadWorkspace();
        });

        let lastTime = performance.now(); // For deltaTime calculation

        engine.runRenderLoop(() => {
            const currentTime = performance.now();
            const deltaTime = currentTime - lastTime; // deltaTime in milliseconds
            lastTime = currentTime;

            if (window.sceneSpecificPerFrameFunctions && window.sceneSpecificPerFrameFunctions.length > 0) {
                window.sceneSpecificPerFrameFunctions.forEach(task => {
                    if (task.targetMesh && !task.targetMesh.isDisposed() && typeof task.func === 'function') {
                        try {
                            // Pass the specific mesh and deltaTime to the function
                            task.func(task.targetMesh, deltaTime);
                        } catch (e) {
                            console.error(`Error executing per-frame function ${task.name || 'anonymous'} for mesh ${task.targetMesh.name}:`, e);
                            // Optional: remove problematic function to prevent repeated errors
                            // window.sceneSpecificPerFrameFunctions = window.sceneSpecificPerFrameFunctions.filter(f => f !== task);
                        }
                    } else if (task.targetMesh && task.targetMesh.isDisposed()) {
                        // Optional: Clean up functions for disposed meshes
                        // console.log(`Removing per-frame function for disposed mesh ${task.targetMesh.name}`);
                        // window.sceneSpecificPerFrameFunctions = window.sceneSpecificPerFrameFunctions.filter(f => f !== task);
                    }
                });
            }
            scene.render();
        });

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

        loadWorkspaceDefault();
