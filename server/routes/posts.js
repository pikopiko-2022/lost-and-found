const express = require('express')
const { getAllPosts, addPost } = require('../db/posts')
const router = express.Router()

const errorMessage = 'There was a problem. Please try again.'

//GET /api/v1/posts
router.get('/', (req, res) => {
  getAllPosts()
    .then((posts) => res.json(posts))
    .catch(() => res.status(500).send(errorMessage))
})

//POST /api/v1/posts
router.post('/', (req, res) => {
  const post = req.body
  addPost(post)
    .then((posts) => res.json(posts))
    .catch(() => res.status(500).send(errorMessage))
})

module.exports = router
