import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import EditProfile from '../EditProfile'
import { updateUser } from '../../apis/users'
import * as router from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

jest.mock('react-redux')
jest.mock('../../apis/users')
jest.mock('@auth0/auth0-react')
const navigate = jest.fn()

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  jest.clearAllMocks()
})

const fakeUpdatedUser = {
  username: 'luna123',
  email: 'luna@lunamail.com',
  location: 'palmy',
}

describe('EditProfile', () => {
  it('dispatches UPDATE_LOGGED_IN_USER action when form submitted', async () => {
    useSelector.mockReturnValue(fakeUpdatedUser)
    const fakeDispatch = jest.fn()
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    })
    useDispatch.mockReturnValue(fakeDispatch)
    updateUser.mockImplementation(() => Promise.resolve())

    render(
      <Router>
        <EditProfile />
      </Router>
    )

    const button = screen.getByRole('button', {
      name: /Save/i,
    })

    await userEvent.click(button)

    expect(fakeDispatch).toHaveBeenCalled()
    expect(fakeDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_LOGGED_IN_USER',
      payload: {
        auth0_Id: undefined,
        email: 'luna@lunamail.com',
        location: 'palmy',
        name: undefined,
        username: 'luna123',
      },
    })
  })

  it('redirects back to profile page once form submitted', async () => {
    useSelector.mockReturnValue({
      username: 'SamSamS',
    })
    const fakeDispatch = jest.fn()
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    })
    updateUser.mockImplementation(() => Promise.resolve())
    useDispatch.mockReturnValue(fakeDispatch)

    render(
      <Router>
        <EditProfile />
      </Router>
    )

    const link = screen.getByRole('button', {
      name: /save/i,
    })
    await userEvent.click(link)

    expect(navigate).toHaveBeenCalledWith('/profile')
  })
  it(`check if useEffect navigate to '/' if !isAuthenticated`, () => {
    useSelector.mockReturnValue({
      username: 'SamSamS',
    })
    const fakeDispatch = jest.fn()
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    })

    useDispatch.mockReturnValue(fakeDispatch)
    render(
      <Router>
        <EditProfile />
      </Router>
    )

    expect(navigate).toHaveBeenCalledWith('/')
  })
})
