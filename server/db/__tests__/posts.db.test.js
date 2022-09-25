const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getAllPosts, addPost, getAllPostsWithComments } = require('../posts')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getAllPosts', () => {
  it('returns all the posts in the posts table in the database', () => {
    return getAllPosts(testDb).then((posts) => {
      expect(posts).toHaveLength(2)
      expect(posts[0].title).toContain('beanie')
    })
  })
})

describe('getAllPostsWithComments', () => {
  it('gets all the posts from the post tables and comments associated with each post', () => {
    return getAllPostsWithComments(testDb).then((posts) => {
      expect(posts[0].comments).toHaveLength(2)
      expect(posts[0].comments[0].comment).toContain('Gorman')
      expect(posts[0].comments[0].username).toBe('SillySally')
    })
  })
})

describe('addPost', () => {
  it('adds a post into the posts table in the database then returns all the posts', () => {
    const fakePost = {
      uploader_id: '3',
      category: 'Lost',
      title: 'Missing ginger cat',
      date: '01/06/2022',
      description:
        'Mittens went missing about two weeks ago in the Somerfield area',
      image_url: 'fakeUrl',
      location: 'Christchurch',
    }

    return addPost(fakePost, testDb).then((res) => {
      expect(res[2].title).toContain('cat')
    })
  })
})
