import puppeteer from 'puppeteer'

export const  leeWebsite=async(company, regNumber) =>{
  const browser = await puppeteer.launch({ headless: 'new' , args: [
    "--disable-setuid-sandbox",
    "--no-sandbox",
    "--single-process",
    "--no-zygote",
  ],
  executablePath : process.env.NODE_ENV =="production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()}); // Launch Puppeteer in headless mode
  const page = await browser.newPage();

  try {
    //https://leeaint.com/team-card-result&company=7112&ref=1923
  const response = await page.goto(`https://leeaint.com/team-card-result&company=${company}&ref=${regNumber}`);
  //if (!response.ok()) return {};

  const contentMain = '.content-main';
  await page.waitForSelector(contentMain);

  const qualifications = await page.evaluate((contentMain) => {
    const data = []
    const tbodys = document.querySelectorAll(`${contentMain} tbody tr`);
    const tbodyArray = Array.from(tbodys);
       tbodyArray.forEach((tr) => {
      const thElement = tr.querySelector('th');
      const tdElement = tr.querySelector('td');
      if( thElement?.textContent?.trim() == 'Subject' ) {
        const title = tdElement.textContent.trim();
        data.push({title})
      }
      if( thElement?.textContent?.trim() == 'Date Refresher Due' ) {
        const date = tdElement.textContent.trim()
        const splited = date.split('-');
        const arrangedDate = `${splited[2]}-${splited[1]}-${splited[0]}`;

        const dueDate = new Date(arrangedDate)
        const issueDate = new Date(arrangedDate)
      //   let currentYear = dueDate.getFullYear();
      //  dueDate =  dueDate.setFullYear(currentYear - 3);
        data[data.length - 1].dueDate = dueDate.toISOString()
        data[data.length - 1].issueDate = new Date(`${splited[2]-3}-${splited[1]}-${splited[0]}`).toISOString()
      }
  });
  
    return data
  }, contentMain)
await browser.close(); 
  return qualifications;
} catch (error) {
  return {};
}
}

