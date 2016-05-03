export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOGIN = 'knexpert/auth/LOGIN';
export const LOGIN_SUCCESS = 'knexpert/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'knexpert/auth/LOGIN_FAIL';
export const LOGOUT = 'knexpert/auth/LOGOUT';
export const LOGOUT_SUCCESS = 'knexpert/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'knexpert/auth/LOGOUT_FAIL';
export const LOAD = 'knexpert/auth/LOAD';
export const LOAD_SUCCESS = 'knexpert/auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/auth/LOAD_FAIL';

import Immutable from 'immutable';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import reactCookie from 'react-cookie';

const cookiesOpt = { path: '/', secure: false, httpOnly: false, maxAge: 60 * 60 * 24 * 42 };
const initialState = Immutable.fromJS({
  sessionToken: '',
  loaded: false,
});

export default function auth(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      let newState = Immutable.fromJS(state);
      const token = reactCookie.load('sessionToken');
      if (token) {
        newState = newState.set('sessionToken', token);
      }
      return newState;
    case LOGIN_SUCCESS:
      const {sessionToken} = action.result;
      reactCookie.save('sessionToken', sessionToken, cookiesOpt);
      return state.set('sessionToken', sessionToken);
    case LOGIN_FAIL:
      return state.set('sessionToken', '');
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      return state.withMutations((map)=> {
        map.remove('user');
        map.set('sessionToken', null);
        reactCookie.remove('sessionToken');
      });
    case LOAD_SUCCESS:
      return state.withMutations((map)=> {
        const user = Immutable.fromJS(action.result.user);
        map.set('user', user);
      });
    case LOAD_FAIL:
    case LOGIN:
    default:
      return state;
  }
}

export function isAuthenticated(globalState) {
  return globalState.auth && globalState.auth.get('sessionToken');
}

export function login(model) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post(`/api/v1/login`, { data: model }),
    data: {
      model
    }
  };
}

export function userLogin(model) {
  return dispatch => {
    return dispatch(
      login(model))
      .then(()=> {
        return dispatch(push('/'));
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.get('loaded') || !reactCookie.load('sessionToken');
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/v1/users/me')
  };
}

export function logout() {
  return dispatch => {
    return dispatch({
      types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
      promise: (client) => client.post('/api/v1/logout')
    }).then(()=> {
      return dispatch(push('/'));
    });
  };
}
