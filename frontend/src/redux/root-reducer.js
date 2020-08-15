import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import channelReducer from './channel/channel.reducer';

export default combineReducers({
  user: userReducer,
  channel: channelReducer,
});
