import React, { useState } from 'react'

import Comment from './Comment'

function AllComments(props) {
  const [commentsVisible, setCommentsVisble] = useState(false)

  function toggleComments() {
    setCommentsVisble((value) => !value)
  }

  return (
    <>
      {props.comments.length > 0 && (
        <p>
          {props.comments.length} Comment
          {props.comments.length > 1 && <span>s</span>}
        </p>
      )}

      {!commentsVisible && props.comments.length > 0 && (
        <button onClick={toggleComments}>View Comments</button>
      )}

      {commentsVisible && (
        <>
          <button onClick={toggleComments}>Hide Comments</button>

          {props.comments.map((comment) => (
            <Comment
              key={comment.comment}
              commenter={comment.username}
              commentDate={comment.date_commented}
              comment={comment.comment}
              postId={comment.post_id}
            />
          ))}
        </>
      )}
    </>
  )
}

export default AllComments
