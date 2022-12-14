import React from 'react'
import Comments from './AllComments'
import CreateComment from './CreateComment'

export default function Post(props) {
  return (
    <>
      <h1>
        {props.category}: {props.title}
      </h1>
      <img
        style={{ height: '400px' }}
        src={props.image}
        alt={props.title}
      ></img>
      <h3>{props.description}</h3>
      <h2>
        {props.category} by {props.uploader} in {props.location} on {props.date}
      </h2>
      <Comments comments={props.comments} />
      <CreateComment postId = {props.id}/>
    </>
  )
}
