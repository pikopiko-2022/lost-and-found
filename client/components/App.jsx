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
import Footer from './Footer'
import DelayComponent from './DelayComponent'

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
      <div className="flex flex-col  justify-between min-h-screen">
        <div>
          <div className="app flex justify-center items-center m-10">
            <h1 className="text-5xl">
              <i>Lost</i> and <b>Found</b>
            </h1>
          </div>
          <div className="flex flex-row justify-between">
            {isAuthenticated && (
              <>
                <Nav />
              </>
            )}
            <Routes>
              <Route path="/" element={<CheckAuthenticated />} />
              <Route path="/createProfile" element={<CreateProfile />} />
              <Route path="/profile/editProfile" element={<EditProfile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/posts/edit/:postId" element={<EditPost />} />
            </Routes>
          </div>
        </div>

        {isAuthenticated && (
          <>
            <DelayComponent>
              <Footer />
            </DelayComponent>
          </>
        )}
      </div>
    </>
  )
}

export default App
