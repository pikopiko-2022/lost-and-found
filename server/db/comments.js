//db functions for comments to go here
const config = require('./knexfile').development
const connection = require('knex')(config)

//not sure if needed
// function getComments(db = connection) {
//   return db('comments')
//     .join('posts', 'comments.post_id', 'posts.id')
//     .select(
//       'comments.id',
//       'comments.commenter_id as commenterId',
//       'comments.date_commented as dateCommented',
//       'comments.comment',
//       'comments.post_id as commentPostId',
//       'posts.id as postId'
//     )
// }

function addComment(comment, db = connection) {
  return db('comments').insert(comment)
  // .then(() => getComments(db)) //may not need to get back all comments
}

module.exports = {
  // getComments,
  addComment,
}
