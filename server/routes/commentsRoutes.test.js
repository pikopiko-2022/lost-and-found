const request = require('supertest')
const server = require('../server')
const db = require('../db/comments')
const { getComments } = require('../db/comments')

jest.mock('../db/comments')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

describe('GET /comments', () => {
  test('renders comments', () => {
    db.getComments.mockReturnValue(Promise.resolve([{ id: '1' }, { id: '2' }]))
    return request(server)
      .get('/api/v1/comments/')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[0].id).toBe('1')
      })
  })

  test('returns status 500 and consoles error', () => {
    getComments.mockImplementation(() => Promise.reject(new Error('we woow')))
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/api/v1/comments/')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('we woow')
      })
  })
})
