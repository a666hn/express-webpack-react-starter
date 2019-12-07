const fs = require('fs')
const path = require('path')

function getFileFromDir (dir, fileTypes) {
  const filesToReturn = []

  function readDir (currentPath) {
    const files = fs.readdirSync(currentPath)

    for (let key in files) {
      const currentFile = path.join(currentPath, files[key])

      if (fs.statSync(currentFile).isFile() && fileTypes.indexOf(path.extname(currentFile)) !== -1) {
        filesToReturn.push(currentFile)
      } else if (fs.statSync(currentFile).isDirectory()) {
        readDir(currentFile)
      }
    }
  }

  readDir(dir)
  return filesToReturn
}

module.exports = getFileFromDir
