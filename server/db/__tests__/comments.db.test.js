const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)
const { addComment } = require('../comments')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('addComment', () => {
  const comment = {
    id: 3,
    commenter_id: '2',
    post_id: 2,
    date_commented: new Date().toDateString(),
    comment: 'I think my kid brought this home by mistake.',
  }
  test('it inserts a comment into the comments table in the database', () => {
    return addComment(comment, testDb)
      .then(() => testDb('comments').select())
      .then((comments) => {
        expect(comments).toHaveLength(3)
        expect(comments[2].comment).toContain('by mistake')
      })
  })
})
