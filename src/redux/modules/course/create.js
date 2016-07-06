export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CREATE = 'knexpert/course/CREATE';
export const CREATE_SUCCESS = 'knexpert/course/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/course/CREATE_FAIL';

import { push } from 'react-router-redux';
import {resetCourses} from './loaded';
import beautifyAndThrow from 'utils/errorBeautifier';

function _create(model) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/v1/course`, { data: { ...model, duration: parseInt(model.duration, 10) } }),
    data: {
      model
    }
  };
}

export function create(portalId, model) {
  return dispatch => {
    return dispatch(
      _create({ portalId, ...model }))
      .then(()=>dispatch(resetCourses()))
      .then(()=> dispatch(push('/author/course/list')))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
