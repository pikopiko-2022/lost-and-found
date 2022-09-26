const request = require('supertest')
const server = require('../../server')

const upload = require('../../multer')

const { getAllPostsWithComments, addPost } = require('../../db/posts')
jest.mock('../../db/posts')

const fakeMulter = (req, res, next) => {
  req.file = { filename: 'image' }
  next()
}

jest.mock('../../multer', () => {
  return { single: jest.fn().mockReturnValue(fakeMulter) }
})

const fakePosts = [
  {
    id: 1,
    uploaderId: '3',
    category: 'Found',
    title: 'Keys',
    date: new Date().toDateString(),
    description: 'These have a distinct key chain, let me know what it is!',
    imageUrl: '/fakeURL',
    location: 'Hokitika',
    comments: [
      {
        id: 1,
        commenter_id: '1',
        post_id: 1,
        date_commented: new Date().toDateString(),
        comment: 'Is the key chain fluffy?',
      },
    ],
  },
  {
    id: 2,
    uploaderId: '5',
    category: 'Lost',
    title: 'Wallet',
    date: new Date().toDateString(),
    description:
      "I lost my wallet, it's brown leather and should have my id in it",
    imageUrl: '/fakeURL',
    location: 'Riccarton Mall',
    comments: [
      {
        id: 2,
        commenter_id: '2',
        post_id: 2,
        date_commented: new Date().toDateString(),
        comment: 'Hey, I think I found this.',
      },
    ],
  },
]

describe('GET /api/v1/posts', () => {
  it('returns all posts in the database', () => {
    getAllPostsWithComments.mockReturnValue(Promise.resolve(fakePosts))

    return request(server)
      .get('/api/v1/posts')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[1].category).toBe('Found')
        expect(res.body[1].comments[0].comment).toContain('fluffy')
      })
  })
  it('returns status 500 and sends and error message if there is a problem', () => {
    getAllPostsWithComments.mockImplementation(() =>
      Promise.reject(new Error('problem'))
    )

    return request(server)
      .get('/api/v1/posts')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('try again')
      })
  })
})

describe('POST /api/v1/posts', () => {
  it('adds a post to the database and returns all posts in the database', () => {
    addPost.mockReturnValue(Promise.resolve(fakePosts))

    return request(server)
      .post('/api/v1/posts', upload.single('image'))
      .then((res) => {
        console.log(res.body)
        expect(res.body[0].title).toBe('Wallet')
      })
  })

  it('returns status 500 and sends and error message if there is a problem', () => {
    addPost.mockImplementation(() => Promise.reject(new Error('problem')))

    return request(server)
      .post('/api/v1/posts')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('try again')
      })
  })
})
