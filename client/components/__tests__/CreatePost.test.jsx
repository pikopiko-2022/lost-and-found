import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Location from '../Location'
import { addNewPost } from '../../actions/posts'
import CreatePost from '../CreatePost'

jest.mock('../Location')
jest.mock('../../actions/posts')
jest.mock('react-redux')

const fakePost = {
  category: 'Found',
  title: 'Cat',
  description: 'Black',
  image_url: './images/postimages/image1.jpg',
  location: 'Beach',
}

const fakeDispatch = jest.fn()
useDispatch.mockReturnValue(fakeDispatch)
useSelector.mockReturnValue(fakePost)
addNewPost.mockReturnValue('Hello')

describe('<CreatePost />', () => {
  Location.mockReturnValue(<>Location</>)
  it('render title', () => {
    render(
      <Router>
        <CreatePost />
      </Router>
    )
    const title = screen.getByRole('heading')
    expect(title).toContainHTML('Create Post')
    expect.assertions(1)
  })
  // it('click upload image renders image on page', async () => {
  //   const mockImage = 'dogPic.jpg'
  //   render(
  //     <Router>
  //       <CreatePost />
  //     </Router>
  //   )
  //   await userEvent.click(screen.getByTestId('uploadImage'))
  //   screen.debug()

  // })
})
