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
    date_lostOrFound: '',
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
      <div className="flex flex-col w-full justify-center mr-48">
        <h3 className="mb-5 text-2xl flex justify-center">Create Post</h3>
        <form
          className="px-4 my-10 max-w-3x mx-auto space-y-6"
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="title">Title of post: </label>
            <input
              className="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              name="title"
              onChange={changeHandler}
              value={formData.title}
            />
          </div>
          <div>
            <label htmlFor="category">Lost or Found: </label>
            <select
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
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
              className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
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
        <div className="flex justify-center">
          <Location />
        </div>

        <div className="flex justify-center mb-10">
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
            className="w-30 h-10 btn rounded btn-secondary"
          >
            Save new post
          </button>
        </div>
      </div>
    </>
  )
}
