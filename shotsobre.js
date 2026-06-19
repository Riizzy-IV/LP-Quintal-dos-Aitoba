const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const views = [
    {name:'sobre-desktop', width:1920, height:1080},
    {name:'sobre-notebook', width:1366, height:900},
    {name:'sobre-mobile', width:390, height:1200},
  ];
  for (const v of views) {
    const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
    await page.goto('http://localhost:8089/#sobre', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.getElementById('sobre').scrollIntoView());
    await page.screenshot({ path: `shots/${v.name}.png` });
    await page.close();
  }
  await browser.close();
})();
