import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Image, Header, Divider } from 'semantic-ui-react';

import { ChannelContainer, Description } from './channel.styles';
import { fetchChannelAsync } from 'redux/channel/channel.action';
import Topics from 'site/components/topics/topics.component';

const Channel = ({ channel, fetchChannel }) => {
  let { slug } = useParams();
  // console.log('slug', slug);
  // console.log('ddd');

  useEffect(() => {
    fetchChannel(slug);
  }, [fetchChannel]);

  if(!channel) return (<div>Loading...</div>)


  return (
    <ChannelContainer>
      <Header as='h1'>{channel.name}</Header>
      <Image src={channel.image_url_channel} fluid />
      <Description>{channel.description}</Description>
      <Divider />
      <Topics slug={slug} forumName={channel.name} />
    </ChannelContainer>
  )
}

const mapStateToProps = state => ({
  channel: state.channel.channel
});

const mapDispatchToProps = dispatch => ({
  fetchChannel: (slug) => dispatch(fetchChannelAsync(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
