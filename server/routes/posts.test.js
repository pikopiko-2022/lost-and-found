const request = require('supertest')
const server = require('../server')

const { getAllPosts, addPost } = require('../db/posts')
jest.mock('../db/posts')

const fakePosts = [
  {
    id: 1,
    uploaderId: '3',
    category: 'Found',
    title: 'Keys',
    date: '07/06/2022',
    description: 'These have a distinct key chain, let me know what it is!',
    imageUrl: '/fakeURL',
    location: 'Hokitika',
  },
  {
    id: 2,
    uploaderId: '5',
    category: 'Lost',
    title: 'Wallet',
    date: '08/09/2022',
    description:
      "I lost my wallet, it's brown leather and should have my id in it",
    imageUrl: '/fakeURL',
    location: 'Riccarton Mall',
  },
]

describe('GET /api/v1/projects', () => {
  it('returns all posts in the database', () => {
    getAllPosts.mockReturnValue(Promise.resolve(fakePosts))

    return request(server)
      .get('/api/v1/posts')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[0].category).toBe('Found')
      })
  })
  it('returns status 500 and sends and error message if there is a problem', () => {
    getAllPosts.mockImplementation(() => Promise.reject(new Error()))

    return request(server)
      .get('/api/v1/posts')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('problem')
      })
  })
})

describe('POST /api/v1/projects', () => {
  it('adds a post to the database and returns all posts in the database', () => {
    addPost.mockReturnValue(Promise.resolve(fakePosts))

    return request(server)
      .post('/api/v1/posts')
      .then((res) => {
        expect(res.body[1].title).toBe('Wallet')
      })
  })
})
