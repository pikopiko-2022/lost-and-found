import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import EditProfile from '../EditProfile'
import { updateUser } from '../../apis/users'

jest.mock('react-redux')
jest.mock('../../apis/users')

const fakeUpdatedUser = {
  username: 'luna123',
  email: 'luna@lunamail.com',
  location: 'palmy',
}

describe('EditProfile', () => {
  it('dispatches UPDATE_LOGGED_IN_USER action when form submitted', async () => {
    useSelector.mockReturnValue(fakeUpdatedUser)
    const fakeDispatch = jest.fn()
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

    userEvent.click(button)

    await (() => {
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
  })
  //   it('redirects back to profile page once form submitted', async () => {
  //     useSelector.mockReturnValue({
  //         username: 'SamSamS',
  //       })
  //       render(
  //         <MemoryRouter initialEntries={['/EditProfile']}>
  //           <Routes>
  //             <Route path="/profile" element={<Profile />} />
  //             <Route path="/profile/editProfile" element={<EditProfile />} />
  //           </Routes>
  //         </MemoryRouter>
  //       )

  //       const link = screen.getByRole('button', {
  //         name: /save/i
  //       })
  //       userEvent.click(link)

  //       await (() => {
  //         expect(screen.getByText(/EditProfile/i)).toBeInTheDocument()
  //       })
  //   })
})
