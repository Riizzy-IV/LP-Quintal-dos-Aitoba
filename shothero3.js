const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 1400 } });
  await page.goto('http://localhost:8089/?t=' + Date.now(), { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'shots/hero-tall-check.png' });
  await browser.close();
})();
