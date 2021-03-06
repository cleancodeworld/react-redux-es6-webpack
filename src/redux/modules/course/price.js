export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/course/price/LOAD';
export const LOAD_SUCCESS = 'knexpert/course/price/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/course/price/LOAD_FAIL';
export const EDIT = 'knexpert/course/price/EDIT';
export const EDIT_SUCCESS = 'knexpert/course/price/EDIT_SUCCESS';
export const EDIT_FAIL = 'knexpert/course/price/EDIT_FAIL';

import beautifyAndThrow from 'utils/errorBeautifier';

export function load(courseName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/course/price/${courseName}`),
    data: {
      courseName
    }
  };
}

function _edit(model, courseName) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: (client) => client.put(`/api/v1/course/price/${courseName}`, {
      data: {
        ...model,
        paid: !!model.paid,
        price: parseFloat(model.price)
      }
    }),
    data: {
      courseName
    }
  };
}

export function edit(model, courseName) {
  return dispatch => {
    return dispatch(_edit(model, courseName))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}

export function isLoaded(globalState, courseName) {
  return globalState.courseLoaded && globalState.courseLoaded.getIn(['entities', courseName, 'coursePrice']);
}
