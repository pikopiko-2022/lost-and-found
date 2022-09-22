import { getAllComments } from '../apis/comments.api'

export const SET_COMMENTS = 'SET_COMMENTS'

export function setComments(comments) {
  return {
    type: SET_COMMENTS,
    payload: comments,
  }
}

export function fetchComments() {
  return (dispatch) => {
    return getAllComments()
      .then((comments) => {
        dispatch(setComments(comments))
      })
      .catch((error) => {
        console.error(error.message)
      })
  }
}
