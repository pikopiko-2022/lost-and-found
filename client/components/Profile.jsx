import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IfAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

export default function Profile() {
  const { isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [])
  const user = useSelector((state) => state.usersReducer)
  return (
    <>
      <IfAuthenticated>
        <h1>User Profile</h1>
        <p>Name: {user.name}</p>
        <p>Username: {user.username}</p>
        <p>E-mail: {user.email}</p>
        <p>Location: {user.location}</p>

        <Link to={'/profile/editProfile'}>Edit Profile</Link>
      </IfAuthenticated>
    </>
  )
}
