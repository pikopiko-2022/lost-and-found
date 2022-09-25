import nock from 'nock'
import { createUser, getUser, getAllusers, updateUser } from './users'

const fakeUsers = [
  {
    id: 1,
    name: 'David',
    username: 'Davidislost',
    location: 'Davidislostwonderland',
    email: 'Davidislost@gmail.com',
  },
  {
    id: 2,
    name: 'Sam',
    username: 'Samisnotlost',
    location: 'Samisnotlostwonderland',
    email: 'Samisnotlost@gmail.com',
  },
]

describe('getUser', () => {
  it('get a user from database through local api', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/users/profile')
      .reply(200, {
        id: 1,
        name: 'David',
        username: 'Davidislost',
        location: 'Davidislostwonderland',
        email: 'Davidislost@gmail.com',
      })

    return getUser().then((result) => {
      expect(scope.isDone()).toBe(true)
      expect(result.name).toBe('David')
      expect(result.username).toBe('Davidislost')
      expect(result.location).toBe('Davidislostwonderland')
      expect(result.email).toBe('Davidislost@gmail.com')
    })
  })
})

describe('createUser', () => {
  it('create userprofile and store in the local api database', () => {
    const fakeUser = fakeUsers[1]
    const scope = nock('http://localhost')
      .post('/api/v1/users/createprofile')
      .reply(200, fakeUsers)

    return createUser(fakeUser).then((result) => {
      expect(scope.isDone()).toBe(true)
      expect(result[0].name).toBe('David')
      expect(result[0].username).toBe('Davidislost')
      expect(result[0].location).toBe('Davidislostwonderland')
      expect(result[0].email).toBe('Davidislost@gmail.com')

    })
  })
  // it('returns error message createUser fails', () => {
  //   const scope = nock('http://localhost')
  //     .post('/api/v1/users/crateprofile')
  //     .replyWithError(new Error('failed'))

  //   return createUser(fakeUsers).then(() => {
  //     expect(scope.isDone()).toBe(true)
  //     expect(console.error).toBe('failed')
  //   })
  // })
})

describe('get all users', () => {
  it('gets all users from local api database', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/users/profiles')
      .reply(200, fakeUsers)

    return getAllusers().then((result) => {
      expect(scope.isDone()).toBe(true)
      expect(result).toHaveLength(2)
    })
  })
})

describe('updates user', () => {
  it('updates the current user with new info', () => {
    const scope = nock('http://localhost')
      .patch('/api/v1/users/profile/editProfile')
      .reply(200, fakeUsers[1])

    return updateUser(fakeUsers[1]).then((result) => {
      expect(scope.isDone()).toBe(true)
      expect(result.name).toBe('Sam')
    })
  })
})
