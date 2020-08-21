import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Item, Loader } from 'semantic-ui-react';
import { ChannelsContainer } from './channels.styles';
import { fetchChannelsAsync } from 'redux/channel/channel.action';
import Pagination from 'shared/components/pagination/pagination.component';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Channels = ({ channels, isLoading, fetchChannels, allChannels, channelsOnPage }) => { 
  let query = useQuery();
  let page = query.get('page') ? query.get('page') : 1;
  let limit = query.get('limit') ? query.get('limit') : 2;

  useEffect(() => {
    fetchChannels({ page, limit });
  }, [fetchChannels, page, limit]); 

// console.log(allChannels, channelsOnPage)
  if(isLoading !== false) return (
    <Loader active inline='centered' />
  )

  return (
    <ChannelsContainer>
      {channels && isLoading === false && (
        <Item.Group divided>
          {channels.map(channel => (
            <Item key={channel.id}>
              <Item.Image size='medium' src={channel.image_url_channel} />

              <Item.Content>
                <Item.Header as={Link} to={`/channels/${channel.slug}`}>{channel.name}</Item.Header>
                <Item.Description>
                  <p>{channel.description}</p>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )}
      {allChannels !== null && channelsOnPage !== null ? (
        <Pagination allItems={allChannels} limit={channelsOnPage} />
      ) : null }
    </ChannelsContainer>
  )
}

const mapStateToProps = state => ({
  channels: state.channel.channels,
  allChannels: state.channel.allChannels,
  channelsOnPage: state.channel.channelsOnPage,
  isLoading: state.channel.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: (data) => dispatch(fetchChannelsAsync(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);