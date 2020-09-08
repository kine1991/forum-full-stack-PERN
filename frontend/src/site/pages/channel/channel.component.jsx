import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Image, Header, Divider, Loader, Button, Icon } from 'semantic-ui-react';

import { ChannelContainer, Description } from './channel.styles';
import { fetchChannelBySlugAsync } from 'redux/channel/channel.action';
import { clearAsync } from 'redux/topic/topic.action';
import Topics from 'site/components/topics/topics.component';
import PageNotFound from 'shared/components/page-not-found/page-not-found.component';

const Channel = ({ channel, isLoading, error, fetchChannel, clearTopic }) => {
  const history = useHistory();
  let { slug } = useParams();

  useEffect(() => {
    fetchChannel(slug);
  }, [fetchChannel, slug]);

  if(error) {
    const status = error.status;
    const message = error.data.errors[0].message;
    console.log(message);
    if(status === 404) return <PageNotFound message={message} />
  }

  if(isLoading !== false || channel === null) return <Loader active inline='centered' />

  const handleBack = () => {
    clearTopic();
    history.push('/channels')
  }

  return (
    <ChannelContainer>
      <Button size='tiny' onClick={() => handleBack()}><Icon name='left arrow'/>Назад</Button>
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
  fetchChannel: (slug) => dispatch(fetchChannelBySlugAsync(slug)),
  clearTopic: () => dispatch(clearAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
