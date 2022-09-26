import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import CreateProfileForm from '../CreateProfileForm'
import { createUser } from '../../apis/users'

jest.mock('react-redux')
jest.mock('../../apis/users')

describe('CreateProfile', () => {
  it('dispatches correct action when form submitted', async () => {
    useSelector.mockReturnValue({ username: 'RandomUser' })
    const fakeDispatch = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch)
    createUser.mockImplementation(() => Promise.resolve(''))

    render(
      <Router>
        <CreateProfileForm />
      </Router>
    )
    await userEvent.type(screen.getByLabelText(/username/i), 'DavidLostAgain')
    await userEvent.click(screen.getByRole('button'))

    expect(fakeDispatch).toHaveBeenCalled()
    expect(fakeDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_LOGGED_IN_USER',
      payload: {
        auth0_Id: undefined,
        email: '',
        location: '',
        name: '',
        username: 'DavidLostAgain',
      },
    })
  })
  it('dispatches correct action when form submitted1', async () => {
    jest.spyOn(console, 'error')
    useSelector.mockReturnValue({ username: 'RandomUser' })
    const err = jest.fn()
    createUser.mockImplementation(() => Promise.reject(new Error('you failed')))
    console.error.mockImplementation(err)
    render(
      <Router>
        <CreateProfileForm />
      </Router>
    )

    await userEvent.click(screen.getByRole('button'))
    expect(err).toHaveBeenCalled()
    expect(err).toHaveBeenCalledWith('you failed')
  })
})
