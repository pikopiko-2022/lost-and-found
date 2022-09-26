import request from 'superagent'
const rootUrl = '/api/v1'

export function addComment(comment) {
  return request
    .post(`${rootUrl}/comments`)
    .send(comment)
    .then((res) => {
      return res.body
    })
}

export function deleteComment(commentId) {
  return request
    .delete(`${rootUrl}/comments/delete/${commentId}`)
    .then((res) => {
      return res.body
    })
}
