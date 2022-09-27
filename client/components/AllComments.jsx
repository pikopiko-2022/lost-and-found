import React, { useState } from 'react'

import Comment from './Comment'

function AllComments(props) {
  const [commentsVisible, setCommentsVisble] = useState(false)

  function toggleComments() {
    setCommentsVisble((value) => !value)
  }

  return (
    <>
<<<<<<< HEAD
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
=======
      <p>{props.comments.length} comments</p>
      {props.comments.map((comment) => (
        <Comment
          key={comment.commentId}
          commentId={comment.commentId}
          commenter={comment.username}
          userId={comment.userId}
          commentDate={comment.dateCommented}
          comment={comment.comment}
          postId={comment.post_id}
        />
      ))}
>>>>>>> a2c2cbf71cfdad9ae4e65644652be8b1139cbdb7
    </>
  )
}

export default AllComments
