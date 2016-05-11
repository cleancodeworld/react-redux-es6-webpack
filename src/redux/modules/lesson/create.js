export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const ADD = 'knexpert/lessons/ADD';
export const ADD_SUCCESS = 'knexpert/lessons/ADD_SUCCESS';
export const ADD_FAIL = 'knexpert/lessons/ADD_FAIL';

import Immutable from 'immutable';
import {SubmissionError} from 'redux-form';
import { push } from 'react-router-redux';

const initialState = Immutable.fromJS({
});

export default function lessonAdd(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case ADD_SUCCESS:
    case ADD:
    case ADD_FAIL:
    default:
      return state;
  }
}

export function _add(model, courseName) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post(`/api/v1/lesson`, { data: model }),
    data: {
      model,
      courseName
    }
  };
}

export function add(model, courseId, courseName) {
  return dispatch => {
    return dispatch(_add({ ...model, order: 1, courseId }, courseName))
      .then(()=> {
        setTimeout(()=> dispatch(push('/author/course/' + courseName + '/lesson/list')), 2500);
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}