import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNewPost } from '../actions/posts'

export default function CreatePost() {
  const currentLocation = useSelector((state) => state.locationReducer)
  const initialState = {
    uploader_id: '',
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

  return <p>CreatePost</p>
}
