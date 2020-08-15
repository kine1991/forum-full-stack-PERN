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
    console.log('error', error.response.data);
    dispatch(createChannelFailure(error.response.data));
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

export const fetchChannelsAsync = () => async dispatch => {
  dispatch(fetchChannelsStart());
  try {
    const channels = await axios.get('/api/forums/channels');
    // console.log(channels.data.channels);
    dispatch(fetchChannelsSuccess(channels.data.channels));
  } catch (error) {
    console.log('error', error.response.data);
    dispatch(fetchChannelsFailure(error.response.data));
  }
}


// export const registerAsync = ({ nickname, email, password }) => async dispatch => {
//   dispatch(registerStart());

//   try {
//     const user = await axios.post('/api/users/sign-up', { nickname, email, password });
//     console.log('user', user.data.user);
//     dispatch(registerSuccess(user.data.user));
//   } catch (error) {
//     console.log('error', error.response.data);
//     dispatch(registerFailure(error.response.data));
//   }
// }