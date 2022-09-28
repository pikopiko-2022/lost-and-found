import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateLoggedInUser } from '../actions/loggedInUser'
import { createUser } from '../apis/users'

export default function CreateProfileForm() {
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
      .then((allUserInfo) => dispatch(updateLoggedInUser(allUserInfo)))
      .catch((err) => console.error(err.message))
  }

  return (
    <>
      <div className="flex flex-col w-full ml-96">
        <h1 className="mb-5 text-2xl">Create Profile</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center">
              <label htmlFor="name">Name:</label>
              <input
                className="w-80 h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                id="name"
                name="name"
                placeholder="Full name"
                onChange={(evt) => handleChange(evt)}
                value={form.name}
              />
              <label htmlFor="username">Username:</label>
              <input
                className="w-80 h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                id="username"
                name="username"
                placeholder="Username you will be using"
                onChange={(evt) => handleChange(evt)}
                value={form.username}
              />
              <label htmlFor="email">E-mail:</label>
              <input
                className="w-80 h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                id="email"
                name="email"
                placeholder="your email"
                onChange={(evt) => handleChange(evt)}
                value={form.email}
              />
              <label htmlFor="location">Location:</label>
              <input
                className="w-80 h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                id="location"
                name="location"
                placeholder="location"
                onChange={(evt) => handleChange(evt)}
                value={form.location}
              />
              <button className="flex flex-col justify-center w-32 mt-2 btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
