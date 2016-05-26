export const RATE = 'knexpert/course/RATE';
export const RATE_SUCCESS = 'knexpert/course/RATE_SUCCESS';
export const RATE_FAIL = 'knexpert/course/RATE_FAIL';
import { show } from 'redux/modules/notifications';

function _rate(model) {
  return {
    types: [RATE, RATE_SUCCESS, RATE_FAIL],
    promise: (client) => client.post(`/api/v1/course/rate`, { data: model }),
    data: {
      model
    }
  };
}

export function rate(model) {
  return dispatch => {
    return dispatch(
      _rate(model))
      .then(()=>dispatch(show({
        title: 'Saved',
        message: 'Saved your rate successfully',
      })))
      .catch((res)=>dispatch(show({
        title: 'Error',
        message: res.error,
      }, 'error')));
  };
}
