import React from 'react'
import Comments from './AllComments'
import CreateComment from './CreateComment'

export default function Post(props) {
  console.log(props)
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
        {props.dateLostOrFound}
      </p>
      <p>Posted on: {props.datePosted}</p>
      <Comments comments={props.comments} />
      <CreateComment postId={props.id} />
    </>
  )
}
