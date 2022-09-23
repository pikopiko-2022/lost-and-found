export const UPDATE_LOGGED_IN_USER = 'UPDATE_LOGGED_IN_USER'
export const CLEAR_LOGGED_IN_USER = 'CLEAR_LOGGED_IN_USER'
export const SET_USER = 'SET_USER'
import { getUser } from '../apis/users'

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  }
}

export function updateLoggedInUser(userToSave) {
  return {
    type: UPDATE_LOGGED_IN_USER,
    payload: userToSave,
  }
}

export function clearLoggedInUser() {
  return {
    type: CLEAR_LOGGED_IN_USER,
  }
}

export function fetchUserProfile() {
  return (dispatch) => {
    return getUser()
      .then((user) => {
        dispatch(setUser(user))
      })
      .catch((err) => console.log(err.response.text))
  }
}
