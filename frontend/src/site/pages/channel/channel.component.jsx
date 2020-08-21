import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Image, Header, Divider } from 'semantic-ui-react';

import { ChannelContainer, Description } from './channel.styles';
import { fetchChannelAsync } from 'redux/channel/channel.action';
import { clearAsync } from 'redux/topic/topic.action';
import Topics from 'site/components/topics/topics.component';
import PageNotFound from 'shared/components/page-not-found/page-not-found.component';

const Channel = ({ channel, isLoading, error, fetchChannel, clearTopic }) => {
  let { slug } = useParams();

  useEffect(() => {
    fetchChannel(slug);
  }, [fetchChannel, slug]);

  useEffect(() =>{
    return () => {
      clearTopic();
    };
  }, [clearTopic]);

  if(error) {
    const status = error.status;
    const message = error.data.errors[0].message;
    console.log(message);
    if(status === 404) return <PageNotFound message={message} />
    
  }

  // const status = 
console.log('err', error)
  if(isLoading !== false || channel === null) return (<div>Loading...</div>)


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
  channel: state.channel.channel,
  isLoading: state.channel.isLoading,
  error: state.channel.error,
});

const mapDispatchToProps = dispatch => ({
  fetchChannel: (slug) => dispatch(fetchChannelAsync(slug)),
  clearTopic: () => dispatch(clearAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
