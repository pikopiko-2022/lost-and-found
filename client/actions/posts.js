import {
  getAllPostsAndComments,
  addPost,
  deletePost,
  editPost,
} from '../apis/posts'
export const SET_POSTS_SUCCESS = 'SET_POSTS_SUCCESS'

export function fetchPosts() {
  return (dispatch) => {
    return getAllPostsAndComments()
      .then((posts) => {
        dispatch(setPostsSuccess(posts))
      })
      .catch((err) => console.error(err.message))
  }
}

export function addNewPost(newPost) {
  return (dispatch) => {
    return addPost(newPost)
      .then((posts) => {
        dispatch(setPostsSuccess(posts))
      })
      .catch((err) => console.error(err.message))
  }
}

export function setPostsSuccess(posts) {
  return {
    type: SET_POSTS_SUCCESS,
    payload: posts,
  }
}

export function deletePostByPostId(postId) {
  return (dispatch) => {
    return deletePost(postId)
      .then((posts) => {
        dispatch(setPostsSuccess(posts))
      })
      .catch((err) => console.error(err.message))
  }
}

export function editPostByPostId(editedPost, postId) {
  return (dispatch) => {
    return editPost(editedPost, postId)
      .then((posts) => {
        dispatch(setPostsSuccess(posts))
      })
      .catch((err) => console.error(err.message))
  }
}
