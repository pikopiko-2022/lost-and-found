const request = require('supertest')
const server = require('../server')
const checkJwt = require('../auth0')
const {
  createUser,
  getUsers,
  updateUser,
  getUserById,
  userExists,
  userAuth0IdExist,
} = require('../db/users')

jest.mock('../auth0')
jest.mock('../db/users')
jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

beforeAll(() => {
  checkJwt.mockImplementation((req, res, next) => {
    req.user = { sub: 'testUserId' }
    next()
  })
})

describe('GET /api/v1/users', () => {
  const fakeUsers = [
    {
      auth0_id: '1',
      name: 'Sally',
      username: 'SillySally',
      email: 'sally@fakemail.com',
      location: 'Christchurch',
    },
    {
      auth0_id: '2',
      name: 'Fred',
      username: 'FreakyFred',
      email: 'fred@fakemail.com',
      location: 'Tauranga',
    },
    {
      auth0_id: '3',
      name: 'Tim',
      username: 'TerrificTim',
      email: 'tim@fakemail.com',
      location: 'Auckland',
    },
  ]

  it('returns all users in the database', () => {
    getUsers.mockReturnValue(Promise.resolve(fakeUsers))

    return request(server)
      .get('/api/v1/users')
      .then((res) => {
        expect(res.body).toHaveLength(3)
        expect(res.body[2].email).toBe('tim@fakemail.com')
        expect(res.body[0].location).toContain('Christ')
      })
  })
  it('returns status 500 and sends an error message if there is a problem', () => {
    getUsers.mockImplementation(() =>
      Promise.reject(new Error('bro, get it right'))
    )

    return request(server)
      .get('/api/v1/users')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('get it right')
      })
  })
})

// come back to test for !auth0_id, res.send(null)
describe('GET /api/v1/users/userprofile', () => {
  it('get single user with auth0_id', () => {
    const User = [
      {
        auth0_id: 'testUserId',
        name: 'Sam',
        username: 'SamSan',
        email: 'sam@fakemail.com',
        location: 'Palmy',
      },
    ]
    getUserById.mockReturnValue(Promise.resolve(User))

    return request(server)
      .get('/api/v1/users/userprofile')
      .then((res) => {
        console.log(res.body)
        expect(res.status).toBe(200)
        expect(res.body[0].name).toBe('Sam')
      })
  })
  it('check if getUserById fails, you get error', () => {
    getUserById.mockImplementation(() => Promise.reject(new Error('you lose')))

    return request(server)
      .get('/api/v1/users/userprofile')
      .then((res) => {
        console.log(res.body)
        expect(res.status).toBe(500)
        expect(res.text).toBe('you lose')
      })
  })
})

describe('POST /api/v1/users', () => {
  const newUser = {
    auth0_id: '1234',
    name: 'Sam',
    username: 'SamSan',
    email: 'sam@fakemail.com',
    location: 'Palmy',
  }
  it('creates a new user if they are not already in the db', () => {
    userExists.mockReturnValue(Promise.resolve(false))
    userAuth0IdExist.mockReturnValue(Promise.resolve(false))
    createUser.mockReturnValue(Promise.resolve(newUser))

    return request(server)
      .post('/api/v1/users/')
      .send(newUser)
      .then((res) => {
        expect(res.body.location).toBe('Palmy')
      })
  })
  it('return error if username is already taken in db', () => {
    userExists.mockImplementation(() =>
      Promise.reject(new Error('Username taken'))
    )
    return request(server)
      .post('/api/v1/users')
      .then((res) => {
        expect(res.status).toBe(403)
        expect(res.text).toBe('Username taken')
      })
  })
  it('return error if auth0Id is already taken in db', () => {
    userExists.mockReturnValue(Promise.resolve(false))
    userAuth0IdExist.mockImplementation(() =>
      Promise.reject(new Error('Auth0Id already exist'))
    )
    return request(server)
      .post('/api/v1/users')
      .then((res) => {
        expect(res.status).toBe(403)
        expect(res.text).toBe('Auth0Id already exist')
      })
  })
  it('return status 500 and error message if error creating user', () => {
    userExists.mockReturnValue(Promise.resolve(false))
    userAuth0IdExist.mockReturnValue(Promise.resolve(false))
    createUser.mockImplementation(() =>
      Promise.reject(new Error('createUser failed'))
    )

    return request(server)
      .post('/api/v1/users')
      .then((res) => {
        expect(res.status).toBe(500)
      })
  })
})

describe('PATCH /api/v1/users', () => {
  const updatedFakeUserInfo = {
    auth0_id: '1234',
    username: 'Fafala',
    email: 'fafala@fakemail.com',
    location: 'Fafalaland',
  }

  it('check if update userinfo is working', () => {
    updateUser.mockReturnValue(Promise.resolve(updatedFakeUserInfo))
    return request(server)
      .patch('/api/v1/users')
      .send(updatedFakeUserInfo)
      .then((res) => {
        expect(res.body.username).toBe('Fafala')
      })
  })
  it('check if it returns error when update failed', () => {
    updateUser.mockImplementation(() =>
      Promise.reject(new Error('come on! you can do better'))
    )
    return request(server)
      .patch('/api/v1/users')
      .send(updatedFakeUserInfo)
      .then((res) => {
        expect(res.text).toBe('come on! you can do better')
        expect(res.status).toBe(500)
      })
  })
})
