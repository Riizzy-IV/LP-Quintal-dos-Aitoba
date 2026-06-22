const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'notebook', width: 1366, height: 768 },
    { name: 'mobile', width: 390, height: 844 },
  ];
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:8089/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `shots/${vp.name}.png`, fullPage: false });
    await page.close();
  }
  await browser.close();
})();
