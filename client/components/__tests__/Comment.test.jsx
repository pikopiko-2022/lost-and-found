import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector, useDispatch } from 'react-redux'
import Comment from '../Comment'
import userEvent from '@testing-library/user-event'
import { deleteComment } from '../../apis/comments'
import { fetchPosts } from '../../actions/posts'

jest.mock('react-redux')
jest.mock('../../apis/comments')
jest.mock('../../actions/posts')

beforeEach(() => {
  jest.clearAllMocks()
})

useSelector.mockReturnValue({
  id: 5,
  username: 'Aaron123',
})

describe('<Comment />', () => {
  it('renders the username of the commenter and the comment', () => {
    render(
      <Comment
        key={1}
        commentId={1}
        commenter={'Aaron123'}
        userId={5}
        commentDate={'Sat Sep 24 2022'}
        comment={'I found your basketball'}
        postId={2}
      />
    )
    const comment = screen.getAllByRole('listitem')
    expect(comment).toHaveLength(1)
    expect(comment[0].textContent).toContain('Aaron123')
    expect(comment[0].textContent).toContain('basketball')
    expect(comment[0].textContent).toContain('Sat Sep 24')
  })

  test('clicking Delete comment button will call deleteComment function and dispatch fetchPosts', async () => {
    deleteComment.mockReturnValue('Comment deleted')
    const fakeDispatch = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch)
    fetchPosts.mockReturnValue('Posts to fetch')

    render(
      <Comment
        key={1}
        commentId={1}
        commenter={'Aaron123'}
        userId={5}
        commentDate={'Sat Sep 24 2022'}
        comment={'I found your basketball'}
        postId={2}
      />
    )
    const deleteCommentButton = screen.getByRole('button')

    await userEvent.click(deleteCommentButton)
    expect(deleteComment).toHaveBeenCalled()
    expect(fakeDispatch).toHaveBeenCalledWith('Posts to fetch')
  })
})
