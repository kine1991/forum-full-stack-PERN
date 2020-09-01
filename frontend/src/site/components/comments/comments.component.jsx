import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Icon, Comment, Divider, Loader } from 'semantic-ui-react';

import { NoDataTitle } from './comments.styles';
import moment from 'utils/moment';
import Pagination from 'shared/components/pagination/pagination.component';
import { fetchCommentsAsync } from 'redux/comment/comment.action';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Comments = ({ comments, isLoading, allComments, fetchCommentsByTopic, triggerAfterCreated }) => {
  let query = useQuery();
  let page = query.get('page') ? query.get('page') : 1;
  let limit = query.get('limit') ? query.get('limit') : 20;
  let { slug } = useParams();

  useEffect(() => {
    fetchCommentsByTopic({ slug, page, limit });
  }, [page, fetchCommentsByTopic, slug, limit, triggerAfterCreated]);

  if(isLoading !== false || comments === null) return <Loader active inline='centered' />
  if(isLoading !== true && allComments === 0) return <NoDataTitle>Нет ни одного коментария!</NoDataTitle>

  return (
    <React.Fragment>
      <Pagination allItems={allComments} limit={limit} />
      <Comment.Group>
        {comments.map(comment => {
          const commentDate = moment(comment.comment_created_at).fromNow();
          return (
            <div key={comment.comment_id}>
              <Comment>
                <Comment.Avatar as='a' src={comment.user_image_url} />
                <Comment.Content>
                  <Comment.Author>{comment.user_nickname}</Comment.Author>
                  <Comment.Metadata>
                    <div>{commentDate}</div>
                    <div>
                      <Icon name='star' />5 Faves
                    </div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.comment_content}</Comment.Text>
                </Comment.Content>
              </Comment>
              <Divider />
            </div>
          )
        })}
      </Comment.Group>
      <Pagination allItems={allComments} limit={limit} />
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  comments: state.comment.comments,
  allComments: state.comment.allComments,
  commentsOnPage: state.comment.commentsOnPage,
  limit: state.comment.limit,
  isLoading: state.comment.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchCommentsByTopic: (data) => dispatch(fetchCommentsAsync(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);