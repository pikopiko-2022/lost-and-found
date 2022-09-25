import React from 'react'
import Comments from './AllComments'
import CreateComment from './CreateComment'

export default function Post(props) {
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
      <p>Posted on: {new Date(props.datePosted).toDateString()}</p>
      <Comments comments={props.comments} />
      <CreateComment postId={props.id} />
    </>
  )
}
