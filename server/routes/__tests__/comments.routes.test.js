const request = require('supertest')
const server = require('../../server')
const { addComment } = require('../../db/comments')

jest.mock('../../db/comments')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

describe('POST /comments', () => {
  test('it adds a comment to the comments table in the database', () => {
    addComment.mockReturnValue(Promise.resolve('Comment added'))
    return request(server)
      .post('/api/v1/comments/')
      .then((res) => {
        expect(res.text).toBe('Comment added')
      })
  })

  test('it returns status 500 and consoles error when there is a problem', () => {
    addComment.mockImplementation(() => Promise.reject(new Error('we woow')))
    console.error.mockImplementation(() => {})
    return request(server)
      .post('/api/v1/comments/')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('we woow')
      })
  })
})
