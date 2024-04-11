import puppeteer from 'puppeteer'

  export const itraWebsite = async (regNumber, name) => {
      const browser = await puppeteer.launch({ headless: 'new'  , args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath : process.env.NODE_ENV =="production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()}); // Launch Puppeteer in headless mode
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        if (['image', 'stylesheet', 'font', 'script'].includes(request.resourceType())) {
          request.abort();
        } else {
          request.continue();
        }
      });
      try {
    const response = await page.goto('https://irata-online.org/c/search/');
    if (!response.ok()) return {};
    await page.waitForSelector('form#searchForm');
//'zaky' , 46999
    await page.type('input[name="i_name"]', `${name}`);
    await page.type('input[name="i_id"]', `${regNumber}`);
    await page.click('button#searchButton');

    const result = await page.evaluate(() => {
      const isValid = document.querySelector('.results.found .valid');
      if (isValid) {
        const title = document.querySelector('.results.found .details .GreenText').textContent.trim();
        let expirationDate = document.querySelector('.results.found .details .BlueText span').textContent.trim().split(' ');
            expirationDate = expirationDate[expirationDate.length - 1].split('/');
              const arrangedDate = `20${expirationDate[2]}-${expirationDate[1]}-${expirationDate[0]}`;

              const dueDate = new Date(arrangedDate)
              const issueDate = new Date(arrangedDate)
              let currentYear = issueDate.getFullYear();
              dueDate.setFullYear(currentYear - 3);
        return {
          title,
          dueDate : dueDate.toISOString(),
          issueDate : issueDate.toISOString()
        };
      } else {
        return {};
      }
    });
    await browser.close();
    return result
    } catch (err) {
      return {}
    }}