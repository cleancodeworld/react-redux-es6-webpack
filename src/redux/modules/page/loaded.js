export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/pages/LOAD';
export const LOAD_SUCCESS = 'knexpert/pages/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/pages/LOAD_FAIL';

export function isLoaded(globalState, courseName, lessonName) {
  return globalState.courseLoaded && globalState.courseLoaded.getIn(['entities', courseName, 'lessons', lessonName, 'pages', 'listLoaded']);
}

export function load(courseName, lessonName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/page/${lessonName}`),
    data: {
      courseName,
      lessonName
    }
  };
}
