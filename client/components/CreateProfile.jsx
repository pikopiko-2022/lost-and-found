import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateLoggedInUser } from '../actions/loggedInUser'
import { createUser } from '../apis/users'

export default function CreateProfile() {
  const user = useSelector((state) => state.usersReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    location: '',
  })
  useEffect(() => {
    if (user?.username) navigate('/')
  }, [user])

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const userInfo = {
      auth0_Id: user.auth0_Id,
      ...form,
    }
    
    createUser(userInfo, user.token)
      .then(() => dispatch(updateLoggedInUser(userInfo)))
      .catch((err) => console.error(err.message))
  }

  return (
    <>
      <h1>Create Profile</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              className="createprofile-input"
              type="text"
              id='name'
              name="name"
              placeholder="Full name"
              onChange={(evt) => handleChange(evt)}
              value={form.name}
            />
            <label htmlFor="username">Username:</label>
            <input
              className="createprofile-input"
              type="text"
              id='username'
              name="username"
              placeholder="Username you will be using"
              onChange={(evt) => handleChange(evt)}
              value={form.username}
            />
            <label htmlFor="email">E-mail:</label>
            <input
              className="createprofile-input"
              type="text"
              id='email'
              name="email"
              placeholder="your email"
              onChange={(evt) => handleChange(evt)}
              value={form.email}
            />
            <label htmlFor="location">Location:</label>
            <input
              className="createprofile-input"
              type="text"
              id='location'
              name="location"
              placeholder="location"
              onChange={(evt) => handleChange(evt)}
              value={form.location}
            />
            <button>
          Save</button>
          </div>
        </form>
      </div>
    </>
  )
}
