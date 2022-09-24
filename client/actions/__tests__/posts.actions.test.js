import {
  fetchPosts,
  SET_POSTS_SUCCESS,
  addNewPost,
  setPostsSuccess,
} from '../posts'

import { getAllPostsAndComments, addPost } from '../../apis/posts'

jest.spyOn(console, 'error')

jest.mock('../../apis/posts')
const mockPosts = [
  { id: 1, user_id: 1, body: 'posting about lost stuff' },
  { id: 2, user_id: 2, body: 'posting about found stuff' },
]
getAllPostsAndComments.mockReturnValue(Promise.resolve(mockPosts))

const fakeDispatch = jest.fn()
beforeEach(() => {
  jest.clearAllMocks()
})

describe('fetchPosts', () => {
  it('dispatches the mock call and returns the correct type', () => {
    const thunkFn = fetchPosts()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchFirstCallFirstArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchFirstCallFirstArgument.type).toBe(SET_POSTS_SUCCESS)
      return null
    })
  })
  it('consoles error', () => {
    getAllPostsAndComments.mockImplementation(() =>
      Promise.reject(new Error('mock no worky action'))
    )
    console.error.mockImplementation(() => {})
    return fetchPosts()(fakeDispatch).then((res) => {
      console.log(res)
      expect(console.error).toHaveBeenCalledWith('mock no worky action')
    })
  })
})
