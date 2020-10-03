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

// FETCH_LAST_COMMENTS
export const fetchLastComments = ({ page = 1, limit = 20 }) => {
  return axios.get('/api/comments/last-comments', {
    params: {
      page,
      limit
    }
  });
}

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
    // console.log()
    const comments = await axios.get(`/api/comments/by_topic/${slug}`);
    dispatch(createCommentSuccess());
    return comments;
  } catch (error) {
    console.log('error', error);
    dispatch(createCommentFailure(error.response.data));
  }
}

// DELETE_COMMENT
const deleteCommentFailure = error => ({
  type: commentTypes.DELETE_COMMENT_FAILURE,
  payload: error
});

export const deleteCommentAsync = id => async dispatch => {
  try {
    await axios.delete(`/api/comments/${id}`);
  } catch (error) {
    dispatch(deleteCommentFailure(error));
  }
}

const clear = () => ({
  type: commentTypes.CLEAR
});

export const clearAsync = () => async dispatch => {
  dispatch(clear());
};