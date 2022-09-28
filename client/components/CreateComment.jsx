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
      <form
        className="flex flex-row justify-between items-center"
        aria-label="commentForm"
        onSubmit={submitHandler}
      >
        <div className="w-full">
          <input
            className="rounded w-full p-1"
            data-testid="testComment"
            id="comment"
            name="comment"
            onChange={changeHandler}
            value={formData.comment}
            placeholder="Write a comment..."
          ></input>
        </div>
        <div className="flex justify-end">
          {formData.comment != '' && (
            <button
              disabled={formData.comment == ''}
              type="submit"
              className="btn btn-xs ml-2 bg-primary"
            >
              Send
            </button>
          )}
        </div>
      </form>
    </>
  )
}
