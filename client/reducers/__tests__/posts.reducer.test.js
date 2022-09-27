import postsReducer from '../posts'
import { setPostsSuccess } from '../../actions/posts'

describe('postReducer test', () => {
  test('set posts', () => {
    const action = setPostsSuccess('missing a key')
    const newState = postsReducer('', action)
    expect(newState).toBe('missing a key')
    expect(newState).toHaveLength(13)
  })

  test('returns state when its default', () => {
    const action = { type: 'default' }
    const initialState = postsReducer('', action)
    expect(initialState).toBe('')
  })
})
