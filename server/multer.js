const multer = require('multer')
const path = require('path')

//nice work on image uploads!
let storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.resolve('server/public/images/postimages'))
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

let upload = multer({
  storage: storage,
})

module.exports = upload
