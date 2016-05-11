export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/course/LOAD';
export const LOAD_SUCCESS = 'knexpert/course/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/course/LOAD_FAIL';

const REDUX_FORM_INIT = 'redux-form/INITIALIZE';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function courseLoad(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case REDUX_FORM_INIT:
      return state.set('submitSuccess', false);
    case LOAD_SUCCESS:
      return state.withMutations(map=> {
        map.set(action.data.courseName, Immutable.fromJS(action.result));
      });
    case LOAD_FAIL:
      return state.remove(action.data.courseName);
    case LOAD:
    default:
      return state;
  }
}

export function load(courseName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/course/name/${courseName}`),
    data: {
      courseName
    }
  };
}

export function isLoaded(globalState, courseName) {
  return !globalState.courseLoaded || globalState.courseLoaded && globalState.courseLoaded.get(courseName);
}

