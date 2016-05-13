export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LIST = 'knexpert/course/LIST';
export const LIST_SUCCESS = 'knexpert/course/LIST_SUCCESS';
export const LIST_FAIL = 'knexpert/course/LIST_FAIL';
export const LIST_REFRESH = 'knexpert/course/LIST_REFRESH';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  loaded: false,
});

export default function courseCreate(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LIST_REFRESH:
      return state.set('loaded', false);
    case LIST_SUCCESS:
      return state.withMutations(map=> {
        map.set('loaded', true);
      });
    case LIST:
    case LIST_FAIL:
    default:
      return state;
  }
}

export function load(name) {
  return {
    types: [LIST, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get(`/api/v1/course/author/${name}`)
  };
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.getIn(['user', 'username']) && globalState.courseList && globalState.courseList.get('loaded');
}

export function refresh() {
  return {
    type: LIST_REFRESH
  };
}
