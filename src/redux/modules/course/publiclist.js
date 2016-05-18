export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const PUBLIC_LIST = 'knexpert/course/public/LIST';
export const PUBLIC_LIST_SUCCESS = 'knexpert/course/public/LIST_SUCCESS';
export const PUBLIC_LIST_FAIL = 'knexpert/course/public/LIST_FAIL';

export function load(portalName) {
  return {
    types: [PUBLIC_LIST, PUBLIC_LIST_SUCCESS, PUBLIC_LIST_FAIL],
    promise: (client) => client.get(`api/v1/course/portal/${portalName}`)
  };
}

export function isLoaded(globalState) {
  return globalState.courseLoaded && globalState.courseLoaded.get('publicListLoaded');
}
