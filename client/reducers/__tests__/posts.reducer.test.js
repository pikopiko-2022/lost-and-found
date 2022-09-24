import postsReducer from '../posts'
import { setPostsSuccess } from '../../actions/posts'

test('set posts', () => {
  const action = setPostsSuccess('missing a key')
  const newState = postsReducer('', action)
  expect(newState).toBe('missing a key')
  expect(newState).toHaveLength(13)
})
