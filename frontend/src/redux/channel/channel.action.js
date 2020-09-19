import channelTypes from './channel.types';
import axios from 'axios';

// CREATE_CHANNEL
const createChannelStart = () => ({
  type: channelTypes.CREATE_CHANNEL_START
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
    return channel;
  } catch (error) {
    console.log('error', error.response);
    dispatch(createChannelFailure(error.response));
  }
} 

// EDIT_CHANNEL
const editChannelFailure = error => ({
  type: channelTypes.EDIT_CHANNEL_FAILURE
});

export const editChannelAsync = ({ id, ...body }) => async dispatch => {
  try {
    const editedChannel = await axios.put(`/api/forums/channels/${id}`, body, {
      withCredentials: true
    });
    return editedChannel;
  } catch (error) {
    dispatch(editChannelFailure(error.response));
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

export const fetchSixLastChannels = () => {
  return axios.get('/api/forums/channels?limit=6&order_by=desc');
}

export const fetchChannelsByTerm = (term, searchBy) => {
  return axios.post('/api/forums/channel-search', { term }, {
    params: {
      search_by: (searchBy === 'name' || searchBy === 'description') ? searchBy : undefined
    }
  });
}

export const fetchOwnChannelsAsync = (/*{ page, limit }*/) => async dispatch => {
  dispatch(fetchChannelsStart());
  try {
    const channels = await axios.get('/api/forums/own-channels');
    // const channels = await axios.get('/api/forums/channels', {
    //   params: {
    //     page,
    //     limit
    //   }
    // });
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

export const fetchChannelBySlugAsync = slug => async dispatch => {
  dispatch(fetchChannelStart());

  try {
    const channel = await axios.get(`/api/forums/channels/${slug}/by-slug`);
    dispatch(fetchChannelSuccess(channel.data.channel));
  } catch (error) {
    dispatch(fetchChannelFailure(error.response));
  }
}

export const fetchChannelByIdAsync = id => async dispatch => {
  dispatch(fetchChannelStart());

  try {
    const channel = await axios.get(`/api/forums/channels/${id}`);
    dispatch(fetchChannelSuccess(channel.data.channel));
  } catch (error) {
    dispatch(fetchChannelFailure(error.response));
  }
}

// TRASH CHANNEL
const trashChannelFailure = error => ({
  type: channelTypes.TRASH_CHANNEL_FAILURE,
  payload: error
});

export const trashChannelByIdAsync = channelId => async dispatch => {
  try {
    await axios.patch(`/api/forums/channels/${channelId}`);
  } catch (error) {
    dispatch(trashChannelFailure());
  }
}

// DELETE CHANNEL
const deleteChannelFailure = error => ({
  type: channelTypes.DELETE_CHANNEL_FAILURE,
  payload: error
});

export const deleteChannelByIdAsync = channelId => async dispatch => {
  try {
    await axios.delete(`/api/forums/channels/${channelId}`);
  } catch (error) {
    dispatch(deleteChannelFailure());
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