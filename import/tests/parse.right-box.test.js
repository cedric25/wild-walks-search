const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const { parse } = require('../parse')

describe('Right box', () => {
  describe('When giving the entire html', () => {

    const inputFilepath = path.join(__dirname, './test-data/input.html')
    const testData = fs.readFileSync(inputFilepath)

    it('should give a string difficulty of "Very easy" for the first hike', function () {
      // When
      const results = parse(testData)

      // Then
      expect(results[0].difficulty).to.equal(1)
      results.forEach(hike => {
        expect(hike.difficulty).to.be.ok
        expect(hike.difficulty).to.be.oneOf([1, 2, 3, 4, 5, 6])
      })
    })

    it('should give a wheelchair access for the first hike', function () {
      // When
      const results = parse(testData)

      // Then
      expect(results[0].wheelchair).to.equal('wheelchair')
      results.forEach(hike => {
        expect(hike.wheelchair).to.be.ok
        expect(hike.wheelchair).to.be.oneOf([
          'none', 'wheelchair', 'wheelchair_steep', 'wheelchair_rough', 'wheelchair_steep_rough'
        ])
      })
    })

  })

})
