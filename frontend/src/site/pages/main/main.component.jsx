import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchChannelsAsync } from 'redux/channel/channel.action';
import { MainContainer, MainSection, CommentsSection, ButtonContainer } from './main.styles';
import useFetch from 'hooks/useFetch';
import CommentMiniCard from 'site/components/comment-mini-card/comment-mini-card.component';
import Button from 'shared/components/button/button.component';
import { fetchLastComments } from 'redux/comment/comment.action';

const Main = ({ channels, fetchChannels }) => { 
  const [comments, setComments] = useState(null);
  const [page, setPage] = useState(1);
  // const [{ response: commentsRes, isLoading: commentIsLoading, error }, doFetch] = useFetch('/api/comments/last-comments');

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]); 

  useEffect(() => {
    // doFetch()

    fetchLastComments({ page, limit: 20 }).then(response => {
      setComments(response.data.comments);
      console.log('response@@', response.data.comments);
    }).catch(error => {
      console.log('error@@main', error);
    })
  }, []);

  // useEffect(() => {
  //   console.log('commentsRes', commentsRes);
  // }, [commentsRes]);



  // useEffect(() => {
  //   console.log('response', response);
  // }, [response]);

  const showMoreComments = () => {
    fetchLastComments({ page: page + 1, limit: 20 }).then(response => {
      setPage(page + 1);
      setComments([
        ...comments,
        ...response.data.comments
      ]);
    }).catch(error => {
      console.log('error@@main', error);
    })
  }

  return (
    <MainContainer>
      <MainSection>
        kk
      </MainSection>
      <CommentsSection>
        {comments === null ? (
          <div>...</div>
        ): (
          <React.Fragment>
            {comments.length === 0 ? (
              <div>Коментариев Нет!</div>
              ) : (
                <React.Fragment>
                  {comments.map((comment, i) => {
                    return (
                      <CommentMiniCard key={comment.id} {...comment} isEven={(i % 2) === 0} />
                    )
                  })}
                  <ButtonContainer>
                    <Button onClick={showMoreComments} content='показать больше'/>
                  </ButtonContainer>
                </React.Fragment>
              )}
          </React.Fragment>
        )}
      </CommentsSection>
    </MainContainer>
  )
}

const mapStateToProps = state => ({
  channels: state.channel.channels
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannelsAsync({}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);