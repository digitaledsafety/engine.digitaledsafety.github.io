class UIManager {
    constructor(scene) {
        if (!scene) {
            console.error("Scene is required for UIManager.");
            return;
        }
        // Create a full-screen UI for hosting 2D controls
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
        this.controls = {};
    }

    createControl(id, type, options = {}) {
        if (this.controls[id]) {
            console.warn(`UI control with id "${id}" already exists.`);
            return this.controls[id];
        }

        let control;
        switch (type) {
            case 'TextBlock':
                control = new BABYLON.GUI.TextBlock(id, options.text || '');
                // Apply common text properties
                control.color = options.color || "white";
                control.fontSize = options.fontSize || 24;
                break;
            default:
                console.error(`Unknown GUI control type: "${type}"`);
                return null;
        }

        this.advancedTexture.addControl(control);
        this.controls[id] = control;

        // Apply positioning
        this.updateControl(id, options);

        return control;
    }

    updateControl(id, options = {}) {
        const control = this.controls[id];
        if (!control) {
            console.error(`UI control with id "${id}" not found.`);
            return;
        }

        for (const key in options) {
            // Simple property updates
            if (['text', 'color', 'fontSize', 'left', 'top', 'width', 'height'].includes(key)) {
                control[key] = options[key];
            }
        }
    }

    removeControl(id) {
        const control = this.controls[id];
        if (control) {
            this.advancedTexture.removeControl(control);
            control.dispose();
            delete this.controls[id];
        }
    }

    clear() {
        // Dispose all controls
        for (const id in this.controls) {
            this.removeControl(id);
        }
    }
}