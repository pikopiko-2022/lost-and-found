import React from 'react'
import { useSelector } from 'react-redux'
export default function UserHomePage() {
  const currentLocation = useSelector((state) => state.locationReducer)
  console.log('Hello', currentLocation)
  return (
    <>
      <p>UserHomePage</p>
      <p>{currentLocation}</p>
    </>
  )
}
