const rp = require('request-promise')
const fs = require('fs')
const algoliasearch = require('algoliasearch')
const { parse } = require('./parse')

// Start from http://www.wildwalks.com/walks

const hikesList = [
  'http://www.wildwalks.com/lists/short_walks',
  // TODO Add 3 other URLs
]

async function getHikes() {
  // curl 4 URLs (short, half day, etc...)
  const rawHtml = await rp.get(hikesList[0])
  const data = parse(rawHtml)
  return await pushAlgolia(data)
}

// Inject into JSDOM

const client = algoliasearch(process.env.username, process.env.password);
const index = client.initIndex('wild-walks');

function pushAlgolia(hikes) {
  return new Promise((resolve, reject) => {
    resolve(index.addObjects(hikes))
  })
}

getHikes()
  .then(result => {
    console.log('result', result)
  })
  .catch(err => {
    console.error(err)
  })
