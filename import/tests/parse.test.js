const fs = require('fs')
const path = require('path')
const expect = require('chai').expect
const { parse } = require('../parse')

describe('parse ', () => {
  describe('When giving the entire html', () => {

    const inputFilepath = path.join(__dirname, './test-data/input.html')
    const testData = fs.readFileSync(inputFilepath)

    it('should give us a total of 245 hikes', function () {
      // When
      const results = parse(testData)

      // Then
      expect(results).to.have.length(245)
    })

    it('should extract all the names with none being empty', function () {
      // When
      const results = parse(testData)

      // Then
      expect(results[0].name).to.equal('Katoomba Falls Park to Cliff View Lookout')
      results.forEach(hike => {
        expect(hike.name).to.be.ok
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

    it('should give a correct detail link', function () {
      // When
      const results = parse(testData)

      // Then
      const expected = 'http://www.wildwalks.com/bushwalking-and-hiking-in-nsw/blue-mountains-katoomba/katoomba-falls-park-to-cliff-view-lookout.html'
      expect(results[0].detailLink).to.equal(expected)
      results.forEach(hike => {
        expect(hike.detailLink).to.be.ok
      })
    })

    it('should give a distance of 556 m for the first hike', function () {
      // When
      const results = parse(testData)

      // Then
      expect(results[0].distance).to.equal(556)
      results.forEach(hike => {
        expect(hike.distance).to.be.ok
        expect(hike.distance).to.be.above(10)
      })
    })

    it('should give the hike type', function () {
      // When
      const results = parse(testData)

      // Then
      expect(results[0].hikeType).to.equal('Return')
      results.forEach(hike => {
        expect(hike.hikeType).to.be.ok
        expect(hike.hikeType).to.be.oneOf(['Return', 'One way', 'Circuit'])
      })
    })

    it('should give a duration of 20 for the first hike', function () {
      // When
      const results = parse(testData)

      // Then
      expect(results[0].duration).to.deep.equal({
        minutes: 20,
        raw: {
          unit: 'mins',
          value: 20
        }
      })
      results.forEach(hike => {
        expect(hike.duration.minutes).to.be.above(0)
        expect(hike.duration.raw.unit).to.be.oneOf([
          'mins',
          'hrs',
          'Days'
        ])
      })
    })

    it('should give car and bus for the first hike', function () {
      // When
      const results = parse(testData)

      // Then
      expect(results[0].accesses).to.deep.equal([
        { by: 'car' },
        { by: 'bus' },
      ])
      results.forEach(hike => {
        expect(hike.accesses).to.not.be.empty
        hike.accesses.forEach(access => {
          expect(access.by).to.be.oneOf(['car', 'bus', 'train', 'ferry'])
        })
      })
    })

    it('should give the correct main img src for the first hike', function () {
      // When
      const results = parse(testData)

      // Then
      const expected = 'https://lh3.googleusercontent.com/-zVtkdIfDHC0/V3Q4TNuSoMI/AAAAAAAFzSg/gy0MPTbujwUJD4MojsW-L7mqStWhHLxAwCHM/s300-c/MM_20160629_000459.JPG'
      expect(results[0].mainImage).to.equal(expected)
      results.forEach(hike => {
        expect(hike.mainImage).to.be.ok
        expect(hike.mainImage).to.match(/^https:\/\/lh\d+\.googleusercontent\.com\/.+/)
      })
    })

    it('should give the correct elevation img src for the first hike', function () {
      // When
      const results = parse(testData)

      // Then
      const expected = 'http://www.wildwalks.com/wildwalks_custom/walk_terrain/nsw-bmnp-kfptcvl_simple.png'
      expect(results[0].elevationImage).to.equal(expected)
      results.forEach(hike => {
        expect(hike.elevationImage).to.be.ok
        expect(hike.elevationImage).to.match(/^https?:\/\/www\.wildwalks\.com\/wildwalks_custom\/walk_terrain\/.+\.png$/)
      })
    })
  })
})
