const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const crypto = require('crypto')

const axios = require('axios')

// Function to generate a hash string from a file path. Ruthlessly copied from:
// https://stackoverflow.com/a/44643479/6771403
const getFileHash = (hashName, path) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(hashName)
    const stream = fs.createReadStream(path)
    stream.on('error', err => reject(err))
    stream.on('data', chunk => hash.update(chunk))
    stream.on('end', () => resolve(hash.digest('hex')))
  })
}
exports.getFileHash = getFileHash

/**
 * Removes objects that represent existing files from an array.
 *
 * A file is considered to exist of a file exists in the given `filePath` and the `fileHash`
 * matches.The files are defined as plain `Objects` with the properties `filePath` and `fileHash`.
 *
 * @param {Object[]} fileArray - Array of objects describing a file. The objects should at least
 *     contain the properties `filePath` and `fileHash`. `filePath` is the local path to the file.
 *     `fileHash` is the "sha1" has of the file.
 *
 */
const removeExistingFilesFromArray = async (fileArray) => {
  const reducedArray = []
  for (const file of fileArray) {
    try {
      await fsPromises.stat(file.filePath)
    } catch (err) {
      reducedArray.push(file)
      continue
    }
    // For existing files, check if the local hash is the expected one.
    const localHash = await getFileHash('sha1', file.filePath)
    if (localHash !== file.fileHash) {
      reducedArray.push(file)
    }
  }
  return reducedArray
}
exports.removeExistingFilesFromArray = removeExistingFilesFromArray

/**
 * Download file from source and store to path.
 *
 * @param {Object} file - Object representing a file with an URL source that is
 *     to be stored in a given path. The object need the properties `fileSourceURL`
 *     and 'filePath'. `fileSourceURL` is the online source from which the file
 *     shall be retrieved. `filePath` is the local path where the file should be
 *     stored.
 *
 */
const storeFile = async (file) => {
  const fileDir = path.dirname(file.filePath)
  await fsPromises.mkdir(fileDir, { recursive: true })

  const fileWriter = fs.createWriteStream(file.filePath)

  const response = await axios({
    url: file.fileSourceURL,
    method: 'get',
    responseType: 'stream'
  })

  response.data.pipe(fileWriter)

  return new Promise((resolve, reject) => {
    fileWriter.on('finish', resolve)
    fileWriter.on('error', reject)
  })
}
exports.storeFile = storeFile

const storeWagtailDocuments = async (storageDir, graphql) => {
  const documentsResponse = graphql(`
    query {
      wagtail {
        documents: documentsExtended {
          id
          file
          fileHash
          src
        }
      }
    }
  `)
  const ensuredStorageDirExistence = await fsPromises.mkdir(storageDir, { recursive: true })
  const results = await Promise.all([documentsResponse, ensuredStorageDirExistence])

  const wagtailDocuments = results[0].data.wagtail.documents
  const wagtailDocumentFiles = wagtailDocuments.map((doc) => {
    return {
      filePath: path.resolve(storageDir, doc.file),
      fileHash: doc.fileHash,
      fileSourceURL: doc.src
    }
  })
  const filesToSave = await removeExistingFilesFromArray(wagtailDocumentFiles)

  const fileSavingPromises = filesToSave.map((file) => storeFile(file))

  await Promise.all(fileSavingPromises)
}
exports.storeWagtailDocuments = storeWagtailDocuments
