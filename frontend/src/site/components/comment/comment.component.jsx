import React from 'react';
import { Icon, Comment, Divider } from 'semantic-ui-react';
import moment from 'utils/moment';

const CommentComponent = ({ comment }) => {
  console.log('comment', comment);
  const commentDate = moment(comment.comment_created_at).fromNow();
  return (
    <Comment.Group>
      <Comment>
        <Comment.Avatar as='a' src={comment.user_image_url} />
        <Comment.Content>
          <Comment.Author>{comment.user_nickname}</Comment.Author>
          <Comment.Metadata>
            <div>{commentDate}</div>
            <div>
              <Icon name='star' />3 Faves
            </div>
          </Comment.Metadata>
          <Comment.Text>{comment.comment_content}</Comment.Text>
        </Comment.Content>
      </Comment>
      <Divider />
    </Comment.Group>
  )
}

export default CommentComponent;