export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/lessons/LOAD';
export const LOAD_SUCCESS = 'knexpert/lessons/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/lessons/LOAD_FAIL';
export const ADD = 'knexpert/lessons/ADD';
export const ADD_SUCCESS = 'knexpert/lessons/ADD_SUCCESS';
export const ADD_FAIL = 'knexpert/lessons/ADD_FAIL';
export const EDIT = 'knexpert/lessons/EDIT';
export const EDIT_SUCCESS = 'knexpert/lessons/EDIT_SUCCESS';
export const EDIT_FAIL = 'knexpert/lessons/EDIT_FAIL';

import Immutable from 'immutable';
import {SubmissionError} from 'redux-form';
import { push } from 'react-router-redux';

const initialState = Immutable.fromJS({
  lessons: [],
  loaded: false
});

export default function lessons(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_SUCCESS:
      return state.withMutations(map => {
        map.set('loaded', true);
        map.set('lessons', action.result.lessons);
      });
    case LOAD_FAIL:
      return state.withMutations(map => {
        map.set('loaded', false);
        map.set('lessons', []);
      });
    case LOAD:
      return state;
    case ADD_SUCCESS:
      return state.set('loaded', false);
    case ADD:
    case ADD_FAIL:
      return state;
    case EDIT_SUCCESS:
      return state.set('loaded', false);
    case EDIT:
    case EDIT_FAIL:
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
  model.thumbnail = 'http://res.cloudinary.com/dcvaycxbi/image/upload/c_limit,h_60,w_90/v1461674175/henw4zmges574pmfyfe0.jpg';
  model.videoUrl = 'https://www.youtube.com/watch?v=czmulJ9NBP0';
  model.order = 1;
  return dispatch => {
    return dispatch(add(model))
      .then(()=> {
        return dispatch(push('/course/' + courseName));
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}

function edit(model, lessonName) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: (client) => client.put(`/api/v1/lesson/name/${lessonName}`, { data: model }),
    data: {
      model
    }
  };
}

export function editLesson(model, courseId, courseName, lessonName) {
  model.courseId = courseId;
  // test values
  model.thumbnail = 'http://res.cloudinary.com/dcvaycxbi/image/upload/c_limit,h_60,w_90/v1461674175/henw4zmges574pmfyfe0.jpg';
  model.videoUrl = 'https://www.youtube.com/watch?v=czmulJ9NBP0';
  model.order = 1;
  return dispatch => {
    return dispatch(edit(model, lessonName))
      .then(()=> {
        return dispatch(push('/course/' + courseName));
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
