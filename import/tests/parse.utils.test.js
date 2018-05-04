const expect = require('chai').expect
const { parseDistance, parseDuration } = require('../parse')

describe('parseDistance()', () => {

  describe('When giving 100 and meters', () => {
    it('should give us 100', function () {
      // Given
      const value = 100
      const unit = 'm'

      // When
      const result = parseDistance(value, unit)

      // Then
      expect(result).to.deep.equal({
        meters: 100,
        raw: { value: 100, unit: 'm' }
      })
    })
  })

  describe('When giving 20 and kilometers', () => {
    it('should give us 20000', function () {
      // Given
      const value = 20
      const unit = 'km'

      // When
      const result = parseDistance(value, unit)

      // Then
      expect(result).to.deep.equal({
        meters: 20000,
        raw: { value: 20, unit: 'km' }
      })
    })
  })

})

describe('parseDuration()', () => {

  describe('When giving 45 and minutes', () => {
    it('should give us 45', function () {
      // Given
      const value = 45
      const unit = 'mins'

      // When
      const result = parseDuration(value, unit)

      // Then
      expect(result).to.deep.equal({
        minutes: 45,
        raw: {
          value: 45,
          unit: 'mins'
        }
      })
    })
  })

  describe('When giving 3 and hours', () => {
    it('should give us 180', function () {
      // Given
      const value = 3
      const unit = 'hrs'

      // When
      const result = parseDuration(value, unit)

      // Then
      expect(result).to.deep.equal({
        minutes: 180,
        raw: {
          value: 3,
          unit: 'hrs'
        }
      })
    })
  })

  describe('When giving 3 and days', () => {
    it('should give us 1440', function () {
      // Given
      const value = 3
      const unit = 'Days'

      // When
      const result = parseDuration(value, unit)

      // Then
      expect(result).to.deep.equal({
        minutes: 1440,
        raw: {
          value: 3,
          unit: 'Days'
        }
      })
    })

  })

})
