import channelTypes from './channel.types';

const INITIAL_STATE = {
  channels: null,
  channel: null,
  allChannels: null,
  channelsOnPage: null,
  isLoading: null,
  error: null
}

const channelReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    // CREATE_CHANNEL
    case channelTypes.CREATE_CHANNEL_START:
      return {
        ...state,
        error: null,
        // isLoading: null,
        // channel: null
      }
    case channelTypes.CREATE_CHANNEL_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    // EDIT_CHANNEL
    case channelTypes.EDIT_CHANNEL_FAILURE:
      return {
        ...state,
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
        channels: action.payload.channels,
        allChannels: action.payload.all_channels,
        channelsOnPage: action.payload.channels_on_page,
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

    // FETCH_CHANNEL
    case channelTypes.FETCH_CHANNEL_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case channelTypes.FETCH_CHANNEL_SUCCESS:
      return {
        ...state,
        channel: action.payload,
        isLoading: false,
        error: null
      }
    case channelTypes.FETCH_CHANNEL_FAILURE:
      return {
        ...state,
        channel: null,
        isLoading: false,
        error: action.payload
      }

    // DELETE_CHANNEL
    case channelTypes.DELETE_CHANNEL_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    // TRASH_CHANNEL
    case channelTypes.TRASH_CHANNEL_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    case channelTypes.CLEAR:
      return {
        ...state,
        channels: null,
        channel: null,
        allChannels: null,
        channelsOnPage: null,
        isLoading: null,
        error: null
      }
    
    default:
      return state;
  }
}

export default channelReducer;