const fsPromises = require('fs').promises
const path = require('path')

const ensureDirectoryExistence = (dir) => {
  console.log('Checking for directory existence: ' + dir)
  const testFilePath = path.resolve(dir, 'testfile.txt')

  return fsPromises.mkdir(dir, { recursive: true })
    .then(() => console.log('Directory exists or created.'))
    .then(() => {
      console.log('Now that the directory exists, I can do something with it.')
      console.log('Checking for the testfile.')
      return fsPromises.stat(testFilePath)
    })
    .then((stats) => console.log('The testfile does exist already.'))
    .catch((err) => {
      console.log('Testfile does not exist: ' + err)
      console.log('Creating...')
      const testFileContent = 'Some nonsense string'
      return fsPromises.writeFile(testFilePath, testFileContent)
    })
}

const storeDocuments = async (dir) => {
  const dirPromise = ensureDirectoryExistence(dir)
}

module.exports = storeDocuments
