import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editPostByPostId } from '../../actions/posts'
import EditPost from '../EditPost'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

jest.mock('react-router-dom')
jest.mock('../../actions/posts')
jest.mock('react-redux')

const navigate = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})
useNavigate.mockImplementation(() => navigate)
const fakePosts = [
  {
    id: 1,
    title: 'chelsea is panicking',
    imageUrl: './images/postimages/image-1664331147998.png',
  },
  {
    id: 2,
    title: 'david is still lost',
    imageUrl: './images/postimages/image-1664331147998.png',
  },
  {
    id: 3,
    title: 'Aaron lost his hat on his run',
    imageUrl: './images/postimages/image-1664331147998.png',
  },
]

describe('EditPost', () => {
  it('clicking submit dispatches editPost action', async () => {
    useParams.mockReturnValue({ postId: 1 })
    useSelector.mockReturnValue(fakePosts)
    const fakeDispatch = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch)
    editPostByPostId.mockReturnValue('Edited')
    render(<EditPost />)

    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(fakeDispatch).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/')
  })
})
