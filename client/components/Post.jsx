import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AllComments from './AllComments'
import CreateComment from './CreateComment'
import { deletePostByPostId } from '../actions/posts'

export default function Post(props) {
  const user = useSelector((state) => state.usersReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <div className="card card-compact w-96 bg-info shadow-xl  m-6 ">
        <h2 className="card-title py-4 px-8">
          {props.title}
          <div className="badge badge-secondary"> {props.category}</div>
        </h2>
        <figure>
          <img
            className="object-cover h-48 w-96 "
            style={{ height: '400px' }}
            src={props.image}
            alt={props.title}
          ></img>
        </figure>
        <div className="card-body">
          <p>{props.description}</p>
          <div>
            <div className="card-actions">
              {user.id == props.uploaderId && (
                <>
                  <button
                    className="badge badge-outline"
                    onClick={() => navigate(`/posts/edit/${props.id}`)}
                  >
                    Edit post
                  </button>
                  <button
                    className="badge badge-outline"
                    onClick={() => dispatch(deletePostByPostId(props.id))}
                  >
                    Delete Post
                  </button>
                </>
              )}
            </div>

            <p>Posted on: {new Date(props.datePosted).toDateString()}</p>
            <div>
              <AllComments comments={props.comments} />
              <CreateComment postId={props.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

{
  /* <h3>
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
          <button onClick={() => navigate(`/posts/edit/${props.id}`)}>
            Edit post
          </button>
          <button onClick={() => dispatch(deletePostByPostId(props.id))}>
            Delete Post
          </button>
        </div>
      )}
      <p>Posted on: {new Date(props.datePosted).toDateString()}</p>
      <Comments comments={props.comments} />
      <CreateComment postId={props.id} /> */
}
