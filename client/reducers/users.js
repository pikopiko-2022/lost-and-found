import {
  CLEAR_LOGGED_IN_USER,
  UPDATE_LOGGED_IN_USER,
} from '../actions/loggedInUser'

const initialState = {
  auth0_id: '',
  username: '',
}

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_LOGGED_IN_USER:
      return { ...state, ...payload }

    case CLEAR_LOGGED_IN_USER:
      return initialState

    default:
      return state
  }
}

export default usersReducer
