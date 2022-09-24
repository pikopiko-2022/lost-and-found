import React from 'react'
import Post from '../Post'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import store from '../../store'

import Comment from '../Comment'
import AllComments from '../AllComments'
jest.mock('../Comment')
jest.mock('../AllComments')

describe('<Post />', () => {
  test('render title', () => {
    Comment.mockReturnValue(<>Comment</>)
    AllComments.mockReturnValue(<>All Comments</>)
    render(
      <Provider store={store}>
        <Post title="missing a key" image="./images/postImages/image1.jpg" />
      </Provider>
    )
    // screen.debug()
    expect(screen.getByText(/missing/i)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      './images/postImages/image1.jpg'
    )
  })
})
