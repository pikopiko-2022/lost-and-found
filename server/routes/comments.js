const express = require('express')
const router = express.Router()
const { addComment, deleteComment } = require('../db/comments')

router.post('/', (req, res) => {
  const { comment, date_commented, post_id, commenter_id } = req.body
  const newComment = {
    commenter_id,
    comment,
    date_commented,
    post_id,
  }
  addComment(newComment)
    .then(() => res.status(201).send('Comment added'))
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('post no worky')
    })
})

router.delete('/delete/:commentId', (req, res) => {
  const commentId = req.params.commentId
  deleteComment(commentId)
    .then(() => res.status(201).send('Comment deleted'))
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Error deleting comment')
    })
})
module.exports = router
