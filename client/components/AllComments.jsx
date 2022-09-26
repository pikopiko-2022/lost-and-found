import React from 'react'

import Comment from './Comment'

function AllComments(props) {
  return (
    <>
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
    </>
  )
}

export default AllComments
