const rp = require('request-promise')
const algoliasearch = require('algoliasearch')
const { parse } = require('./parse')

const client = algoliasearch(process.env.username, process.env.password);
const index = client.initIndex('wild-walks');

// Start from http://www.wildwalks.com/walks

const hikesList = [
  'http://www.wildwalks.com/lists/short_walks',
  'http://www.wildwalks.com/list/half-day-walks.html',
  'http://www.wildwalks.com/lists/full-day-walks.html',
  'http://www.wildwalks.com/lists/multiday-walks-overnight-walks/',
]

async function getHikes() {
  for (let i = 0; i < hikesList.length; i++) {
    const rawHtml = await rp.get(hikesList[0])
    const data = parse(rawHtml)
    await pushAlgolia(data)
  }
}

function pushAlgolia(hikes) {
  return new Promise((resolve, reject) => {
    resolve(index.addObjects(hikes))
  })
}

try {
  getHikes()
  console.log('result', result)
} catch (err) {
  console.error(err)
}
