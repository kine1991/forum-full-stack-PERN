import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Loader, Header, Image, Divider } from 'semantic-ui-react';

import { fetchTopicAsync } from 'redux/topic/topic.action';
import { TopicContainer, ChannelName, UserTitle } from './topic.styles';
import Comments from 'site/components/comments/comments.component';

const Topic = ({ topic, isLoading, fetchTopic }) => {
  let { slug } = useParams();

  console.log('topic', topic);
  // console.log('topic - ', topic, isLoading, '- isLoading');
  useEffect(() => {
    fetchTopic(slug);
  }, [fetchTopic]);

  if(isLoading !== false) return (
    <TopicContainer>
      <Loader active inline='centered' />
    </TopicContainer>
  )
  // if(!topic) return <h1>No Data</h1>

  return (
    <TopicContainer>
      {/* <Header as='h5'>{topic.created_at}</Header> */}
      <Header as='h3'>
          <Image circular src={topic.user_image_url} />
          <UserTitle>{topic.nickname}</UserTitle>
          <UserTitle>{topic.topic_created_at}</UserTitle>
      </Header>
      <Header as='h1'>{topic.topic_name}</Header>
      <ChannelName as={Link} to={`/channels/${topic.channel_slug}`}>{topic.channel_name}</ChannelName>
      <Divider />
      <Comments slug={slug} />
      
    </TopicContainer>
  )
}

const mapStateToProps = state => ({
  topic: state.topic.topic,
  isLoading: state.topic.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchTopic: (slug) => dispatch(fetchTopicAsync(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(Topic);