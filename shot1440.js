const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8089/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'shots/mine-1440.png', fullPage: false });
  await browser.close();
})();
