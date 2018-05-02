const cheerio = require('cheerio')

function parse(html) {
  const $ = cheerio.load(html)

  const hikes = $('.ww-box-wrapper')
    .map(function(index, content) {
      return parseHikeHtml($, content)
    }).get()
  return hikes
}

function parseHikeHtml ($, content) {
  const detailLink = $(content).find('.ww-box-htag-title a')
  return {
    name: detailLink[0].children[0].data.trim(),
    objectID: $(detailLink[0]).attr('href'),
  }
}

module.exports = {
  parse,
}
