export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CHECK = 'knexpert/portal/CHECK';
export const CHECK_SUCCESS = 'knexpert/portal/CHECK_SUCCESS';
export const CHECK_FAIL = 'knexpert/portal/CHECK_FAIL';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function getstate(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case CHECK:
    case CHECK_SUCCESS:
    case CHECK_FAIL:
    default:
      return state;
  }
}

export function check(slug) {
  return {
    types: [CHECK, CHECK_SUCCESS, CHECK_FAIL],
    promise: (client) => client.get(`/v1/portal/${slug}`)
  };
}
