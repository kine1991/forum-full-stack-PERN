import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Loader, Button, Icon } from 'semantic-ui-react';
import { ChannelsContainer, Card, CardImage, CardImageContainer, CardName, CardContent, CardDescription, ChannelsDoNotExists, GridContainer, Card2, TriggerView, Card2Image, Card2Content } from './channels.styles';
import { fetchChannelsAsync } from 'redux/channel/channel.action';
import Pagination from 'shared/components/pagination/pagination.component';
import PageNotFound from 'shared/components/page-not-found/page-not-found.component';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Channels = ({ channels, isLoading, error, fetchChannels, allChannels, channelsOnPage }) => { 
  const [isGridView, setIsGridView] = useState(false);
  let query = useQuery();
  let page = query.get('page') ? query.get('page') : 1;
  let limit = query.get('limit') ? query.get('limit') : 12;

  useEffect(() => {
    fetchChannels({ page, limit });
  }, [fetchChannels, page, limit]); 

  if(error && error.status === 404) return <PageNotFound message={error.data.errors[0].message} />

  if((isLoading !== false) && (channels === null)) return (
    <Loader active inline='centered' />
  );

  if(isLoading === false && channels && channels.length === 0) return <ChannelsDoNotExists>Ни одного канала не создано!</ChannelsDoNotExists>
  // console.log('channels', channels);
  return (
    <ChannelsContainer>
      <h1>Каналы: {allChannels}</h1>
      <TriggerView>
        <Button.Group basic icon>
          <Button active={isGridView} onClick={() => setIsGridView(true)}><Icon name='grid layout' /></Button>
          <Button active={!isGridView} onClick={() => setIsGridView(false)}><Icon name='list ul' /></Button>
        </Button.Group>
      </TriggerView>
      {isGridView ? (
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
      ) : (
        <React.Fragment>
          {channels.map(channel => (
            <Card key={channel.id}>
              <CardImageContainer>
                <CardImage src={channel.image_url_channel} alt='img'/>
              </CardImageContainer>
              <CardContent>
                <CardName to={`/channels/${channel.slug}`}>{channel.name}</CardName>
                <CardDescription>{channel.description.length < 300 ? channel.description : `${channel.description.slice(0, 300)}...`}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </React.Fragment>
      )}
      
      {allChannels === null || +allChannels === 0 ? null : <Pagination allItems={allChannels} limit={limit} /> }
    </ChannelsContainer>
  )
}

const mapStateToProps = state => ({
  channels: state.channel.channels,
  allChannels: state.channel.allChannels,
  channelsOnPage: state.channel.channelsOnPage,
  isLoading: state.channel.isLoading,
  error: state.channel.error
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: (data) => dispatch(fetchChannelsAsync(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);