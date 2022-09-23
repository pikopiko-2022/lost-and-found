const knex = require('knex')
const testConfig = require('./knexfile').test
const testDb = knex(testConfig)
// const testDb = knex(config.test)

const {
  getUsers,
  createUser,
  updateUser,
  userExists,
  userAuth0IdExist,
  getUserById,
} = require('./users')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getUsers', () => {
  it('gets all users from db', () => {
    expect.assertions(5)
    return getUsers(testDb).then((res) => {
      expect(res[0].name).toBe('Sally')
      expect(res[1].auth0_id).toBe('2')
      expect(res[0].username).toBe('SillySally')
      expect(res[2].email).toBe('tim@fakemail.com')
      expect(res[2].location).toBe('Auckland')
    })
  })
})

describe('getUserById', () => {
  it('get a user by its auth0_id', () => {
    return getUserById(1, testDb).then((user) => {
      expect(user.name).toBe('Sally')
      expect(user.auth0_id).toBe('1')
      expect(user.username).toBe('SillySally')
      expect(user.email).toBe('sally@fakemail.com')
      expect(user.location).toContain('Christ')
    })
  })
})

describe('create new user user db', () => {
  const fakeNewUser = {
    auth0_id: 30,
    name: 'Sally',
    username: 'SillySally',
    email: 'sally@fakemail.com',
    location: 'Christchurch',
  }

  it('creates a new user', () => {
    // expect.assertions(5)
    return createUser(fakeNewUser, testDb)
      .then(() => {
        return getUserById(30, testDb)
      })
      .then((user) => {
        expect(user.name).toBe('Sally')
        expect(user.username).toBe('SillySally')
        expect(user.email).toBe('sally@fakemail.com')
        expect(user.location).toBe('Christchurch')
      })
  })
})

describe('userExists', () => {
  it('check if username does exist in database', () => {
    return userExists('SillySally', testDb).then((user) => {
      expect(user).toBe(true)
    })
  })
  it('check if username doesnt exist in database', () => {
    return userExists('SamuelBabo', testDb).then((user) => {
      expect(user).toBe(false)
    })
  })
})

describe('userAuth0IdExist', () => {
  it('check if the Auth0_id exists in database', () => {
    return userAuth0IdExist(1, testDb).then((user) => {
      expect(user).toBe(true)
    })
  })
  it('check if the Auth0_id doesnt exist in database', () => {
    return userAuth0IdExist(31, testDb).then((user) => {
      expect(user).toBe(false)
    })
  })
})

describe('update user', () => {
  it('updates the current user with details supplied', () => {
    const fakeUpdatedUserInfo = {
      name: 'Sally',
      username: 'SillySally',
      email: 'sally@fakemail.com',
      location: 'Christchurch',
    }

    return updateUser(2, fakeUpdatedUserInfo, testDb)
      .then(() => {
        return testDb('users')
      })
      .then((users) => {
        expect(users[1].name).toBe('Sally')
      })
  })
})
