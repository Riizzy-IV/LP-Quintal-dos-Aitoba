const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const views = [
    {name:'ficha-desktop', width:1920, height:700},
    {name:'ficha-notebook', width:1366, height:600},
    {name:'ficha-mobile', width:390, height:900},
  ];
  for (const v of views) {
    const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
    await page.goto('http://localhost:8089/#ficha', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.getElementById('ficha').scrollIntoView());
    await page.screenshot({ path: `shots/${v.name}.png` });
    await page.close();
  }
  await browser.close();
})();
