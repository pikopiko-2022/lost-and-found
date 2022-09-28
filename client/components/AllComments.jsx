import React, { useState } from 'react'

import Comment from './Comment'

function AllComments(props) {
  const [commentsVisible, setCommentsVisble] = useState(false)

  function toggleComments() {
    setCommentsVisble((value) => !value)
  }

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="my-5">
            {props.comments.length > 0 && (
              <p>
                {props.comments.length} Comment
                {props.comments.length > 1 && <span>s</span>}
              </p>
            )}
          </div>
          <div>
            {!commentsVisible && props.comments.length > 0 && (
              <button className="btn btn-xs pl-1 my-5" onClick={toggleComments}>
                View Comments
              </button>
            )}
            {commentsVisible && (
              <button className="btn btn-xs pl-1 my-5" onClick={toggleComments}>
                Hide Comments
              </button>
            )}
          </div>
        </div>

        <div>
          {commentsVisible && (
            <>
              <ul className="list-outside text-left">
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
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AllComments
