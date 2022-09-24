import nock from 'nock'
import { addComment } from '../comments.api'

const fakeComment = {
  post_id: 2,
  date_commented: '24/09/2022',
  comment: 'I think this is mine',
}

describe('addComment', () => {
  it('adds a comment to the database and sends a response', () => {
    const scope = nock('http://localhost')
      .post('/api/v1/comments')
      .reply(200, { text: 'Comment added' })

    return addComment(fakeComment).then((result) => {
      expect(scope.isDone()).toBe(true)
      expect(result.text).toBe('Comment added')
    })
  })
})
