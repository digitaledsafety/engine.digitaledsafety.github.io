
import asyncio
import pytest
from playwright.async_api import async_playwright, expect

@pytest.mark.asyncio
async def test_popup_with_variables():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        page.set_default_timeout(60000)

        await page.goto("http://127.0.0.1:4000/engine/", wait_until="domcontentloaded")

        await page.get_by_role("button", name="Start Coding").click()

        # Part 1: Verify creation, update, and visibility
        async with page.expect_console_message(lambda msg: "JULES_VERIFICATION: SCENE_READY" in msg.text):
            await page.evaluate("""
                (async () => {
                    const workspace = window.workspace;
                    workspace.clear();
                    workspace.clearUndo();
                    const newPopupVar = workspace.createVariable('myPopup');

                    // --- Create Block Structure ---
                    const createPopupBlock = workspace.newBlock('create_popup');
                    // ... (blocks for create, set, show, update title, button, image)
                    const titleTextBlock = workspace.newBlock('text');
                    titleTextBlock.setFieldValue('My Popup Title', 'TEXT');
                    createPopupBlock.getInput('TITLE').connection.connect(titleTextBlock.outputConnection);
                    const button1TextBlock = workspace.newBlock('text');
                    button1TextBlock.setFieldValue('My Button 1', 'TEXT');
                    createPopupBlock.getInput('BUTTON1_TEXT').connection.connect(button1TextBlock.outputConnection);
                    const setVarBlock = workspace.newBlock('variables_set');
                    setVarBlock.setFieldValue(newPopupVar.getId(), 'VAR');
                    setVarBlock.getInput('VALUE').connection.connect(createPopupBlock.outputConnection);
                    const showPopupBlock = workspace.newBlock('show_popup');
                    const getVarBlockShow = workspace.newBlock('variables_get');
                    getVarBlockShow.setFieldValue(newPopupVar.getId(), 'VAR');
                    showPopupBlock.getInput('NAME').connection.connect(getVarBlockShow.outputConnection);
                    setVarBlock.nextConnection.connect(showPopupBlock.previousConnection);
                    const setTitleBlock = workspace.newBlock('gui_set_popup_title');
                    const getVarForTitle = workspace.newBlock('variables_get');
                    getVarForTitle.setFieldValue(newPopupVar.getId(), 'VAR');
                    const newTitleTextBlock = workspace.newBlock('text');
                    newTitleTextBlock.setFieldValue('New Title', 'TEXT');
                    setTitleBlock.getInput('POPUP_NAME').connection.connect(getVarForTitle.outputConnection);
                    setTitleBlock.getInput('TITLE').connection.connect(newTitleTextBlock.outputConnection);
                    showPopupBlock.nextConnection.connect(setTitleBlock.previousConnection);
                    const setButtonTextBlock = workspace.newBlock('gui_set_popup_button_text');
                    const getVarForButton = workspace.newBlock('variables_get');
                    getVarForButton.setFieldValue(newPopupVar.getId(), 'VAR');
                    const buttonNameBlock = workspace.newBlock('text');
                    buttonNameBlock.setFieldValue('myPopup_button1', 'TEXT');
                    const newButtonTextBlock = workspace.newBlock('text');
                    newButtonTextBlock.setFieldValue('New Button Text', 'TEXT');
                    setButtonTextBlock.getInput('POPUP_NAME').connection.connect(getVarForButton.outputConnection);
                    setButtonTextBlock.getInput('BUTTON_NAME').connection.connect(buttonNameBlock.outputConnection);
                    setButtonTextBlock.getInput('TEXT').connection.connect(newButtonTextBlock.outputConnection);
                    setTitleBlock.nextConnection.connect(setButtonTextBlock.previousConnection);
                    const setImageBlock = workspace.newBlock('gui_set_popup_image');
                    const getVarForImage = workspace.newBlock('variables_get');
                    getVarForImage.setFieldValue(newPopupVar.getId(), 'VAR');
                    const imageUrlBlock = workspace.newBlock('text');
                    imageUrlBlock.setFieldValue('https://www.babylonjs-playground.com/textures/babylon5.png', 'TEXT');
                    setImageBlock.getInput('POPUP_NAME').connection.connect(getVarForImage.outputConnection);
                    setImageBlock.getInput('IMAGE_URL').connection.connect(imageUrlBlock.outputConnection);
                    setButtonTextBlock.nextConnection.connect(setImageBlock.previousConnection);

                    for (const block of workspace.getAllBlocks(false)) {
                        block.initSvg();
                        block.render();
                    }

                    const code = Blockly.JavaScript.workspaceToCode(workspace);

                    // --- Verification Callback ---
                    const verificationCallback = (sceneManager) => {
                        const popup = sceneManager.uiManager.getControlByName('myPopup');
                        if (!popup || !popup.isVisible) throw new Error('Popup not visible');

                        const title = sceneManager.uiManager.getControlByName('myPopup_title');
                        if (!title || title.text !== 'New Title') throw new Error('Title not set correctly');

                        const button = sceneManager.uiManager.getControlByName('myPopup_button1');
                        if (!button || button.textBlock.text !== 'New Button Text') throw new Error('Button text not set correctly');

                        const image = sceneManager.uiManager.getControlByName('myPopup_image');
                        if (!image || image.source !== 'https://www.babylonjs-playground.com/textures/babylon5.png') throw new Error('Image not set correctly');
                    };

                    await window.doRun(code, verificationCallback);
                })()
            """)

        # Part 2: Verify hiding the popup
        async with page.expect_console_message(lambda msg: "JULES_VERIFICATION: SCENE_READY" in msg.text):
            await page.evaluate("""
                (async () => {
                    const workspace = window.workspace;
                    workspace.clear();
                    workspace.clearUndo();
                    const newPopupVar = workspace.createVariable('myPopup');

                    // --- Create Block Structure ---
                    // We need to re-create the popup to ensure it exists before hiding it
                    const createPopupBlock = workspace.newBlock('create_popup');
                    const setVarBlock = workspace.newBlock('variables_set');
                    setVarBlock.setFieldValue(newPopupVar.getId(), 'VAR');
                    setVarBlock.getInput('VALUE').connection.connect(createPopupBlock.outputConnection);

                    const hidePopupBlock = workspace.newBlock('hide_popup');
                    const getVarBlockHide = workspace.newBlock('variables_get');
                    getVarBlockHide.setFieldValue(newPopupVar.getId(), 'VAR');
                    hidePopupBlock.getInput('NAME').connection.connect(getVarBlockHide.outputConnection);
                    setVarBlock.nextConnection.connect(hidePopupBlock.previousConnection);

                    for (const block of workspace.getAllBlocks(false)) {
                        block.initSvg();
                        block.render();
                    }

                    const code = Blockly.JavaScript.workspaceToCode(workspace);

                    // --- Verification Callback ---
                    const verificationCallback = (sceneManager) => {
                        const popup = sceneManager.uiManager.getControlByName('myPopup');
                        if (!popup || popup.isVisible) throw new Error('Popup was not hidden');
                    };

                    await window.doRun(code, verificationCallback);
                })()
            """)

        await browser.close()
