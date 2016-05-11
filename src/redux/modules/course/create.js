export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CREATE = 'knexpert/course/CREATE';
export const CREATE_SUCCESS = 'knexpert/course/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/course/CREATE_FAIL';

import Immutable from 'immutable';
import {SubmissionError} from 'redux-form';
import { push } from 'react-router-redux';

import { refresh } from './list';

const initialState = Immutable.fromJS({});

export default function courseCreate(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case CREATE:
    case CREATE_SUCCESS:
    case CREATE_FAIL:
    default:
      return state;
  }
}

function _create(model) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/v1/course`, { data: model }),
    data: {
      model
    }
  };
}

export function create(model) {
  return dispatch => {
    return dispatch(
      _create(model))
      .then(()=> {
        dispatch(refresh());
        setTimeout(()=> dispatch(push('/author/course/list')), 2500);
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
