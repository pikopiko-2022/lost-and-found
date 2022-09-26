import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import userEvent from '@testing-library/user-event'
import LandingPage from '../LandingPage'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
jest.mock('@auth0/auth0-react')

const fakeFunc = jest.fn()
describe('LandingPage', () => {
  it('test Sign up button click will trigger handleSignIn', async () => {
    useAuth0.mockReturnValue({
      loginWithRedirect: fakeFunc,
    })

    render(<LandingPage />)

    const signUpButton = screen.getByRole('button', { name: /sign up/i })
    await userEvent.click(signUpButton)

    expect(fakeFunc).toHaveBeenCalled()
  })
  it('test Log in button click will trigger handleSignIn', async () => {
    useAuth0.mockReturnValue({
      loginWithRedirect: fakeFunc,
    })

    render(<LandingPage />)

    const logInButton = screen.getByRole('button', { name: /log in/i })
    await userEvent.click(logInButton)

    expect(fakeFunc).toHaveBeenCalled()
  })
})
