import React from 'react'
import Post from '../Post'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Comment from '../Comment'
import AllComments from '../AllComments'
import { deletePostByPostId } from '../../actions/posts'

jest.mock('../Comment')
jest.mock('../AllComments')
jest.mock('react-redux')
jest.mock('react-router-dom')
jest.mock('../../actions/posts')

const navigate = jest.fn()
beforeEach(() => {
  jest.clearAllMocks()
})
useNavigate.mockImplementation(() => navigate)
useSelector.mockReturnValue({
  id: 1,
  username: 'Davidislost',
})
describe('<Post />', () => {
  test('render title', () => {
    Comment.mockReturnValue(<>Comment</>)
    AllComments.mockReturnValue(<>All Comments</>)
    render(
      <Post title="missing a key" image="./images/postImages/image1.jpg" />
    )

    expect(screen.getByText(/missing/i)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      './images/postImages/image1.jpg'
    )
  })
  test('clicking Edit post will navigate to /posts/edit/${props.id}', async () => {
    render(<Post title="missing a lock" uploaderId={1} id="1" />)

    const editButton = screen.getByRole('button', {
      name: /edit/i,
    })

    await userEvent.click(editButton)
    expect(navigate).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/posts/edit/1')
  })
  test('clicking Delete post button will dispatch deletePostByPostId', async () => {
    const fakeDispatch = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch)
    deletePostByPostId.mockReturnValue('Hello, its me')
    render(<Post uploaderId={1} id="1" />)

    const deleteButton = screen.getByRole('button', { name: /delete/i })

    await userEvent.click(deleteButton)
    expect(fakeDispatch).toHaveBeenCalledWith('Hello, its me')
  })
})
