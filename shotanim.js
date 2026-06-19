const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1000 } });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('http://localhost:8089/#lazer', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.getElementById('lazer').scrollIntoView());
  await page.click('#lazerNext');
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'shots/lazer-anim-mid.png' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shots/lazer-anim-end.png' });
  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
