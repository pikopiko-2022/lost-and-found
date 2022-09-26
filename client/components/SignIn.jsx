import React from 'react'
import UserHomePage from './UserHomePage'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useSelector } from 'react-redux'
import { useCacheUser } from '../auth0-utils'
import CreateProfile from './CreateProfileForm'

import LandingPage from './LandingPage'

//this component name is misleading to me - I was expecting to see a sign in button 
//maybe Home would be a better name?
function SignIn() {
  useCacheUser()
  const user = useSelector((state) => state.usersReducer)

  return (
    <>
      <IfAuthenticated>
        {user?.username ? <UserHomePage /> : <CreateProfile />}
      </IfAuthenticated>

      <IfNotAuthenticated>
        <LandingPage />
      </IfNotAuthenticated>
    </>
  )
}

export default SignIn
