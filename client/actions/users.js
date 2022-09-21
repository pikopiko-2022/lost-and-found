import { addOrGetUser } from '../apis/users.api'
export const SET_USER = 'SET_USER'

export function updateLoggedInUser(userToSave) {
  return (dispatch) => {
    return addOrGetUser(userToSave.name, userToSave.token)
      .then((user) => {
        dispatch(setUser({ ...user, token: userToSave.token }))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  }
}
