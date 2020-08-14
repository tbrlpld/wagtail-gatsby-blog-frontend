/* eslint-env jest */
const path = require('path')
const fsPromises = require('fs').promises

describe('Asset file', () => {
  it('exists', async () => {
    const fileStats = await fsPromises.stat(path.resolve(__dirname, './assets/example.pdf'))
    expect(fileStats.isFile()).toBe(true)
  })
})
