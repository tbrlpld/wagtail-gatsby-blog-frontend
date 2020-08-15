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
      console.log('File does NOT exist: ' + file.filePath)
      reducedArray.push(file)
      continue
    }
    console.log('File DOES exist: ' + file.filePath)
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

const storeWagtailDocuments = async (dir) => {
  await ensureDirectoryExistence(dir)
}

exports.storeWagtailDocuments = storeWagtailDocuments
