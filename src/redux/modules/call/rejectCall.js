export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const REJECT = 'knexpert/call/reject/LOAD';
export const REJECT_FAIL = 'knexpert/call/reject/FAIL';

import { push } from 'react-router-redux';
import { RESET_CALLS } from './loaded';

function _reject(id, data) {
  return {
    types: [REJECT, RESET_CALLS, REJECT_FAIL],
    promise: (client) => client.put(`api/v1/call/${id}/expert/reject`, { data })
  };
}

export function reject(id, data) {
  return dispatch => {
    return dispatch(_reject(id, data))
      .then(()=> dispatch(push('/my-calls')));
  };
}
