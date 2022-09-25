const config = require('./knexfile').development
const connection = require('knex')(config)

function addComment(comment, db = connection) {
  return db('comments').insert(comment)
}

module.exports = {
  addComment,
}
