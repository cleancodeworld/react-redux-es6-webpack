export const CREATE = 'knexpert/rate/CREATE';
export const CREATE_SUCCESS = 'knexpert/rate/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/rate/CREATE_FAIL';

export const EDIT = 'knexpert/rate/EDIT';
export const EDIT_SUCCESS = 'knexpert/rate/EDIT_SUCCESS';
export const EDIT_FAIL = 'knexpert/rate/EDIT_FAIL';


export const LOAD = 'knexpert/rate/LOAD';
export const LOAD_SUCCESS = 'knexpert/rate/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/rate/LOAD_FAIL';

export function create(model, courseName) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/v1/course/rate`, { data: model }),
    data: {
      courseName
    }
  };
}

export function edit(model, courseName) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: (client) => client.put(`/api/v1/course/rate`, { data: model }),
    data: {
      courseName
    }
  };
}

export function load(courseName, userId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/course/rate/${courseName}`),
    data: {
      userId,
      courseName
    }
  };
}

export function isLoaded(globalState, courseName) {
  return globalState.courseLoaded && globalState.courseLoaded.getIn(['entities', courseName, 'isRated']);
}
