const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const views = [
    {name:'impl-desktop', width:1920, height:1000},
    {name:'impl-notebook', width:1366, height:900},
    {name:'impl-mobile', width:390, height:1300},
  ];
  for (const v of views) {
    const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
    await page.goto('http://localhost:8089/#implantacao', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.getElementById('implantacao').scrollIntoView());
    await page.screenshot({ path: `shots/${v.name}.png` });
    await page.close();
  }
  await browser.close();
})();
