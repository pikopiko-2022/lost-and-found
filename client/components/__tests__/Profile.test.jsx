import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Profile from '../Profile'
import EditProfile from '../EditProfile'

jest.mock('react-redux')

describe('<Profile />', () => {
  test('renders heading on profile page', () => {
    useSelector.mockReturnValue({
      username: 'SamSam',
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
    expect.assertions(1)
    useSelector.mockReturnValue({
      username: 'SamSamS',
    })
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/editProfile" element={<EditProfile />} />
        </Routes>
      </MemoryRouter>
    )

    const link = screen.getByRole('link', {
      name: /edit profile/i,
    })
    userEvent.click(link)

    await waitFor(() => {
      expect(screen.getByText(/EditProfile/i)).toBeInTheDocument()
    })
  })
})
