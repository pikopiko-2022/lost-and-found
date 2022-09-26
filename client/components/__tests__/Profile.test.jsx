import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Profile from '../Profile'
import EditProfile from '../EditProfile'
import { useAuth0 } from '@auth0/auth0-react'
import * as router from 'react-router'

jest.mock('react-redux')
jest.mock('@auth0/auth0-react')
const navigate = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('<Profile />', () => {
  test('renders heading on profile page', () => {
    useSelector.mockReturnValue({
      username: 'SamSam',
    })
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    })
    render(
      <Router>
        <Profile />
      </Router>
    )
    const heading = screen.getByRole('heading', { name: /user profile/i })

    expect(heading).toHaveTextContent('User Profile')
  })
  test('renders data from state', () => {
    useSelector.mockReturnValue({
      username: 'SamSam',
      name: 'Sam',
      location: 'Palmmmy',
    })
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    })
    render(
      <Router>
        <Profile />
      </Router>
    )
    const username = screen.getByText(/Username:/i)
    const location = screen.getByText(/Location:/i)

    expect(username).toHaveTextContent('SamSam')
    expect(location).toHaveTextContent('Palmmmy')
  })

  test('link button to edit profile works', async () => {
    useSelector.mockReturnValue({
      username: 'SamSamS',
    })
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    })
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/editProfile" element={<EditProfile />} />
        </Routes>
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: /edit profile/i })
    await userEvent.click(link)
    expect(screen.getByText(/EditProfile/i)).toBeInTheDocument()
  })
  it(`check if useEffect navigate to '/' if !isAuthenticated`, () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
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
        <Profile />
      </Router>
    )

    expect(navigate).toHaveBeenCalledWith('/')
  })
})
