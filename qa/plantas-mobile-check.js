const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844, deviceScaleFactor: 2 });
  const path = require('path');
  const filePath = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  await page.goto(filePath);
  await page.waitForTimeout(500);
  const el = await page.$('.plantas');
  await el.screenshot({ path: path.resolve(__dirname, '..', 'shots', 'plantas-mobile.png') });
  await browser.close();
  console.log('done');
})();
