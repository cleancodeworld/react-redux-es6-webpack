export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const SIGNUP = 'knexpert/auth/SIGNUP';
export const SIGNUP_SUCCESS = 'knexpert/auth/SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'knexpert/auth/SIGNUP_FAIL';
export const LOGIN = 'knexpert/auth/LOGIN';
export const LOGIN_SUCCESS = 'knexpert/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'knexpert/auth/LOGIN_FAIL';

import Immutable from 'immutable';
import {SubmissionError} from 'redux-form';
import {create as portalCreate} from '../portal';
import {silentLogin} from '../auth';

const initialState = Immutable.fromJS({});

export default function userCreate(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case SIGNUP:
    case SIGNUP_SUCCESS:
    case SIGNUP_FAIL:
    default:
      return state;
  }
}

export function create(model) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post(`/api/v1/signup`, { data: { ...model, roleId: '572d7765cbb4e22d164579b9' } }),
    data: {
      model
    }
  };
}


export function createWithPortal(model) {
  return dispatch => {
    return dispatch(
      create(model))
      .then(()=> dispatch(silentLogin(model)))
      .then((res)=> dispatch(portalCreate({
        ...model,
        name: model.portalName,
        privacy: model.isPublic ? 'Public' : 'Private',
        type: model.isPersonal ? 'Personal' : 'Company',
        ownerId: res.userId,
      }, res.sessionToken)))
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
