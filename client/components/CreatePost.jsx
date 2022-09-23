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
    date: '',
    description: '',
    image_url: '',
    location: '',
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialState)

  function changeHandler(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function submitHandler(event) {
    event.preventDefault()
    const newData = { ...formData, location: currentLocation }
    dispatch(addNewPost(newData))
    setFormData(initialState)
    navigate('/')
  }
  return (
    <>
      <p>CreatePost</p>
      <form>
        <div>
          <label htmlFor="title">Title of post: </label>
          <input
            name="title"
            onChange={changeHandler}
            value={formData.title}
          ></input>
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
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            name="description"
            onChange={changeHandler}
            value={formData.description}
          ></input>
        </div>
        <div>
          <label htmlFor="image_url">Image link: </label>
          <input
            name="image_url"
            onChange={changeHandler}
            value={formData.image_url}
          ></input>
        </div>
      </form>
      <Location />
      <div>
        <button onClick={submitHandler}>Save new post</button>
      </div>
    </>
  )
}
