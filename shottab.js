const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1100 } });
  await page.goto('http://localhost:8089/#plantas', { waitUntil: 'networkidle' });
  await page.click('#tab71');
  await page.evaluate(() => document.getElementById('plantas').scrollIntoView());
  await page.screenshot({ path: 'shots/plantas-71-1.png' });
  await page.click('#plantaNext');
  await page.screenshot({ path: 'shots/plantas-71-2.png' });
  await browser.close();
})();
