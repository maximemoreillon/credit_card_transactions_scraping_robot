const schedule = require ('node-schedule');

const secrets = require('./secrets')
const scraper = require('./scraper')
const registration = require('./registration')
const db_connector = require('./db_connector')
const formatter = require('./formatter')


process.env.TZ = 'Asia/Tokyo';



// scrape periodically
schedule.scheduleJob('0 2 * * *', () => {
  scraper.scrape().then(table_content => {
    let formatted_entries = formatter.format_entries(table_content)
    registration.register_transactions(formatted_entries)
  })
});
