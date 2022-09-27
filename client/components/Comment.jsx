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
        <div className="bg-base-100 pl-1 py-1 rounded">
          <b>{props.commenter}:</b> <span>{props.comment}</span>
        </div>
        <div className="flex justify-end text-xs mb-3 ">
          <i>27.09.2022</i>

          {/* {new Date(props.commentDate).toDateString()}
          {user.id == props.userId && (
            <button onClick={onClickDeleteComment}>Delete comment</button>
          )} */}
        </div>
      </li>
    </>
  )
}
