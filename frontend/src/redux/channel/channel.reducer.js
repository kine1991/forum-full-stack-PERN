import channelTypes from './channel.types';

const INITIAL_STATE = {
  channels: null,
  channel: null,
  isLoading: null,
  error: null
}

const channelReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    // CREATE_CHANNEL
    case channelTypes.CREATE_CHANNEL_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case channelTypes.CREATE_CHANNEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        channel: action.payload
      }
    case channelTypes.CREATE_CHANNEL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    // FETCH_CHANNELS
    case channelTypes.FETCH_CHANNELS_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case channelTypes.FETCH_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: action.payload,
        isLoading: false,
        error: null
      }
    case channelTypes.FETCH_CHANNELS_FAILURE:
      return {
        ...state,
        channels: null,
        isLoading: false,
        error: action.payload
      }
    
    default:
      return state;
  }
}

export default channelReducer;