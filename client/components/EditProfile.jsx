import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateLoggedInUser, clearLoggedInUser } from '../actions/loggedInUser'
import { updateUser } from '../apis/users'

export default function EditProfile() {
  const { getAccessTokenSilently } = useAuth0()
  const user = useSelector((state) => state.usersReducer)
  console.log(user)
  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    location: user.location,
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(user.token)
    getAccessTokenSilently()
      .then((token) => updateUser(token))
      .then((userInDb) => {
        userInDb && dispatch(updateLoggedInUser(userInDb))
      })
      .then(navigate('/profile'))
      .catch((err) => console.error(err.message))
  }

  return (
    <>
      <p>EditProfile</p>
      <div>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="createprofile-input"
              type="text"
              name="username"
              placeholder="Username you will be using"
              onChange={(evt) => handleChange(evt)}
              value={form.username}
            />
            <label htmlFor="email">E-mail:</label>
            <input
              className="createprofile-input"
              type="text"
              name="email"
              placeholder="your email"
              onChange={(evt) => handleChange(evt)}
              value={form.email}
            />
            <label htmlFor="Location">Location:</label>
            <input
              className="createprofile-input"
              type="text"
              name="location"
              placeholder="location"
              onChange={(evt) => handleChange(evt)}
              value={form.location}
            />
            <input type="submit" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </>
  )
}
