const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 900 } });
  await page.goto('http://localhost:8089/#porque', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.getElementById('porque').scrollIntoView());
  await page.screenshot({ path: 'shots/porque-default.png' });
  await page.hover('.porque__card:nth-child(3)');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'shots/porque-hover.png' });
  await browser.close();
})();
