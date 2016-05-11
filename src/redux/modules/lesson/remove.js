export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const REMOVE = 'knexpert/lessons/REMOVE';
export const REMOVE_SUCCESS = 'knexpert/lessons/REMOVE_SUCCESS';
export const REMOVE_FAIL = 'knexpert/lessons/REMOVE_FAIL';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function lessonRemoveReducer(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case REMOVE_SUCCESS:
    case REMOVE:
    case REMOVE_FAIL:
    default:
      return state;
  }
}

export function remove(courseName, lessonName) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.del(`/api/v1/lesson/name/${lessonName}`),
    data: {
      lessonName,
      courseName,
    }
  };
}
