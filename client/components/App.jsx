import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateProfile from './CreateProfileForm'
import Profile from './Profile'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { useCacheUser } from '../auth0-utils'
import { getUser } from '../apis/users'
import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'
import EditProfile from './EditProfile'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import Nav from './Nav'
import CheckAuthenticated from './CheckAuthenticated'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => getUser(token))
        .then((userInDb) => {
          dispatch(updateLoggedInUser(userInDb))
        })
        .catch((err) => console.error(err))
    }
  }, [isAuthenticated])
  return (
    <>
      <div className="app">
        <h1 className="flex justify-center items-center text-gray-800 text-3xl ">
          <i>Lost</i> and <b>found</b>
        </h1>
      </div>
      {isAuthenticated && <Nav />}
      <Routes>
        <Route path="/" element={<CheckAuthenticated />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/profile/editProfile" element={<EditProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/posts/edit/:postId" element={<EditPost />} />
      </Routes>
    </>
  )
}

export default App
