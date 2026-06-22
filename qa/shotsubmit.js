const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  page.on('dialog', async dialog => { console.log('DIALOG:', dialog.message()); await dialog.accept(); });
  await page.goto('http://localhost:8089/#contato', { waitUntil: 'networkidle' });
  await page.fill('#contatoNome', 'Teste');
  await page.fill('#contatoEmail', 'teste@teste.com');
  await page.fill('#contatoTelefone', '11999999999');
  await page.check('.contato__privacy input');
  await page.click('.contato__submit');
  await page.waitForTimeout(300);
  await browser.close();
})();
