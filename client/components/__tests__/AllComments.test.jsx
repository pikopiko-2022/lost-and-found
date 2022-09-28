import React from 'react'
import { screen, render } from '@testing-library/react'
import AllComments from '../AllComments'
import Comment from '../Comment'
import '@testing-library/jest-dom'

jest.mock('../Comment')

Comment.mockReturnValue(<button>View Comments</button>)

const mockComments = [
  { id: 1, commentId: 1, comment: 'found' },
  { id: 2, commentId: 2, comment: 'lost' },
]

describe('<AllComments />', () => {
  test('it renders a list of comments that were passed as props by a post', () => {
    render(<AllComments comments={mockComments} />)
    const comment = screen.getAllByRole('button')
    expect(comment[0]).toHaveTextContent('View Comments')
  })
})
