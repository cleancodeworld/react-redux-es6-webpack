export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const EDIT = 'knexpert/course/EDIT';
export const EDIT_SUCCESS = 'knexpert/course/EDIT_SUCCESS';
export const EDIT_FAIL = 'knexpert/course/EDIT_FAIL';

import Immutable from 'immutable';
import {SubmissionError} from 'redux-form';

const initialState = Immutable.fromJS({
});

export default function courseEdit(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    default:
      return state;
  }
}

function _edit(model, courseName) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: (client) => client.put(`/api/v1/course/name/${courseName}`, { data: model }),
    data: {
      model
    }
  };
}

export function edit(model, courseName) {
  return dispatch => {
    return dispatch(_edit(model, courseName))
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
