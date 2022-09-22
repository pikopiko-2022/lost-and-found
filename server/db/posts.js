const config = require('./knexfile').development
const connection = require('knex')(config)

function getAllPosts(db = connection) {
  return db('posts')
    .join('users', 'posts.uploader_id', 'users.auth0_id')
    .select(
      'users.name as uploaderName',
      'users.location as userLocation',
      'posts.id',
      'posts.uploader_id as uploaderId',
      'posts.category as category',
      'posts.title as title',
      'posts.date as date',
      'posts.description as description',
      'posts.image_url as imageUrl',
      'posts.location as itemLocation'
    )
}

async function getAllPostsWithComments(db = connection) {
  const posts = await getAllPosts(db)
  const postIds = posts.map((post) => post.id)
  const comments = await db('comments').whereIn('post_id', postIds)
  posts.forEach((post) => {
    post.comments = comments.filter((comment) => comment.post_id === post.id)
  })
  return posts
}

function addPost(post, db = connection) {
  return db('posts')
    .insert(post)
    .then(() => getAllPostsWithComments(db))
}

module.exports = { getAllPosts, addPost, getAllPostsWithComments }
