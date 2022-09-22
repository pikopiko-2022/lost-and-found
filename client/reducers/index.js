import { combineReducers } from 'redux'

import postsReducer from './posts'
import usersReducer from './users'
import comments from './comments'

export default combineReducers({
  usersReducer,
  postsReducer,
  comments,
})
