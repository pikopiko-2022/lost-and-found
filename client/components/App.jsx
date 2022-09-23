import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateProfile from './CreateProfile'
import Profile from './Profile'

import EditProfile from './EditProfile'
import CreatePost from './CreatePost'
import Nav from './Nav'
import SignIn from './SignIn'

function App() {
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
