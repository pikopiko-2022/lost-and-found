import request from 'superagent'
const rootUrl = '/api/v1'

export function getUser(token) {
  return request
    .get(rootUrl + '/users')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch(logError)
}
export function addUser(user, token) {
  return request
    .post(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(user)
    .catch(logError)
}

function logError(err) {
  if (err.response.text === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else
    console.error('Error consuming the API (in client.api.js):', err.message)
  throw err
}

// export function addOrGetUser(name, token) {
//   return request
//     .post(url)
//     .set('Authorization', `Bearer ${token}`)
//     .send({ name })
//     .then((res) => {
//       return res.body
//     })
// }

// router.post('/', checkJwt, (req, res) => {
//     const auth0_id = req.user?.sub
//     const { name } = req.body
//     const user = {
//       auth0_id,
//       name,
//     }
//     db.userExists(auth0_id)
//       .then((userExists) => {
//         if (userExists) {
//           return db.getUser(auth0_id)
//         } else {
//           return db.addUser(user)
//         }
//       })
//       .then((user) => res.json(user))
//       .catch((err) => {
//         console.error(err.message)
//         res.status(500).send({ message: 'Oops' })
//       })
//   })
