const express = require('express')
const router = express.Router()
const { addComment } = require('../db/comments')

router.post('/', (req, res) => {
  const { comment, date_commented, post_id, commenter_id } = req.body
  const newComment = {
    commenter_id,
    comment,
    date_commented,
    post_id,
  }
  addComment(newComment)
    .then(() => res.send('Comment added')) //would be good to put a 201 on the status
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('post no worky')
    })
})

module.exports = router
