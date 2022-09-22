import { combineReducers } from 'redux'
import usersReducer from './users'
import locationReducer from './location'
export default combineReducers({
  usersReducer,
  locationReducer,
})
