import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../actions/posts'
import { deleteComment } from '../apis/comments'

export default function Comment(props) {
  const user = useSelector((state) => state.usersReducer)
  const dispatch = useDispatch()

  const onClickDeleteComment = () => {
    deleteComment(props.commentId)
    dispatch(fetchPosts())
  }

  return (
    <>
      <li>
        {props.commenter}: {props.comment}{' '}
        {new Date(props.commentDate).toDateString()}
        {user.id == props.userId && (
          <button onClick={onClickDeleteComment}>Delete comment</button>
        )}
      </li>
    </>
  )
}
