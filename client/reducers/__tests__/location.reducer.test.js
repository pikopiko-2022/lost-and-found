import locationReducer from '../location'
import { updateLocation } from '../../actions/location'

describe('location reducer', () => {
  test('updates the location state', () => {
    const action = updateLocation('Wonderland')
    const newState = locationReducer('', action)
    expect(newState).toHaveLength(10)
    expect(newState).toBe('Wonderland')
  })
})
