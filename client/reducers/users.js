import {
  CLEAR_LOGGED_IN_USER,
  UPDATE_LOGGED_IN_USER,
} from '../actions/loggedInUser'

const initialState = {
  auth0_id: '',
  username: null,
}

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_LOGGED_IN_USER:
      if(payload === null) {
        return { ...state, username: '' }
      } return { ...state, ...payload }
      

    case CLEAR_LOGGED_IN_USER:
      return initialState

    default:
      return state
  }
}

export default usersReducer
