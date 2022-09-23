import React from 'react'
import { screen, render } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import Comments from './Comments'

jest.mock('react-redux')

describe('<Comments />', () => {
  test('renders the mocked data on the server', () => {
    useSelector.mockReturnValue([{ id: 1 }, { comment: 'test' }])
    useDispatch.mockReturnValue(() => {
      render(<Comments />)
      const commentsBody = screen.getAllByRole('listitem')
      expect(commentsBody[1]).toHaveTextContent('test')
      expect(commentsBody).toHaveLength(2)
    })
  })
})