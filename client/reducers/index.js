import { combineReducers } from 'redux'

import postsReducer from './posts'
import usersReducer from './users'
import locationReducer from './location'

export default combineReducers({
  usersReducer,
  locationReducer,
  postsReducer,
})
