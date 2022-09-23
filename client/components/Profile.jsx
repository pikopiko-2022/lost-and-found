import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateLoggedInUser,
  fetchUserProfile,
  clearLoggedInUser,
} from '../actions/loggedInUser'

import { getUser } from '../apis/users'
import { useAuth0 } from '@auth0/auth0-react'

// user wants to view their profile
// user wants to edit their profile

export default function Profile() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const user = useSelector((state) => state.usersReducer)

  const dispatch = useDispatch()
  console.log(user)

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => getUser(token))
        .then((userInDb) => {
          userInDb && dispatch(updateLoggedInUser(userInDb))
        })
        .catch((err) => console.error(err))
    }
  }, [isAuthenticated])

  return (
    <>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>E-mail: {user.email}</p>
      <p>Location: {user.location}</p>

      <Link to={'/profile/editProfile'}>Edit Profile</Link>
    </>
  )
}
