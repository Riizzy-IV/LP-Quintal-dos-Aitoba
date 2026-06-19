const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1100 } });
  await page.goto('http://localhost:8089/#plantas', { waitUntil: 'networkidle' });
  await page.click('#lazerTabApto');
  await page.evaluate(() => document.getElementById('plantas').scrollIntoView());
  await page.screenshot({ path: 'shots/bugcheck-plantas.png' });
  await page.evaluate(() => document.getElementById('lazer').scrollIntoView());
  await page.screenshot({ path: 'shots/bugcheck-lazer.png' });
  await browser.close();
})();
