/* eslint-env jest */
const fs = require('fs')
const fsPromises = require('fs').promises
const os = require('os')
const path = require('path')

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

describe('File array reduction', () => {
  const existingFile = {
    filePath: EXAMPLE_PDF,
    fileHash: EXAMPLE_PDF_SHA1
  }
  const notExistingFile = {
    filePath: '/no/such/file',
    fileHash: 'nonesensenonesensenonesensenonesense'
  }
  const existingFileWithDifferentHash = {
    filePath: EXAMPLE_PDF,
    fileHash: 'thisisnottherealhashoftheexistingfile'
  }

  it('leaves files that do not exist', async () => {
    const fileArray = [existingFile, notExistingFile]
    const reducedArray = await storeDocs.removeExistingFilesFromArray(fileArray)
    expect(reducedArray).toContain(notExistingFile)
    expect(reducedArray).not.toContain(existingFile)
  })

  it('leaves files that have a different hash than the existing file', async () => {
    const fileArray = [existingFile, existingFileWithDifferentHash]
    const reducedArray = await storeDocs.removeExistingFilesFromArray(fileArray)
    expect(reducedArray).toContain(existingFileWithDifferentHash)
    expect(reducedArray).not.toContain(existingFile)
  })
})

describe('Download file', () => {
  // jest.setTimeout(10000)
  it('without additional in path directories is saved locally.', async () => {
    const tmpDir = await fsPromises.mkdtemp(path.join(os.tmpdir(), 'test-'))

    const fileToStore = {
      filePath: path.join(tmpDir, 'example.svg'),
      fileSourceURL: 'https://lpld.io/image/logo.svg'
    }

    await storeDocs.storeFile(fileToStore)

    const stats = await fsPromises.stat(fileToStore.filePath)

    await fsPromises.unlink(fileToStore.filePath)
    await fsPromises.rmdir(tmpDir)

    expect(stats.isFile()).toBe(true)
  })

  it('with additional in path directories is saved locally.', async () => {
    const tmpDir = await fsPromises.mkdtemp(path.join(os.tmpdir(), 'test-'))

    const fileToStore = {
      filePath: path.join(tmpDir, '/some/more/dir/example.svg'),
      fileSourceURL: 'https://lpld.io/image/logo.svg'
    }

    await storeDocs.storeFile(fileToStore)

    const stats = await fsPromises.stat(fileToStore.filePath)

    expect(stats.isFile()).toBe(true)
  })
})
