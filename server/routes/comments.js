const express = require('express')
const router = express.Router()
const { getComments, addComment } = require('../db/comments')

router.get('/', (req, res) => {
  getComments()
    .then((comments) => res.json(comments))
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('no worky')
    })
})

router.post('/', (req, res) => {
  const comment = req.body
  addComment(comment)
    .then((comments) => res.json({ comments }))
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('post no worky')
    })
})

module.exports = router
