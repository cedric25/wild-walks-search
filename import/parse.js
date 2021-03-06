const cheerio = require('cheerio')

const possibleDifficulties = [
  'Very easy', 'Easy track', 'Moderate track', 'Hard track', 'Experienced only', 'Very experienced only'
]

function parse(html) {
  const $ = cheerio.load(html)

  return $('.ww-box-wrapper')
    .map((_, content) => parseHikeHtml($, content)).get()
}

function parseHikeHtml($, content) {
  const detailLink = $(content).find('.ww-box-htag-title a')
  const hikeDetailsLink = $(detailLink[0]).attr('href')
  const leftBox = extractLeftBoxInfo($, content)
  const rigthBox = extractRightBoxInfo($, content)
  const hoverContent = extractHoverContent($, content)
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
  return Object.assign({}, main, leftBox, rigthBox, hoverContent)
}

function extractLeftBoxInfo($, content) {
  const leftBox = $(content).find('.box-left')
  const rawAccesses = $(leftBox).find('ul')[0]
  const accesses = $(rawAccesses).find('li')
    .map((_, access) => {
      const img = $(access).find('img')
      const href = $(img).attr('src')
      const matches = /white_([a-z]+).png/g.exec(href)
      return {
        by: matches[1],
      }
    }).get()
  const rawFirstLine = $(leftBox).find('p')[0].children[0].data
  const rawSecondLine = $(leftBox).find('p')[0].children[2].data
  const rawFirstLineSplit = rawFirstLine.split(' ')
  const distance = parseDistance(parseInt(rawFirstLineSplit[0]), rawFirstLineSplit[1])
  const hikeType = rawFirstLine.split('m ')[1]

  const rawSecondLineSplit = rawSecondLine.split(' ')
  const duration = parseDuration(parseInt(rawSecondLineSplit[0]), rawSecondLineSplit[1])

  return {
    distance,
    hikeType,
    duration,
    accesses,
  }
}

function extractRightBoxInfo($, content) {
  const leftBox = $(content).find('.box-right')

  // Difficulty
  const levelStr = $(leftBox).find('p').text()
  const difficulty = possibleDifficulties.indexOf(levelStr) + 1
  const difficultyLabel = levelStr

  // Wheelchair
  const images = $(leftBox).find('img').get()
  let wheelchair = false
  if (images.length === 2) {
    const imgSrc = $(images[1]).attr('src')
    if (/steep/.test(imgSrc)) {
      wheelchair = 'wheelchair_steep'
    } else if (/rough/.test(imgSrc)) {
      wheelchair = 'wheelchair_rough'
    } else if (/steep_rough/.test(imgSrc)) {
      wheelchair = 'wheelchair_steep_rough'
    } else {
      wheelchair = 'wheelchair'
    }
  }

  return {
    difficulty,
    difficultyLabel,
    wheelchair,
  }
}

function extractHoverContent($, content) {
  const hoverContent = $(content).find('.ww-into-text-hide p').text()
  const totalClimbing = /Total climbing: ([0-9]+)m/.exec(hoverContent)
  return {
    totalClimbing: parseInt(totalClimbing[1], 10),
  }
}

function parseDistance(value, unit) {
  const meters = unit === 'm' ? value : value * 1000
  return {
    meters,
    raw: { value, unit }
  }
}

function parseDuration(value, unit) {
  const HIKING_HOURS_IN_A_DAY = 8
  let minutes
  if (unit === 'mins') {
    minutes = value
  } else if(unit === 'hrs') {
    minutes = value * 60
  } else if(unit === 'Days') {
    minutes = value * 60 * HIKING_HOURS_IN_A_DAY
  } else {
    throw new Error(`Unknown unit ${unit}`)
  }
  return {
    minutes,
    raw: { value, unit }
  }
}

module.exports = {
  parse,

  // For test purpose
  parseDistance,
  parseDuration,
}
