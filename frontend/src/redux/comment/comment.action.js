import axios from 'axios';
import commentTypes from './comment.types';

const fetchCommentsStart = () => ({
  type: commentTypes.FETCH_COMMENTS_START
});

const fetchCommentsSuccess = data => ({
  type: commentTypes.FETCH_COMMENTS_SUCCESS,
  payload: data
});

const fetchCommentsFailure = error => ({
  type: commentTypes.FETCH_COMMENTS_FAILURE,
  payload: error
});

export const fetchCommentsAsync = slug => async dispatch => {
  dispatch(fetchCommentsStart());

  try {
    const comments = await axios.get(`/api/comments/by_topic/${slug}`);
    dispatch(fetchCommentsSuccess(comments.data.comments));
  } catch (error) {
    console.log('error', error.response.data);
    dispatch(fetchCommentsFailure(error.response.data));
  }
};