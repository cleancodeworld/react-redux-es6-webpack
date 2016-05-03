export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOGIN = 'knexpert/auth/LOGIN';
export const LOGIN_SUCCESS = 'knexpert/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'knexpert/auth/LOGIN_FAIL';

import Immutable from 'immutable';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

const initialState = Immutable.fromJS({
  sessionToken: ''
});

export default function auth(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOGIN_SUCCESS:
      return state.set('sessionToken', action.result.sessionToken);
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
      .then(()=> {
        if (model.remember && !model.auto && typeof document !== 'undefined') {
          document.cookie = 'email=' + model.email + '; max-age=3628800';
          document.cookie = 'password=' + model.password + '; max-age=3628800';
        }
        return dispatch(push('/'));
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
