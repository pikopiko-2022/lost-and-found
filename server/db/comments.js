const connection = require('./connection')

function addComment(comment, db = connection) {
  return db('comments').insert(comment, 'id')
}

function deleteComment(id, db = connection) {
  return db('comments').delete().where('id', id)
}

module.exports = {
  addComment,
  deleteComment,
}
