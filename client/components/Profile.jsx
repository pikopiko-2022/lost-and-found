import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <>
      <div>Profile</div>
      <Link to={'/profile/editProfile'}>Edit Profile</Link>
    </>
  )
}
