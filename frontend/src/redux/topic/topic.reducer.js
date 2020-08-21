import topicTypes from './topic.types';

const INITIAL_STATE = {
  topics: null,
  topic: null,
  isLoading: null,
  error: null
}

const topicReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    // FETCH_TOPICS
    case topicTypes.FETCH_TOPICS_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case topicTypes.FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        topics: action.payload,
        isLoading: false,
        error: null
      }
    case topicTypes.FETCH_TOPICS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    // FETCH_TOPIC
    case topicTypes.FETCH_TOPIC_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case topicTypes.FETCH_TOPIC_SUCCESS:
      return {
        ...state,
        topic: action.payload,
        isLoading: false,
        error: null
      }
    case topicTypes.FETCH_TOPIC_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    // CREATE_TOPIC
    case topicTypes.CREATE_TOPIC_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case topicTypes.CREATE_TOPIC_SUCCESS:
      return {
        ...state,
        topic: action.payload,
        isLoading: false,
        error: null
      }
    case topicTypes.CREATE_TOPIC_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    // CLEAR
    case topicTypes.CLEAR:
      return {
        ...state,
        topics: null,
        topic: null,
        isLoading: null,
        error: null
      }
    default: 
      return state;
  }
}

export default topicReducer;