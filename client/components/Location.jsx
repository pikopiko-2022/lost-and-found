import React, { useState } from 'react'

import { addLocation } from '../apis/location'

export default function Location() {
  const [form, setForm] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(form)
    addLocation(form)
      .then((res) => {
        // set post location
        setCurrentLocation(res[0].formatted_address)
      })
      .catch((err) => setErrorMsg(err.message))
    // add error handling for now results
  }

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
