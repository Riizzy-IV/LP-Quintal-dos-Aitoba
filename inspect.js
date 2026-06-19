const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 200 } });
  await page.goto('http://localhost:8089/', { waitUntil: 'networkidle' });
  const data = await page.evaluate(() => {
    const get = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { sel, x: r.x, right: r.right, width: r.width, padding: cs.padding, maxWidth: cs.maxWidth, justifyContent: cs.justifyContent };
    };
    return [get('.header__inner'), get('.header__logo'), get('.nav'), get('.nav__content'), get('.nav__list'), get('.nav__cta')];
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
