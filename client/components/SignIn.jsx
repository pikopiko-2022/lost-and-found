import React from 'react'
import UserHomePage from './UserHomePage'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useSelector } from 'react-redux'
import { useCacheUser } from '../auth0-utils'
import CreateProfileForm from './CreateProfileForm'

import LandingPage from './LandingPage'

function SignIn() {
  useCacheUser()
  const user = useSelector((state) => state.usersReducer)

  return (
    <>
      {user?.username !== null && (
        <>
          <IfAuthenticated>
            {user?.username ? <UserHomePage /> : <CreateProfileForm />}
          </IfAuthenticated>
        </>
      )}
      <IfNotAuthenticated>
        <LandingPage />
      </IfNotAuthenticated>
    </>
  )
}

export default SignIn
