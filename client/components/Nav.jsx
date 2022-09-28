import React from 'react'
import { Link } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
// import { useSelector } from 'react-redux'

export default function Nav() {
  // const user = useSelector((state) => state.usersReducer)
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
    <nav className="w-64 sticky top-20" aria-label="Sidebar">
      <Link
        to="/"
        className="flex items-center p-2 text-2xl font-normal rounded-lg dark hover:scale-105 ml-2 hover:underline"
      >
        <b>HOME</b>
      </Link>
      <IfAuthenticated>
        <Link
          to="/profile"
          className="flex items-center p-2 text-2xl font-normal rounded-lg dark hover:scale-105 ml-2 hover:underline"
        >
          <b>PROFILE</b>
        </Link>
        <Link
          to="/"
          onClick={handleLogOff}
          className="flex items-center p-2 text-2xl font-normal rounded-lg dark hover hover:scale-105 pb-2.5 ml-2 hover:underline "
        >
          <b>LOG&nbsp;OFF</b>
        </Link>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Link to="/" onClick={handleSignIn}>
          Sign In
        </Link>
      </IfNotAuthenticated>
      {/* <div>
        {user?.username && (
          <p className="opacity-0">
            Logged in as <Link to="/profile">{' ' + user?.username}</Link>
          </p>
        )}
      </div> */}
    </nav>
  )
}
