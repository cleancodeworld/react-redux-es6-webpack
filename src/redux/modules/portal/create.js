export const CREATE = 'knexpert/portal/CREATE';
export const CREATE_SUCCESS = 'knexpert/portal/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/portal/CREATE_FAIL';

import config from 'config';
import beautifyAndThrow from 'utils/errorBeautifier';

export function create(model) {
  model.privacy = model.privacy ? 'Public' : 'Private';
  model.type = model.type ? 'Personal' : 'Company';
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/v1/portal`, { data: model }),
    data: {
      model
    }
  };
}

export function createPortal(model, ownerId) {
  model.ownerId = ownerId;
  return dispatch => {
    return dispatch(create(model))
      .then((res)=> {
        window.location.href = `${location.protocol}//${res.data.portal.name}.${config.mainDomain()}`;
      })
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
