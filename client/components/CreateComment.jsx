import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { fetchPosts } from '../actions/posts'
import { addComment } from '../apis/comments.api'

export default function CreateComment(props) {
  const initialState = {
    comment: '',
    date_commented: '',
    post_id: '',
  }
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)

  function changeHandler(e) {
    const { name, value } = e.target
    const post_id = props.postId
    const date_commented = new Date(Date.now())
    setFormData({
      post_id: post_id,
      date_commented: date_commented,
      [name]: value,
    })
  }

  async function submitHandler(e) {
    e.preventDefault()
    await addComment(formData)
    setFormData(initialState)
    dispatch(fetchPosts())
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <p>
          <label htmlFor="comment">Comment:</label>
          <input
            name="comment"
            onChange={changeHandler}
            value={formData.comment}
          ></input>
        </p>

        <p>
          <button type="submit">Add Comment</button>
        </p>
      </form>
    </>
  )
}
