import channelTypes from './channel.types';
import axios from 'axios';

// CREATE_CHANNEL
const createChannelStart = () => ({
  type: channelTypes.CREATE_CHANNEL_START
});

const createChannelSuccess = channel => ({
  type: channelTypes.CREATE_CHANNEL_SUCCESS,
  payload: channel
});

const createChannelFailure = error => ({
  type: channelTypes.CREATE_CHANNEL_FAILURE,
  payload: error
});

export const createChannelAsync = ({ name, description, image_url_channel }) => async dispatch => {
  dispatch(createChannelStart());

  try {
    const channel = await axios.post('/api/forums/channels', { name, description, image_url_channel }, {
      withCredentials: true
    });
    // console.log('channel', channel.data.channel);
    dispatch(createChannelSuccess(channel.data.channel));
  } catch (error) {
    console.log('error', error.response);
    dispatch(createChannelFailure(error.response));
  }
} 

// FETCH_CHANNELS
const fetchChannelsStart = () => ({
  type: channelTypes.FETCH_CHANNELS_START
});

const fetchChannelsSuccess = channels => ({
  type: channelTypes.FETCH_CHANNELS_SUCCESS,
  payload: channels
});

const fetchChannelsFailure = error => ({
  type: channelTypes.FETCH_CHANNELS_FAILURE,
  payload: error
});

export const fetchChannelsAsync = ({ page, limit }) => async dispatch => {
  dispatch(fetchChannelsStart());
  try {
    const channels = await axios.get('/api/forums/channels', {
      params: {
        page,
        limit
      }
    });
    dispatch(fetchChannelsSuccess(channels.data));
  } catch (error) {
    dispatch(fetchChannelsFailure(error.response));
  }
}

// FETCH_CHANNEL
const fetchChannelStart = () => ({
  type: channelTypes.FETCH_CHANNEL_START
});

const fetchChannelSuccess = channel => ({
  type: channelTypes.FETCH_CHANNEL_SUCCESS,
  payload: channel
});

const fetchChannelFailure = error => ({
  type: channelTypes.FETCH_CHANNEL_FAILURE,
  payload: error
});

export const fetchChannelAsync = slug => async dispatch => {
  dispatch(fetchChannelStart());

  try {
    const channel = await axios.get(`/api/forums/channels/${slug}`);
    dispatch(fetchChannelSuccess(channel.data.channel));
  } catch (error) {
    dispatch(fetchChannelFailure(error.response));
  }
}

export const clearAsync = () => ({
  type: channelTypes.CLEAR
});

// export const clearAsync = () => async dispatch => {
//   dispatch(clear());
// };

// export const clearAsync = () => dispatch => {
//   dispatch(clear());
// };