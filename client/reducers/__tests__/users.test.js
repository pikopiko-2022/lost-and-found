import usersReducer from '../users'
import { updateLoggedInUser } from '../../actions/loggedInUser'

describe('usersReducer test', () => {
  test('updates the location state', () => {
    const action = updateLoggedInUser([
      {
        id: 1,
        name: 'David',
        username: 'Davidislost',
        location: 'Davidislostwonderland',
        email: 'Davidislost@gmail.com',
      },
    ])
    const newState = usersReducer('', action)
    expect(newState[0].name).toBe('David')
    expect(newState[0].username).toBe('Davidislost')
    expect(newState[0].location).toBe('Davidislostwonderland')
    expect(newState[0].email).toBe('Davidislost@gmail.com')
  })
  test('clears the logged in user', () => {
    const expectedState = {}
    const outputState = usersReducer(undefined, {})

    expect(outputState).toEqual(expectedState)
  })
})
