const rp = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs')

// Start from http://www.wildwalks.com/walks

const hikesList = [
  'http://www.wildwalks.com/lists/short_walks',
  // TODO Add 3 other URLs
]

async function getHikes() {
  // curl 4 URLs (short, half day, etc...)
  data = await rp.get(hikesList[0])
  fs.writeFile('tests/test-data/input.html', data)
  return parse(data)
}

// Inject into JSDOM

// Use jQuery to get all necessary info
//  PARSING
function parse(html) {
  const $ = cheerio.load(html)
  const namesList = $('.ww-box-htag-title a')
    .map(function(index, content) {
      return content.children[0].data.trim()
    }).get()
  const hikes = namesList.map(name => ({ name }))
  return hikes
}

// Push to Algolia / ES?


getHikes()
  .then(result => {
    console.log('result', result)
  })
  .catch(err => {
    console.error(err)
  })

module.exports = {
  parse,
}
