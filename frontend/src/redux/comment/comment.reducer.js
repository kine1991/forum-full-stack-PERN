import commentTypes from './comment.types';

const INITIAL_STATE = {
  comments: null,
  allComments: null,
  commentsOnPage: null,
  limit: null,
  isLoading: null,
  error: null
}

const commentReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    // FETCH_COMMENTS
    case commentTypes.FETCH_COMMENTS_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case commentTypes.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        comments: action.payload.comments,
        allComments: action.payload.all_comments,
        commentsOnPage: action.payload.comments_on_page
      }
    case commentTypes.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    // CREATE_COMMENT
    case commentTypes.CREATE_COMMENT_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case commentTypes.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        comments: action.payload
      }
    case commentTypes.CREATE_COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    default:
      return state;
  }
}

export default commentReducer;