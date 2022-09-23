import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import LandingPage from './LandingPage'
// import { fetchFruits } from '../actions'
import { Routes, Route } from 'react-router-dom'
import CreateProfile from './CreateProfile'
import Profile from './Profile'
import UserHomePage from './UserHomePage'
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
