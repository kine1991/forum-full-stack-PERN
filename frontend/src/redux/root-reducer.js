import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import channelReducer from './channel/channel.reducer';
import topicReducer from './topic/topic.reducer';
import commentReducer from './comment/comment.reducer';

export default combineReducers({
  user: userReducer,
  channel: channelReducer,
  topic: topicReducer,
  comment: commentReducer,
});
