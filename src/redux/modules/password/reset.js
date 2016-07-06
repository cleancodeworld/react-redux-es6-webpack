export const RESET = 'knexpert/password/RESET';
export const RESET_SUCCESS = 'knexpert/password/RESET_SUCCESS';
export const RESET_FAIL = 'knexpert/password/RESET_FAIL';

import beautifyAndThrow from 'utils/errorBeautifier';

function _changePassword(model) {
  return {
    types: [RESET, RESET_SUCCESS, RESET_FAIL],
    promise: (client) => client.post(`/api/v1/password/reset`, { data: model }),
    data: {
      model
    }
  };
}

export function changePassword(model) {
  return dispatch => {
    return dispatch(
      _changePassword(model))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
