import React from 'react'
import UserHomePage from './UserHomePage'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import {  useSelector } from 'react-redux'
import { useCacheUser } from '../auth0-utils'
import CreateProfile from './CreateProfile'

import LandingPage from './LandingPage'

function SignIn() {  
  useCacheUser()
  const userInData = useSelector((state) => state.usersReducer)
  
  return (
    <>
      <IfAuthenticated>
        {userInData?.username ? <UserHomePage /> : <CreateProfile />}
      </IfAuthenticated>

      <IfNotAuthenticated>
        <LandingPage />
      </IfNotAuthenticated>
    </>
  )
}

export default SignIn
