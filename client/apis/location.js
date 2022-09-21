import request from 'superagent'

const rootUrl = '/api/v1'

export function addLocation(location) {
  return request
    .get(`${rootUrl}/location`)
    .query({ text: location })
    .then((res) => {
      console.log('addlocation called', res.body)
      return res.body
    })
}
