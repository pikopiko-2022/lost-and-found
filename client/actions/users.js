import { getUser } from '../apis/users.api'

export const LIST_USERS_SUCCESS = 'LIST_USERS_SUCCESS'

export function listUserSuccess(users) {
  return {
    type: LIST_USERS_SUCCESS,
    payload: users,
  }
}

export function listUsersRequest() {
  return (dispatch) => {
    return getUsersList()
      .then((users) => {
        dispatch(listUserSuccess(users))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

