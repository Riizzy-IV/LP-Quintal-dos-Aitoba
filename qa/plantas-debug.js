const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844, deviceScaleFactor: 2 });
  const filePath = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  await page.goto(filePath);
  await page.waitForTimeout(500);

  const info = await page.evaluate(() => {
    const tab = document.querySelector('.plantas__tab');
    const s = window.getComputedStyle(tab);
    return {
      display: s.display,
      visibility: s.visibility,
      opacity: s.opacity,
      height: s.height,
      width: s.width,
      color: s.color,
      border: s.border,
      borderColor: s.borderColor,
      background: s.background,
      overflow: s.overflow,
    };
  });

  console.log(JSON.stringify(info, null, 2));

  // Take a full-page screenshot of just the plantas area
  await page.screenshot({
    path: path.resolve(__dirname, '..', 'shots', 'plantas-full.png'),
    clip: { x: 0, y: 2599, width: 390, height: 700 }
  });
  console.log('screenshot saved');
  await browser.close();
})();
