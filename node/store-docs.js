const fsPromises = require('fs').promises
const path = require('path')

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

const storeDocuments = async (dir) => {
  await ensureDirectoryExistence(dir)
}

module.exports = storeDocuments
