const express = require('express')
const multer = require('multer')
const app = express()
const crypto = require('crypto')
const path = require('path')
const detect = require('./detect')


var filename = ''
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    return crypto.randomBytes(16, (err, buff) => {
      if (err) throw err
      filename = `${buff.toString('hex')}${path.extname(file.originalname)}`
      return cb(null, filename)
    })
  }
})
app.post('/', multer({ storage: storage }).single('upload'), (req, res) => {
  console.log("==== Request RECEIVED!!!!!")
  console.log(req.file)
  console.log(req.body)
  let detectResult = detect.detectImg(filename, res)
  app.set('json spaces', 2)
})

app.listen(3030, () => {
  console.log('Listening on port 3030')
})

