import axios from 'axios';

import userTypes from './user.types';

// CHECK_AUTH_START
const checkAuthStart = () => ({
  type: userTypes.CHECK_AUTH_START
});

const checkAuthSuccess = user => ({
  type: userTypes.CHECK_AUTH_SUCCESS,
  payload: user
});

const checkAuthFailure = () => ({
  type: userTypes.CHECK_AUTH_FAILURE
});

export const checkAuthAsync = () => async dispatch => {
  dispatch(checkAuthStart());

  try {
    const user = await axios.get('/api/users/check-auth')
    // console.log('checkAuth', user.data.user);
    dispatch(checkAuthSuccess(user.data.user));
  } catch (error) {
    console.log('error', error.response.data);
    dispatch(checkAuthFailure(error.response.data));
  }
};

// REGISTER
const registerStart = () => ({
  type: userTypes.REGISTER_START
});

const registerSuccess = data => ({
  type: userTypes.REGISTER_SUCCESS,
  payload: data
});

const registerFailure = error => ({
  type: userTypes.REGISTER_FAILURE,
  payload: error
});

export const registerAsync = ({ nickname, email, password, imageUrl }) => async dispatch => {
  dispatch(registerStart());
// console.log('555', nickname, email, password, imageUrl)
  try {
    const user = await axios.post('/api/users/sign-up', { nickname, email, password, image_url: imageUrl });
    console.log('user', user.data.user);
    dispatch(registerSuccess(user.data.user));
  } catch (error) {
    console.log('error', error.response.data);
    dispatch(registerFailure(error.response.data));
  }
}

// LOGIN
const loginStart = () => ({
  type: userTypes.LOGIN_START
});

const loginSuccess = data => ({
  type: userTypes.LOGIN_SUCCESS,
  payload: data
});

const loginFailue = error => ({
  type: userTypes.LOGIN_FAILURE,
  payload: error
});

export const loginAsync = ({ email, password }) => async dispatch => {
  dispatch(loginStart());

  try {
    const user = await axios.post('/api/users/sign-in', { email, password });
    console.log('user', user.data.user);
    dispatch(loginSuccess(user.data.user));
  } catch (error) {
    console.log('error', error.response.data);
    dispatch(loginFailue(error.response.data));
    
  }
};

// LOGOUT
const logoutStart = () => ({
  type: userTypes.LOGOUT_START
});

const logoutSuccess = () => ({
  type: userTypes.LOGOUT_SUCCESS
});
const logoutFailure = error => ({
  type: userTypes.LOGOUT_FAILURE,
  payload: error
});

export const logoutAsync = () => async dispatch => {
  dispatch(logoutStart());
  try {



    const user = await axios.get('api/users/logout');
    console.log('user8888', user);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure());
  }
};


