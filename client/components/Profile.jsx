import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Profile() {
  // const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const user = useSelector((state) => state.usersReducer)

  console.log(user)

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
