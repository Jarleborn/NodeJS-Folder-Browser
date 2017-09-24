const fs = require('fs')
const data = require('../../lib/data.json')

function readFolder(folder) {
  fs.readdir(folder, (err, files) => {
    let tmp = {}
    tmp.files = []
    tmp.folder = folder
    files.forEach(file => {

      if (fs.lstatSync(folder + '/' +file).isDirectory()) {
        readFolder(folder +'/'+ file)
      } else {
        tmp.files.push(file)
      }
    })
    data.files.push(tmp)
    tmp = {}
    console.log(data)
    writeToJSON(data)
  })
}

function writeToJSON(obj) {
  console.log(obj)
  fs.writeFile('./lib/data.json', JSON.stringify(obj), 'utf8', function (err) {
    if (err) {
      return console.log(err)
    }

    console.log('The file was saved!')
  })
}

function returnData() {
  return data
}
export{readFolder, writeToJSON, returnData}
