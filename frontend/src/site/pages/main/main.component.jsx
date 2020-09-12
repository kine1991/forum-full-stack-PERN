import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchChannelsAsync } from 'redux/channel/channel.action';
import { MainContainer, MainSection, CommentsSection } from './main.styles';
import useFetch from 'hooks/useFetch';
import CommentMiniCard from 'site/components/comment-mini-card/comment-mini-card.component';

const Main = ({ channels, fetchChannels }) => { 
  const [{ response: commentsRes, isLoading: commentIsLoading, error }, doFetch] = useFetch('/api/comments/last-comments');

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]); 

  useEffect(() => {
    doFetch();
  }, []);

  // useEffect(() => {
  //   console.log('response', response);
  // }, [response]);

  return (
    <MainContainer>
      <MainSection>
        kk
      </MainSection>
      <CommentsSection>
        {commentsRes === null ? (
          <div>...</div>
        ): (
          <React.Fragment>
            {commentsRes.comments.length === 0 ? (
              <div>Коментариев Нет!</div>
              ) : (
                <React.Fragment>
                  {commentsRes.comments.map(comment => {
                    return (
                      <CommentMiniCard key={comment.id} {...comment} />
                    )
                  })}
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