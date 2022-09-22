import request from 'superagent'
const rootUrl = '/api/v1'

export function getAllComments() {
  return request.get(`${rootUrl}/comments`).then((res) => {
    return res.body
  })
}

export function addComment(comment) {
  return request
    .post(`${rootUrl}/comments`)
    .send(comment)
    .then((res) => {
      return res.body
    })
}
