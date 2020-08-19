import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Form, TextArea, Button, Divider } from 'semantic-ui-react';

import Comments from 'site/components/comments/comments.component';
import { CommentsWrapContainer, ButtonContainer } from './comments-wrap.styles';
import { createCommentAsync } from 'redux/comment/comment.action';

const CommentsWrap = ({ slug, /*comments, isLoading, fetchCommentsByTopic,*/ createCommentIntoTopic }) => {
  const [content, setContent] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    createCommentIntoTopic({ slug, content });
    setContent('');
  }

  return (
    <CommentsWrapContainer>
      <Comments />
      <Divider />
      <Form onSubmit={handleSubmit} style={{marginTop: '3rem'}}>
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
    </CommentsWrapContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  createCommentIntoTopic: (data) => dispatch(createCommentAsync(data))
});

export default connect(null, mapDispatchToProps)(CommentsWrap);