export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const ADD = 'knexpert/lessons/ADD';
export const ADD_SUCCESS = 'knexpert/lessons/ADD_SUCCESS';
export const ADD_FAIL = 'knexpert/lessons/ADD_FAIL';

const REDUX_FORM_INIT = 'redux-form/INITIALIZE';

import {EDIT, EDIT_SUCCESS, EDIT_FAIL} from './edit';

import Immutable from 'immutable';
import {SubmissionError} from 'redux-form';
import { push } from 'react-router-redux';

const initialState = Immutable.fromJS({
  lessons: [],
  course: [],
  loaded: false,
  submitSuccess: false,
});

export default function lessonAdd(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case REDUX_FORM_INIT:
      return state.set('submitSuccess', false);
    case ADD_SUCCESS:
      return state.withMutations(map => {
        map.set('loaded', false);
        map.set('submitSuccess', true);
      });
    case ADD:
    case ADD_FAIL:
      return state;
    case EDIT_SUCCESS:
      return state.withMutations(map => {
        map.set('loaded', false);
        map.set('submitSuccess', true);
      });
    case EDIT:
    case EDIT_FAIL:
      return state;
    default:
      return state;
  }
}

export function _add(model) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post(`/api/v1/lesson`, { data: model }),
    data: {
      model
    }
  };
}

export function add(model, courseId, courseName) {
  model.courseId = courseId;
  // test values
  model.order = 1;
  return dispatch => {
    return dispatch(_add(model))
      .then(()=> {
        setTimeout(function timedDispatch() {
          dispatch(push('/author/course/' + courseName + '/lesson/list'));
        }, 2500);
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
