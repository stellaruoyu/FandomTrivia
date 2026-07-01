import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[PAGE ERROR] ${err.toString()}`);
  });

  try {
    console.log('Navigating to https://www.fandom-trivia.com/trivia-avatar-1...');
    await page.goto('https://www.fandom-trivia.com/trivia-avatar-1', { waitUntil: 'domcontentloaded', timeout: 8000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Clicking Single Playing button...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      const singleBtn = buttons.find(el => el.textContent?.includes('Single Playing'));
      if (singleBtn) {
        singleBtn.click();
      } else {
        throw new Error('Single Playing button not found in DOM.');
      }
    });

    console.log('Waiting 2 seconds for transition...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`Current URL: ${page.url()}`);
    const text = await page.evaluate(() => document.body.innerText);
    console.log('Page Text after clicking Single Playing:');
    console.log(text.substring(0, 1000).replace(/\n/g, ' | '));

  } catch (err) {
    console.error('Error during run:', err.message);
  } finally {
    await browser.close();
    process.exit(0);
  }
})();
