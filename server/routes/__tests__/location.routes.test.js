import nock from 'nock'
import request from 'supertest'

require('dotenv').config()
import server from '../../server'

test('get location from external api', () => {
  const text = 'Colombo'
  const API_KEY = process.env.GOOGLE_APIKEY
  const scope = nock('https://maps.googleapis.com')
    .get(`/maps/api/place/textsearch/json`)
    .query({
      query: text,
      radius: 10000,
      key: API_KEY,
    })
    .reply(200, { results: '516 Colombo Street' })

  return request(server)
    .get('/api/v1/location')
    .query({ text: 'Colombo' })
    .expect(200)
    .then((res) => {
      expect(res.body).toContain('Colombo')
      scope.done()
    })
})

test('return 500 status', () => {
  const text = 'Colombo'
  const API_KEY = process.env.GOOGLE_APIKEY
  const scope = nock('https://maps.googleapis.com')
    .get(`/maps/api/place/textsearch/json`)
    .query({
      query: text,
      radius: 10000,
      key: API_KEY,
    })
    .reply(500)

  return request(server)
    .get('/api/v1/location')
    .query({ text: 'Colombo' })
    .then((res) => {
      expect(res.status).toBe(500)
      expect(res.text).toBe('Internal Server Error')
      scope.done()
    })
})
