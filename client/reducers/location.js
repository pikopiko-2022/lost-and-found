import { UPDATE_LOCATION } from '../actions/location'
const initialLocation = ''

export default function location(state = initialLocation, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_LOCATION:
      return payload
    default:
      return state
  }
}
