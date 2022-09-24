import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateLoggedInUser } from '../actions/loggedInUser'
import { updateUser } from '../apis/users'

export default function EditProfile() {
  const user = useSelector((state) => state.usersReducer)
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
    updateUser(form, user.token )
      .then(() => dispatch(updateLoggedInUser(form)))
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
              onChange={handleChange}
              value={form.username}
            />
            <label htmlFor="email">E-mail:</label>
            <input
              className="createprofile-input"
              type="text"
              name="email"
              placeholder="your email"
              onChange={handleChange}
              value={form.email}
            />
            <label htmlFor="Location">Location:</label>
            <input
              className="createprofile-input"
              type="text"
              name="location"
              placeholder="location"
              onChange={handleChange}
              value={form.location}
            />
            <input type="submit" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </>
  )
}
