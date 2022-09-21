const knex = require('knex')
const testConfig = require('./knexfile').test
const testDb = knex(testConfig)

const { getAllPosts } = require('./posts')

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
