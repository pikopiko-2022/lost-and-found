import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateLoggedInUser } from '../actions/loggedInUser'
import { updateUser } from '../apis/users'
import { useAuth0 } from '@auth0/auth0-react'

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

  const { isAuthenticated } = useAuth0()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [])
  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    updateUser(form, user.token)
      .then(() => dispatch(updateLoggedInUser(form)))
      .then(navigate('/profile'))
      .catch((err) => console.error(err.message))
  }

  return (
    <>
      <div className="w-full mt-1 ml-10 flex flex-col">
        <h2 className="mb-5 text-2xl">EditProfile</h2>
        <div className="card w-96 p-5 bg-info shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="w-80 flex flex-col text-xl space-y-1">
              <div>
                <div className="flex flex-row mb-1">
                  <label className="mr-2 font-secondary" htmlFor="username">
                    Username:
                  </label>
                  <input
                    className="createprofile-input rounded pl-1"
                    type="text"
                    name="username"
                    placeholder="Username you will be using"
                    onChange={handleChange}
                    value={form.username}
                  />
                </div>
                <div className="flex flex-row mb-1">
                  <label className="mr-2 font-secondary" htmlFor="email">
                    E-mail:
                  </label>
                  <input
                    className="createprofile-input rounded pl-1"
                    type="text"
                    name="email"
                    placeholder="your email"
                    onChange={handleChange}
                    value={form.email}
                  />
                </div>
                <div className="flex flex-row mb-1">
                  <label className="mr-2 font-secondary" htmlFor="Location">
                    Location:
                  </label>
                  <input
                    className="createprofile-input rounded pl-1"
                    type="text"
                    name="location"
                    placeholder="location"
                    onChange={handleChange}
                    value={form.location}
                  />
                </div>
                <div className="mt-5">
                  <button className="btn">Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
