export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const FORGET = 'knexpert/password/FORGET';
export const FORGET_SUCCESS = 'knexpert/password/FORGET_SUCCESS';
export const FORGET_FAIL = 'knexpert/password/FORGET_FAIL';

import Immutable from 'immutable';
import {SubmissionError} from 'redux-form';
import {create as portalCreate} from '../portal';
import {login} from '../auth';

const initialState = Immutable.fromJS({});

export default function userCreate(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case FORGET:
    case FORGET_SUCCESS:
    case FORGET_FAIL:
    default:
      return state;
  }
}

export function create(model) {
  return {
    types: [FORGET, FORGET_SUCCESS, FORGET_FAIL],
    promise: (client) => client.post(`/api/v1/signup`, { data: model }),
    data: {
      model
    }
  };
}
