const cheerio = require('cheerio')

function parse(html) {
  const $ = cheerio.load(html)

  return $('.ww-box-wrapper')
    .map((_, content) => parseHikeHtml($, content)).get()
}

function parseHikeHtml($, content) {
  const detailLink = $(content).find('.ww-box-htag-title a')
  const hikeDetailsLink = $(detailLink[0]).attr('href')
  const leftBox = extractLeftBoxInfo($, content)
  const rawMainImage = $(content).find('.ww-box-thumbnail-img')
  const rawElevationImage = $(content).find('.img-box-bottom')
  const elevationImage = $(rawElevationImage[0]).attr('src')
  const main = {
    objectID: hikeDetailsLink,
    name: detailLink[0].children[0].data.trim(),
    detailLink: `http://www.wildwalks.com${hikeDetailsLink}`,
    mainImage: $(rawMainImage[0]).attr('src'),
    elevationImage: `http://www.wildwalks.com${elevationImage}`,
  }
  return Object.assign({}, main, leftBox)
}

function extractLeftBoxInfo($, content) {
  const leftBox = $(content).find('.box-left')
  const rawAccesses = $(leftBox).find('ul')[0]
  const accesses = $(rawAccesses).find('li')
    .map((_, access) => {
      const img = $(access).find('img')
      const href = $(img).attr('src')
      const matches = /white_([a-z]+).png/g.exec(href)
      return matches[1]
    }).get()
  const rawFirstLine = $(leftBox).find('p')[0].children[0].data
  const rawSecondLine = $(leftBox).find('p')[0].children[2].data
  const distance = parseInt(rawFirstLine.split(' ')[0], 10)
  const hikeType = rawFirstLine.split('m ')[1]
  const duration = parseInt(rawSecondLine.split('m ')[0], 10)
  return {
    distance,
    hikeType,
    duration,
    accesses,
  }
}

module.exports = {
  parse,
}
