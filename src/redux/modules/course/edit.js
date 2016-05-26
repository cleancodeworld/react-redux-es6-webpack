export const EDIT = 'knexpert/course/EDIT';
export const EDIT_SUCCESS = 'knexpert/course/EDIT_SUCCESS';
export const EDIT_FAIL = 'knexpert/course/EDIT_FAIL';

import {SubmissionError} from 'redux-form';
import { push } from 'react-router-redux';
import {resetCourses} from './loaded';
import { success } from 'redux/modules/notifications';

function _edit(model, courseName, portalId) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: (client) => client.put(`/api/v1/course/name/${courseName}`, { data: { ...model, portalId } }),
    data: {
      model
    }
  };
}

export function edit(model, courseName, portalId) {
  return dispatch => {
    return dispatch(_edit(model, courseName, portalId))
      .then(()=>dispatch(success({
        title: 'Saved',
        message: 'Edited course successfully',
      })))
      .then(()=>dispatch(resetCourses()))
      .then(()=> dispatch(push('/author/course/list')))

      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
