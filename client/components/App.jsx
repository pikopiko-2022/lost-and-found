import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LandingPage from './LandingPage'
import { fetchFruits } from '../actions'
import { Routes, Route } from 'react-router-dom'
import CreateProfile from './CreateProfile'
import Profile from './Profile'
import UserHomePage from './UserHomePage'
import EditProfile from './EditProfile'
import CreatePost from './CreatePost'
import Nav from './Nav'

function App() {
  const fruits = useSelector((state) => state.fruits)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFruits())
  }, [])

  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>
          {fruits.map((fruit) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
      </div>
      <LandingPage />
      <Nav />
      <Routes>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/profile/editProfile" element={<EditProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </>
  )
}

export default App
