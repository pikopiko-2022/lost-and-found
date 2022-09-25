import React from 'react'
import { Link } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

export default function Nav() {
  const user = useSelector((state) => state.usersReducer)
  const { logout, loginWithRedirect } = useAuth0()
  const handleLogOff = (e) => {
    e.preventDefault()
    logout()
  }
  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <nav>
      <h3>
        <Link to="/">Home</Link>
      </h3>

      <h3>
        <Link to="/profile">Profile</Link>
      </h3>

      <h3>
        <IfAuthenticated>
          <Link to="/" onClick={handleLogOff}>
            Log off
          </Link>
          <div>
            <p>
              Logged in as <Link to="/profile">{' ' + user?.username}</Link>
            </p>
          </div>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link to="/" onClick={handleSignIn}>
            Sign In
          </Link>
        </IfNotAuthenticated>
      </h3>
    </nav>
  )
}
