export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CHECK = 'knexpert/portal/CHECK';
export const CHECK_SUCCESS = 'knexpert/portal/CHECK_SUCCESS';
export const CHECK_FAIL = 'knexpert/portal/CHECK_FAIL';
export const SET_REQ_SUBDOMAIN = 'knexpert/portal/SET_REQ_SUBDOMAIN';
export const CREATE = 'knexpert/auth/SIGNUP';
export const CREATE_SUCCESS = 'knexpert/auth/SIGNUP_SUCCESS';
export const CREATE_FAIL = 'knexpert/auth/SIGNUP_FAIL';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  loading: false,
  loaded: false,
  error: null,
  data: null,
  reqSubdomain: ''
});

export default function portal(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case CHECK:
      return state.set('loading', true);
    case CHECK_SUCCESS:
      {
        let _state = state.set('loading', false);
        _state = _state.set('loaded', true);
        _state = _state.set('data', action.result);
        return _state;
      }
    case CHECK_FAIL:
      {
        let _state = state.set('loading', false);
        _state = _state.set('loaded', false);
        _state = _state.set('data', null);
        _state = _state.set('error', action.error);
        return _state;
      }
    case SET_REQ_SUBDOMAIN:
      return state.set('reqSubdomain', action.subdomain);
    case CREATE:
    case CREATE_SUCCESS:
    case CREATE_FAIL:
    default:
      return state;
  }
}

export function isChecked(globalState) {
  return globalState.portal && globalState.portal.get('loaded');
}

export function check(slug) {
  return {
    types: [CHECK, CHECK_SUCCESS, CHECK_FAIL],
    promise: (client) => client.get(`/api/v1/portal/${slug}`)
  };
}

export function create(model, sessionToken) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/v1/portal?sessionToken=${sessionToken}`, { data: model }),
    data: {
      model
    }
  };
}
