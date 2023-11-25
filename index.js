const { getEventData } = require('./scrapers/event-ws');
const { EVENT_URLS } = require('./utils/constants');

const run = async function (scraper, url, selector, elements = []) {
  try {
    const data = await scraper(url, selector, elements).then(data =>
      JSON.stringify(data, null, 2)
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const init = () => {
  run(getEventData, EVENT_URLS.CNB, '.seasonlist__item', [
    'h3 a',
    '.location',
    '.date-range',
  ]);

  run(getEventData, EVENT_URLS.TNDM, '.events-list li', ['.date', '.title']);
};

init();
