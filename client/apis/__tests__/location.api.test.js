import nock from 'nock'
import { addLocation } from '../location'

test('returns location from api on server side', () => {
  const scope = nock('http://localhost')
    .get('/api/v1/location')
    .reply(200, JSON.stringify('Canterbury'), {
      'Content-Type': 'apication/json',
    })
  return addLocation().then((result) => {
    expect(result).toBe('Canterbury')
    expect(scope.isDone()).toBe(true)
  })
})
