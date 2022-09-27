import {
  fetchPosts,
  SET_POSTS_SUCCESS,
  deletePostByPostId,
  editPostByPostId,
  addNewPost,
} from '../posts'

import {
  getAllPostsAndComments,
  addPost,
  deletePost,
  editPost,
} from '../../apis/posts'

jest.spyOn(console, 'error')

jest.mock('../../apis/posts')
const mockPosts = [
  { id: 1, user_id: 1, body: 'posting about lost stuff' },
  { id: 2, user_id: 2, body: 'posting about found stuff' },
]
getAllPostsAndComments.mockReturnValue(Promise.resolve(mockPosts))
addPost.mockReturnValue(Promise.resolve(mockPosts))
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
    return fetchPosts()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('mock no worky action')
    })
  })
})

describe('addNewPost', () => {
  it('dispatches the mock call and returns the correct type', () => {
    const thunkFn = addNewPost(mockPosts[0])
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchFirstCallFirstArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchFirstCallFirstArgument.type).toBe(SET_POSTS_SUCCESS)
    })
  })
  it('consoles error', () => {
    addPost.mockImplementation(() => Promise.reject(new Error('mock chicky')))
    console.error.mockImplementation(() => {})
    return addNewPost()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('mock chicky')
    })
  })
})

describe('deletePostByPostId', () => {
  it('dispatches the mock call and returns the correct type', () => {
    deletePost.mockImplementation(() => Promise.resolve(mockPosts))
    const thunkFn = deletePostByPostId(1)
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchFirstCallFirstArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchFirstCallFirstArgument.type).toBe(SET_POSTS_SUCCESS)
    })
  })
  it('consoles error', () => {
    deletePost.mockImplementation(() =>
      Promise.reject(new Error('mock chicky'))
    )
    console.error.mockImplementation(() => {})
    return deletePostByPostId()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('mock chicky')
    })
  })
})

describe('editPostByPostId', () => {
  it('dispatches the mock call and returns the correct type', () => {
    editPost.mockImplementation(() => Promise.resolve(mockPosts))
    const thunkFn = editPostByPostId(mockPosts[0], 1)
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchFirstCallFirstArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchFirstCallFirstArgument.type).toBe(SET_POSTS_SUCCESS)
    })
  })
  it('consoles error', () => {
    editPost.mockImplementation(() => Promise.reject(new Error('mock chicky')))
    console.error.mockImplementation(() => {})
    return editPostByPostId()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('mock chicky')
    })
  })
})
