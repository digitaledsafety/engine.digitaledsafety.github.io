const { test, expect } = require('@playwright/test');
const path = require('path');

test('homepage has expected title and loads scene', async ({ page }) => {
  // Listen for all console events and log them to the test output
  page.on('console', msg => {
    console.log(`Browser console: ${msg.text()}`);
  });

  const sceneReadyPromise = new Promise((resolve) => {
    page.on('console', (msg) => {
      if (msg.text().includes('JULES_VERIFICATION: SCENE_READY')) {
        resolve();
      }
    });
  });

  const absolutePath = path.resolve(__dirname, '../index.html');
  await page.goto(`file://${absolutePath}`);

  await expect(page).toHaveTitle(/3D SCRIPT/);

  await sceneReadyPromise;

  const screenshot = await page.screenshot({ path: 'tests/screenshot.png' });
  console.log('Screenshot taken and saved to tests/screenshot.png');
});
