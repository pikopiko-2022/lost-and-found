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
        <div className="flex flex-row justify-between items-center">
          <h2 className="card-title py-4 px-8">{props.title}</h2>
          {props.category == 'Lost' && (
            <div className="bg-secondary rounded-full p-2 mr-3 w-20 text-center">
              {props.category}
            </div>
          )}
          {props.category == 'Found' && (
            <div className="bg-primary rounded-full p-2 mr-3 w-20 text-center">
              {props.category}
            </div>
          )}
        </div>

        <figure>
          <img
            className="object-cover h-48 w-96 "
            style={{ height: '400px' }}
            src={props.image}
            alt={props.title}
          ></img>
        </figure>
        <div className="card-body">
          <div className="text-lg">
            <p>Location: {props.location}</p>
          </div>

          <p>
            {props.category} by <i>{props.uploader}</i> on:{' '}
            {new Date(props.dateLostOrFound).toDateString()}
          </p>
          <hr />
          <div className="text-base">
            <p>{props.description}</p>
          </div>

          <div>
            <div className="card-actions mt-3">
              {user.id == props.uploaderId && (
                <>
                  <button
                    className="hover:underline"
                    onClick={() => navigate(`/posts/edit/${props.id}`)}
                  >
                    Edit post
                  </button>
                  <button
                    className="hover:underline"
                    onClick={() => dispatch(deletePostByPostId(props.id))}
                  >
                    Delete Post
                  </button>
                </>
              )}
            </div>

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
