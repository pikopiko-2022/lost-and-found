import React from 'react'
import { screen, render } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import Comment from '../Comment'
jest.mock('react-redux')

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
    expect(comment[0].textContent).toContain('24 September')
  })
})

describe('<Comments />', () => {
  test('renders the mocked data on the server', () => {
    useSelector.mockReturnValue([{ id: 1 }, { comment: 'test' }])
    useDispatch.mockReturnValue(() => {
      render(<Comment />)
      const commentsBody = screen.getAllByRole('listitem')
      expect(commentsBody[1]).toHaveTextContent('test')
      expect(commentsBody).toHaveLength(2)
    })
  })
})
