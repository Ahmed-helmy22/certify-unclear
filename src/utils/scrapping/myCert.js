import puppeteer from 'puppeteer'

export const myCertWebsite =async ( regNumber) => {
  const browser = await puppeteer.launch({ headless: 'new'  , args: [
    "--disable-setuid-sandbox",
    "--no-sandbox",
    "--single-process",
    "--no-zygote",
  ],
  executablePath : process.env.NODE_ENV =="production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()}); // Launch Puppeteer in headless mode
  const page = await browser.newPage();
  // await page.setRequestInterception(true);
  // page.on('request', (request) => {
  //   if (['image', 'stylesheet', 'font', 'script'].includes(request.resourceType())) {
  //     request.abort();
  //   } else {
  //     request.continue();
  //   }
  // });
  try {
//229435
    const url = `https://mycert.asntcertification.org/eweb/DynamicPage.aspx?Site=ASNT&webcode=ASNTSearchCertQualiHolderDetails&lastname=&recno=${regNumber}&state=&country=&programtype=&programtypetext=`;
    const response = await page.goto(url);
    if (!response.ok()) return {};
    await page.waitForSelector('#parentNestedTable_wrapper');
    await page.waitForSelector('.fa-plus');
    await page.click('.fa-plus');

    const tableData = await page.evaluate(() => {
      const data = [];
      const tableRows = document.querySelectorAll('#parentNestedTable tbody tr');
      tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length === 5) { // Ensure the row has the expected number of cells
          const program = {
            title: cells[0].textContent.trim() + cells[1].textContent.trim() ,
          };
           const unArrangedDate = cells[4].textContent.trim().split('/')
            const arrangedDate = `${unArrangedDate[1]}-${unArrangedDate[0]}-01`
            const dueDate = new Date(arrangedDate)
            const issueDate = new Date(arrangedDate)
            let currentYear = issueDate.getFullYear();
            issueDate.setFullYear(currentYear - 5);
            program.dueDate = dueDate.toISOString()
            program.issueDate = issueDate.toISOString()
          data.push(program);
        }
      });
      return data;
    });
    await browser.close();
    console.log(tableData);
    return tableData
  } catch (err) {
   return []
  }
};


export async function retry(website, retrycount){
  try{
    return await website()
  } catch(err){
    if(retrycount<=0){
      return []
    }
    return await retry(website, retrycount -1)
  }
}