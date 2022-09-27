const request = require('supertest')
const server = require('../../server')
const { addComment, deleteComment } = require('../../db/comments')

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
        expect(res.status).toBe(201)
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

describe('DELETE /comments/delete/:commentId', () => {
  test('it calls deleteComment db function and returns a response if successful', () => {
    deleteComment.mockReturnValue(Promise.resolve('Comment deleted'))
    const commentId = 1
    return request(server)
      .delete(`/api/v1/comments/delete/${commentId}`)
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.text).toBe('Comment deleted')
      })
  })
  test('it returns status 500 and console error if there is a problem', () => {
    deleteComment.mockImplementation(() =>
      Promise.reject(new Error('Error deleting comment'))
    )
    console.error.mockImplementation(() => {})
    const commentId = 1
    return request(server)
      .delete(`/api/v1/comments/delete/${commentId}`)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('Error deleting comment')
      })
  })
})
