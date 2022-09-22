const request = require('supertest')
const server = require('../server')

const {
  createUser,
  getUsers,
  updateUser,
  userExists,
  userAuth0IdExist,
  getUserById,
} = require('../db/users')
const checkJwt = require('../auth0')
jest.mock('../auth0')
jest.mock('../db/users')
jest.spyOn(console, 'error')

beforeAll(() => testCon.migrate.latest())
beforeEach(() => testCon.seed.run())
afterEach(() => {
  console.error.mockReset()
})

// req.user.sub on test, what do we put in
describe('GET /api/v1/users', () => {
  it('returns all users in the database', () => {
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
    checkJwt.mockImplementation((req, res, next) => {
      req.user = {
        sub: 'adpasojdpajdpasd',
      }
      next()
    })
    getUsers.mockReturnValue(Promise.resolve(fakeUsers))

    return request(server)
      .get('/api/v1/users')
      .then((res) => {
        expect(res.body).toHaveLength(3)
        expect(res.body[2].email).toBe('tim@fakemail.com')
        expect(res.body[0].location).toContain('Christ')
      })
  })
})

describe('POST /api/v1/users', () => {
  it('creates a new user if they are not already in the db', () => {
    const newUser = {
      auth0_id: '1234',
      name: 'Sam',
      username: 'SamSan',
      email: 'sam@fakemail.com',
      location: 'Palmy',
    }
    checkJwt.mockImplementation((req, res, next) => {
      req.user = {
        sub: 'adpasojdpajdpasd',
      }
      next()
    })
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
})

describe('PATCH /api/v1/users', () => {
  it('check if update userinfo is working', () => {
    const fakeUserInfo = {
      auth0_id: '1234',
      name: 'Sam',
      username: 'SamSan',
      email: 'sam@fakemail.com',
      location: 'Palmy',
    }

    const updatedFakeUserInfo = {
      auth0_id: '1234',
      username: 'Fafala',
      email: 'fafala@fakemail.com',
      location: 'Fafalaland',
    }

    checkJwt.mockImplementation((req, res, next) => {
      req.user = {
        sub: 'adpasojdpajdpasd',
      }
      next()
    })

    // getUserById.mockReturnValue(Promise.resolve(fakeUserInfo.auth0_id))
    updateUser.mockReturnValue(Promise.resolve(fakeUserInfo))
    return request(server)
      .post('/api/v1/users/')
      .send(updatedFakeUserInfo)
      .then((res) => {
        console.log(res.body)
        expect(res.body.username).toBe('Fafala')
      })
  })
})
