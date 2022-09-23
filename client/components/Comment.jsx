import React from 'react'

export default function Comment(props) {
  console.log(props)
  return (
    <>
      <li>
        {props.commenter}: {props.comment}
      </li>
    </>
  )
}
