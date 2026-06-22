const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const views = [
    {name:'full-desktop', width:1920, height:1080},
    {name:'full-notebook', width:1366, height:768},
    {name:'full-mobile', width:390, height:844},
  ];
  for (const v of views) {
    const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
    await page.goto('http://localhost:8089/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `shots/${v.name}-full.png`, fullPage: true });
    await page.close();
  }
  await browser.close();
})();
