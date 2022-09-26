import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNewPost } from '../actions/posts'
import Location from './Location'

export default function CreatePost() {
  const currentLocation = useSelector((state) => state.locationReducer)
  const user = useSelector((state) => state.usersReducer)
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
    allFormData.append('uploader_id', user.id)
    dispatch(addNewPost(allFormData))
    setFormData(initialState)
    navigate('/')
  }

  function restrictDate() {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    const newMonth = month < 10 ? `0${month}` : month
    let year = date.getFullYear()
    let currentDate = `${year}-${newMonth}-${day}`
    return currentDate
  }

  return (
    <>
      <h3>Create Post</h3>
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
            max={restrictDate()}
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
                data-testid="testImage"
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
          <label htmlFor="photo">Upload your photo</label>
          <input
            data-testid="uploadImage"
            type="file"
            name="photo"
            id="photo"
            onChange={handleImageChange}
          />
        </div>
      </form>
      <Location />

      <div>
        <button
          disabled={
            !(
              formData.title &&
              formData.category &&
              formData.date &&
              formData.description &&
              currentLocation &&
              selectedImage
            )
          }
          onClick={submitHandler}
        >
          Save new post
        </button>
      </div>
    </>
  )
}
