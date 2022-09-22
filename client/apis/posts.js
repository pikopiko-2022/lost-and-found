import request from 'superagent'

const rootUrl = '/api/v1'

export function getAllPostsAndComments() {
  return request.get(rootUrl + '/posts').then((res) => {
    return res.body
  })
}

export function addPost(post) {
  return request
    .post(rootUrl + '/posts')
    .send(post)
    .then((res) => {
      return res.body
    })
}
