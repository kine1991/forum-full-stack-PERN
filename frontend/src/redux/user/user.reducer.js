import userTypes from './user.types';

const INITIAL_STATE = {
  user: null,
  isLoading: null,
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    // CHECK_AUTH
    case userTypes.CHECK_AUTH_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case userTypes.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null
      }
    case userTypes.CHECK_AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    // LOGIN
    case userTypes.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null
      }
    case userTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    // REGISTER
    case userTypes.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case userTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null
      }
    case userTypes.REGISTER_FAILURE:
      // console.log('(((((error', action.payload)
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    // LOGOUT
    case userTypes.LOGOUT_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case userTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: null,
        error: null
      }
    case userTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    default:
      return state;
  }
}

export default userReducer;