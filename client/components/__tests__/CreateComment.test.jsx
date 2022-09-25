import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useDispatch } from 'react-redux'
import CreateComment from '../CreateComment'
import { addComment } from '../../apis/comments.api'
import { fetchPosts } from '../../actions/posts'

jest.mock('../../actions/posts')
jest.mock('react-redux')
jest.mock('../../apis/comments.api')

const fakeDispatch = jest.fn()
useDispatch.mockReturnValue(fakeDispatch)
addComment.mockReturnValue('Comment added')
fetchPosts.mockReturnValue('Posts fetched')

describe('<CreateComment />', () => {
  it('renders a form', () => {
    render(<CreateComment postId={1} />)
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
  })
  test('clicking the submit button makes fetch posts run', () => {
    render(<CreateComment postId={1} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(fakeDispatch).toHaveBeenCalledWith('Posts fetched')
  })
})
