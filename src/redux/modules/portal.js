export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CHECK = 'knexpert/portal/CHECK';
export const CHECK_SUCCESS = 'knexpert/portal/CHECK_SUCCESS';
export const CHECK_FAIL = 'knexpert/portal/CHECK_FAIL';
export const SET_REQ_SUBDOMAIN = 'knexpert/portal/SET_REQ_SUBDOMAIN';
export const CREATE = 'knexpert/portal/CREATE';
export const CREATE_SUCCESS = 'knexpert/portal/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/portal/CREATE_FAIL';

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
      return state.withMutations(map => {
        map.set('loading', false);
        map.set('loaded', true);
        map.set('data', action.result);
      });
    case CHECK_FAIL:
      return state.withMutations(map => {
        map.set('loaded', false);
        map.set('data', null);
        map.set('error', action.error);
      });
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
  model.privacy = model.privacy ? 'Public' : 'Private';
  model.type = model.type ? 'Personal' : 'Company';
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/v1/portal?sessionToken=${sessionToken}`, { data: model }),
    data: {
      model
    }
  };
}
