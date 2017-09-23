console.log('Im up')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = 1337
const fs = require('fs')
const data = require('../lib/data.json')
const io = require('socket.io')()

readFolder('./src/folders')

function readFolder(folder) {

  fs.readdir(folder, (err, files) => {
    let tmp = {}
    tmp.folder = folder
    tmp.files = []
    files.forEach(file => {

      if (fs.lstatSync(folder + '/' +file).isDirectory()) {
        readFolder(folder +'/'+ file)
      } else {
        tmp.files.push(file)
      }
    })
    writeToJSON(tmp)
  })
}

function writeToJSON(obj) {
  data.folders.push(obj)  
}

io.on('connection', function (socket){
  socket.emit('data_deliverd',data)
})

app.use(express.static(__dirname + '/public'))
app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html')
})

app.get('/data', function (req, res) {
  res.send(data)
})

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port)
})
