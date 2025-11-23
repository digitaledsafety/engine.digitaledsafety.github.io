// --- Hero Overlay Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const heroOverlay = document.getElementById('hero-overlay');
    const startButton = document.getElementById('start-button');

    // Make sure the elements exist before adding event listeners
    if (heroOverlay && startButton) {
        startButton.addEventListener('click', () => {
            // It's possible sceneManager is not yet initialized when the DOM is ready,
            // so we reference it via window scope inside the click handler.
            if (window.sceneManager && window.sceneManager.audioContext && window.sceneManager.audioContext.state === 'suspended') {
                window.sceneManager.audioContext.resume();
            }

            // Hide the overlay
            heroOverlay.classList.add('hidden');

            // Optional: completely remove the overlay from the DOM after the transition
            setTimeout(() => {
                heroOverlay.style.display = 'none';
            }, 500); // Must match the CSS transition duration
        });
    }
});

class AssetManager {
    constructor() {
        this.db = null;
        this.assets = [];
        this.DB_NAME = 'AssetDB';
        this.DB_VERSION = 1;
        this.OBJECT_STORE_NAME = 'assets';
        this.initPromise = null;
    }

    init() {
        if (this.initPromise) {
            return this.initPromise;
        }

        this.initPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.OBJECT_STORE_NAME)) {
                    db.createObjectStore(this.OBJECT_STORE_NAME, { keyPath: 'name' });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };

            request.onerror = (event) => {
                console.error('IndexedDB error:', event.target.errorCode);
                reject(event.target.errorCode);
            };
        });
        return this.initPromise;
    }

    async addAsset(file) {
        await this.init();
        const data = file.type.startsWith('audio/') ? await file.arrayBuffer() : file;
        const asset = {
            name: file.name,
            type: file.type,
            data: data
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.OBJECT_STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.OBJECT_STORE_NAME);
            const request = store.put(asset);

            request.onsuccess = () => {
                this.assets = this.assets.filter(a => a.name !== asset.name); // Remove old version if it exists
                this.assets.push(asset);
                resolve();
            };
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async addAssetFromURL(url) {
        const proxyUrl = `https://proxy.fxio.workers.dev/corsproxy/?apiurl=${encodeURIComponent(url)}`;
        try {
            const response = await fetch(proxyUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const fileName = url.substring(url.lastIndexOf('/') + 1);

            let mimeType = 'application/octet-stream';
            const extension = fileName.split('.').pop().toLowerCase();
            if (extension === 'glb' || extension === 'gltf') {
                mimeType = `model/${extension}`;
            } else if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) {
                mimeType = `image/${extension}`;
            } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
                mimeType = `audio/${extension}`;
            }

            const file = new File([blob], fileName, { type: mimeType });
            return this.addAsset(file);
        } catch (error) {
            console.error('Failed to fetch asset from URL:', error);
            throw error;
        }
    }

    async getAsset(name) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.OBJECT_STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.OBJECT_STORE_NAME);
            const request = store.get(name);

            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async getAllAssets() {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.OBJECT_STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.OBJECT_STORE_NAME);
            const request = store.getAll();

            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async deleteAsset(name) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.OBJECT_STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.OBJECT_STORE_NAME);
            const request = store.delete(name);

            request.onsuccess = () => {
                this.assets = this.assets.filter(asset => asset.name !== name);
                resolve();
            };
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async loadAssetsIntoCache() {
        await this.init();
        this.assets = await this.getAllAssets();
    }
}

class ProjectManager {
    constructor(assetManager, workspace, sceneManager) {
        this.assetManager = assetManager;
        this.workspace = workspace;
        this.sceneManager = sceneManager;
    }

    async saveProject() {
        try {
            // 1. Get Workspace Data
            const workspaceState = Blockly.serialization.workspaces.save(this.workspace);

            // 2. Get Assets and convert to Base64
            const assets = await this.assetManager.getAllAssets();
            const serializableAssets = [];

            for (const asset of assets) {
                let dataB64;
                if (asset.data instanceof Blob) { // For models, images
                    dataB64 = await this._blobToBase64(asset.data);
                } else if (asset.data instanceof ArrayBuffer) { // For audio
                    dataB64 = this._arrayBufferToBase64(asset.data);
                } else {
                    console.warn(`Asset ${asset.name} has unknown data type, skipping serialization.`);
                    continue;
                }
                serializableAssets.push({
                    name: asset.name,
                    type: asset.type,
                    data: dataB64
                });
            }

            // 3. Combine into a project object
            const projectData = {
                workspace: workspaceState,
                assets: serializableAssets,
                version: '1.0'
            };

            // 4. Create and trigger download
            const jsonString = JSON.stringify(projectData, null, 2);
            const blob = new Blob([jsonString], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `project-${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log('Project saved successfully!');

        } catch (error) {
            console.error('Failed to save project:', error);
            alert('Error saving project. See console for details.');
        }
    }

    async publishProject() {
        try {
            // 1. Get Workspace Data
            const workspaceState = Blockly.serialization.workspaces.save(this.workspace);

            // 2. Get Assets and convert to Base64
            const assets = await this.assetManager.getAllAssets();
            const serializableAssets = [];

            for (const asset of assets) {
                let dataB64;
                if (asset.data instanceof Blob) { // For models, images
                    dataB64 = await this._blobToBase64(asset.data);
                } else if (asset.data instanceof ArrayBuffer) { // For audio
                    dataB64 = this._arrayBufferToBase64(asset.data);
                } else {
                    console.warn(`Asset ${asset.name} has unknown data type, skipping serialization.`);
                    continue;
                }
                serializableAssets.push({
                    name: asset.name,
                    type: asset.type,
                    data: dataB64
                });
            }

            // 3. Combine into a project object
            const projectData = {
                workspace: workspaceState,
                assets: serializableAssets,
                version: '1.0'
            };

            // 4. Create Jekyll-compatible markdown file content
            const jsonString = JSON.stringify(projectData, null, 2);
            const base64WorkspaceData = btoa(jsonString); // web-safe base64 encoding
            const uniqueId = `workspace-${Date.now()}`;
            const markdownContent = `---
layout: "default"
title: "${uniqueId}"
workspace_data: "${base64WorkspaceData}"
---
`;

            // 5. Create and trigger download
            const blob = new Blob([markdownContent], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${uniqueId}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log('Project published successfully!');
            alert(`Project published as ${uniqueId}.md. Please add this file to the _workspaces directory in your project repository.`);

        } catch (error) {
            console.error('Failed to publish project:', error);
            alert('Error publishing project. See console for details.');
        }
    }

    // --- Helper methods for serialization ---

    _arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    _blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove the data URI prefix
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    async loadProjectData(projectData) {
        if (!projectData.workspace || !projectData.assets) {
            throw new Error('Invalid project data format.');
        }

        // 1. Clear current scene and assets
        this.sceneManager.clear();
        await this._clearAllAssets();
        this.workspace.clear();

        // 2. Load Assets
        for (const asset of projectData.assets) {
            const data = this._base64ToBlob(asset.data, asset.type);
            await this.assetManager.addAsset(new File([data], asset.name, { type: asset.type }));
        }
        // The asset view needs to be re-rendered to show the new assets
        loadAssetsIntoView();

        // 3. Load Workspace
        Blockly.serialization.workspaces.load(projectData.workspace, this.workspace);

        // 4. Run the loaded project
        doRun();

        console.log('Project data loaded successfully!');
    }

    async loadProject() {
        try {
            const file = await this._selectFile();
            const content = await this._readFile(file);
            const projectData = JSON.parse(content);
            await this.loadProjectData(projectData);
        } catch (error) {
            console.error('Failed to load project:', error);
            alert('Error loading project. See console for details.');
        }
    }

    _base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    async _clearAllAssets() {
        const allAssets = await this.assetManager.getAllAssets();
        for (const asset of allAssets) {
            await this.assetManager.deleteAsset(asset.name);
        }
    }

    _selectFile() {
        return new Promise(resolve => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.txt';
            input.onchange = e => {
                const file = e.target.files[0];
                if (file) {
                    resolve(file);
                }
            };
            input.click();
        });
    }

    _readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    async shareProject() {
        try {
            const workspaceState = Blockly.serialization.workspaces.save(this.workspace);
            const assets = await this.assetManager.getAllAssets();
            const serializableAssets = [];

            for (const asset of assets) {
                let dataB64;
                if (asset.data instanceof Blob) {
                    dataB64 = await this._blobToBase64(asset.data);
                } else if (asset.data instanceof ArrayBuffer) {
                    dataB64 = this._arrayBufferToBase64(asset.data);
                } else {
                    continue;
                }
                serializableAssets.push({
                    name: asset.name,
                    type: asset.type,
                    data: dataB64
                });
            }

            const projectData = {
                workspace: workspaceState,
                assets: serializableAssets,
                version: '1.0'
            };

            const jsonString = JSON.stringify(projectData, null, 2);
            const file = new File([jsonString], 'project.txt', { type: 'text/plain' });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'My Project',
                    text: 'Check out my project!',
                });
            } else {
                this.saveProject();
            }
        } catch (error) {
            console.error('Error sharing project:', error);
            if (error.name !== 'AbortError') {
                alert('Error sharing project. See console for details.');
            }
        }
    }
}

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
            name: 'GUI',
            categorystyle: 'text_category',
            contents: [
                {
                    kind: 'block',
                    type: 'gui_create_text_block',
                },
                {
                    kind: 'block',
                    type: 'create_3d_text',
                },
                {
                    kind: 'block',
                    type: 'gui_set_text',
                },
                {
                    kind: 'block',
                    type: 'gui_create_input_text',
                },
                {
                    kind: 'block',
                    type: 'gui_get_input_text',
                }
            ]
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
            name: 'Console',
            categorystyle: 'text_category',
            contents: [
                {
                    kind: 'block',
                    type: 'console_log',
                },
                {
                    kind: 'block',
                    type: 'console_warn',
                },
                {
                    kind: 'block',
                    type: 'console_error',
                },
                {
                    kind: 'block',
                    type: 'console_clear',
                },
            ],
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
            categorystyle: 'scene_category',
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
                {
                    kind: 'block',
                    type: 'camera_zoom',
                },
            ]
        },

        {
            kind: 'category',
            name: 'Objects',
            categorystyle: 'motion_category',
            contents: [
                {
                    "kind": "category",
                    "name": "Transform",
                    "contents": [
                        { "kind": "block", "type": "position_model" },
                        { "kind": "block", "type": "scale_object" }
                    ]
                },
                {
                    "kind": "block",
                    "type": "get_property"
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
                },
                {
                    kind: 'block',
                    type: 'stop_animation',
                }
            ]
        },

        {
            kind: 'category',
            name: 'Scene',
            categorystyle: 'scene_category',
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
            categorystyle: 'physics_category',
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
            name: 'Assets',
            categorystyle: 'assets_category',
            contents: [
                {
                    kind: 'block',
                    type: 'asset_model',
                },
                {
                    kind: 'block',
                    type: 'asset_audio',
                },
                {
                    kind: 'block',
                    type: 'asset_image',
                },
                {
                    kind: 'block',
                    type: 'import_model_from_asset',
                },
                {
                    kind: 'block',
                    type: 'play_sound_from_asset',
                },
                {
                    kind: 'block',
                    type: 'set_texture_from_asset',
                }
            ]
        },
        {
            kind: 'category',
            name: 'Gameplay',
            categorystyle: 'gameplay_category',
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
            name: 'Text',
            categorystyle: 'text_category',
            contents: [
                {
                    kind: 'block',
                    type: 'text',
                },
                {
                    kind: 'block',
                    type: 'text_join',
                },
                {
                    kind: 'block',
                    type: 'text_append',
                },
                {
                    kind: 'block',
                    type: 'text_length',
                },
                {
                    kind: 'block',
                    type: 'text_isEmpty',
                },
                {
                    kind: 'block',
                    type: 'text_indexOf',
                },
                {
                    kind: 'block',
                    type: 'text_charAt',
                },
                {
                    kind: 'block',
                    type: 'text_getSubstring',
                },
                {
                    kind: 'block',
                    type: 'text_changeCase',
                },
                {
                    kind: 'block',
                    type: 'text_trim',
                },
                {
                    kind: 'block',
                    type: 'text_print',
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
        this.initAudioEngine();        
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.objects = {};
        this.materials = {};
        this.sounds = [];
        this.player = null;
        this.moveDirection = new BABYLON.Vector3(0, 0, 0);
        this.playerSpeed = 5;
        this.perFrameFunctions = [];
        this.buttonPressActions = {};
        this.inputState = { keys: {} };
        this.joystick_state = {
            up: false,
            down: false,
            left: false,
            right: false,
            pressed: false,
            angle: 0,
            force: 0
        };
        this.joystickManager = null;
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
        this.uiManager = new UIManager(this.scene);
        this.processedCollisions = new Set();

        this.initScene();
        this.initInputListeners();
        this.initJoystick();
        this.initAutoHide();
        this.runRenderLoop();
        
    }

    async initAudioEngine() {
        if (this.engine && this.engine.audioEngine && this.sounds.length > 0) {
            this.sounds.forEach(sound => {

                console.log("stopping sound");
                sound.stop(); // Set default volume
            }); 
            this.engine.audioEngine.dispose();
        }
        this.audioEngine = await BABYLON.CreateAudioEngineAsync();
    }

    initJoystick() {
        const joystickZone = document.getElementById('joystick-zone');

        // Only initialize the joystick if the touch UI is likely active (based on CSS media queries).
        if (joystickZone && window.matchMedia('(max-width: 768px)').matches) {
            this.joystickManager = nipplejs.create({
                zone: joystickZone,
                mode: 'dynamic',
                color: 'grey',
                size: 120,
                fadeTime: 0
            });

            this.joystickManager.on('added', (evt, nipple) => {
                // Detach camera controls when the joystick is active to prevent conflicts
                if (this.scene.activeCamera) {
                    this.scene.activeCamera.detachControl(this.canvas);
                }

                nipple.on('move', (evt, data) => {
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

                nipple.on('start', () => {
                    this.joystick_state.pressed = true;
                });

                nipple.on('end', () => {
                    this.joystick_state.up = false;
                    this.joystick_state.down = false;
                    this.joystick_state.left = false;
                    this.joystick_state.right = false;
                    this.joystick_state.pressed = false;
                    this.joystick_state.angle = 0;
                    this.joystick_state.force = 0;

                    // Re-attach camera controls when the joystick is released
                    if (this.scene.activeCamera) {
                        this.scene.activeCamera.attachControl(this.canvas, true);
                    }
                });
            });

            this.joystickManager.on('removed', (evt, nipple) => {
                nipple.off('start move end');
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

    async createText(name, text, fontUrl, size = 1, resolution = 16, depth = 0.5) {
        try {
            const response = await fetch(fontUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch font data from ${fontUrl}`);
            }
            const fontData = await response.json();

            const textMesh = BABYLON.MeshBuilder.CreateText(name, text, fontData, {
                size: size,
                resolution: resolution,
                depth: depth
            }, this.scene);

            if (textMesh) {
                this.objects[name] = textMesh;
                // Center the mesh pivot
                const boundingInfo = textMesh.getHierarchyBoundingVectors();
                const center = boundingInfo.max.add(boundingInfo.min).scale(0.5);
                textMesh.setPivotPoint(center);
                return textMesh;
            }
            return null;
        } catch (error) {
            console.error('Error creating 3D text:', error);
            return null;
        }
    }

    scale(target, x, y, z) {
        let name;
        if (typeof target === 'string') {
            name = target;
        } else if (target && typeof target === 'object' && target.name) {
            name = target.name;
        }

        if (name && this.objects[name]) {
            this.objects[name].scaling = new BABYLON.Vector3(x, y, z);
        }
    }

    async importModel(name, url, x, y, z) {
        // Load model using SceneLoader
        let ext = "." + name.split('.').pop().toLowerCase();
        const result = await BABYLON.SceneLoader.ImportMeshAsync(null, '', url, this.scene, null, ext);
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

    async importModelAsset(name, assetManager)
    {
        let asset = await assetManager.getAsset(name);
        if (asset) {
            let url = URL.createObjectURL(asset.data);
            return await this.importModel(name, url);
        }
    }

    async setTexture(target, assetName, assetManager) {
        let name;
        if (typeof target === 'string') {
            name = target;
        } else if (target && typeof target === 'object' && target.name) {
            name = target.name;
        }

        if (this.objects[name]) {
            const asset = await assetManager.getAsset(assetName);
            if (asset && asset.type.startsWith('image/')) {
                const url = URL.createObjectURL(asset.data);
                const texture = new BABYLON.Texture(url, this.scene);
                if (!this.objects[name].material) {
                    this.objects[name].material = new BABYLON.StandardMaterial(`${name}_material`, this.scene);
                }
                this.objects[name].material.diffuseTexture = texture;
            }
        }
    }

    move(target, x, y, z) {
        let name;
        if (typeof target === 'string') {
            name = target;
        } else if (target && typeof target === 'object' && target.name) {
            name = target.name;
        }

        if (name && this.objects[name]) {
            this.objects[name].position.set(x, y, z);
        }
    }

    changeColor(target, color) {
        let name;
        if (typeof target === 'string') {
            name = target;
        } else if (target && typeof target === 'object' && target.name) {
            name = target.name;
        }
        if (this.objects[name]) {
            if (!this.objects[name].material) {
                this.objects[name].material = new BABYLON.StandardMaterial(`${name}_material`, this.scene);
            }
            this.objects[name].material.diffuseColor = BABYLON.Color3.FromHexString(color);
        }
    }

    rotate(target, x, y, z) {
        let name;
        if (typeof target === 'string') {
            name = target;
        } else if (target && typeof target === 'object' && target.name) {
            name = target.name;
        }
        if (this.objects[name]) {
            this.objects[name].rotation = new BABYLON.Vector3(
                BABYLON.Tools.ToRadians(x),
                BABYLON.Tools.ToRadians(y),
                BABYLON.Tools.ToRadians(z)
            );
        }
    }

    enablePhysics(target, mass, impostorType = 'BoxImpostor') {
        let name;
        if (typeof target === 'string') {
            name = target;
        } else if (target && typeof target === 'object' && target.name) {
            name = target.name;
        }
        if (this.objects[name]) {
            const impostor = BABYLON.PhysicsImpostor[impostorType];
            this.objects[name].physicsImpostor = new BABYLON.PhysicsImpostor(this.objects[name], impostor, { mass: mass, restitution: 0.9 }, this.scene);
        }
    }

    onCollision(target1, target2, callback) {
        let obj1Mesh;
        if (typeof target1 === 'string') {
            obj1Mesh = this.objects[target1];
        } else if (target1 && typeof target1 === 'object') {
            obj1Mesh = target1;
        }

        if (!obj1Mesh || !obj1Mesh.physicsImpostor) {
            console.warn("onCollision: target1 is not a valid physics object.", target1);
            return;
        };

        const collisionCallback = (main, collided) => {
            // Create a unique key for the collision pair to prevent multiple triggers per frame.
            // Sort unique IDs to ensure the key is the same regardless of collision order (A-B vs B-A).
            const ids = [main.object.uniqueId, collided.object.uniqueId].sort();
            const collisionKey = `${ids[0]}-${ids[1]}`;

            // If we've already processed this collision in this frame, ignore it.
            if (this.processedCollisions.has(collisionKey)) {
                return;
            }
            // Otherwise, record it and fire the user's callback.
            this.processedCollisions.add(collisionKey);
            callback(collided.object);
        };

        // Handle single target object
        if (!Array.isArray(target2)) {
            let obj2Mesh;
            if (typeof target2 === 'string') {
                obj2Mesh = this.objects[target2];
            } else if (target2 && typeof target2 === 'object') {
                obj2Mesh = target2;
            }

            if (obj2Mesh && obj2Mesh.physicsImpostor) {
                obj1Mesh.physicsImpostor.registerOnPhysicsCollide(obj2Mesh.physicsImpostor, collisionCallback);
            } else {
                 console.warn("onCollision: target2 is not a valid physics object.", target2);
            }
        }
        // Handle target list
        else {
            // Convert list of names/objects to a list of impostors
            const targetImpostors = target2.map(item => {
                let mesh;
                if (typeof item === 'string') {
                    mesh = this.objects[item];
                } else if (item && typeof item === 'object') {
                    mesh = item;
                }
                return mesh ? mesh.physicsImpostor : null;
            }).filter(impostor => impostor != null); // Filter out nulls

            if (targetImpostors.length > 0) {
                obj1Mesh.physicsImpostor.registerOnPhysicsCollide(targetImpostors, collisionCallback);
            } else {
                console.warn("onCollision: target2 list contains no valid physics objects.", target2);
            }
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

    setAsPlayer(target) {
        let name;
        if (typeof target === 'string') {
            name = target;
        } else if (target && typeof target === 'object' && target.name) {
            name = target.name;
        }
        if (this.objects[name]) {
            this.player = this.objects[name];
        }
    }

    cameraFollow(target) {
        let mesh = null;
        if (typeof target === 'string') {
            mesh = this.objects[target];
        } else if (target && typeof target === 'object') {
            // Assumes target is a mesh object
            mesh = target;
        }

        if (mesh && this.scene.activeCamera) {
            this.scene.activeCamera.lockedTarget = mesh;
        }
    }

    cameraZoom(value) {
        if (this.scene.activeCamera && typeof this.scene.activeCamera.radius === 'number') {
            this.scene.activeCamera.radius = Math.max(1, this.scene.activeCamera.radius - value);
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
            camera.beta = BABYLON.Tools.ToRadians(45); // Classic isometric angle
            camera.radius = 20;
            camera.setTarget(BABYLON.Vector3.Zero());
        }
    }

    destroyObject(name) {
        name.dispose();
    }

    onButtonPress(button, callback) {
        if (!this.buttonPressActions[button]) {
            this.buttonPressActions[button] = [];
        }
        this.buttonPressActions[button].push(callback);
    }


    async playSound(url) {
        // Create a new sound and play it.

        if (!this.audioEngine) {
            return;
        }

        let sound = await BABYLON.CreateStreamingSoundAsync("sound", url);

        this.sounds.push(sound);
        
        await this.audioEngine.unlockAsync();
        
        sound.play();
    }

    async playSoundAsset(name, assetManager) {
        let asset = await assetManager.getAsset(name);
        if (asset && asset.data instanceof ArrayBuffer) {
            this.playSound(URL.createObjectURL(new Blob([asset.data])));
        }
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
            this.processedCollisions.clear();
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
                    const camera = this.scene.activeCamera;
                    let finalMoveDirection;

                    // If we have a camera, adjust movement to be camera-relative
                    if (camera) {
                        // Get camera's forward and right vectors on the horizontal plane
                        const cameraForward = camera.getForwardRay(1).direction;
                        const forward = new BABYLON.Vector3(cameraForward.x, 0, cameraForward.z).normalize();
                        const right = new BABYLON.Vector3(forward.z, 0, -forward.x);

                        // Calculate the final move direction based on camera orientation
                        // Z input moves along the camera's forward, X input moves along its right
                        finalMoveDirection = forward.scale(this.moveDirection.z).add(right.scale(this.moveDirection.x));
                    } else {
                        // Fallback to original behavior if no camera
                        finalMoveDirection = this.moveDirection.clone();
                    }

                    // Normalize to prevent faster diagonal movement and apply speed
                    if (finalMoveDirection.lengthSquared() > 0) {
                        const normalizedMove = finalMoveDirection.normalize().scale(this.playerSpeed);
                        newVelocity.x = normalizedMove.x;
                        newVelocity.z = normalizedMove.z;
                    }

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
        if (this.joystickManager) {
            this.joystickManager.destroy();
            this.joystickManager = null;
        }
        this.uiManager.clear();
        this.scene.dispose();
        this.scene = new BABYLON.Scene(this.engine);
        this.initScene();
        this.uiManager = new UIManager(this.scene); // Re-initialize UIManager for the new scene
        this.objects = {};
        this.materials = {};

        // Dispose all sounds
        for(let i = 0; i < this.sounds.length; i++) {
            this.sounds[i].dispose();
        }
        this.sounds = [];

        this.player = null;
        this.perFrameFunctions = [];
        this.buttonPressActions = {};
        this.inputState = { keys: {} }; // Reset state on clear
    }

    dispose() {
        if (this.joystickManager) {
            this.joystickManager.destroy();
            this.joystickManager = null;
        }
        this.uiManager.dispose();
        this.scene.dispose();
        this.engine.dispose();
    }

    getMeshNames() {
        return Object.keys(this.objects);
    }

    _getMesh(target) {
        let name;
        if (typeof target === 'string') {
            name = target;
        } else if (target && typeof target === 'object' && target.name) {
            name = target.name;
        }
        return this.objects[name];
    }

    getProperty(target, property) {
        if (!target || !property) {
            return null;
        }
        // Special handling for UI controls, which are not in the main 'objects' list
        if (typeof target === 'string' && this.uiManager.controls[target]) {
            target = this.uiManager.controls[target];
        }

        const propertyPath = property.split('.');
        let current = target;

        for (let i = 0; i < propertyPath.length; i++) {
            if (current === null || current === undefined || typeof current[propertyPath[i]] === 'undefined') {
                return null;
            }
            current = current[propertyPath[i]];
        }
        return current;
    }

    animateProperty(target, property, from, to, duration, loop, loopMode) {
        const mesh = this._getMesh(target);
        if (!mesh) return;

        const frameRate = 30;
        const totalFrames = frameRate * duration;

        // Determine the data type of the property
        let propertyType;
        const propertyPath = property.split('.');
        let temp = mesh;
        for(let i = 0; i < propertyPath.length; i++) {
            if(temp[propertyPath[i]] === undefined) {
                console.error("Invalid property path");
                return;
            }
            temp = temp[propertyPath[i]];
        }

        if (typeof temp === 'number') {
            propertyType = BABYLON.Animation.ANIMATIONTYPE_FLOAT;
        } else if (temp instanceof BABYLON.Vector3) {
            propertyType = BABYLON.Animation.ANIMATIONTYPE_VECTOR3;
        } else if (temp instanceof BABYLON.Color3) {
            propertyType = BABYLON.Animation.ANIMATIONTYPE_COLOR3;
        } else {
            console.error("Unsupported animation property type");
            return;
        }

        const bjsLoopMode = BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE;

        const animation = new BABYLON.Animation(
            "animation",
            property,
            frameRate,
            propertyType,
            bjsLoopMode
        );

        const keys = [];
        keys.push({ frame: 0, value: from });
        keys.push({ frame: totalFrames, value: to });
        if (loopMode === 'PINGPONG') {
            keys.push({ frame: totalFrames * 2, value: from });
        }

        animation.setKeys(keys);

        // Stop any previous animations on the same property before starting a new one
        this.scene.stopAnimation(mesh, property);

        const endFrame = loopMode === 'PINGPONG' ? totalFrames * 2 : totalFrames;
        this.scene.beginDirectAnimation(mesh, [animation], 0, endFrame, loop);
    }

    stopAnimation(target) {
        const mesh = this._getMesh(target);
        if (mesh) {
            this.scene.stopAnimation(mesh);
        }
    }
}

class UIManager {
    constructor(scene) {
        this.scene = scene;
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.scene);
        this.controls = {};
    }

    createText(name, text, options = {}) {
        const textBlock = new BABYLON.GUI.TextBlock(name, text);
        textBlock.resizeToFit = true;
        textBlock.color = options.color || "white";
        textBlock.fontSize = options.fontSize || 24;
        textBlock.top = options.top || "0px";
        textBlock.left = options.left || "0px";
        textBlock.horizontalAlignment = options.horizontalAlignment !== undefined ? options.horizontalAlignment : BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        textBlock.verticalAlignment = options.verticalAlignment !== undefined ? options.verticalAlignment : BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.advancedTexture.addControl(textBlock);
        this.controls[name] = textBlock;
        return textBlock;
    }

    setText(name, text) {
        if (this.controls[name] && this.controls[name].text !== undefined) {
            this.controls[name].text = text;
        }
    }

    createInput(name, options = {}) {
        const inputText = new BABYLON.GUI.InputText(name);
        inputText.width = options.width || "200px";
        inputText.height = options.height || "40px";
        inputText.color = options.color || "white";
        inputText.background = options.background || "grey";
        inputText.top = options.top || "0px";
        inputText.left = options.left || "0px";
        inputText.horizontalAlignment = options.horizontalAlignment !== undefined ? options.horizontalAlignment : BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        inputText.verticalAlignment = options.verticalAlignment !== undefined ? options.verticalAlignment : BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.advancedTexture.addControl(inputText);
        this.controls[name] = inputText;
        return inputText;
    }

    getInputText(name) {
        if (this.controls[name] && this.controls[name].text !== undefined) {
            return this.controls[name].text;
        }
        return "";
    }

    clear() {
        // Dispose all controls
        for (const name in this.controls) {
            this.controls[name].dispose();
        }
        this.controls = {};
        // The advancedTexture itself doesn't need to be cleared of controls one-by-one if it's going to be disposed
    }

    dispose() {
        this.clear();
        this.advancedTexture.dispose();
    }
}

// Define a custom theme for Digital Education Safety
Blockly.Themes.DigitalEducationSafety = Blockly.Theme.defineTheme('digital-education-safety', {
    'base': Blockly.Themes.Classic,
    'categoryStyles': {
        'logic_category': { 'colour': '#4C97FF' },      // A vibrant blue for logic
        'loop_category': { 'colour': '#FFBF00' },       // A bright yellow for loops, like Scratch
        'math_category': { 'colour': '#59C059' },       // A friendly green for math
        'text_category': { 'colour': '#9966FF' },       // A gentle purple for text
        'list_category': { 'colour': '#FF6680' },       // A distinct pink/red for lists
        'colour_category': { 'colour': '#CF63CF' },
        'variable_category': { 'colour': '#FF8C1A' },   // A bold orange for variables
        'procedure_category': { 'colour': '#FF6347' },  // Tomato red for functions
        'audio_category': { 'colour': '#5B80A5' },      // Kept the original, can be changed
        'motion_category': { 'colour': '#4C97FF' },     // Blue for motion/objects
        'scene_category': { 'colour': '#59C059' },      // Green for scene elements
        'physics_category': { 'colour': '#A55B80' },    // Kept original for physics
        'gameplay_category': { 'colour': '#FF6347' },   // Red for gameplay actions
        'assets_category': { 'colour': '#FF8C1A' }      // Orange for assets
    },
    'blockStyles': {
        'logic_blocks': { 'colourPrimary': '#4C97FF', 'colourSecondary': '#6CA7FF', 'colourTertiary': '#3C87EF' },
        'loop_blocks': { 'colourPrimary': '#FFBF00', 'colourSecondary': '#FFD44C', 'colourTertiary': '#E6AC00' },
        'math_blocks': { 'colourPrimary': '#59C059', 'colourSecondary': '#73C873', 'colourTertiary': '#4FAA4F' },
        'text_blocks': { 'colourPrimary': '#9966FF', 'colourSecondary': '#AD85FF', 'colourTertiary': '#8A4DFF' },
        'list_blocks': { 'colourPrimary': '#FF6680', 'colourSecondary': '#FF8095', 'colourTertiary': '#FF4D6A' },
        'variable_blocks': { 'colourPrimary': '#FF8C1A', 'colourSecondary': '#FFA347', 'colourTertiary': '#E67E00' },
        'procedure_blocks': { 'colourPrimary': '#FF6347', 'colourSecondary': '#FF7D66', 'colourTertiary': '#E65A40' },
        'motion_blocks': { 'colourPrimary': '#4C97FF', 'colourSecondary': '#6CA7FF', 'colourTertiary': '#3C87EF' },
        'scene_blocks': { 'colourPrimary': '#59C059', 'colourSecondary': '#73C873', 'colourTertiary': '#4FAA4F' },
        'physics_blocks': { 'colourPrimary': '#A55B80', 'colourSecondary': '#B57B90', 'colourTertiary': '#954B70' },
        'gameplay_blocks': { 'colourPrimary': '#FF6347', 'colourSecondary': '#FF7D66', 'colourTertiary': '#E65A40' },
        'assets_blocks': { 'colourPrimary': '#FF8C1A', 'colourSecondary': '#FFA347', 'colourTertiary': '#E67E00' }
    },
    'componentStyles': {
        'workspaceBackgroundColour': '#F9F9F9',
        'toolboxBackgroundColour': '#FFFFFF',
        'toolboxForegroundColour': '#585858',
        'flyoutBackgroundColour': '#F0F0F0',
        'flyoutForegroundColour': '#424242',
        'scrollbarColour': '#D4D4D4',
        'insertionMarkerColour': '#FFCC00',
        'insertionMarkerOpacity': 0.5
    },
    'fontStyle': { 'family': '"Helvetica Neue", "Arial", sans-serif', 'weight': '500', 'size': 11 }
});


        const workspace = Blockly.inject('blocklyDiv', {
            toolbox: toolbox,
            theme: Blockly.Themes.DigitalEducationSafety,
            renderer: 'zelos',
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

        function getModelAssets() {
            const modelOptions = assetManager.assets
                .filter(asset => asset.type.startsWith('model/') || asset.name.endsWith('.glb') || asset.name.endsWith('.gltf'))
                .map(asset => [asset.name, asset.name]);
            return modelOptions.length > 0 ? modelOptions : [['none', 'NONE']];
        }

        function getAudioAssets() {
            const audioOptions = assetManager.assets
                .filter(asset => asset.type.startsWith('audio/'))
                .map(asset => [asset.name, asset.name]);
            return audioOptions.length > 0 ? audioOptions : [['none', 'NONE']];
        }

        function getImageAssets() {
            const imageOptions = assetManager.assets
                .filter(asset => asset.type.startsWith('image/'))
                .map(asset => [asset.name, asset.name]);
            return imageOptions.length > 0 ? imageOptions : [['none', 'NONE']];
        }

        Blockly.Blocks['asset_model'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("model asset")
                    .appendField(new Blockly.FieldDropdown(getModelAssets), "ASSET");
                this.setOutput(true, "String");
                this.setColour('#A55B5B');
                this.setTooltip("Selects a model asset.");
                this.setHelpUrl("");
            }
        };

        Blockly.Blocks['asset_audio'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("audio asset")
                    .appendField(new Blockly.FieldDropdown(getAudioAssets), "ASSET");
                this.setOutput(true, "String");
                this.setColour('#A55B5B');
                this.setTooltip("Selects an audio asset.");
                this.setHelpUrl("");
            }
        };

        Blockly.Blocks['asset_image'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("image asset")
                    .appendField(new Blockly.FieldDropdown(getImageAssets), "ASSET");
                this.setOutput(true, "String");
                this.setColour('#A55B5B');
                this.setTooltip("Selects an image asset.");
                this.setHelpUrl("");
            }
        };

        Blockly.defineBlocksWithJsonArray([
            {
                "type": "import_model_from_asset",
                "message0": "import model from asset %1 as %2",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ASSET",
                        "check": "String"
                    },
                    {
                        "type": "field_variable",
                        "name": "VAR",
                        "variable": "model"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "%{BKY_MATH_HUE}",
                "tooltip": "Imports a model from the asset manager.",
                "helpUrl": ""
            },
            {
                "type": "play_sound_from_asset",
                "message0": "play sound from asset %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ASSET",
                        "check": "String"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "%{BKY_AUDIO_HUE}",
                "tooltip": "Plays a sound from the asset manager.",
                "helpUrl": ""
            },
            {
                "type": "set_texture_from_asset",
                "message0": "set texture of %1 to asset %2",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "OBJECT"
                    },
                    {
                        "type": "input_value",
                        "name": "ASSET",
                        "check": "String"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "%{BKY_MATH_HUE}",
                "tooltip": "Sets the texture of an object from an image asset.",
                "helpUrl": ""
            },
            {
                "type": "position_model",
                "message0": "position model %1 at X %2 Y %3 Z %4",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "MODEL"
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
                "inputsInline": true,
                output: "Mesh",
                colour: 160,
                tooltip: 'Creates a box at the specified position and returns it.',
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
                "inputsInline": true,
                output: "Mesh",
                colour: 160,
                tooltip: 'Creates a sphere at the specified position and returns it.',
            },
            {
                "type": "create_3d_text",
                "message0": "create 3D text %1 named %2",
                "args0": [
                    { "type": "input_value", "name": "TEXT", "check": "String" },
                    { "type": "field_input", "name": "NAME", "text": "myText" }
                ],
                "message1": "font URL %1",
                "args1": [
                    { "type": "field_input", "name": "FONT_URL", "text": "https://assets.babylonjs.com/fonts/Droid Sans_Bold.json" }
                ],
                "output": "Mesh",
                "colour": 160,
                "tooltip": "Creates a 3D text mesh.",
                "helpUrl": ""
            },
            {
                "type": "scale_object",
                "message0": "scale object %1 by x %2 y %3 z %4",
                "args0": [
                    { "type": "input_value", "name": "OBJECT" },
                    { "type": "input_value", "name": "X", "check": "Number" },
                    { "type": "input_value", "name": "Y", "check": "Number" },
                    { "type": "input_value", "name": "Z", "check": "Number" }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": 210,
                "tooltip": "Scales an object."
            },
            {
                "type": "get_property",
                "message0": "get property %1 of object %2",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "PROPERTY",
                        "check": "String"
                    },
                    {
                        "type": "input_value",
                        "name": "OBJECT"
                    }
                ],
                "output": null,
                "colour": 230,
                "tooltip": "Gets a property from an object.",
                "helpUrl": ""
            },
            {
                type: 'move_object',
                message0: 'Move object %1 to x %2 y %3 z %4',
                args0: [
                    { type: 'input_value', name: 'NAME' },
                    { type: 'input_value', name: 'X', check: 'Number' },
                    { type: 'input_value', name: 'Y', check: 'Number' },
                    { type: 'input_value', name: 'Z', check: 'Number' },
                ],
                "inputsInline": true,
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
                "inputsInline": true,
                previousStatement: null,
                nextStatement: null,
                colour: 65,
                tooltip: 'Creates a light at the specified position',
            },
            {
                type: 'change_object_color',
                message0: 'Change color of %1 to %2',
                args0: [
                    { type: 'input_value', name: 'NAME' },
                    { type: 'field_input', name: 'COLOR', text: '#ff0000' },
                ],
                "inputsInline": true,
                previousStatement: null,
                nextStatement: null,
                colour: 210,
                tooltip: 'Changes the color of the specified object',
            },
            {
                type: 'rotate_object',
                message0: 'Rotate %1 by x %2 y %3 z %4 degrees',
                args0: [
                    { type: 'input_value', name: 'NAME' },
                    { type: 'input_value', name: 'X', check: 'Number' },
                    { type: 'input_value', name: 'Y', check: 'Number' },
                    { type: 'input_value', name: 'Z', check: 'Number' },
                ],
                "inputsInline": true,
                previousStatement: null,
                nextStatement: null,
                colour: 120,
                tooltip: 'Rotates an object by the specified angles',
            },
            {
                "type": "animate_object",
                "message0": "animate property %1 of %2",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "PROPERTY",
                        "options": [
                            ["position.x", "position.x"],
                            ["position.y", "position.y"],
                            ["position.z", "position.z"],
                            ["rotation.x", "rotation.x"],
                            ["rotation.y", "rotation.y"],
                            ["rotation.z", "rotation.z"],
                            ["scaling.x", "scaling.x"],
                            ["scaling.y", "scaling.y"],
                            ["scaling.z", "scaling.z"]
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "OBJECT"
                    }
                ],
                "message1": "from %1 to %2 over %3 seconds",
                "args1": [
                    { "type": "input_value", "name": "FROM", "check": "Number" },
                    { "type": "input_value", "name": "TO", "check": "Number" },
                    { "type": "input_value", "name": "DURATION", "check": "Number" }
                ],
                "message2": "loop %1",
                "args2": [
                    {
                        "type": "field_dropdown",
                        "name": "LOOP",
                        "options": [
                            ["no", "NO"],
                            ["yes", "YES"],
                            ["ping-pong", "PINGPONG"]
                        ]
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": 300,
                "tooltip": "Animates a property of an object over a duration."
            },
            {
                "type": "stop_animation",
                "message0": "stop animation on %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "OBJECT"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": 300,
                "tooltip": "Stops all animations on the specified object."
            },
            {
                type: 'enable_physics',
                message0: 'Enable physics on %1 with mass %2',
                args0: [
                    { type: 'input_value', name: 'NAME' },
                    { type: 'input_value', name: 'MASS', check: 'Number' },
                ],
                "inputsInline": true,
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
                "inputsInline": true,
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
                "inputsInline": true,
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
                "inputsInline": true,
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
                "inputsInline": true,
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
                "inputsInline": true,
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
                "inputsInline": true,
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
                "inputsInline": true,
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
                        "check": ["String", "Mesh"]
                    },
                    {
                        "type": "input_value",
                        "name": "OBJECT2",
                        "check": ["Array", "String", "Mesh"]
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
                "tooltip": "Executes code when two objects collide. Can check against a single object or a list of objects.",
                "helpUrl": "",
                "extraState": {
                    "hasCollidedObjectVar": true
                }
            },
            {
                "type": "destroy_object",
                "message0": "destroy object %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "OBJECT"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#5BA55B",
                "tooltip": "Destroys the specified object.",
                "helpUrl": ""
            },
            {
                "type": "set_as_player",
                "message0": "set %1 as player",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "OBJECT"
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
                "type": "camera_zoom",
                "message0": "zoom camera by %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ZOOM",
                        "check": "Number"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#A55B80",
                "tooltip": "Zooms the camera in or out.",
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
            },
            // GUI Blocks
            {
                "type": "gui_create_text_block",
                "message0": "create text block named %1 with text %2",
                "args0": [
                    { "type": "field_input", "name": "NAME", "text": "myText" },
                    { "type": "input_value", "name": "TEXT", "check": "String" }
                ],
                "message1": "align horizontal %1 vertical %2",
                "args1": [
                    {
                        "type": "field_dropdown", "name": "H_ALIGN",
                        "options": [["left", "0"], ["right", "1"], ["center", "2"]]
                    },
                    {
                        "type": "field_dropdown", "name": "V_ALIGN",
                        "options": [["top", "0"], ["bottom", "1"], ["center", "2"]]
                    }
                ],
                "message2": "at top %1 left %2",
                "args2": [
                    { "type": "input_value", "name": "TOP", "check": "String" },
                    { "type": "input_value", "name": "LEFT", "check": "String" }
                ],
                "inputsInline": false,
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#5B80A5",
                "tooltip": "Creates a new text block in the GUI with positioning.",
                "helpUrl": ""
            },
            {
                "type": "gui_set_text",
                "message0": "set text of GUI element %1 to %2",
                "args0": [
                    { "type": "field_input", "name": "NAME", "text": "myText" },
                    { "type": "input_value", "name": "TEXT", "check": "String" }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#5B80A5",
                "tooltip": "Sets the text of an existing GUI text block.",
                "helpUrl": ""
            },
            {
                "type": "gui_create_input_text",
                "message0": "create input field named %1",
                "args0": [
                    { "type": "field_input", "name": "NAME", "text": "myInput" }
                ],
                "message1": "align horizontal %1 vertical %2",
                "args1": [
                    {
                        "type": "field_dropdown", "name": "H_ALIGN",
                        "options": [["left", "0"], ["right", "1"], ["center", "2"]]
                    },
                    {
                        "type": "field_dropdown", "name": "V_ALIGN",
                        "options": [["top", "0"], ["bottom", "1"], ["center", "2"]]
                    }
                ],
                "message2": "at top %1 left %2",
                "args2": [
                    { "type": "input_value", "name": "TOP", "check": "String" },
                    { "type": "input_value", "name": "LEFT", "check": "String" }
                ],
                "inputsInline": false,
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#5B80A5",
                "tooltip": "Creates a new input text field in the GUI with positioning.",
                "helpUrl": ""
            },
            {
                "type": "gui_get_input_text",
                "message0": "get text from input field %1",
                "args0": [
                    { "type": "field_input", "name": "NAME", "text": "myInput" }
                ],
                "output": "String",
                "colour": "#5B80A5",
                "tooltip": "Gets the text from a GUI input field.",
                "helpUrl": ""
            },
            // Console Blocks
            {
                "type": "console_log",
                "message0": "console log %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "VALUE"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#5B80A5",
                "tooltip": "Logs a value to the browser console.",
                "helpUrl": ""
            },
            {
                "type": "console_warn",
                "message0": "console warn %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "VALUE"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#A5745B",
                "tooltip": "Logs a warning to the browser console.",
                "helpUrl": ""
            },
            {
                "type": "console_error",
                "message0": "console error %1",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "VALUE"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#A55B5B",
                "tooltip": "Logs an error to the browser console.",
                "helpUrl": ""
            },
            {
                "type": "console_clear",
                "message0": "console clear",
                "previousStatement": null,
                "nextStatement": null,
                "colour": "#4C97FF",
                "tooltip": "Clears the browser console.",
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

            javascript.javascriptGenerator.forBlock['camera_zoom'] = function(block, generator) {
                const zoomValue = generator.valueToCode(block, 'ZOOM', generator.ORDER_ATOMIC) || 0;
                return `sceneManager.cameraZoom(${zoomValue});\n`;
            };

            // --- Gameplay Block Generators ---
            javascript.javascriptGenerator.forBlock['on_collision'] = function(block, generator) {
                const obj1 = generator.valueToCode(block, 'OBJECT1', generator.ORDER_ATOMIC) || 'null';
                const obj2 = generator.valueToCode(block, 'OBJECT2', generator.ORDER_ATOMIC) || 'null';
                const doCode = generator.statementToCode(block, 'DO');

                // The 'collided_object' variable is made available within the 'DO' statement.
                // We need to ensure that the variable is properly declared and scoped.
                const collidedObjectVar = generator.nameDB_.getName('collided_object', Blockly.VARIABLE_CATEGORY_NAME);
                const callback = `function(${collidedObjectVar}) {
                    // This function will be called with the collided object.
                    // We can then execute the DO code.
                    ${doCode}
                }`;
                // The generated code should call the onCollision method with the callback.
                return `sceneManager.onCollision(${obj1}, ${obj2}, ${callback});\n`;
            };

            javascript.javascriptGenerator.forBlock['destroy_object'] = function(block, generator) {
                const objectName = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC) || 'null';
                return `sceneManager.destroyObject(${objectName});\n`;
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
                const modelVar = generator.valueToCode(block, 'MODEL', generator.ORDER_ATOMIC) || 'null';
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0';
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0';
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || '0';
                return `sceneManager.move(${modelVar}, ${x}, ${y}, ${z});\n`;
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
                const code = `sceneManager.createBox('${name}', ${x}, ${y}, ${z})`;
                return [code, generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['create_sphere'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || 0;
                const code = `sceneManager.createSphere('${name}', ${x}, ${y}, ${z})`;
                return [code, generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['create_3d_text'] = function(block, generator) {
                const text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || "''";
                const name = block.getFieldValue('NAME');
                const fontUrl = block.getFieldValue('FONT_URL');
                const code = `await sceneManager.createText('${name}', ${text}, '${fontUrl}')`;
                return [code, generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['scale_object'] = function(block, generator) {
                const object = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC) || 'null';
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || 1;
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || 1;
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || 1;
                return `sceneManager.scale(${object}, ${x}, ${y}, ${z});\n`;
            };

            javascript.javascriptGenerator.forBlock['get_property'] = function(block, generator) {
                const object = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC) || 'null';
                const property = generator.valueToCode(block, 'PROPERTY', generator.ORDER_ATOMIC) || "''";
                const code = `sceneManager.getProperty(${object}, ${property})`;
                return [code, generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['move_object'] = function (block, generator) {
                const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || 'null';
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || 0;
                return `sceneManager.move(${name}, ${x}, ${y}, ${z});\n`;
            };

            javascript.javascriptGenerator.forBlock['create_light'] = function (block, generator) {
                const name = block.getFieldValue('NAME');
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || 0;
                return `sceneManager.createLight('${name}', ${x}, ${y}, ${z});\n`;
            };

            javascript.javascriptGenerator.forBlock['change_object_color'] = function (block, generator) {
                const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || 'null';
                const color = block.getFieldValue('COLOR');
                return `sceneManager.changeColor(${name}, '${color}');\n`;
            };

            javascript.javascriptGenerator.forBlock['rotate_object'] = function (block, generator) {
                const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || 'null';
                const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || 0;
                const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || 0;
                const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || 0;
                return `sceneManager.rotate(${name}, ${x}, ${y}, ${z});\n`;
            };

            javascript.javascriptGenerator.forBlock['animate_object'] = function(block, generator) {
                const object = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC) || 'null';
                const property = block.getFieldValue('PROPERTY');
                const from = generator.valueToCode(block, 'FROM', generator.ORDER_ATOMIC) || 0;
                const to = generator.valueToCode(block, 'TO', generator.ORDER_ATOMIC) || 0;
                const duration = generator.valueToCode(block, 'DURATION', generator.ORDER_ATOMIC) || 1;
                const loop = block.getFieldValue('LOOP');

                let loopBool = false;
                let loopMode = 'CYCLE'; // Default string

                if (loop === 'YES') {
                    loopBool = true;
                } else if (loop === 'PINGPONG') {
                    loopBool = true;
                    loopMode = 'PINGPONG';
                }

                return `sceneManager.animateProperty(${object}, '${property}', ${from}, ${to}, ${duration}, ${loopBool}, '${loopMode}');\n`;
            };

            javascript.javascriptGenerator.forBlock['stop_animation'] = function(block, generator) {
                const object = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC) || 'null';
                return `sceneManager.stopAnimation(${object});\n`;
            };

            javascript.javascriptGenerator.forBlock['enable_physics'] = function (block, generator) {
                const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || 'null';
                const mass = generator.valueToCode(block, 'MASS', generator.ORDER_ATOMIC) || 1;
                return `sceneManager.enablePhysics(${name}, ${mass});\n`;
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
                return `
                    sceneManager.playSound('${url}');
                `;                
            };

            javascript.javascriptGenerator.forBlock['play_note'] = function(block, generator) {
                const note = block.getFieldValue('NOTE');
                const duration = generator.valueToCode(block, 'DURATION', generator.ORDER_ATOMIC) || '0.5';
                return `sceneManager.playNote(${note}, ${duration});\n`;
            };

            javascript.javascriptGenerator.forBlock['asset_model'] = function(block, generator) {
                const assetName = block.getFieldValue('ASSET');
                return [`'${assetName}'`, generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['asset_audio'] = function(block, generator) {
                const assetName = block.getFieldValue('ASSET');
                return [`'${assetName}'`, generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['asset_image'] = function(block, generator) {
                const assetName = block.getFieldValue('ASSET');
                return [`'${assetName}'`, generator.ORDER_ATOMIC];
            };

            javascript.javascriptGenerator.forBlock['import_model_from_asset'] = function(block, generator) {
                const assetName = generator.valueToCode(block, 'ASSET', generator.ORDER_ATOMIC) || 'null';
                const varName = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
                return `var ${varName} = await sceneManager.importModelAsset(${assetName}, assetManager);\n`;
            };

            javascript.javascriptGenerator.forBlock['play_sound_from_asset'] = function(block, generator) {
                const assetName = generator.valueToCode(block, 'ASSET', generator.ORDER_ATOMIC) || 'null';
                return `sceneManager.playSoundAsset(${assetName}, assetManager);\n`;
            };

            javascript.javascriptGenerator.forBlock['set_texture_from_asset'] = function(block, generator) {
                const object = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC) || 'null';
                const assetName = generator.valueToCode(block, 'ASSET', generator.ORDER_ATOMIC) || 'null';
                return `sceneManager.setTexture(${object}, ${assetName}, assetManager);\n`;
            };

            // --- GUI Block Generators ---
            javascript.javascriptGenerator.forBlock['gui_create_text_block'] = function(block, generator) {
                const name = block.getFieldValue('NAME');
                const text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || "''";
                const hAlign = parseInt(block.getFieldValue('H_ALIGN'));
                const vAlign = parseInt(block.getFieldValue('V_ALIGN'));

                let top, left;
                const topBlock = block.getInputTargetBlock('TOP');
                if (topBlock && topBlock.type === 'text') {
                    top = `'${topBlock.getFieldValue('TEXT')}'`;
                } else {
                    top = generator.valueToCode(block, 'TOP', generator.ORDER_ATOMIC) || "'0px'";
                }

                const leftBlock = block.getInputTargetBlock('LEFT');
                if (leftBlock && leftBlock.type === 'text') {
                    left = `'${leftBlock.getFieldValue('TEXT')}'`;
                } else {
                    left = generator.valueToCode(block, 'LEFT', generator.ORDER_ATOMIC) || "'0px'";
                }

                const options = `{
                    horizontalAlignment: ${hAlign},
                    verticalAlignment: ${vAlign},
                    top: ${top},
                    left: ${left}
                }`;

                return `sceneManager.uiManager.createText('${name}', ${text}, ${options});\n`;
            };

            javascript.javascriptGenerator.forBlock['gui_set_text'] = function(block, generator) {
                const name = block.getFieldValue('NAME');
                const text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || "''";
                return `sceneManager.uiManager.setText('${name}', ${text});\n`;
            };

            javascript.javascriptGenerator.forBlock['gui_create_input_text'] = function(block, generator) {
                const name = block.getFieldValue('NAME');
                const hAlign = parseInt(block.getFieldValue('H_ALIGN'));
                const vAlign = parseInt(block.getFieldValue('V_ALIGN'));

                let top, left;
                const topBlock = block.getInputTargetBlock('TOP');
                if (topBlock && topBlock.type === 'text') {
                    top = `'${topBlock.getFieldValue('TEXT')}'`;
                } else {
                    top = generator.valueToCode(block, 'TOP', generator.ORDER_ATOMIC) || "'0px'";
                }

                const leftBlock = block.getInputTargetBlock('LEFT');
                if (leftBlock && leftBlock.type === 'text') {
                    left = `'${leftBlock.getFieldValue('TEXT')}'`;
                } else {
                    left = generator.valueToCode(block, 'LEFT', generator.ORDER_ATOMIC) || "'0px'";
                }

                const options = `{
                    horizontalAlignment: ${hAlign},
                    verticalAlignment: ${vAlign},
                    top: ${top},
                    left: ${left}
                }`;

                return `sceneManager.uiManager.createInput('${name}', ${options});\n`;
            };

            javascript.javascriptGenerator.forBlock['gui_get_input_text'] = function(block, generator) {
                const name = block.getFieldValue('NAME');
                const code = `sceneManager.uiManager.getInputText('${name}')`;
                return [code, generator.ORDER_ATOMIC];
            };

            // --- Console Block Generators ---
            javascript.javascriptGenerator.forBlock['console_log'] = function(block, generator) {
                const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || 'null';
                return `console.log(${value});\n`;
            };

            javascript.javascriptGenerator.forBlock['console_warn'] = function(block, generator) {
                const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || 'null';
                return `console.warn(${value});\n`;
            };

            javascript.javascriptGenerator.forBlock['console_error'] = function(block, generator) {
                const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || 'null';
                return `console.error(${value});\n`;
            };

            javascript.javascriptGenerator.forBlock['console_clear'] = function(block, generator) {
                return `console.clear();\n`;
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

                // Resize the GUI advanced texture to match the new canvas size
                sceneManager.uiManager.advancedTexture.scaleTo(sceneManager.engine.getRenderWidth(), sceneManager.engine.getRenderHeight());

                // Mark the texture as dirty to force a re-render of the GUI
                sceneManager.uiManager.advancedTexture.markAsDirty();                  
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


        function loadWorkspaceDefault() {
            let state = { 
                "blocks": {
                  "languageVersion": 0,
                  "blocks": [
                    {
                      "type": "on_collision",
                      "id": "L`gm9HH$exoAbHsNrYa^",
                      "x": 0,
                      "y": 1040,
                      "inputs": {
                        "OBJECT1": {
                          "block": {
                            "type": "variables_get",
                            "id": "`A4E%KMz(hXYFiGmj5)]",
                            "fields": {
                              "VAR": {
                                "id": "player_mesh_var"
                              }
                            }
                          }
                        },
                        "OBJECT2": {
                          "block": {
                            "type": "variables_get",
                            "id": "IYw2P]:zJqlV6-9y$r#r",
                            "fields": {
                              "VAR": {
                                "id": "coin_list_var"
                              }
                            }
                          }
                        },
                        "DO": {
                          "block": {
                            "type": "variables_set",
                            "id": "tmqIyZ-|]VVk3fkjePkC",
                            "fields": {
                              "VAR": {
                                "id": "score_var"
                              }
                            },
                            "inputs": {
                              "VALUE": {
                                "block": {
                                  "type": "math_arithmetic",
                                  "id": "yABsL.e0bOAmJcrw7cV{",
                                  "fields": {
                                    "OP": "ADD"
                                  },
                                  "inputs": {
                                    "A": {
                                      "block": {
                                        "type": "variables_get",
                                        "id": "-)%xiEyT#eRWl~L={EOd",
                                        "fields": {
                                          "VAR": {
                                            "id": "score_var"
                                          }
                                        }
                                      }
                                    },
                                    "B": {
                                      "block": {
                                        "type": "math_number",
                                        "id": "*7!0Fjua_M^TgwS39wrV",
                                        "fields": {
                                          "NUM": 1
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "next": {
                              "block": {
                                "type": "gui_set_text",
                                "id": "-g5;E;J0f%T#?OM7$2.e",
                                "fields": {
                                  "NAME": "scoreText"
                                },
                                "inputs": {
                                  "TEXT": {
                                    "block": {
                                      "type": "text_join",
                                      "id": "x91Ze(W_hB(Pv/:~xBbZ",
                                      "extraState": {
                                        "itemCount": 2
                                      },
                                      "inputs": {
                                        "ADD0": {
                                          "block": {
                                            "type": "text",
                                            "id": "lhbSr##S!}Zo#=8.]Kb[",
                                            "fields": {
                                              "TEXT": "Score: "
                                            }
                                          }
                                        },
                                        "ADD1": {
                                          "block": {
                                            "type": "variables_get",
                                            "id": "mE2Yl@56KA06glk$_n7N",
                                            "fields": {
                                              "VAR": {
                                                "id": "score_var"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "next": {
                                  "block": {
                                    "type": "play_note",
                                    "id": ":5EOEsiJnvorI)aV/+x(",
                                    "fields": {
                                      "NOTE": "261.63"
                                    },
                                    "inputs": {
                                      "DURATION": {
                                        "block": {
                                          "type": "math_number",
                                          "id": "YD6EkfJPl99x-1=Lg#*1",
                                          "fields": {
                                            "NUM": 0.1
                                          }
                                        }
                                      }
                                    },
                                    "next": {
                                      "block": {
                                        "type": "destroy_object",
                                        "id": "4?_S[y4VVum86a(wiLud",
                                        "inputs": {
                                          "OBJECT": {
                                            "block": {
                                              "type": "variables_get",
                                              "id": "Zx,`6OK-70PY-KPXLn!z",
                                              "fields": {
                                                "VAR": {
                                                  "id": "collided_object_var"
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "next": {
                                          "block": {
                                            "type": "controls_if",
                                            "id": "]+GG/~c0|.6JrMFoYU7M",
                                            "inputs": {
                                              "IF0": {
                                                "block": {
                                                  "type": "logic_compare",
                                                  "id": "5]5~Cj_7-^YaDCgi5/v`",
                                                  "fields": {
                                                    "OP": "EQ"
                                                  },
                                                  "inputs": {
                                                    "A": {
                                                      "block": {
                                                        "type": "variables_get",
                                                        "id": ":MVpl!75_g8Q*|e`9PtQ",
                                                        "fields": {
                                                          "VAR": {
                                                            "id": "score_var"
                                                          }
                                                        }
                                                      }
                                                    },
                                                    "B": {
                                                      "block": {
                                                        "type": "math_number",
                                                        "id": "Bya#vfkC88KuFE?V]Y[2",
                                                        "fields": {
                                                          "NUM": 10
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              },
                                              "DO0": {
                                                "block": {
                                                  "type": "gui_set_text",
                                                  "id": "!tVxa+o%?d!]X+nD!Q[5",
                                                  "fields": {
                                                    "NAME": "scoreText"
                                                  },
                                                  "inputs": {
                                                    "TEXT": {
                                                      "block": {
                                                        "type": "text",
                                                        "id": "TYN/sWt:4B9$kMAs]m-]",
                                                        "fields": {
                                                          "TEXT": "Game Over!"
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
                          }
                        }
                      }
                    },
                    {
                      "type": "on_button_press",
                      "id": "UAy#Z$_t:J{?m(,PI1t!",
                      "x": 0,
                      "y": 1568,
                      "fields": {
                        "BUTTON": "A"
                      },
                      "inputs": {
                        "DO": {
                          "block": {
                            "type": "player_jump",
                            "id": "AXg{|4~-39Te|KCJM]hc",
                            "inputs": {
                              "FORCE": {
                                "block": {
                                  "type": "math_number",
                                  "id": "s;,=1*Ujd@yvH?FPfuzv",
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
                      "id": "F$dNZ=JZ-nD(|M7H^*h2",
                      "x": 0,
                      "y": 1752,
                      "fields": {
                        "BUTTON": "Left"
                      },
                      "inputs": {
                        "DO": {
                          "block": {
                            "type": "player_move",
                            "id": "i:([6IHW|c4=.e(%lvzB",
                            "fields": {
                              "DIRECTION": "LEFT"
                            },
                            "inputs": {
                              "SPEED": {
                                "block": {
                                  "type": "math_number",
                                  "id": "A,66+PF,ZjYi@8iH6zt!",
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
                      "id": "HTQ!Xe]v](c9yz1Mh^RL",
                      "x": 0,
                      "y": 1936,
                      "fields": {
                        "BUTTON": "Right"
                      },
                      "inputs": {
                        "DO": {
                          "block": {
                            "type": "player_move",
                            "id": "(,7RZaC^d9ODf)PH?170",
                            "fields": {
                              "DIRECTION": "RIGHT"
                            },
                            "inputs": {
                              "SPEED": {
                                "block": {
                                  "type": "math_number",
                                  "id": "Q:MS@uPEM3m96P3r_V]+",
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
                      "id": "Na_s|Jo}acP=8ay2W,|)",
                      "x": 0,
                      "y": 2120,
                      "fields": {
                        "BUTTON": "Up"
                      },
                      "inputs": {
                        "DO": {
                          "block": {
                            "type": "player_move",
                            "id": "013n`C~M}.Yj:Lt?Yllo",
                            "fields": {
                              "DIRECTION": "FORWARD"
                            },
                            "inputs": {
                              "SPEED": {
                                "block": {
                                  "type": "math_number",
                                  "id": "ho21:L)1C?A6iE$(KLZk",
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
                      "id": "lmWNAu@2r7OaJ+_(XK9H",
                      "x": 0,
                      "y": 2304,
                      "fields": {
                        "BUTTON": "Down"
                      },
                      "inputs": {
                        "DO": {
                          "block": {
                            "type": "player_move",
                            "id": "RI$J%Sq|-4bhBL4!?c8Y",
                            "fields": {
                              "DIRECTION": "BACKWARD"
                            },
                            "inputs": {
                              "SPEED": {
                                "block": {
                                  "type": "math_number",
                                  "id": "jCBAeOF1oR5)T$a#:M9~",
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
                      "type": "variables_set",
                      "id": "}W81V.o9|m0(F%(?@^u.",
                      "x": 0,
                      "y": 352,
                      "fields": {
                        "VAR": {
                          "id": "score_var"
                        }
                      },
                      "inputs": {
                        "VALUE": {
                          "block": {
                            "type": "math_number",
                            "id": "R/SM|Rm%Y*h:/g6_a%{n",
                            "fields": {
                              "NUM": 0
                            }
                          }
                        }
                      },
                      "next": {
                        "block": {
                          "type": "gui_create_text_block",
                          "id": "SIAHN.*nA:cnjb;Z6Uby",
                          "fields": {
                            "NAME": "scoreText",
                            "H_ALIGN": "0",
                            "V_ALIGN": "0"
                          },
                          "inputs": {
                            "TEXT": {
                              "block": {
                                "type": "text_join",
                                "id": "jD)7IiIwpymj/Tl=c47w",
                                "extraState": {
                                  "itemCount": 2
                                },
                                "inputs": {
                                  "ADD0": {
                                    "block": {
                                      "type": "text",
                                      "id": "w;G84Xh~l~R;{nkaK60j",
                                      "fields": {
                                        "TEXT": "Score: "
                                      }
                                    }
                                  },
                                  "ADD1": {
                                    "block": {
                                      "type": "variables_get",
                                      "id": "=L|l,.*AeW6;pn+R8ROb",
                                      "fields": {
                                        "VAR": {
                                          "id": "score_var"
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "TOP": {
                              "block": {
                                "type": "text",
                                "id": "cNFpNNT[0;l(T8B:7R~p",
                                "fields": {
                                  "TEXT": "20px"
                                }
                              }
                            },
                            "LEFT": {
                              "block": {
                                "type": "text",
                                "id": "S1bg3UhaUXGqlwz=xLL%",
                                "fields": {
                                  "TEXT": "20px"
                                }
                              }
                            }
                          },
                          "next": {
                            "block": {
                              "type": "variables_set",
                              "id": "=h$z!)?da[|jhkK@A~pz",
                              "fields": {
                                "VAR": {
                                  "id": "coin_list_var"
                                }
                              },
                              "inputs": {
                                "VALUE": {
                                  "block": {
                                    "type": "lists_create_with",
                                    "id": "()b()]0io3eo;ZKGD)9k",
                                    "extraState": {
                                      "itemCount": 0
                                    }
                                  }
                                }
                              },
                              "next": {
                                "block": {
                                  "type": "controls_for",
                                  "id": "VZ8]RdQQ-ahl/dG9V]EI",
                                  "fields": {
                                    "VAR": {
                                      "id": "i_var"
                                    }
                                  },
                                  "inputs": {
                                    "FROM": {
                                      "block": {
                                        "type": "math_number",
                                        "id": "]r:Xd,`c$sRuKXxG@:O0",
                                        "fields": {
                                          "NUM": 1
                                        }
                                      }
                                    },
                                    "TO": {
                                      "block": {
                                        "type": "math_number",
                                        "id": "o=omf?-BQxUyTz;H=_8:",
                                        "fields": {
                                          "NUM": 10
                                        }
                                      }
                                    },
                                    "BY": {
                                      "block": {
                                        "type": "math_number",
                                        "id": "$1+Fx4=9sNw1Ftk1zuKe",
                                        "fields": {
                                          "NUM": 1
                                        }
                                      }
                                    },
                                    "DO": {
                                      "block": {
                                        "type": "variables_set",
                                        "id": "2b{p7f-+30LVsC$!59MM",
                                        "fields": {
                                          "VAR": {
                                            "id": "new_coin_var"
                                          }
                                        },
                                        "inputs": {
                                          "VALUE": {
                                            "block": {
                                              "type": "create_box",
                                              "id": "]FWsh=`uucHW6BWA|eOP",
                                              "fields": {
                                                "NAME": "coin"
                                              },
                                              "inputs": {
                                                "X": {
                                                  "block": {
                                                    "type": "math_random_int",
                                                    "id": "zJ?Bu@-IsZ!)ouLX4M2U",
                                                    "inputs": {
                                                      "FROM": {
                                                        "block": {
                                                          "type": "math_number",
                                                          "id": "efbk=!bUBO-#ln2X|fS9",
                                                          "fields": {
                                                            "NUM": -9
                                                          }
                                                        }
                                                      },
                                                      "TO": {
                                                        "block": {
                                                          "type": "math_number",
                                                          "id": "J^Y+~4hS{%u~XM}HiE]X",
                                                          "fields": {
                                                            "NUM": 9
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                },
                                                "Y": {
                                                  "block": {
                                                    "type": "math_number",
                                                    "id": "nxob8,#[E0PObsh+D0~p",
                                                    "fields": {
                                                      "NUM": 2
                                                    }
                                                  }
                                                },
                                                "Z": {
                                                  "block": {
                                                    "type": "math_random_int",
                                                    "id": "*sT%]bK)ZKuH|9iP_KK`",
                                                    "inputs": {
                                                      "FROM": {
                                                        "block": {
                                                          "type": "math_number",
                                                          "id": "5$oAic=~{puZmd@d5=yS",
                                                          "fields": {
                                                            "NUM": -9
                                                          }
                                                        }
                                                      },
                                                      "TO": {
                                                        "block": {
                                                          "type": "math_number",
                                                          "id": "c!%DBs[:4C,zCVG[QXWm",
                                                          "fields": {
                                                            "NUM": 9
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
                                        "next": {
                                          "block": {
                                            "type": "enable_physics",
                                            "id": "W-/aZ%-mQgYF;Q_CtA$k",
                                            "inputs": {
                                              "NAME": {
                                                "block": {
                                                  "type": "variables_get",
                                                  "id": "-X-DO$lZLqJ*12:%[A4J",
                                                  "fields": {
                                                    "VAR": {
                                                      "id": "new_coin_var"
                                                    }
                                                  }
                                                }
                                              },
                                              "MASS": {
                                                "block": {
                                                  "type": "math_number",
                                                  "id": "{e]~-g!Md=0[QGsnae=i",
                                                  "fields": {
                                                    "NUM": 0
                                                  }
                                                }
                                              }
                                            },
                                            "next": {
                                              "block": {
                                                "type": "change_object_color",
                                                "id": "5nqhfN5ZC2Hg5nkx[96e",
                                                "fields": {
                                                  "COLOR": "#FFD700"
                                                },
                                                "inputs": {
                                                  "NAME": {
                                                    "block": {
                                                      "type": "variables_get",
                                                      "id": "c`fQ#%3=~WvK0V]0XhA(",
                                                      "fields": {
                                                        "VAR": {
                                                          "id": "new_coin_var"
                                                        }
                                                      }
                                                    }
                                                  }
                                                },
                                                "next": {
                                                  "block": {
                                                    "type": "lists_setIndex",
                                                    "id": "0A9dl9vS!i%jTMU2rOmP",
                                                    "fields": {
                                                      "MODE": "INSERT",
                                                      "WHERE": "LAST"
                                                    },
                                                    "inputs": {
                                                      "LIST": {
                                                        "block": {
                                                          "type": "variables_get",
                                                          "id": "a(8r6CU+[?aQ)#g2j2NJ",
                                                          "fields": {
                                                            "VAR": {
                                                              "id": "coin_list_var"
                                                            }
                                                          }
                                                        }
                                                      },
                                                      "TO": {
                                                        "block": {
                                                          "type": "variables_get",
                                                          "id": "k7SSuSS;TA_6(d9tVn2T",
                                                          "fields": {
                                                            "VAR": {
                                                              "id": "new_coin_var"
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
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "type": "set_isometric_camera",
                      "id": "M4o7Mt%Z7knF8)6ce6G4",
                      "x": 0,
                      "y": 0,
                      "next": {
                        "block": {
                          "type": "create_ground",
                          "id": "UNzY^.8(7|ytC9meFp!v",
                          "fields": {
                            "NAME": "ground"
                          },
                          "inputs": {
                            "WIDTH": {
                              "block": {
                                "type": "math_number",
                                "id": "X=lsiw2bX_?I1004[s++",
                                "fields": {
                                  "NUM": 20
                                }
                              }
                            },
                            "HEIGHT": {
                              "block": {
                                "type": "math_number",
                                "id": "`2vm*D^4+-Z_V2?J-NOt",
                                "fields": {
                                  "NUM": 20
                                }
                              }
                            }
                          },
                          "next": {
                            "block": {
                              "type": "variables_set",
                              "id": "8Z]xplqM2`iy.*vs#?H(",
                              "fields": {
                                "VAR": {
                                  "id": "player_mesh_var"
                                }
                              },
                              "inputs": {
                                "VALUE": {
                                  "block": {
                                    "type": "create_box",
                                    "id": "qTMurbsUs*3BN+%Q*k_c",
                                    "fields": {
                                      "NAME": "player"
                                    },
                                    "inputs": {
                                      "X": {
                                        "block": {
                                          "type": "math_number",
                                          "id": ".4#5m~%Rd%Fn~n$@^9de",
                                          "fields": {
                                            "NUM": 0
                                          }
                                        }
                                      },
                                      "Y": {
                                        "block": {
                                          "type": "math_number",
                                          "id": "9DxRc0j%6D9.q=gam6vV",
                                          "fields": {
                                            "NUM": 5
                                          }
                                        }
                                      },
                                      "Z": {
                                        "block": {
                                          "type": "math_number",
                                          "id": "L1!qs2U7fdCg%4L~jN)g",
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
                                  "id": "og@OEQsuZw`US5r(~`[)",
                                  "inputs": {
                                    "NAME": {
                                      "block": {
                                        "type": "variables_get",
                                        "id": "xWMio^TcB7Amf[sr{v4z",
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
                                        "id": "O5{AnJ^6$eZfaxEUm^Aa",
                                        "fields": {
                                          "NUM": 1
                                        }
                                      }
                                    }
                                  },
                                  "next": {
                                    "block": {
                                      "type": "set_as_player",
                                      "id": "b]qnjI0a^,/@pR$lCLTT",
                                      "inputs": {
                                        "OBJECT": {
                                          "block": {
                                            "type": "variables_get",
                                            "id": "ZJ9BdtR{KBkK!YL-i%}t",
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
                                          "id": "V~Jyq;[W:)e2[piz=D#E",
                                          "inputs": {
                                            "OBJECT": {
                                              "block": {
                                                "type": "variables_get",
                                                "id": ":0w)sJ|l!WHE#rdQN;t#",
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
                    }
                  ]
                },
                "variables": [
                  {
                    "name": "player_mesh",
                    "id": "player_mesh_var"
                  },
                  {
                    "name": "coin_list",
                    "id": "coin_list_var"
                  },
                  {
                    "name": "score",
                    "id": "score_var"
                  },
                  {
                    "name": "collided_object",
                    "id": "collided_object_var"
                  },
                  {
                    "name": "i",
                    "id": "i_var"
                  },
                  {
                    "name": "new_coin",
                    "id": "new_coin_var"
                  }
                ]
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

            if (sceneManager) {
                sceneManager.dispose();
            }
            sceneManager = new BabylonSceneManager(canvas);
            window.sceneManager = sceneManager; // Expose for debugging and testing

            try {
                const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
                const userGeneratedCode = new AsyncFunction('sceneManager', 'assetManager', codeToRun);
                await userGeneratedCode(sceneManager, assetManager);
            } catch (error) {
                console.error('Error executing code:', error);
            } finally {
                console.log("JULES_VERIFICATION: SCENE_READY");
            }
        }

        const helper = function () {
            this.getField('MODEL_URL').maxDisplayLength = 16;
        }
        Blockly.Extensions.register('set_max_display_length', helper);

        const canvas = document.getElementById('gameCanvas');
        const assetManager = new AssetManager();
        let sceneManager = new BabylonSceneManager(canvas);
        const projectManager = new ProjectManager(assetManager, workspace, sceneManager);

        assetManager.init().then(() => {
            console.log("Asset manager initialized");
            loadAssetsIntoView();
        }).catch(error => {
            console.error("Failed to initialize asset manager:", error);
        });

        const assetUploader = document.getElementById('asset-uploader');
        assetUploader.addEventListener('change', async (event) => {
            const files = event.target.files;
            for (const file of files) {
                await assetManager.addAsset(file);
            }
            loadAssetsIntoView();
        });

        const addAssetFromUrlButton = document.getElementById('add-asset-from-url-button');
        const assetUrlInput = document.getElementById('asset-url-input');

        addAssetFromUrlButton.addEventListener('click', async () => {
            const url = assetUrlInput.value;
            if (!url) {
                alert('Please enter a URL.');
                return;
            }
            try {
                await assetManager.addAssetFromURL(url);
                loadAssetsIntoView();
                assetUrlInput.value = '';
            } catch (error) {
                alert('Failed to load asset from URL. Please check the URL and try again. See console for more details.');
            }
        });

        async function loadAssetsIntoView() {
            const assetList = document.getElementById('asset-list');
            assetList.innerHTML = '';
            const assets = await assetManager.getAllAssets();
            assets.forEach(asset => {
                const li = document.createElement('li');
                li.textContent = asset.name;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = async () => {
                    await assetManager.deleteAsset(asset.name);
                    loadAssetsIntoView();
                };
                li.appendChild(deleteButton);
                assetList.appendChild(li);
            });
            // The toolbox will be updated dynamically by the block definitions.
        }


    // --- Dropdown Menu Logic ---
    document.getElementById('menuButton').addEventListener('click', function() {
        document.getElementById('dropdownMenu').classList.toggle('show');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.btn-menu-toggle')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });

    // Add event listener to the dropdown container to close the menu on button click
    document.getElementById('dropdownMenu').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            document.getElementById('dropdownMenu').classList.remove('show');
        }
    });

    document.getElementById('runButton').addEventListener('click', () => {
        doRun();
    });
    document.getElementById('saveButton').addEventListener('click', () => {
        projectManager.saveProject();
    });
    document.getElementById('publishButton').addEventListener('click', () => {
        projectManager.publishProject();
    });
    document.getElementById('loadButton').addEventListener('click', () => {
        projectManager.loadProject();
    });
    document.getElementById('docsButton').addEventListener('click', () => {
        window.open('docs/Home.html', '_blank');
    });
    document.getElementById('toggleToolboxButton').addEventListener('click', () => {
        const blocklyDiv = document.getElementById('blocklyDiv');
        blocklyDiv.classList.toggle('toolbox-collapsed');
        Blockly.svgResize(workspace);
    });

    document.getElementById('shareButton').addEventListener('click', () => {
        projectManager.shareProject();
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

    document.addEventListener('fullscreenchange', () => {
        document.body.classList.toggle('fullscreen-active', !!document.fullscreenElement);
        resizeCanvas();
    });
    document.addEventListener('webkitfullscreenchange', () => {
        document.body.classList.toggle('fullscreen-active', !!document.webkitFullscreenElement);
        resizeCanvas();
    });
    document.addEventListener('mozfullscreenchange', () => {
        document.body.classList.toggle('fullscreen-active', !!document.mozFullScreenElement);
        resizeCanvas();
    });
    document.addEventListener('MSFullscreenChange', () => {
        document.body.classList.toggle('fullscreen-active', !!document.msFullscreenElement);
        resizeCanvas();
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

    // --- Main View Switching Logic ---
    const codeViewButton = document.getElementById('codeViewButton');
    const assetsViewButton = document.getElementById('assetsViewButton');
    const codeView = document.getElementById('code-view');
    const assetsView = document.getElementById('assets-view');

    function showView(viewToShow) {
        // Hide all views
        codeView.style.display = 'none';
        assetsView.style.display = 'none';

        // Deactivate all buttons
        codeViewButton.classList.remove('active');
        assetsViewButton.classList.remove('active');

        // Show the selected view and activate its button
        if (viewToShow === 'code') {
            codeView.style.display = 'block';
            codeViewButton.classList.add('active');
        } else if (viewToShow === 'assets') {
            assetsView.style.display = 'block';
            assetsViewButton.classList.add('active');
        }
    }

    codeViewButton.addEventListener('click', () => showView('code'));
    assetsViewButton.addEventListener('click', () => showView('assets'));

    // Set the initial view
    showView('code');


    // --- Touch Control Event Listeners ---
    const touchJump = document.getElementById('touch-jump');

    const handleTouch = (key, isPressed) => {
        sceneManager.inputState.keys[key] = isPressed;
    };

    // Jump Button
    touchJump.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch(' ', true); }, { passive: false });
    touchJump.addEventListener('touchend', (e) => { e.preventDefault(); handleTouch(' ', false); }, { passive: false });
    touchJump.addEventListener('touchcancel', (e) => { e.preventDefault(); handleTouch(' ', false); }, { passive: false });

    async function loadProjectFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const projectParam = urlParams.get('project');
        const workspaceDataEl = document.getElementById('workspace-data');

        if (urlParams.has('fullscreen')) {
            enterPresentationMode();
        }

        try {
            if (workspaceDataEl && workspaceDataEl.textContent.trim()) {
                // Loading from a published Jekyll page
                const decodedData = atob(workspaceDataEl.textContent.trim());
                const projectData = JSON.parse(decodedData);
                await projectManager.loadProjectData(projectData);

            } else if (projectParam) {
                // Loading from a base64 URL parameter
                const decodedState = atob(projectParam);
                const projectData = JSON.parse(decodedState);
                // Note: Legacy URL sharing might only contain workspace data.
                // We ensure it fits the new structure before loading.
                const fullProjectData = {
                    workspace: projectData.workspace || projectData, // Handle old format
                    assets: projectData.assets || [],
                    version: projectData.version || '0.9' // Mark as legacy if no version
                };
                await projectManager.loadProjectData(fullProjectData);

            } else {
                // No project data found, load the default
                loadWorkspaceDefault();
            }
        } catch (e) {
            console.error("Failed to load project from URL or Jekyll data:", e);
            //alert("Could not load project. Loading default project instead.");
            loadWorkspaceDefault();
        }
    }

function enterPresentationMode() {
    document.body.classList.add('presentation-mode');

    // Expand canvas and resize engine
    const canvasContainer = document.querySelector('.canvas-container');
    if (canvasContainer) {
        // The CSS will handle the sizing, but we need to tell Babylon to resize its engine
        setTimeout(() => {
            resizeCanvas();
        }, 100); // A small delay to allow CSS to apply

        // Request fullscreen
        if (canvasContainer.requestFullscreen) {
            canvasContainer.requestFullscreen();
        } else if (canvasContainer.mozRequestFullScreen) { /* Firefox */
            canvasContainer.mozRequestFullScreen();
        } else if (canvasContainer.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            canvasContainer.webkitRequestFullscreen();
        } else if (canvasContainer.msRequestFullscreen) { /* IE/Edge */
            canvasContainer.msRequestFullscreen();
        }
    }
}
    loadProjectFromUrl();

    // --- Bottom Nav Logic ---
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.container');
        const workspaceTab = document.getElementById('workspace-tab');
        const previewTab = document.getElementById('preview-tab');

        if (workspaceTab && previewTab && container) {
            workspaceTab.addEventListener('click', () => {
                container.classList.remove('preview-active');
                workspaceTab.classList.add('active');
                previewTab.classList.remove('active');
            });

            previewTab.addEventListener('click', () => {
                container.classList.add('preview-active');
                previewTab.classList.add('active');
                workspaceTab.classList.remove('active');
                // We need to resize the canvas when it becomes visible, especially after being hidden
                setTimeout(resizeCanvas, 0);
            });
        }
    });
