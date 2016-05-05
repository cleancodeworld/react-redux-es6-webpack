export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/lessonEdit/LOAD';
export const LOAD_SUCCESS = 'knexpert/lessonEdit/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/lessonEdit/LOAD_FAIL';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  lesson: {},
  loaded: false
});

export default function lessonEdit(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_SUCCESS:
      return state.withMutations(map => {
        map.set('loaded', true);
        map.set('lesson', action.result);
      });
    case LOAD_FAIL:
      return state.withMutations(map => {
        map.set('loaded', false);
        map.set('lessons', []);
      });
    case LOAD:
    default:
      return state;
  }
}

export function load(lessonName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/lesson/${lessonName}`)
  };
}
