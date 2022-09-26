import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editPostByPostId } from '../actions/posts'

export default function EditPost() {
  const params = useParams()
  const postId = params.postId
  const posts = useSelector((state) => state.postsReducer)

  const targetPost = posts.find((post) => post.id === Number(postId))

  const initialState = {
    title: targetPost.title,
    description: targetPost.description,
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
    dispatch(editPostByPostId(formData, postId))
    setFormData(initialState)
    navigate('/')
  }

  return (
    <>
      <h3>Edit post</h3>
      <form>
        <div>
          <label htmlFor="title">Title of post:</label>
          <input
            id="title"
            type="text"
            name="title"
            onChange={changeHandler}
            value={formData.title}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text-area"
            name="description"
            onChange={changeHandler}
            value={formData.description}
          ></input>
        </div>
        <button onClick={submitHandler}>Save</button>
      </form>
    </>
  )
}
