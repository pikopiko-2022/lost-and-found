const express = require('express')
const router = express.Router()
const { addComment } = require('../db/comments')

router.post('/', (req, res) => {
  const { comment, date_commented, post_id } = req.body
  //todo: replace with req.user?.sub
  const commenter_id = '3'
  const newComment = {
    commenter_id,
    comment,
    date_commented,
    post_id,
  }
  addComment(newComment)
    .then((newComments) => res.json({ newComments }))
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('post no worky')
    })
})

module.exports = router
