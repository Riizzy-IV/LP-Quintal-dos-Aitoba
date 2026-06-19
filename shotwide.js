const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const widths = [1024, 1100, 1280, 1366, 1440, 1536, 1920];
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 200 } });
    await page.goto('http://localhost:8089/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `shots/w-${w}.png` });
    await page.close();
  }
  await browser.close();
})();
