import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../actions/posts'
import { addComment } from '../apis/comments'

export default function CreateComment(props) {
  const user = useSelector((state) => state.usersReducer)
  const initialState = {
    comment: '',
  }
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialState)

  function changeHandler(e) {
    const { name, value } = e.target
    setFormData({
      post_id: props.postId,
      commenter_id: user.id,
      date_commented: Date.now(),
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
            data-testid="testComment"
            id="comment"
            name="comment"
            onChange={changeHandler}
            value={formData.comment}
          ></input>
        </p>
        <p>
          <button type="submit" className="btn btn-xs pl-1 my-5 bg-primary">
            Add Comment
          </button>
        </p>
      </form>
    </>
  )
}
