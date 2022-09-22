import React from 'react'

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
      <h2>
        {props.category} by {props.uploader}
        {/* need to work on joins to make props.uploader name rather than auth0 id */}
      </h2>
    </>
  )
}
