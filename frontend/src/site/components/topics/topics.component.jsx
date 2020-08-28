import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Button, Icon, Loader, Divider } from 'semantic-ui-react';
import { CreateBtnContainer, Topics, Topic, NameAndPagination, Name, PaginationContainer, NumberOfPage, AmmountComments, LastCommentatorAndDate, LastCommentator, Date, NoDataTitle, NoDataContainer } from './topics.styles';
import { fetchTopicsAsync } from 'redux/topic/topic.action';
import moment from 'utils/moment';
import { useState } from 'react';

const TopicsComponent = ({ slug, forumName, topics, isLoading, fetchTopics }) => {
  const [limit] = useState(20);

  useEffect(() => {
    fetchTopics(slug)
  }, [fetchTopics, slug]);

  if(isLoading !== false || topics === null) return <Loader active inline='centered' />

  if(topics.length === 0) return (
    <NoDataContainer>
      <CreateBtnContainer>
        <Button as={Link} to={`/channels/${slug}/create`} color='black'>
          <Icon name='edit' /> Создать
        </Button>
      </CreateBtnContainer>
      <NoDataTitle>Не создано ни одной темы!</NoDataTitle>
    </NoDataContainer>
  )

  return (
    <React.Fragment>
      <Header as='h1'>Форум: {forumName}</Header>
      <CreateBtnContainer>
        <Button as={Link} to={`/channels/${slug}/create`} color='black'>
          <Icon name='edit' /> Создать
        </Button>
      </CreateBtnContainer>
      <Divider />
      <Topics>
        {topics.map(topic => {
          const allPages = topic.total_comments !== 0 ? Math.ceil(topic.total_comments/limit) : 0;
          const arrayPaginate = Array(allPages).fill().map((x,i)=>i+1)
          return (
            <React.Fragment key={topic.topic_id}>
            <Topic>
              <NameAndPagination>
                <Name as={Link} to={`/topics/${topic.topic_slug}`}>{topic.topic_name}</Name>
                {allPages !== 0 ? (
                  <PaginationContainer>
                    {arrayPaginate.slice(0, 3).map(item => (
                      <NumberOfPage key={item}>{item}</NumberOfPage>
                    ))}
                    {arrayPaginate.length > 3 ? (<NumberOfPage key={arrayPaginate.slice(-1)[0]}>{arrayPaginate.slice(-1)[0]}</NumberOfPage>) : null}
                  </PaginationContainer>
                  ) : (<PaginationContainer>Здесь нет записей</PaginationContainer>)
                }
              </NameAndPagination>
              <AmmountComments>
                <Icon name='comment'/>
                <div>{topic.total_comments}</div>
              </AmmountComments>
              {+topic.total_comments === 0 ? <LastCommentatorAndDate>no</LastCommentatorAndDate> : (
                <LastCommentatorAndDate>
                  <LastCommentator>{topic.user_nickname}</LastCommentator>
                  <Date>{moment(topic.last_comment_created_at).format('DD.MM.YYYY, HH:mm')}</Date>
                </LastCommentatorAndDate>
              )}
            </Topic>
            <Divider />
          </React.Fragment>
          )
        })}
      </Topics>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopicsComponent);