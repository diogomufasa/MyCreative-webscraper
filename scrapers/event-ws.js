const cheerio = require('cheerio');
const { getBrowser, getHTML, parseHTML } = require('../utils/helpers');

async function getEventData(url, selector, elements = []) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = [];

      const browser = await getBrowser();
      const html = await getHTML(url, browser);
      const $ = cheerio.load(html);

      $(selector).each((_, element) => {
        const parsedData = parseHTML($(element).html(), elements);

        if (parsedData.length === 0 || parsedData.element === '') {
          reject('Could not parse data');
        }

        data.push(parsedData);
      });

      if (data.length === 0) {
        reject('No data found');
      }

      await browser.close();

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getEventData,
};
