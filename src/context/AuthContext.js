import { AsyncStore } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signup':
      return { errorMessage: '', token: action.payload };
    default:
      return state;
  }
};


const signup = dispatch => async ({ email, password }) => {
  // make api request to sign up with email and password
  // if we sign up, modify the state, and say that we are authenticated
  // if signing up fails, we need to reflect an error message somewhere
  try {
    // const response = await trackerApi.post('/signup', { email, password });
    const response = await fetch(`${trackerApi}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    const data = await response.json();
    await AsyncStore.setItem('token', data.token);
    dispatch({ type: 'signup', payload: data.token });
    navigate('TrackList');
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
  }
};

const signin = dispatch => {
  return ({ email, password }) => {
    // try to sign in
    // handle success by updating state
    // handle failure by showing error message somewhere
  };
};

const signout = dispatch => {
  return () => {
    // somehow sign out
  };
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { token: null, errorMessage: '' }
);
