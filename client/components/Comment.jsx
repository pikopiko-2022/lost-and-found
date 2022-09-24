import React from 'react'

export default function Comment(props) {
  return (
    <>
      <li>
        {props.commenter}: {props.comment} {props.commentDate}
      </li>
    </>
  )
}
