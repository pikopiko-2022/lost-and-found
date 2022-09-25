const config = require('./knexfile').development
const connection = require('knex')(config)

function getAllPosts(db = connection) {
  return db('posts')
    .join('users', 'posts.uploader_id', 'users.id')
    .select(
      'name as uploaderName',
      'username',
      'users.location as userLocation',
      'posts.id',
      'uploader_id as uploaderId',
      'category',
      'title',
      'date_lostOrFound',
      'date_posted as datePosted',
      'description',
      'image_url as imageUrl',
      'posts.location as itemLocation'
    )
}

async function getAllPostsWithComments(db = connection) {
  const posts = await getAllPosts(db)

  const postIds = posts.map((post) => post.id)

  const comments = await db('comments')
    .whereIn('post_id', postIds)
    .join('users', 'users.id', 'comments.commenter_id')
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
