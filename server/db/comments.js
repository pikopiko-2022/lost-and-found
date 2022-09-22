//db functions for comments to go here
const config = require('./knexfile').development
const connection = require('knex')(config)

function getComments(db = connection) {
  return db('comments').select(
    'id',
    'commenter_id as commenterId',
    'date_commented as dateCommented',
    'comment',
    'post_id as postId'
  )
}

function addComment(comment, db = connection) {
  return db('comments')
    .insert(comment)
    .then(() => getComments(db))
}

module.exports = { getComments, addComment }
