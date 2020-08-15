import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Item, Loader, Dimmer } from 'semantic-ui-react';
// import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
// 

import { fetchChannelsAsync } from 'redux/channel/channel.action';
import { Link } from 'react-router-dom';

const Channels = ({ channels, isLoading, fetchChannels }) => { 
  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]); 

  if(isLoading !== false) return (
    <Loader active inline='centered' />
  )

  return (
    <div>
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
      Channels
    </div>
  )
}

const mapStateToProps = state => ({
  channels: state.channel.channels,
  isLoading: state.channel.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannelsAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);