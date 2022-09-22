const knex = require('knex')

const config = require('./knexfile').test

const testDb = knex(config)

const db = require('../db/comments')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('getComments', () => {
  test('Returns an array of the correct length from the seeds', () => {
    return db.getComments(testDb).then((comments) => {
      expect(comments).toHaveLength(1)

      expect(comments[0].comment).toContain('Gorman')

      return null
    })
  })
})
