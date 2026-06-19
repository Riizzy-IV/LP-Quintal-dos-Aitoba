const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
  await page.goto('http://localhost:8089/#implantacao', { waitUntil: 'networkidle' });
  const data = await page.evaluate(() => {
    const get = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { sel, width: r.width, height: r.height, fontSize: cs.fontSize, marginLeft: cs.marginLeft, marginBottom: cs.marginBottom };
    };
    return [get('.implantacao__text'), get('.implantacao__title'), get('.implantacao__frame'), get('.implantacao__media')];
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
