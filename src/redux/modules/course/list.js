export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LIST = 'knexpert/course/LIST';
export const LIST_SUCCESS = 'knexpert/course/LIST_SUCCESS';
export const LIST_FAIL = 'knexpert/course/LIST_FAIL';

export function load(name) {
  return {
    types: [LIST, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get(`/api/v1/course/author/${name}`)
  };
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.getIn(['user', 'username']) && globalState.courseList && globalState.courseLoaded.get('listLoaded');
}
