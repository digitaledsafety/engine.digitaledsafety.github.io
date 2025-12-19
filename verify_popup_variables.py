
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

        # Part 1: Create, show, and update the popup
        async with page.expect_console_message(lambda msg: "JULES_VERIFICATION: SCENE_READY" in msg.text):
            await page.evaluate("""
                (async () => {
                    const workspace = window.workspace;
                    workspace.clear();
                    // This ensures the undo/redo stack is also cleared
                    workspace.clearUndo();

                    const newPopupVar = workspace.createVariable('myPopup');

                    // --- Create the block structure ---

                    // Block: create_popup
                    const createPopupBlock = workspace.newBlock('create_popup');
                    const titleTextBlock = workspace.newBlock('text');
                    titleTextBlock.setFieldValue('My Popup Title', 'TEXT');
                    createPopupBlock.getInput('TITLE').connection.connect(titleTextBlock.outputConnection);
                    const button1TextBlock = workspace.newBlock('text');
                    button1TextBlock.setFieldValue('My Button 1', 'TEXT');
                    createPopupBlock.getInput('BUTTON1_TEXT').connection.connect(button1TextBlock.outputConnection);

                    // Block: variables_set
                    const setVarBlock = workspace.newBlock('variables_set');
                    setVarBlock.setFieldValue(newPopupVar.getId(), 'VAR');
                    setVarBlock.getInput('VALUE').connection.connect(createPopupBlock.outputConnection);

                    // Block: show_popup
                    const showPopupBlock = workspace.newBlock('show_popup');
                    const getVarBlockShow = workspace.newBlock('variables_get');
                    getVarBlockShow.setFieldValue(newPopupVar.getId(), 'VAR');
                    showPopupBlock.getInput('NAME').connection.connect(getVarBlockShow.outputConnection);
                    setVarBlock.nextConnection.connect(showPopupBlock.previousConnection);

                    // Block: gui_set_popup_title
                    const setTitleBlock = workspace.newBlock('gui_set_popup_title');
                    const getVarForTitle = workspace.newBlock('variables_get');
                    getVarForTitle.setFieldValue(newPopupVar.getId(), 'VAR');
                    const newTitleTextBlock = workspace.newBlock('text');
                    newTitleTextBlock.setFieldValue('New Title', 'TEXT');
                    setTitleBlock.getInput('POPUP_NAME').connection.connect(getVarForTitle.outputConnection);
                    setTitleBlock.getInput('TITLE').connection.connect(newTitleTextBlock.outputConnection);
                    showPopupBlock.nextConnection.connect(setTitleBlock.previousConnection);

                    // Block: gui_set_popup_button_text
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

                    // Block: gui_set_popup_image
                    const setImageBlock = workspace.newBlock('gui_set_popup_image');
                    const getVarForImage = workspace.newBlock('variables_get');
                    getVarForImage.setFieldValue(newPopupVar.getId(), 'VAR');
                    const imageUrlBlock = workspace.newBlock('text');
                    imageUrlBlock.setFieldValue('https://www.babylonjs-playground.com/textures/babylon5.png', 'TEXT');
                    setImageBlock.getInput('POPUP_NAME').connection.connect(getVarForImage.outputConnection);
                    setImageBlock.getInput('IMAGE_URL').connection.connect(imageUrlBlock.outputConnection);
                    setButtonTextBlock.nextConnection.connect(setImageBlock.previousConnection);

                    // --- Render all blocks ---
                    for (const block of workspace.getAllBlocks(false)) {
                        block.initSvg();
                        block.render();
                    }

                    // --- Execute the code ---
                    const code = Blockly.JavaScript.workspaceToCode(workspace);
                    await window.doRun(code);
                })()
            """)

        # Give the UI a moment to update
        await page.wait_for_timeout(500)

        # Verify the popup is visible and updated
        is_visible = await page.evaluate("window.sceneManager.uiManager.getControlByName('myPopup').isVisible")
        assert is_visible

        title = await page.evaluate("window.sceneManager.uiManager.getControlByName('myPopup_title').text")
        assert title == "New Title"

        button_text = await page.evaluate("window.sceneManager.uiManager.getControlByName('myPopup_button1').textBlock.text")
        assert button_text == "New Button Text"

        image_source = await page.evaluate("window.sceneManager.uiManager.getControlByName('myPopup_image').source")
        assert image_source == "https://www.babylonjs-playground.com/textures/babylon5.png"

        # Part 2: Hide the popup
        async with page.expect_console_message(lambda msg: "JULES_VERIFICATION: SCENE_READY" in msg.text):
            await page.evaluate("""
                (async () => {
                    const workspace = window.workspace;
                    workspace.clear();
                    workspace.clearUndo();

                    const newPopupVar = workspace.createVariable('myPopup');

                    // Block: hide_popup
                    const hidePopupBlock = workspace.newBlock('hide_popup');
                    const getVarBlockHide = workspace.newBlock('variables_get');
                    getVarBlockHide.setFieldValue(newPopupVar.getId(), 'VAR');
                    hidePopupBlock.getInput('NAME').connection.connect(getVarBlockHide.outputConnection);

                    hidePopupBlock.initSvg();
                    getVarBlockHide.initSvg();
                    hidePopupBlock.render();
                    getVarBlockHide.render();

                    const code = Blockly.JavaScript.workspaceToCode(workspace);
                    await window.doRun(code);
                })()
            """)

        # Verify the popup is hidden
        await page.wait_for_timeout(100)
        is_visible_after_hide = await page.evaluate("window.sceneManager.uiManager.getControlByName('myPopup').isVisible")
        assert not is_visible_after_hide

        await browser.close()
