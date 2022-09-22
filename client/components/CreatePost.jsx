import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addNewPost } from '../actions/posts'

export default function CreatePost() {
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
    dispatch(addNewPost(formData))
    setFormData(initialState)
    navigate('/')
  }
  return (
    <>
      <p>CreatePost</p>
      <form>
        <p>
          <label htmlFor="title">Title of post: </label>
          <input
            name="title"
            onChange={changeHandler}
            value={formData.title}
          ></input>
        </p>
        <p>
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
        </p>
        <p>
          <label htmlFor="date">Date lost or found: </label>
          <input
            type="date"
            name="date"
            onChange={changeHandler}
            value={formData.date}
          ></input>
        </p>
        <p>
          <label htmlFor="description">Description: </label>
          <input
            name="description"
            onChange={changeHandler}
            value={formData.description}
          ></input>
        </p>
        <p>
          <label htmlFor="image_url">Image link: </label>
          <input
            name="image_url"
            onChange={changeHandler}
            value={formData.image_url}
          ></input>
          <label htmlFor="location">Location: </label>
          <input
            name="location"
            onChange={changeHandler}
            value={formData.location}
          ></input>
        </p>
        <p>
          <button onClick={submitHandler}>Save new post</button>
        </p>
      </form>
    </>
  )
}
