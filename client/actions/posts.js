import { getAllPostsAndComments, addPost } from '../apis/posts'
export const SET_POSTS_SUCCESS = 'SET_POSTS_SUCCESS'

export function fetchPosts() {
  return (dispatch) => {
    return getAllPostsAndComments()
      .then((posts) => {
        dispatch(setPostsSuccess(posts))
      })
      .catch((err) => console.log(err.response.text))
  }
}

export function addNewPost(newPost) {
  return (dispatch) => {
    return addPost(newPost)
      .then((posts) => {
        dispatch(setPostsSuccess(posts))
      })
      .catch((err) => console.log(err.response.text))
  }
}

export function setPostsSuccess(posts) {
  return {
    type: SET_POSTS_SUCCESS,
    payload: posts,
  }
}
