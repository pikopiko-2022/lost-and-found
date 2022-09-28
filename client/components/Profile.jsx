import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
      <div className="w-full mt-1 ml-10 flex flex-col">
        <h2 className="mb-5 text-2xl">User Profile</h2>
        <div className="card w-96 p-5 bg-info shadow-xl">
          <div className="text-xl space-y-1">
            <p className="font-secondary">
              Name: <span>{user.name}</span>
            </p>
            <p className="font-secondary">
              Username: <span>{user.username}</span>
            </p>
            <p className="font-secondary">
              E-mail: <span>{user.email}</span>
            </p>
            <p className="font-secondary">
              Location: <span>{user.location}</span>
            </p>
          </div>

          <div className="mt-5">
            <button className="btn">
              <Link to={'/profile/editProfile'}> Edit Profile</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
