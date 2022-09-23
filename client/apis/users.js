import request from 'superagent'

const url = '/api/v1'

export function createUser(user, token) {
  return request
    .post(`${url}/users/createprofile`)
    .set('Authorization', `Bearer ${token}`)
    .send(user)
    .then((res) => {
      return res.body
    })
}

export function getUser(token) {
  return request
    .get(`${url}/users/profile`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}

export function getAllusers(token) {
  return request
    .get(`${url}/users/profile`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}

export function updateUser(token) {
  return request
    .patch(`${url}/users/profile/editProfile`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}
