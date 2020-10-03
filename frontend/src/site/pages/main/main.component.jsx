import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchChannelsAsync, fetchSixLastChannels } from 'redux/channel/channel.action';
import { MainContainer, MainSection, CommentsSection, Card2Image, Card2, Card2Content, GridContainer, CardImage, CardName, CardDescription, Search, SearchContainer, SearchSpace } from './main.styles';
import LastComments from 'site/components/last-comments/last-comments.component';
import Button from 'shared/components/button/button.component';
import { Input } from 'shared/components/input/input.styles';
import SearchContent from 'site/components/search-content/search-content.component';
import useVisibilityComponent from 'hooks/useVisibilityComponent';


const Main = () => {
  const history = useHistory();
  const { ref, isVisibleComponent, setIsVisibleComponent } = useVisibilityComponent(false);
  const [channels, setChannels] = useState(null);
  const [term, setTerm] = useState('');
  
  useEffect(() => {
    fetchSixLastChannels().then(response => {
      setChannels(response.data.channels);
    }).catch(error => {console.log('error@@main#fetchSixLastChannels', error);});
  }, [setChannels]); 

  useEffect(() => {
    if(term) {
      setIsVisibleComponent(true);
    } else {
      setIsVisibleComponent(false);
    }
  }, [term, setIsVisibleComponent]);

  const searchChannel = () => {
    history.push({
      pathname: '/channels',
      search: `?term=${term}`
    });
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
        <LastComments />
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