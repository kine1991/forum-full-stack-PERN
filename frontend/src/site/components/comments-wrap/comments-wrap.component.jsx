import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Form, TextArea, Button, Divider } from 'semantic-ui-react';

import Comments from 'site/components/comments/comments.component';
import { CommentsWrapContainer, ButtonContainer } from './comments-wrap.styles';
import { createCommentAsync } from 'redux/comment/comment.action';
import { useHistory, useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const CommentsWrap = ({ slug, /*comments, isLoading, fetchCommentsByTopic,*/ createCommentIntoTopic }) => {
  let query = useQuery();
  const limit = 20;
  let history = useHistory();
  let location = useLocation();
  let currentPage = query.get('page') ? query.get('page') : 1;
  const [content, setContent] = useState('');
  const [triggerAfterCreated, setTriggerAfterCreated] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    createCommentIntoTopic({ slug, content }).then(response => {
      const allComments = response.data.all_comments;
      const lastPage = Math.ceil(allComments/limit);
      if(lastPage > currentPage) {
        history.push({
          path: location.pathname,
          search: `page=${lastPage}`
        })
      };
    });
    setContent('');
    setTriggerAfterCreated(!triggerAfterCreated);
  }

  return (
    <CommentsWrapContainer>
      <Comments triggerAfterCreated={triggerAfterCreated}/>
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