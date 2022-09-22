import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments } from '../actions/comments'

function Comments() {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments)
  useEffect(() => {
    dispatch(fetchComments())
  }, [])

  return (
    <>
      <p>Comments</p>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.commenterId}
          {comment.dateCommented}
          {comment.comment}
        </li>
      ))}
    </>
  )
}

export default Comments
