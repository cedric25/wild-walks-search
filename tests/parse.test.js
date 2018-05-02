const fs = require('fs')
const expect = require('chai').expect
const { parse } = require('../parse')

describe('parse ', () => {
  describe('When giving the entire html', () => {

    const testData = fs.readFileSync('./tests/test-data/input.html')

    it('should extract all the names', function () {
      // When
      const results = parse(testData)

      // Then
      expect(results).to.have.length(245)
      expect(results[0].name).to.equal('Katoomba Falls Park to Cliff View Lookout')
      results.forEach(name => {
        expect(name).to.be.ok
      })
    })

    it('should create unique ObjectIds', function () {
      // When
      const results = parse(testData)

      // Then
      const orderedHikes = results.sort((a, b) => {
        if (a.objectID < b.objectID) {
          return -1;
        } else if (a.objectID > b.objectID) {
          return 1;
        }
        return 0;
      })

      orderedHikes.forEach((hike, index) => {
        if (index > 0) {
          expect(hike.objectID).not.to.equal( orderedHikes[index - 1].objectID)
        }
      })
    })
  })
})
