import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
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

const fakeUser = {
  id: 1,
  category: 'Found',
  title: 'Cat',
  description: 'Black',
  image_url: './images/postimages/image1.jpg',
  location: 'Beach',
}

const fakeDispatch = jest.fn()
useDispatch.mockReturnValue(fakeDispatch)
useSelector.mockReturnValue(fakeUser)
addNewPost.mockReturnValue('Hello')

const file = new File(['random'], 'values.png', {
  type: 'image/png',
})
global.URL.createObjectURL = () => 'random'

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

  it('click upload image renders image on page', async () => {
    render(
      <Router>
        <CreatePost />
      </Router>
    )
    const imageInput = screen.getByTestId('uploadImage')

    await userEvent.upload(imageInput, file)
    expect(screen.queryByTestId('testImage')).toBeTruthy()
  })

  it('click remove image button', async () => {
    render(
      <Router>
        <CreatePost />
      </Router>
    )
    const imageInput = screen.getByTestId('uploadImage')

    await userEvent.upload(imageInput, file)
    const button = screen.getByRole('button', { name: /remove/i })
    await userEvent.click(button)
    expect(screen.queryByTestId('testImage')).toBeFalsy()
  })

  it('click Save new post button', async () => {
    Location.mockReturnValue(<>Location</>)
    render(
      <Router>
        <CreatePost />
      </Router>
    )
    await userEvent.type(screen.getByLabelText(/title/i), 'Lost a lock')
    await userEvent.selectOptions(screen.getByTestId('testCategory'), 'Lost')
    const dateInput = screen.getByLabelText(/date/i)

    //
    // await fireEvent.mouseDown(dateInput)
    // await fireEvent.change(dateInput, { target: { value: '22/09/2022' } })
    // await fireEvent.click(document.querySelector(''))
    await userEvent.click(dateInput)
    await userEvent.clear(dateInput)
    await userEvent.type(dateInput, '22/09/2022')
    await userEvent.tab()

    //
    const imageInput = screen.getByTestId('uploadImage')
    await userEvent.upload(imageInput, file)
    await userEvent.type(
      screen.getByLabelText(/description/i),
      'Lost it at Nelson'
    )

    await userEvent.click(screen.getByRole('button', { name: /save/i }))
    expect(fakeDispatch).toHaveBeenCalled()
  })
})
