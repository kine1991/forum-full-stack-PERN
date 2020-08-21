import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Loader, Header, Image, Divider, Message } from 'semantic-ui-react';

import { fetchTopicAsync } from 'redux/topic/topic.action';
import { TopicContainer, ChannelName, UserTitle } from './topic.styles';
import CommentsWrap from 'site/components/comments-wrap/comments-wrap.component';
import moment from 'utils/moment';

const Topic = ({ topic, isLoading, fetchTopic }) => {
  let { slug } = useParams();

  useEffect(() => {
    fetchTopic(slug);
  }, [fetchTopic, slug]);
  // console.log('isLoading - ', isLoading, '|', topic, ' - topic');

  if(isLoading !== false || topic === null) return (
    <TopicContainer>
      <Loader active inline='centered' />
    </TopicContainer>
  )

  return (
    <TopicContainer>
      <Message>
        <Header as='h3'>
            <Image circular src={topic.user_image_url} />
            <UserTitle>{topic.nickname}</UserTitle>
            <UserTitle>{moment(topic.topic_created_at).format('DD.MM.YYYY, HH:mm')}</UserTitle>
        </Header>
      </Message>
      <Header as='h1'>{topic.topic_name}</Header>
      <ChannelName as={Link} to={`/channels/${topic.channel_slug}`}>{topic.channel_name}</ChannelName>
      <Divider />
      <CommentsWrap slug={slug} />
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