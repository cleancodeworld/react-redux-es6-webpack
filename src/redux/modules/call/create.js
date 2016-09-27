export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const CREATE = 'knexpert/call/CREATE';
export const CREATE_SUCCESS = 'knexpert/call/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/call/CREATE_FAIL';

import { push } from 'react-router-redux';
import {resetCalls} from './loaded';
import beautifyAndThrow from 'utils/errorBeautifier';
import moment from 'moment';
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

function mergeDateWithTime(date, time) {
  const temp = moment(time, 'HH:mm a');
  return moment(date)
    .set('hour', temp.get('hour'))
    .set('minute', temp.get('minute'))
    .set('second', temp.get('second')).toISOString();
}

export function create(portalId, model) {
  const {date1, time1, date2, time2, date3, time3} = model;
  const availabilityDates = [];
  if (date1 && time1) {
    const datetime1 = mergeDateWithTime(date1, time1);
    availabilityDates.push(datetime1);
  }
  if (date2 && time2) {
    const datetime2 = mergeDateWithTime(date2, time2);
    availabilityDates.push(datetime2);
  }
  if (date3 && time3) {
    const datetime3 = mergeDateWithTime(date3, time3);
    availabilityDates.push(datetime3);
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
