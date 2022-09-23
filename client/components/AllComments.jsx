import React from 'react'

import Comment from './Comment'

function AllComments(props) {
  return (
    <>
      {props.comments.map((comment) => (
        <Comment
          key={comment.id}
          commenter={comment.username}
          commentDate={comment.date_commented}
          comment={comment.comment}
          postId={comment.post_id}
        />
      ))}
    </>
  )
}

export default AllComments
