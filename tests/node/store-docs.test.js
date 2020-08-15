/* eslint-env jest */
const path = require('path')
const fsPromises = require('fs').promises

const storeDocs = require('../../node/store-docs')

const EXAMPLE_PDF = path.resolve(__dirname, './assets/example.pdf')
const EXAMPLE_PDF_SHA1 = '858f4cd0b4405a39e036820bf6af57dc185bad87'

describe('Asset file', () => {
  it('exists', async () => {
    const fileStats = await fsPromises.stat(EXAMPLE_PDF)
    expect(fileStats.isFile()).toBe(true)
  })
})

describe('File hash', () => {
  it('matches external calculation', async () => {
    const hash = await storeDocs.getFileHash('sha1', EXAMPLE_PDF)
    expect(hash).toEqual(EXAMPLE_PDF_SHA1)
  })
})

describe('File array', () => {
  it('leaves only files that do not exist', async () => {
    const existingFile = {
      filePath: EXAMPLE_PDF,
      fileHash: EXAMPLE_PDF_SHA1
    }
    const notExistingFile = {
      filePath: '/no/such/file',
      fileHash: 'nonesensenonesensenonesensenonesense'
    }
    const fileArray = [existingFile, notExistingFile]
    const reducedArray = await storeDocs.removeExistingFilesFromArray(fileArray)
    expect(reducedArray).toContain(notExistingFile)
    expect(reducedArray).not.toContain(existingFile)
  })
})