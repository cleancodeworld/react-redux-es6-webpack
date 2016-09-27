export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const UPDATE_COVER_IMAGE = 'knexpert/user/UPDATE_COVER_IMAGE';
export const UPDATE_COVER_IMAGE_SUCCESS = 'knexpert/user/UPDATE_COVER_IMAGE_SUCCESS';
export const UPDATE_COVER_IMAGE_FAIL = 'knexpert/user/UPDATE_COVER_IMAGE_FAIL';

export const UPDATE_PHONE = 'knexpert/user/UPDATE_PHONE';
export const UPDATE_PHONE_SUCCESS = 'knexpert/user/UPDATE_PHONE_SUCCESS';
export const UPDATE_PHONE_FAIL = 'knexpert/user/UPDATE_PHONE_FAIL';

import { push } from 'react-router-redux';
import beautifyAndThrow from 'utils/errorBeautifier';

export function updateImage(user, image) {
  return {
    types: [UPDATE_COVER_IMAGE, UPDATE_COVER_IMAGE_SUCCESS, UPDATE_COVER_IMAGE_FAIL],
    promise: (client) => client.put(`/api/v1/users/me`, {
      data: {
        ...user,
        roleId: '572d775ecbb4e22d164579b8',
        image
      }
    }),
    data: {
      image
    }
  };
}


function _updatePhone(user, phone) {
  return {
    types: [UPDATE_PHONE, UPDATE_PHONE_SUCCESS, UPDATE_PHONE_FAIL],
    promise: (client) => client.put(`/api/v1/users/me`, {
      data: {
        ...user,
        roleId: '572d775ecbb4e22d164579b8',
        phone
      }
    }),
    data: {
      phone
    }
  };
}

export function updatePhone(user, phone) {
  return dispatch => {
    return dispatch(
      _updatePhone(user, phone))
      .then(()=> dispatch(push('/call')))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
