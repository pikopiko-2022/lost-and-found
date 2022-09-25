import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Comments from './AllComments'
import CreateComment from './CreateComment'
import { deletePostByPostId } from '../actions/posts'

export default function Post(props) {
  const user = useSelector((state) => state.usersReducer)
  const dispatch = useDispatch()

  return (
    <>
      <h3>
        {props.category}: {props.title}
      </h3>
      <img
        style={{ height: '400px' }}
        src={props.image}
        alt={props.title}
      ></img>
      <p>{props.description}</p>
      <p>
        {props.category} by {props.uploader} in {props.location} on{' '}
        {new Date(props.dateLostOrFound).toDateString()}
      </p>
      {user.id == props.uploaderId && (
        <div>
          <button onClick={() => dispatch(deletePostByPostId(props.id))}>
            Delete Post
          </button>
        </div>
      )}
      <p>Posted on: {new Date(props.datePosted).toDateString()}</p>
      <Comments comments={props.comments} />
      <CreateComment postId={props.id} />
    </>
  )
}
