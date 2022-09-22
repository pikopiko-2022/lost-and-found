const config = require('./knexfile').development
const connection = require('knex')(config)

function getAllPosts(db = connection) {
  return db('posts')
    .join('users', 'posts.uploader_id', 'users.auth0_id')
    .select(
      'users.name as uploaderName',
      'users.location as userLocation',
      'posts.id as id',
      'posts.uploader_id as uploaderId',
      'posts.category as category',
      'posts.title as title',
      'posts.date as date',
      'posts.description as description',
      'posts.image_url as imageUrl',
      'posts.location as itemLocation'
    )
}

function addPost(post, db = connection) {
  return db('posts')
    .insert(post)
    .then(() => getAllPosts(db))
}

module.exports = { getAllPosts, addPost }
