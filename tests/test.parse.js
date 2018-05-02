const fs = require('fs')
const expect = require('chai').expect
const { parse } = require('../index')

describe('parse ', () => {
  describe('When giving the entire html', () => {
    it('should extract all the names', function () {
      // Given
      const testData = fs.readFileSync('./tests/test-data/input.html')

      // When
      const results = parse(testData)

      // Then
      expect(results).to.have.length(245)
      expect(results[0].name).to.equal('Katoomba Falls Park to Cliff View Lookout')
      results.forEach(name => {
        expect(name).to.be.ok
      })
    })
  })
})
