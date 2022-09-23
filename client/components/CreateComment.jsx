import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addComment } from '../apis/comments.api'

export default function CreateComment(props) {
  const initialState = {
    comment: '',
    date_commented: '',
    post_id: '',
  }
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)

  function changeHandler(e) {
    const { name, value } = e.target
    const post_id = props.id
    const date_commented = new Date(Date.now())
    setFormData({
      ...formData,
      [post_id]: props.id,
      [date_commented]: date_commented,
      [name]: value,
    })
  }

  function submitHandler(e) {
    e.preventDefault()
    addComment(formData)
    setFormData(initialState)
    navigate('/')
  }

  return (
    <>
      <form>
        <p>
          <label htmlFor="comment">Comment:</label>
          <input
            name="comment"
            onChange={changeHandler}
            value={formData.comment}
          ></input>
        </p>
        {/* <p>
          <label htmlFor="date_commented">Date:</label>
          <input
            name="date_commented"
            onChange={changeHandler}
            value={new Date(Date.now())}
            readOnly
          ></input>
        </p> */}
        <p>
          <button onClick={submitHandler}>Add Comment</button>
        </p>
      </form>
    </>
  )
}
