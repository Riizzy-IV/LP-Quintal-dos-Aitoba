const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const views = [
    {name:'contato-desktop', width:1920, height:1000},
    {name:'contato-notebook', width:1366, height:1000},
    {name:'contato-mobile', width:390, height:1400},
  ];
  for (const v of views) {
    const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
    await page.goto('http://localhost:8089/#contato', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.getElementById('contato').scrollIntoView());
    await page.screenshot({ path: `shots/${v.name}.png` });
    await page.close();
  }
  await browser.close();
})();
