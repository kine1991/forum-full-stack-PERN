import axios from 'axios';
import commentTypes from './comment.types';

// FETCH_COMMENTS
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

export const fetchCommentsAsync = ({ slug, page, limit }) => async dispatch => {
  dispatch(fetchCommentsStart());
  try {
    const comments = await axios.get(`/api/comments/by_topic/${slug}`, {
      params: {
        page,
        limit
      }
    });
    dispatch(fetchCommentsSuccess(comments.data));
  } catch (error) {
    console.log('error', error.response.data);
    dispatch(fetchCommentsFailure(error.response.data));
  }
};

// CREATE_COMMENT
const createCommentStart = () => ({
  type: commentTypes.CREATE_COMMENT_START
});

const createCommentSuccess = data => ({
  type: commentTypes.CREATE_COMMENT_SUCCESS,
  payload: data
});

const createCommentFailure = error => ({
  type: commentTypes.CREATE_COMMENT_FAILURE,
  payload: error
});

export const createCommentAsync = ({ content, slug }) => async dispatch => {
  dispatch(createCommentStart());
  try {
    await axios.post(`/api/comments/by_topic/${slug}`, { content }, {
      withCredentials: true
    });
    const comments = await axios.get(`/api/comments/by_topic/${slug}`);
    dispatch(createCommentSuccess(comments.data));
    return comments;
  } catch (error) {
    console.log('error', error);
    dispatch(createCommentFailure(error.response.data));
  }
}

const clear = () => ({
  type: commentTypes.CLEAR
});

export const clearAsync = () => async dispatch => {
  dispatch(clear());
};