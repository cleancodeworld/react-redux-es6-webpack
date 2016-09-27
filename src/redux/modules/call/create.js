export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CREATE = 'knexpert/call/CREATE';
export const CREATE_SUCCESS = 'knexpert/call/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/call/CREATE_FAIL';

import { push } from 'react-router-redux';
import {resetCalls} from './loaded';
import beautifyAndThrow from 'utils/errorBeautifier';
import uniq from 'lodash/uniq';

function _create(model) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/v1/call`, { data: { ...model, estimated: parseInt(model.estimated, 10) } }),
    data: {
      model
    }
  };
}

export function create(portalId, model) {
  const {date1, date2, date3} = model;
  const availabilityDates = [];
  if (date1) {
    availabilityDates.push(date1);
  }
  if (date2) {
    availabilityDates.push(date2);
  }
  if (date3 ) {
    availabilityDates.push(date3);
  }
  return dispatch => {
    return dispatch(
      _create({ ...model, availability: uniq(availabilityDates), portalId }))
      .then(()=>dispatch(resetCalls()))
      .then(()=> dispatch(push('/call')))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
