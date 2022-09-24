import { getAllPostsAndComments, addPost } from '../apis/posts'
export const SET_POSTS_SUCCESS = 'SET_POSTS_SUCCESS'

export function fetchPosts() {
  // ;('whatever i want')
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
