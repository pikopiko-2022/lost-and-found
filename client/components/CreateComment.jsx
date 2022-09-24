import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../actions/posts'
import { addComment } from '../apis/comments.api'

export default function CreateComment(props) {
  const initialState = {
    comment: '',
  }
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialState)

  function changeHandler(e) {
    const { name, value } = e.target
    setFormData({
      post_id: props.postId,
      date_commented: new Date().toDateString(),
      [name]: value,
    })
  }

  function submitHandler(e) {
    e.preventDefault()
    addComment(formData)
    setFormData(initialState)
    dispatch(fetchPosts())
  }

  return (
    <>
      <form aria-label="commentForm" onSubmit={submitHandler}>
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
