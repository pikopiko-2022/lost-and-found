const express = require('express')
const {
  addPost,
  getAllPostsWithComments,
  deletePost,
  editPost,
} = require('../db/posts')
const router = express.Router()
const upload = require('../multer')

const errorMessage = 'There was a problem. Please try again.'

router.get('/', (req, res) => {
  getAllPostsWithComments()
    .then((posts) => {
      const newPosts = posts.slice(0).reverse()
      return res.json(newPosts)
    })
    .catch(() => {
      res.status(500).send(errorMessage)
    })
})

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return null
  } else {
    const {
      description,
      category,
      title,
      date_lostOrFound,
      location,
      uploader_id,
      date_posted,
    } = req.body
    const post = {
      description,
      uploader_id,
      category,
      title,
      date_lostOrFound,
      date_posted,
      image_url: './images/postimages/' + req.file.filename,
      location,
    }

    addPost(post)
      .then((posts) => {
        const newPosts = posts.slice(0).reverse()
        return res.json(newPosts)
      })
      .catch(() => res.status(500).send(errorMessage))
  }
})

router.delete('/delete/:postId', (req, res) => {
  const postId = req.params.postId
  deletePost(postId)
    .then((posts) => {
      const newPosts = posts.slice(0).reverse()
      return res.json(newPosts)
    })
    .catch(() => res.status(500).send(errorMessage))
})

router.patch('/edit/:postId', (req, res) => {
  const post = req.body
  const editedPost = {
    id: req.params.postId,
    title: post.title,
    description: post.description,
  }

  editPost(editedPost)
    .then((posts) => {
      const newPosts = posts.slice(0).reverse()
      return res.json(newPosts)
    })
    .catch(() => res.status(500).send(errorMessage))
})

module.exports = router
