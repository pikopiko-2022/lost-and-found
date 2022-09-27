import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector, useDispatch } from 'react-redux'
import CreateComment from '../CreateComment'
import { addComment } from '../../apis/comments'
import { fetchPosts } from '../../actions/posts'
import userEvent from '@testing-library/user-event'

jest.mock('../../actions/posts')
jest.mock('react-redux')
jest.mock('../../apis/comments')

const fakeDispatch = jest.fn()
useDispatch.mockReturnValue(fakeDispatch)
addComment.mockReturnValue('Comment added')
fetchPosts.mockReturnValue('Posts fetched')
useSelector.mockReturnValue({ id: 1 })

describe('<CreateComment />', () => {
  it('renders a form', () => {
    render(<CreateComment postId={1} />)
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
  })
  test('clicking the submit button makes fetch posts run', async () => {
    render(<CreateComment postId={1} />)
    const input = screen.getByTestId(/testcomment/i)

    await userEvent.type(input, 'hey, comments')
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(fakeDispatch).toHaveBeenCalledWith('Posts fetched')
  })
})
