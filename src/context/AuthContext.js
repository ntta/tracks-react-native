import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'sign_in', payload: token });
    navigate('mainFlow', { screen: 'TrackList' });
  } else {
    navigate('authFlow');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};


const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await fetch(`${trackerApi}/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    if (data.error) {
      dispatch({ type: 'add_error', payload: 'Email has been used by someone else' });
    } else {
      const token = data.token;
      await AsyncStorage.setItem('token', token);
      dispatch({ type: 'signin', payload: token });
      navigate('mainFlow', { screen: 'TrackList' });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await fetch(`${trackerApi}/signin`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    const data = await response.json();
    if (data.error) {
      dispatch({ type: 'add_error', payload: 'Invalid email or password' });
    } else {
      const token = data.token;
      await AsyncStorage.setItem('token', token);
      dispatch({ type: 'signin', payload: token });
      navigate('mainFlow', { screen: 'TrackList' });
    }
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('authFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
