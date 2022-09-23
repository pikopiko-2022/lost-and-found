const express = require('express')
const { addPost, getAllPostsWithComments } = require('../db/posts')
const router = express.Router()
const upload = require('../multer')

const errorMessage = 'There was a problem. Please try again.'

//GET /api/v1/posts
router.get('/', (req, res) => {
  getAllPostsWithComments()
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.error(err.message)
      res.status(500).send(errorMessage)
    })
})

//POST /api/v1/posts
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    console.log('No file upload')
  } else {
    const { description, category, title, date, location } = req.body
    //todo: replace with req.user?.sub
    const uploader_id = '3'
    const post = {
      description,
      uploader_id,
      category,
      title,
      date,
      image_url: './images/postimages/' + req.file.filename,
      location,
    }
    addPost(post)
      .then((posts) => res.json(posts))
      .catch(() => res.status(500).send(errorMessage))
  }
})

// router.post('/', (req, res) => {
//   const { description, category, title, date, image_url, location } = req.body
//   //todo: replace with req.user?.sub
//   const uploader_id = '3'
//   const post = {
//     description,
//     uploader_id,
//     category,
//     title,
//     date,
//     image_url,
//     location,
//   }
//   addPost(post)
//     .then((posts) => res.json(posts))
//     .catch(() => res.status(500).send(errorMessage))
// })

module.exports = router
