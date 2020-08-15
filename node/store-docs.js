const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const crypto = require('crypto')

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

const ensureDirectoryExistence = async (dir) => {
  console.log('Checking for directory existence: ' + dir)
  const testFilePath = path.resolve(dir, 'testfile.txt')

  await fsPromises.mkdir(dir, { recursive: true })

  console.log('Directory exists or created.')
  console.log('Now that the directory exists, I can do something with it.')
  console.log('Checking for the testfile.')

  try {
    await fsPromises.stat(testFilePath)
  } catch (err) {
    console.log('Testfile does not exist: ' + err)
    console.log('Creating...')
    const testFileContent = 'Some nonsense string'
    await fsPromises.writeFile(testFilePath, testFileContent)
  }
}

const extractWagtailBaseURL = (wagtailURL) => {
  const url = new URL(wagtailURL)
  return url.origin
}

const makeWagtailDocumentURL = (wagtailBaseURL, wagtailDocumentPath) => {
  const mediaDocumentPath = path.join('media', wagtailDocumentPath)
  const docURL = new URL(mediaDocumentPath, wagtailBaseURL)
  return docURL.toString()
}

const storeWagtailDocuments = async (storageDir, graphql) => {
  const documentsResponse = graphql(`
    query {
      wagtail {
        documents {
          id
          file
          fileHash
        }
      }
      sitePlugin(name: {eq: "gatsby-source-wagtail"}) {
        pluginOptions {
          url
        }
      }
    }
  `)
  const ensuredStorageDirExistence = ensureDirectoryExistence(storageDir)
  const results = await Promise.all([documentsResponse, ensuredStorageDirExistence])
  const wagtailDocuments = results[0].data.wagtail.documents
  const wagtailBaseURL = extractWagtailBaseURL(results[0].data.sitePlugin.pluginOptions.url)

  const wagtailDocumentFiles = wagtailDocuments.map((doc) => {
    return {
      filePath: path.resolve(storageDir, doc.file),
      fileHash: doc.fileHash,
      wagtailDocumentURL: makeWagtailDocumentURL(wagtailBaseURL, doc.file)
    }
  })
  const notExistingDocumentFiles = await removeExistingFilesFromArray(wagtailDocumentFiles)
  console.log(notExistingDocumentFiles)
}

exports.storeWagtailDocuments = storeWagtailDocuments
