import React from 'react'

import Comment from './Comment'

function AllComments(props) {
  return (
    <>
      {props.comments.map((comment) => (
        <Comment
          key={comment.id}
          commenter={comment.commenter_id}
          commentDate={comment.dateCommented}
          comment={comment.comment}
          postId={comment.postId}
        />
      ))}
    </>
  )
}

export default AllComments
