import React from 'react'
import { useSelector } from 'react-redux'

export default function CreatePost() {
  const currentLocation = useSelector((state) => state.locationReducer)
  console.log('Hello', currentLocation)
  return (
    <>
      <p>Create Post</p>
      <p>{currentLocation}</p>
    </>
  )
}
