import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../../actions/posts'
import Post from '../Post'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import AllPosts from '../AllPosts'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import CreatePost from '../CreatePost'
import userEvent from '@testing-library/user-event'

jest.mock('../Post')
jest.mock('react-redux')
jest.mock('../../actions/posts')

beforeEach(() => {
  jest.clearAllMocks()
})
const fakeDispatch = jest.fn()

const fakePosts = [
  { id: 1, title: 'chelsea is panicking' },
  { id: 2, title: 'david is still lost' },
  { id: 3, title: 'Aaron lost his hat on his run' },
]
Post.mockReturnValue(<button>Single Post</button>)
useSelector.mockReturnValue(fakePosts)
useDispatch.mockReturnValue(fakeDispatch)
fetchPosts.mockReturnValue('random')

describe('AllPosts', () => {
  test('render the button page', () => {
    render(
      <BrowserRouter>
        <AllPosts />
      </BrowserRouter>
    )
    expect(screen.getAllByRole('button')).toHaveLength(4)
  })

  test('if Create a post button takes you to /createPost through Link', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
      </MemoryRouter>
    )

    const link = screen.getByRole('button', { name: /create/i })
    await userEvent.click(link)
    expect(screen.getByText(/Create Post/i)).toBeInTheDocument()
  })
})
