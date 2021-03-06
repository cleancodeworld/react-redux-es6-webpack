export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const ADD = 'knexpert/pages/ADD';
export const ADD_SUCCESS = 'knexpert/pages/ADD_SUCCESS';
export const ADD_FAIL = 'knexpert/pages/ADD_FAIL';

import { push } from 'react-router-redux';
import beautifyAndThrow from 'utils/errorBeautifier';

export function _add(model, course, lesson) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post(`/api/v1/page`, {
      data: {
        html: model.html,
        title: model.title,
        lessonId: lesson.get('id')
      }
    }),
    data: {
      model,
      courseName: course.get('slug'),
      lessonName: lesson.get('slug'),
    }
  };
}

export function add(model, course, lesson) {
  return dispatch => {
    return dispatch(_add({ ...model }, course, lesson))
      .then(()=> dispatch(push(`/author/course/${course.get('slug')}/lesson/list`)))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
