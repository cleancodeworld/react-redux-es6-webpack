export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CREATE = 'knexpert/portal/CREATE';
export const CREATE_SUCCESS = 'knexpert/portal/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/portal/CREATE_FAIL';

import Immutable from 'immutable';
import {SubmissionError} from 'redux-form';
import config from 'config';

const initialState = Immutable.fromJS({
});

export default function portal(state = initialState, action) {
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

export function create(model, sessionToken) {
  model.privacy = model.privacy ? 'Public' : 'Private';
  model.type = model.type ? 'Personal' : 'Company';
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/v1/portal?sessionToken=${sessionToken}`, { data: model }),
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
        window.location.href = `${location.protocol}//${res.createdPortal.name}.${config.mainDomain}`;
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
