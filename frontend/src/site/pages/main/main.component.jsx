import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchChannelsAsync } from 'redux/channel/channel.action';
import { MainContainer, MainSection, CommentsSection, ButtonContainer, Card2Image, Card2, Card2Content, GridContainer, CardImage, CardName, CardDescription, Search, SearchContainer, SearchSpace } from './main.styles';
import CommentMiniCard from 'site/components/comment-mini-card/comment-mini-card.component';
import Button from 'shared/components/button/button.component';
import { fetchLastComments } from 'redux/comment/comment.action';
import { fetchSixLastChannels } from 'redux/channel/channel.action';
import { Input } from 'shared/components/input/input.styles';

const Main = () => { 
  const [comments, setComments] = useState(null);
  const [channels, setChannels] = useState(null);
  const [page, setPage] = useState(1);

  
  useEffect(() => {
    fetchSixLastChannels().then(response => {
      setChannels(response.data.channels);
    }).catch(error => {
      console.log('error@@main#fetchSixLastChannels', error);
    });
  }, [fetchSixLastChannels]); 

  useEffect(() => {
    // doFetch()

    fetchLastComments({ page, limit: 20 }).then(response => {
      setComments(response.data.comments);
      console.log('response@@', response.data.comments);
    }).catch(error => {
      console.log('error@@main#fetchLastComments', error);
    })
  }, [fetchLastComments]);


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
        <SearchContainer>
          <h1>Поиск</h1>
          <Search>
            <Input fullWidth />
            <SearchSpace />
            <Button content='Искать' />
          </Search>

        </SearchContainer>
        {channels === null ? (
          <div>Loading...</div>
        ) : (
          <React.Fragment>
            {channels.length === 0 ? (<div>Нету каналов</div>) : (
              <React.Fragment>
                <h1>6 недавно добавленных канала</h1>
                <GridContainer>
                  {channels.map(channel => (
                    <Card2 key={channel.id}>
                      <Card2Image>
                        <CardImage src={channel.image_url_channel} alt='img'/>
                      </Card2Image>
                      <Card2Content>
                        <CardName to={`/channels/${channel.slug}`}>{channel.name}</CardName>
                        <CardDescription>{channel.description.length < 140 ? channel.description : `${channel.description.slice(0, 140)}...`}</CardDescription>
                      </Card2Content>
                    </Card2>
                  ))}
                </GridContainer>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </MainSection>
      <CommentsSection>
        {comments === null ? (<div>Loading...</div>): (
          <React.Fragment>
            {comments.length === 0 ? (<div>Коментариев Нет!</div>) : (
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