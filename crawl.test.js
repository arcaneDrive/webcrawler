const {normalizeURL} = require('./crawl')
const { test , expect} = require('@jest/globals')


test('normalizeURL',() => {
    const input = ''
    const actual = normalizeURL(input)
    const expected = 'new'
    expect(actual).toEqual(expected)
})