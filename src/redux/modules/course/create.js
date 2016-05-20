export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CREATE = 'knexpert/course/CREATE';
export const CREATE_SUCCESS = 'knexpert/course/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/course/CREATE_FAIL';

import {SubmissionError} from 'redux-form';
import { push } from 'react-router-redux';
import { BY_PORTAL_LIST_INVALIDATE } from './byPortal';
import { BY_AUTHOR_LIST_INVALIDATE } from './byAuthor';

function _create(model) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/v1/course`, { data: model }),
    data: {
      model
    }
  };
}

export function create(portalId, model) {
  return dispatch => {
    return dispatch(
      _create({portalId, ...model}))
      .then(()=> {
        dispatch(BY_PORTAL_LIST_INVALIDATE);
        dispatch(BY_AUTHOR_LIST_INVALIDATE);
        setTimeout(()=> dispatch(push('/author/course/list')), 2500);
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
