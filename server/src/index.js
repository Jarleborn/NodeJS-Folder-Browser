import {readFolder, returnData} from './modules/folderWalker'
const express = require('express')
let app = express()
const http = require('http').Server(app)
const port = 1337
const cors = require('cors')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
// app.use(express.static(__dirname + '/public'))
// app.all('/', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//   next()
// })

app.get('/getFolders', function (req, res) {
  console.log('bajs')
  //readFolder('./src/folders')
  console.log('HHOOOOOOOOOOOOOOOOJ!!!!!!!!')
  console.log(returnData())
  res.send(returnData())
})

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port)
})
