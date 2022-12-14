const express = require('express')
const { addPost, getAllPostsWithComments } = require('../db/posts')
const router = express.Router()

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
router.post('/', (req, res) => {
  const { description, category, title, image_url, location } = req.body
  //todo: replace with req.user?.sub
  const uploader_id = '3'
  const date = new Date().toDateString()
  const post = {
    description,
    uploader_id,
    category,
    title,
    date,
    image_url,
    location,
  }
  addPost(post)
    .then((posts) => res.json(posts))
    .catch(() => res.status(500).send(errorMessage))
})

module.exports = router
