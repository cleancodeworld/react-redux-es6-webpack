export const SIGNUP = 'knexpert/auth/SIGNUP';
export const SIGNUP_SUCCESS = 'knexpert/auth/SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'knexpert/auth/SIGNUP_FAIL';

import {create as portalCreate} from '../portal/create';
import {silentLogin} from '../auth';
import beautifyAndThrow from 'utils/errorBeautifier';

export function create(model) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post(`/api/v1/signup`, {
      data: {
        ...model,
        email: model.email,
        minutePrice: parseInt(model.minutePrice, 10),
        username: model.username,
        roleId: '572d7765cbb4e22d164579b9'
      }
    }),
    data: {
      model
    }
  };
}

export function createWithPortal(model) {
  return dispatch => {
    return dispatch(
      create(model))
      .then(({data})=>
        dispatch(portalCreate({
          ...model,
          name: model.portalName,
          privacy: model.isPublic ? 'Public' : 'Private',
          type: model.isPersonal ? 'Personal' : 'Company',
          ownerId: data.id,
        }))
      ).catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}

export function signup(model) {
  return dispatch => {
    return dispatch(
      create({ ...model, roleId: '5724386acbb4e23adde20249' }))
      .then(()=> dispatch(silentLogin(model)))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
