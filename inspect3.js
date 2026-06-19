const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1000 } });
  await page.goto('http://localhost:8089/#implantacao', { waitUntil: 'networkidle' });
  const data = await page.evaluate(() => {
    const el = document.querySelector('.implantacao__frame');
    const cs = getComputedStyle(el);
    return { width: cs.width, height: cs.height, marginLeft: cs.marginLeft, marginBottom: cs.marginBottom };
  });
  console.log(JSON.stringify(data));
  await browser.close();
})();
