const express = require('express')
const { addPost, getAllPostsWithComments, deletePost } = require('../db/posts')
const router = express.Router()
const upload = require('../multer')

const errorMessage = 'There was a problem. Please try again.'

router.get('/', (req, res) => {
  getAllPostsWithComments()
    .then((posts) => {
      return res.json(posts)
    })
    .catch(() => {
      res.status(500).send(errorMessage)
    })
})

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return null
  } else {
    const { description, category, title, date, location, uploader_id } =
      req.body
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

router.delete('/delete/:postId', (req, res) => {
  const postId = req.params.postId
  deletePost(postId)
    .then((posts) => res.json(posts))
    .catch(() => res.status(500).send(errorMessage))
})

module.exports = router
