import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLocation } from '../apis/location'
import { updateLocation } from '../actions/location'

export default function Location() {
  const [form, setForm] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')
  const newLocation = useSelector((state) => state.locationReducer)
  const [isAdded, setIsAdded] = useState(false)
  const [isSearched, setIsSearched] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setForm(e.target.value)
    setErrorMsg('')
  }

  const handleSearch = (e) => {
    e.preventDefault()

    addLocation(form)
      .then((res) => {
        setCurrentLocation(res[0].formatted_address)
        setIsSearched(true)
      })
      .catch(() => {
        setErrorMsg('Please enter real address')
      })
  }

  const handleAddLocation = () => {
    dispatch(updateLocation(currentLocation))
    setForm('')
    setIsAdded(true)
    setIsSearched(false)
  }
  return (
    <>
      {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
      <form action="" onSubmit={handleSearch}>
        <label htmlFor="location">Enter location</label>
        <input
          className="h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          name="location"
          id="location"
          onChange={handleChange}
          value={form}
          data-testid="testBox"
        />
        <button className="btn btn-sm">Search</button>
      </form>
      {isSearched && (
        <>
          <div data-testid="testLocation">{currentLocation}</div>
          <button
            data-testid="testButton"
            onClick={handleAddLocation}
            className="btn btn-sm pl-1"
          >
            Add Location
          </button>
        </>
      )}
      {isAdded && <div>Location: {newLocation}</div>}
    </>
  )
}
