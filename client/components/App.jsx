import React, {useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateProfile from './CreateProfile'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { useCacheUser } from '../auth0-utils'
import { getUser } from '../apis/users'
import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'
import EditProfile from './EditProfile'
import CreatePost from './CreatePost'
import Nav from './Nav'
import SignIn from './SignIn'

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
        <h1>Lost and found</h1>
      </div>
      <Nav />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/profile/editProfile" element={<EditProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </>
  )
}

export default App
