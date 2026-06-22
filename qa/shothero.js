const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await page.goto('http://localhost:8089/?t=' + Date.now(), { waitUntil: 'networkidle' });
  const info = await page.$eval('.hero__bg img', el => ({
    rect: el.getBoundingClientRect(),
    parentRect: el.parentElement.getBoundingClientRect(),
  }));
  console.log(info);
  await page.screenshot({ path: 'shots/hero-mobile-check.png' });
  await browser.close();
})();
