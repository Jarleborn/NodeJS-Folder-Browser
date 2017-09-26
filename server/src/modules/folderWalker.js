const fs = require('fs')
import {jsonPath} from '../lib/config'

function readFolders(folder) {
  let promiseHolder = []
  let filesInFolder = {}

  return new Promise(function(resolve, reject) {
    fs.readdir(folder, (err, files) => {
      filesInFolder.folder = {}
      filesInFolder.folder.name = folder
      filesInFolder.folder.type = 'folder'
      filesInFolder.files = []
      filesInFolder.folders = []

      for (let i = 0; i < files.length; i++) {
        console.log(files)
        let tmpObj = {}
        if (fs.lstatSync(folder + '/' +files[i]).isDirectory()) {
          promiseHolder.push(readFolders(folder+ '/' + files[i]))
        } else {
          tmpObj.name = files[i]
          tmpObj.type = 'file'
          filesInFolder.files.push(tmpObj)
        }
      }

      return Promise.all(promiseHolder)
      .then(res => {
        filesInFolder.folders.push(res)
        writeToJSON(filesInFolder)
        resolve(filesInFolder)
      })
      .catch(err => console.log(err))
    })
  })

}

function writeToJSON(obj) {
  fs.writeFile(jsonPath(), JSON.stringify(obj), 'utf8', function (err) {
    if (err) {
      return console.log(err)
    }
    console.log('The file was saved!')
  })
}

export{readFolders, writeToJSON}
