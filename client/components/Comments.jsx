import React from 'react'
import Comment from './Comment'

function Comments(props) {
  return (
    <>
      {props.comments.map((comment) => (
        <Comment
          key={comment.id}
          commenter={comment.commenterId}
          commentDate={comment.dateCommented}
          comment={comment.comment}
          postId={comment.postId}
        />
      ))}
    </>
  )
}

export default Comments
