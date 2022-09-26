import React from 'react'
import UserHomePage from '../UserHomePage'
import AllPosts from '../AllPosts'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
jest.mock('../AllPosts')

AllPosts.mockReturnValue(<button>All Posts</button>)

test('render the button page', () => {
  render(<UserHomePage />)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
