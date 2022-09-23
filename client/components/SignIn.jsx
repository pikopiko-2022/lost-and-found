import React, { useEffect } from 'react'
import UserHomePage from './UserHomePage'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { useCacheUser } from '../auth0-utils'
import { getUser } from '../apis/users'
import { useNavigate } from 'react-router-dom'
import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'
import CreateProfile from './CreateProfile'

import LandingPage from './LandingPage'

function SignIn() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const userInData = useSelector((state) => state.usersReducer)
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => getUser(token))
        .then((userInDb) => {
          userInDb
            ? dispatch(updateLoggedInUser(userInDb))
            : navigate('/createprofile')
        })
        .catch((err) => console.error(err))
    }
  }, [isAuthenticated])
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
