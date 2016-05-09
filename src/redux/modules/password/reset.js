export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const RESET = 'knexpert/password/RESET';
export const RESET_SUCCESS = 'knexpert/password/RESET_SUCCESS';
export const RESET_FAIL = 'knexpert/password/RESET_FAIL';

import Immutable from 'immutable';
import {SubmissionError} from 'redux-form';

const initialState = Immutable.fromJS({});

export default function reset(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case RESET:
    case RESET_SUCCESS:
    case RESET_FAIL:
    default:
      return state;
  }
}

function _changePassword(model) {
  return {
    types: [RESET, RESET_SUCCESS, RESET_FAIL],
    promise: (client) => client.post(`/api/v1/password/reset`, { data: model }),
    data: {
      model
    }
  };
}

export function changePassword(model) {
  return dispatch => {
    return dispatch(
      _changePassword(model))
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
