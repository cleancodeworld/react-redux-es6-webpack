export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const ADD = 'knexpert/answers/ADD';
export const ADD_SUCCESS = 'knexpert/answers/ADD_SUCCESS';
export const ADD_FAIL = 'knexpert/answers/ADD_FAIL';

import {SubmissionError} from 'redux-form';

export function _add(model, courseName) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post(`/api/v1/answer`, { data: model }),
    data: {
      model,
      courseName
    }
  };
}

export function add(model, courseId, courseName) {
  return dispatch => {
    return dispatch(_add({ ...model, courseId }, courseName))
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
