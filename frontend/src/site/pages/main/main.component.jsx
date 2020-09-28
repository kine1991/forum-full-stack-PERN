import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchChannelsAsync, fetchSixLastChannels } from 'redux/channel/channel.action';
import { MainContainer, MainSection, CommentsSection, ButtonContainer, Card2Image, Card2, Card2Content, GridContainer, CardImage, CardName, CardDescription, Search, SearchContainer, SearchSpace, CommentTitle } from './main.styles';
import CommentMiniCard from 'site/components/comment-mini-card/comment-mini-card.component';
import Button from 'shared/components/button/button.component';
import { fetchLastComments } from 'redux/comment/comment.action';
import { Input } from 'shared/components/input/input.styles';
import SearchContent from 'site/components/search-content/search-content.component';
import useVisibilityComponent from 'hooks/useVisibilityComponent';


const Main = () => {
  const history = useHistory();
  const { ref, isVisibleComponent, setIsVisibleComponent } = useVisibilityComponent(false);
  const [comments, setComments] = useState(null);
  const [channels, setChannels] = useState(null);
  const [page, setPage] = useState(1);
  const [term, setTerm] = useState('');
  
  useEffect(() => {
    fetchSixLastChannels().then(response => {
      setChannels(response.data.channels);
    }).catch(error => {console.log('error@@main#fetchSixLastChannels', error);});
  }, [setChannels]); 

  useEffect(() => {
    fetchLastComments({ page, limit: 20 }).then(response => {
      setComments(response.data.comments);
    }).catch(error => {console.log('error@@main#fetchLastComments', error);})
  }, [setComments, page]);

  useEffect(() => {
    if(term) {
      setIsVisibleComponent(true);
    } else {
      setIsVisibleComponent(false);
    }
  }, [term, setIsVisibleComponent]);

  const showMoreComments = () => {
    fetchLastComments({ page: page + 1, limit: 20 }).then(response => {
      setPage(page + 1);
      setComments([
        ...comments,
        ...response.data.comments
      ]);
    }).catch(error => {console.log('error@@main', error);})
  }

  const searchChannel = () => {
    history.push({
      pathname: '/channels',
      search: `?term=${term}`
    });
    // history.push({
    //   pathname: '/channels',
    //   search: `?term=${term}`
    // })
    // console.log('!', term, searchBy)
    // fetchChannelsByTerm(term, {searchBy}).then(response => {
    //   console.log('response@', response)
    // });
  }

  return (
    <MainContainer>
      <MainSection>
        <SearchContainer>
          <h1>Поиск</h1>
          <Search>
            <Input fullWidth value={term} onChange={(e => setTerm(e.target.value))}/>
            <SearchSpace />
            <Button content='Искать' onClick={searchChannel} rounded padding='1rem 1.5rem' />
          </Search>
            {isVisibleComponent ? <SearchContent ref={ref} term={term} /> : null}
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
        <CommentTitle>Последнии коментарии</CommentTitle>
        <React.Fragment>
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
        </React.Fragment>
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