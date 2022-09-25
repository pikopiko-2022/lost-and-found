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

const fakeFormData = {
  post_id: 1,
  date_commented: new Date().toDateString(),
  comment: 'I found your scarf',
}

const fakeDispatch = jest.fn()
useDispatch.mockReturnValue(fakeDispatch)
// addComment().mockReturnValue(Promise.resolve('Comment added'))

describe('<CreateComment />', () => {
  it('renders a form', () => {
    render(<CreateComment postId={1} />)
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
  })
})
