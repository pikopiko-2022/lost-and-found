import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserHomePage from '../UserHomePage'
import LandingPage from '../LandingPage'
import { useSelector } from 'react-redux'

import CreateProfile from '../CreateProfile'

jest.mock('@auth0/auth0-react')
jest.mock('react-redux')
jest.mock('../CreateProfile')
jest.mock('../UserHomePage')


describe('Authentication', () => {
  it('if authenticated it renders children, if user?.username get UserHomePage', async () => {
    const user = {
      username: 'luna',
    }
    
    UserHomePage.mockReturnValue(<>UserHomePage</>)
    useSelector.mockReturnValue(user)
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    })
    render(
      <IfAuthenticated>
        {user?.username ? <UserHomePage /> : <CreateProfile />}
      </IfAuthenticated>
    )
    await expect(screen.getByText(/UserHomePage/i)).toBeInTheDocument()
  })
  it('if authenticated it renders children, if !user?.username get CreateProfile', async () => {
    const emptyUser = {
      username: '',
    }
    CreateProfile.mockReturnValue(<>Create Profile</>)
    useSelector.mockReturnValue(emptyUser)
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    })
    render(
      <IfAuthenticated>
        {emptyUser?.username ? <UserHomePage /> : <CreateProfile />}
      </IfAuthenticated>
    )
    await expect(screen.getByText(/Create Profile/i)).toBeInTheDocument()
  })
  it('if not authenticated, it renders children', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    })
    render(
      <IfNotAuthenticated>
        <LandingPage />
      </IfNotAuthenticated>
    )
    const button = screen.getAllByRole('button')
    expect(button[0]).toHaveTextContent('Sign Up')
    expect(button[1]).toHaveTextContent('Log In')
  })
})
