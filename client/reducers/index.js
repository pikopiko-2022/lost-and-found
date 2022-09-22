import { combineReducers } from 'redux'
import usersReducer from './users'
import comments from './comments'

export default combineReducers({
  usersReducer,
  comments,
})
