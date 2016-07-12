export const EDIT = 'knexpert/course/EDIT';
export const EDIT_SUCCESS = 'knexpert/course/EDIT_SUCCESS';
export const EDIT_FAIL = 'knexpert/course/EDIT_FAIL';

import {resetCourses} from './loaded';
import beautifyAndThrow from 'utils/errorBeautifier';

function _edit(model, courseName, portalId) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: (client) => client.put(`/api/v1/course/name/${courseName}`, {
      data: {
        ...model,
        pages: null,
        lessons: null,
        portalId,
        duration: parseInt(model.duration, 10),
      }
    }),
    data: {
      model
    }
  };
}

export function edit(model, courseName, portalId) {
  return dispatch => {
    return dispatch(_edit(model, courseName, portalId))
      .then(()=>dispatch(resetCourses()))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
