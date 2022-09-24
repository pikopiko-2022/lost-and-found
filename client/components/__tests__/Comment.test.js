import React from 'react'
import { screen, render } from '@testing-library/react'
import Comment from '../Comment'

describe('<Comment />', () => {
  it('renders the username of the commenter and the comment', () => {
    render(
      <Comment
        key={1}
        commenter={'Aaron123'}
        commentDate={'Sat 24 September 2022'}
        comment={'I found your basketball'}
        postId={2}
      />
    )
    const comment = screen.getAllByRole('listitem')
    expect(comment).toHaveLength(1)
    expect(comment[0].textContent).toContain('Aaron123')
    expect(comment[0].textContent).toContain('basketball')
  })
})
