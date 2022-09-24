import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { useDispatch } from 'react-redux'
import CreateComment from '../CreateComment'
import { addComment } from '../../apis/comments.api'
import { fetchPosts } from '../../actions/posts'

jest.mock('../../actions/posts')
jest.mock('react-redux')

const fakeComment = {
  comment: 'I found your scarf',
}

const fakeDispatch = jest.fn()
useDispatch.mockReturnValue(fakeDispatch)
// addComment.mockReturnValue('Comment added')

describe('<CreateComment />', () => {
  it('renders a form', () => {
    render(<CreateComment postId={1} />)
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
  })
})
