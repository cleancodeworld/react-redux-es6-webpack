export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/course/LOAD';
export const LOAD_SUCCESS = 'knexpert/course/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/course/LOAD_FAIL';
export const EDIT = 'knexpert/course/EDIT';
export const EDIT_SUCCESS = 'knexpert/course/EDIT_SUCCESS';
export const EDIT_FAIL = 'knexpert/course/EDIT_FAIL';

import Immutable from 'immutable';
import {SubmissionError} from 'redux-form';

const initialState = Immutable.fromJS({
  course: {},
});

export default function courseEdit(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_SUCCESS:
      return state.set('course', Immutable.fromJS(action.result));
    case LOAD_FAIL:
    case LOAD:
    case EDIT:
      return state;
    default:
      return state;
  }
}

export function load(courseName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/course/name/${courseName}`)
  };
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
