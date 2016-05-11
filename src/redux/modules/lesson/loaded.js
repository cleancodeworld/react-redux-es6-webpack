export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/lessons/LOAD';
export const LOAD_SUCCESS = 'knexpert/lessons/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/lessons/LOAD_FAIL';
import {ADD_SUCCESS} from './create';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function lessonLoaded(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_SUCCESS:
      return state.withMutations(map => {
        const {courseName} = action.data;
        map.set(courseName, Immutable.fromJS(action.result.lessons));
      });
    case LOAD_FAIL:
      return state.withMutations(map => {
        const {courseName} = action.data;
        map.remove(courseName);
      });
    case ADD_SUCCESS:
      return state.withMutations(map => {
        const {courseName} = action.data;
        const {createdLesson} = action.result;
        const immutableCreatedLesson = Immutable.fromJS(createdLesson);
        map.update(courseName, lessons=>lessons.push(immutableCreatedLesson));
      });
    case LOAD:
    default:
      return state;
  }
}

export function isLoaded(globalState, courseName) {
  return globalState.lessonLoaded && globalState.lessonLoaded.get(courseName);
}

export function load(courseName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/lesson/course/${courseName}`),
    data: {
      courseName
    }
  };
}
