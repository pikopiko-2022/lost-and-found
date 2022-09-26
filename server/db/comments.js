const config = require('./knexfile').development
const connection = require('knex')(config)

function addComment(comment, db = connection) {
  return db('comments').insert(comment)
}

function deleteComment(id, db = connection) {
  return db('comments').delete().where('id', id)
}

module.exports = {
  addComment,
  deleteComment,
}
