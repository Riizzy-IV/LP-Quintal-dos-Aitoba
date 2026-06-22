const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const views = [
    {name:'porque-desktop', width:1920, height:900},
    {name:'porque-notebook', width:1366, height:800},
    {name:'porque-mobile', width:390, height:1100},
  ];
  for (const v of views) {
    const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
    await page.goto('http://localhost:8089/#porque', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.getElementById('porque').scrollIntoView());
    await page.screenshot({ path: `shots/${v.name}.png` });
    await page.close();
  }
  await browser.close();
})();
