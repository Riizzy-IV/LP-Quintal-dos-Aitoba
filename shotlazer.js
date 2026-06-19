const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const views = [
    {name:'lazer-desktop', width:1920, height:1000},
    {name:'lazer-notebook', width:1366, height:900},
    {name:'lazer-mobile', width:390, height:900},
  ];
  for (const v of views) {
    const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
    await page.goto('http://localhost:8089/#lazer', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.getElementById('lazer').scrollIntoView());
    await page.screenshot({ path: `shots/${v.name}.png` });
    await page.close();
  }
  await browser.close();
})();
