const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1000 } });
  await page.goto('http://localhost:8089/#lazer', { waitUntil: 'networkidle' });
  await page.click('#lazerNext');
  await page.evaluate(() => document.getElementById('lazer').scrollIntoView());
  await page.screenshot({ path: 'shots/lazer-next.png' });
  await browser.close();
})();
