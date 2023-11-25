const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function getBrowser() {
  return await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

async function getHTML(url, browser) {
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
  await page.close();

  return html;
}

function parseHTML(html, elements) {
  const $ = cheerio.load(html);
  const data = {};

  elements.forEach(element => {
    data[element] = $(element).text().trim();
  });

  return data;
}

module.exports = {
  getBrowser,
  getHTML,
  parseHTML,
};
