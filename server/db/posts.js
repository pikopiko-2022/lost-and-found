const config = require('./knexfile').development
const connection = require('knex')(config)

function getAllPosts(db = connection) {
  return db('posts').select(
    'id',
    'uploader_id as uploaderId',
    'category',
    'title',
    'date',
    'description',
    'image_url as imageUrl',
    'location'
  )
}

module.exports = { getAllPosts }
