import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('@auth0/auth0-react')

describe('Authentication', () => {
  it('if authenticated it renders children', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    })
    render(
      <IfAuthenticated>
        <button>authenticated</button>
      </IfAuthenticated>
    )
    const button = screen.getByRole('button')
    expect(button).toContainHTML('button')
  })
  it('if not authenticated, it does not renders children', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    })
    render(
      <IfNotAuthenticated>
        <button>you cant see this</button>
      </IfNotAuthenticated>
    )
    const button = screen.getByRole('button')
    expect(button).toContainHTML('you cant see this')
  })
})
