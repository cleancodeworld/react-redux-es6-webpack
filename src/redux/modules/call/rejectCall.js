export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const REJECT = 'knexpert/call/REJECT';
export const REJECT_SUCCESS = 'knexpert/call/REJECT_SUCCESS';
export const REJECT_FAIL = 'knexpert/call/reject/FAIL';

import { push } from 'react-router-redux';
import beautifyAndThrow from 'utils/errorBeautifier';

function _reject(id, data) {
  return {
    types: [REJECT, REJECT_SUCCESS, REJECT_FAIL],
    promise: (client) => client.put(`api/v1/call/${id}/expert/reject`, { data })
  };
}

export function reject(id, data) {
  return dispatch => {
    return dispatch(_reject(id, data))
      .then(()=> dispatch(push('/my-calls')))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
