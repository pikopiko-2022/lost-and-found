import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNewPost } from '../actions/posts'
import Location from './Location'

export default function CreatePost() {
  const currentLocation = useSelector((state) => state.locationReducer)
  const initialState = {
    category: '',
    title: '',
    description: '',
    image_url: '',
    location: '',
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialState)
  const [selectedImage, setSelectedImage] = useState(null)

  function changeHandler(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function handleImageChange(e) {
    setSelectedImage(e.target.files[0])
  }
  function submitHandler(event) {
    event.preventDefault()
    const allFormData = new FormData()
    allFormData.append('title', formData.title)
    allFormData.append('category', formData.category)
    allFormData.append('date', formData.date)
    allFormData.append('description', formData.description)
    allFormData.append('image', selectedImage)
    allFormData.append('location', currentLocation)
    // const newData = { ...formData, location: currentLocation }
    dispatch(addNewPost(allFormData))
    setFormData(initialState)
    navigate('/')
  }

  return (
    <>
      <p>CreatePost</p>
      <form encType="multipart/form-data">
        <div>
          <label htmlFor="title">Title of post: </label>
          <input name="title" onChange={changeHandler} value={formData.title} />
        </div>
        <div>
          <label htmlFor="category">Lost or Found: </label>
          <select
            name="category"
            onChange={changeHandler}
            value={formData.category}
          >
            <option value=""></option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date lost or found: </label>
          <input
            type="date"
            name="date"
            onChange={changeHandler}
            value={formData.date}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            type="text-area"
            name="description"
            onChange={changeHandler}
            value={formData.description}
          />
        </div>

        <div>
          {selectedImage && (
            <div>
              <img
                alt="not found"
                width={'250px'}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedImage(null)
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="profile">Upload your photo</label>
          <input
            type="file"
            name="profile"
            id="profile"
            onChange={handleImageChange}
          />
        </div>
      </form>
      <Location />

      <div>
        <button onClick={submitHandler}>Save new post</button>
      </div>
    </>
  )
}
