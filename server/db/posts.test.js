const knex = require('knex')
const testConfig = require('./knexfile').test
const testDb = knex(testConfig)

const { getAllPosts, addPost } = require('./posts')

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
      expect(posts).toHaveLength(1)
      expect(posts[0].title).toContain('beanie')
    })
  })
})

describe('addPost', () => {
  it('adds a post into the posts table in the database then returns all the posts', () => {
    const fakePost = {
      id: 2,
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
      expect(res[1].title).toContain('cat')
    })
  })
})
