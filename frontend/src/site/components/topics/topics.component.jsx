import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Item, Button, Icon, Loader } from 'semantic-ui-react';
import { CreateBtnContainer } from './topics.styles';
import { fetchTopicsAsync } from 'redux/topic/topic.action';

const Topics = ({ slug, forumName, topics, isLoading, fetchTopics }) => {
  useEffect(() => {
    fetchTopics(slug)
  }, [fetchTopics, slug]);

  if(isLoading !== false || topics === null) return <Loader active inline='centered' />
  if(topics.length === 0) return <div>No Data..</div>

  return (
    <React.Fragment>
      <Header as='h1'>Форум: {forumName}</Header>
      <CreateBtnContainer>
        <Button as={Link} to={`/channels/${slug}/create`} color='black'>
          <Icon name='edit' /> Создать
        </Button>
      </CreateBtnContainer>
      <Item.Group divided>
        {topics.map(topic => (
          <Item key={topic.id}>
            <Link to={`/topics/${topic.slug}`}>{topic.name}</Link>
          </Item>
        ))}
      </Item.Group>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  topics: state.topic.topics,
  isLoading: state.topic.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchTopics: (slug_channel) => dispatch(fetchTopicsAsync(slug_channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(Topics);