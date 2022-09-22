import { SET_POSTS_SUCCESS } from '../actions/posts'

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_POSTS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default postsReducer
