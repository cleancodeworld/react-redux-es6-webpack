export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const ADD = 'knexpert/answers/ADD';
export const ADD_SUCCESS = 'knexpert/answers/ADD_SUCCESS';
export const ADD_FAIL = 'knexpert/answers/ADD_FAIL';

import beautifyAndThrow from 'utils/errorBeautifier';

export function _add(model, questionShortId) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post(`/api/v1/answer`, { data: model }),
    data: {
      model,
      questionShortId
    }
  };
}

export function add(model, questionShortId) {
  return dispatch => {
    return dispatch(_add(model, questionShortId))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
