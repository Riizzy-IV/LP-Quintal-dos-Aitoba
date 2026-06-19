const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const views = [
    {name:'loc-desktop', width:1920, height:1300},
    {name:'loc-notebook', width:1366, height:1100},
    {name:'loc-mobile', width:390, height:1500},
  ];
  for (const v of views) {
    const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
    await page.goto('http://localhost:8089/#localizacao', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.getElementById('localizacao').scrollIntoView());
    await page.screenshot({ path: `shots/${v.name}.png` });
    await page.close();
  }
  await browser.close();
})();
