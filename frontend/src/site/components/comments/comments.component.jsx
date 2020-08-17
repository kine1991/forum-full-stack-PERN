import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Form, TextArea, Button, Loader, Divider } from 'semantic-ui-react';

import axios from 'axios';
import CommentComponent from 'site/components/comment/comment.component';
import { ButtonContainer, CommentsContainer, CommentsSection } from './comments.styles';
import { fetchCommentsAsync } from 'redux/comment/comment.action';

const Comments = ({ slug, comments, isLoading, fetchCommentsByTopic }) => {
  const [content, setContent] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    console.log('content', content);

    axios.post('/api/comments', { content, slug })
  }

  useEffect(() => {
    fetchCommentsByTopic(slug);
  }, [fetchCommentsByTopic]);

  console.log('comments', comments);

  if(isLoading !== false) return <Loader active inline='centered' />

  return (
    <div>
      <CommentsSection>
        {comments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </CommentsSection>
      <Divider />
      <Form onSubmit={handleSubmit}>
        <TextArea 
          rows={6} 
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder='Оставте коментарий' 
        />
        <ButtonContainer>
          <Button primary>Отправить</Button>
        </ButtonContainer>
      </Form>
    </div>
  )
}

const mapStateToProps = state => ({
  comments: state.comment.comments,
  isLoading: state.comment.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchCommentsByTopic: (slug) => dispatch(fetchCommentsAsync(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);