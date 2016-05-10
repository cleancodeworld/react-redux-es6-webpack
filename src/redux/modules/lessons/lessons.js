export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/lessons/LOAD';
export const LOAD_SUCCESS = 'knexpert/lessons/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/lessons/LOAD_FAIL';
export const ADD = 'knexpert/lessons/ADD';
export const ADD_SUCCESS = 'knexpert/lessons/ADD_SUCCESS';
export const ADD_FAIL = 'knexpert/lessons/ADD_FAIL';
export const GETCOURSE = 'knexpert/lessons/GETCOURSE';
export const GETCOURSE_SUCCESS = 'knexpert/lessons/GETCOURSE_SUCCESS';
export const GETCOURSE_FAIL = 'knexpert/lessons/GETCOURSE_FAIL';

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

export default function lessons(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case REDUX_FORM_INIT:
      return state.set('submitSuccess', false);
    case LOAD_SUCCESS:
      return state.withMutations(map => {
        map.set('loaded', true);
        map.set('lessons', Immutable.fromJS(action.result.lessons));
      });
    case LOAD_FAIL:
      return state.withMutations(map => {
        map.set('loaded', false);
        map.set('lessons', []);
      });
    case LOAD:
      return state;
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
    case GETCOURSE_SUCCESS:
      return state.set('course', Immutable.fromJS(action.result));
    case GETCOURSE_FAIL:
      return state.set('course', Immutable.fromJS({}));
    case GETCOURSE:
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.lessons && globalState.lessons.get('loaded');
}

export function load(courseName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/lesson/course/${courseName}`)
  };
}

export function getCourse(courseName) {
  return {
    types: [GETCOURSE, GETCOURSE_SUCCESS, GETCOURSE_FAIL],
    promise: (client) => client.get(`/api/v1/course/name/${courseName}`)
  };
}

export function add(model) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post(`/api/v1/lesson`, { data: model }),
    data: {
      model
    }
  };
}

export function addLesson(model, courseId, courseName) {
  model.courseId = courseId;
  // test values
  model.order = 1;
  return dispatch => {
    return dispatch(add(model))
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
