import React from 'react'
import { screen, render } from '@testing-library/react'
import AllComments from '../AllComments'

const mockComments = [
  { id: 1, comment: 'found' },
  { id: 2, comment: 'lost' },
]

describe('<AllComments />', () => {
  test('renders a list of comments that were passed as props by a post', () => {
    render(<AllComments comments={mockComments} />)
    const commentList = screen.getAllByRole('listitem')
    expect(commentList).toHaveLength(2)
    expect(commentList[0].textContent).toContain('found')
    expect(commentList[1].textContent).toContain('lost')
  })
})
