import {readFolders} from './modules/folderWalker'
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

app.get('/test2', function (req, res) {
  readFolders('./src/folders')
  .then(response => res.send(response))
})
app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port)
})
