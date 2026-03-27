import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page1 = await browser.newPage();
  
  page1.on('console', msg => {
    if (msg.type() !== 'warning') {
      console.log(`PAGE1 [${msg.type()}] ${msg.text()}`);
    }
  });

  console.log('Navigating to http://127.0.0.1:3000/?test=player1');
  await page1.goto('http://127.0.0.1:3000/?test=player1');
  
  // Wait for React to mount
  await page1.waitForSelector('button h3');
  
  // Find and click the "Versus Mode" button
  const buttons = await page1.$$('button');
  for (const btn of buttons) {
    const text = await page1.evaluate(el => el.textContent, btn);
    if (text?.includes("Versus Mode")) {
      await btn.click();
      console.log('Clicked Versus Mode on Page 1');
      break;
    }
  }

  // Open Page 2
  const page2 = await browser.newPage();
  page2.on('console', msg => {
    if (msg.type() !== 'warning') {
      console.log(`PAGE2 [${msg.type()}] ${msg.text()}`);
    }
  });

  console.log('Navigating to http://127.0.0.1:3000/?test=player2');
  await page2.goto('http://127.0.0.1:3000/?test=player2');
  
  await page2.waitForSelector('button h3');
  const buttons2 = await page2.$$('button');
  for (const btn of buttons2) {
    const text = await page2.evaluate(el => el.textContent, btn);
    if (text?.includes("Versus Mode")) {
      await btn.click();
      console.log('Clicked Versus Mode on Page 2');
      break;
    }
  }

  // Evaluate the DOM specifically to see what's on the screen
  await page1.waitForTimeout(3000);
  const page1Text = await page1.evaluate(() => document.body.innerText);
  console.log('PAGE1 BODY SAMPLE:', page1Text.substring(0, 200).replace(/\n/g, ' '));

  await browser.close();
  process.exit(0);
})();
