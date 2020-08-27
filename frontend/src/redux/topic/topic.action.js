import axios from 'axios';

import topicTypes from './topic.types';

// FETCH_TOPICS
const fetchTopicsStart = () => ({
  type: topicTypes.FETCH_TOPICS_START
});

const fetchTopicsSuccess = data => ({
  type: topicTypes.FETCH_TOPICS_SUCCESS,
  payload: data
});

const fetchTopicsFailure = error => ({
  type: topicTypes.FETCH_TOPICS_FAILURE,
  payload: error
});

export const fetchTopicsAsync = channel_slug => async dispatch => {
  dispatch(fetchTopicsStart());

  try {
    const topics = await axios.get(`/api/forums/topics/by_channel_slug/${channel_slug}`);
    dispatch(fetchTopicsSuccess(topics.data.topics));
  } catch (error) {
    console.log('error', error.response.data);
    dispatch(fetchTopicsFailure(error.response.data));
  }
}

// FETCH_TOPIC
const fetchTopicStart = () => ({
  type: topicTypes.FETCH_TOPIC_START
});

const fetchTopicSuccess = data => ({
  type: topicTypes.FETCH_TOPIC_SUCCESS,
  payload: data
});

const fetchTopicFailure = error => ({
  type: topicTypes.FETCH_TOPIC_FAILURE,
  payload: error
});

export const fetchTopicAsync = slug => async dispatch => {
  dispatch(fetchTopicStart());

  try {
    const topic = await axios.get(`/api/forums/topics/${slug}`);
    dispatch(fetchTopicSuccess(topic.data.topic));
    // console.log('topic', topic);
  } catch (error) {
    console.log('error', error.response.data);
    dispatch(fetchTopicFailure(error.response.data));
  }
}

// CREATE_TOPIC
const createTopicStart = () => ({
  type: topicTypes.CREATE_TOPIC_START
});

const createTopicSuccess = data => ({
  type: topicTypes.CREATE_TOPIC_SUCCESS,
  payload: data
});

const createTopicFailure = error => ({
  type: topicTypes.CREATE_TOPIC_FAILURE,
  payload: error
});

export const createTopicAsync = ({ name, channel_slug }) => async dispatch => {
  dispatch(createTopicStart());
  console.log('cre', name, channel_slug)
  try {
    const topic = await axios.post(`/api/forums/topics/by_channel_slug/${channel_slug}`, { name }, {
      withCredentials: true
    })
    console.log('cre topi', topic)
    // console.log('topic.data.topic', topic.data.topic);
    dispatch(createTopicSuccess(topic.data.topic))
  } catch (error) {
    console.log('error', error.response.data);
    dispatch(createTopicFailure(error.response.data));
  }
}

const clear = () => ({
  type: topicTypes.CLEAR
});

export const clearAsync = () => async dispatch => {
  dispatch(clear());
};
