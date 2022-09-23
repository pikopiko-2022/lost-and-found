import nock from 'nock'
import {createUser, getUser, getAllusers, updateUser} from './users'

const fakeUsers = [
  {
    id: 1,
    name: 'David',
    username: 'Davidislost',
    location: 'Davidislostwonderland',
    email: 'Davidislost@gmail.com'
  },
  {
    id:2, 
    name: 'Sam',
    username: 'Samisnotlost',
    location: 'Samisnotlostwonderland',
    email: 'Samisnotlost@gmail.com'
  }
]

describe('getUser', () => {
  it('get a user from database through local api', () => {
    const scope=nock('http://localhost')
    .get('/api/v1/users/profile')
    .reply(200, fakeUsers)

    return getUser().then((result) => {
      expect(scope.isDone()).toBe(true)
      expect(result).toHaveLength(2)
    })
  })
})

describe('createUser', () => {
  it('create userprofile and store in the local api database', () => {
    const fakeUser = fakeUsers[1]
    const scope=nock('http://localhost')
    .get('/api/v1/users/createProfile')
    .reply(200, fakeUsers)

    return createUser(fakeUser).then((result) => {
      expect(scope.isDone()).toBe(true)
      expect(result[0].title).toBe('Keys')
    })
  })
})