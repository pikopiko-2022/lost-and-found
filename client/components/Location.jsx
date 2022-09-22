import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addLocation } from '../apis/location'
import { updateLocation } from '../actions/location'

export default function Location() {
  const [form, setForm] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateLocation(currentLocation))
  }, [currentLocation])

  const handleChange = (e) => {
    setForm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(form)
    addLocation(form)
      .then((res) => {
        setCurrentLocation(res[0].formatted_address)
        dispatch(updateLocation(currentLocation))
      })
      .catch((err) => setErrorMsg(err.message))
    // add error handling for now results
  }
  console.log('Out: ' + currentLocation)
  return (
    <>
      <div>Location</div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="location">Enter location</label>
        <input
          type="text"
          name="location"
          id="location"
          onChange={handleChange}
          value={form}
        />
        <button>Add location</button>
      </form>
      {currentLocation && <div>{currentLocation}</div>}
    </>
  )
}
