const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://localhost:8089/#lazer', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.getElementById('lazer').scrollIntoView());
  await page.screenshot({ path: 'shots/lazer-tab-lazer.png' });
  await page.click('#lazerTabApto');
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'shots/lazer-tab-apto.png' });
  await page.click('#lazerNext');
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'shots/lazer-tab-apto-next.png' });
  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
