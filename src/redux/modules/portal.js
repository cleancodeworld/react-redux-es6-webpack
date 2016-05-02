export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CREATE = 'knexpert/auth/SIGNUP';
export const CREATE_SUCCESS = 'knexpert/auth/SIGNUP_SUCCESS';
export const CREATE_FAIL = 'knexpert/auth/SIGNUP_FAIL';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function portal(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case CREATE:
    case CREATE_SUCCESS:
    case CREATE_FAIL:
    default:
      return state;
  }
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
