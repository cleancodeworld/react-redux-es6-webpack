export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOGIN = 'knexpert/auth/LOGIN';
export const LOGIN_SUCCESS = 'knexpert/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'knexpert/auth/LOGIN_FAIL';

import Immutable from 'immutable';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import reactCookie from 'react-cookie';

import config from 'config';

const initialState = Immutable.fromJS({
  sessionToken: ''
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
      return state.set('sessionToken', sessionToken);
    case LOGIN_FAIL:
      return state.set('sessionToken', '');
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
      .then((res)=> {
        const {sessionToken} = res;
        const cookieOpt = { path: '/', secure: false, httpOnly: false, domain: '.' + config.mainDomain };
        if (model.remember) {
          cookieOpt.maxAge = 60 * 60 * 24 * 42;
        }
        reactCookie.save('sessionToken', sessionToken, cookieOpt);
        return dispatch(push('/'));
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
