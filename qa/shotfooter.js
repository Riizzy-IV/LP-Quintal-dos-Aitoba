const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const views = [
    {name:'footer-desktop', width:1920, height:500},
    {name:'footer-notebook', width:1366, height:500},
    {name:'footer-mobile', width:390, height:500},
  ];
  for (const v of views) {
    const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
    await page.goto('http://localhost:8089/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.screenshot({ path: `shots/${v.name}.png` });
    await page.close();
  }
  await browser.close();
})();
