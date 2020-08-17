import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div>
      Comment: {comment.content}
    </div>
  )
}


export default Comment;