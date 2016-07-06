export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const EDIT = 'knexpert/pages/EDIT';
export const EDIT_SUCCESS = 'knexpert/pages/EDIT_SUCCESS';
export const EDIT_FAIL = 'knexpert/pages/EDIT_FAIL';

import { push } from 'react-router-redux';
import beautifyAndThrow from 'utils/errorBeautifier';

export function _edit(model, course, lesson, page) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: (client) => client.put(`/api/v1/page/${lesson.get('slug')}/${page.get('slug')}`, {
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
      pageName: page.get('slug'),
    }
  };
}

export function edit(model, course, lesson, page) {
  return dispatch => {
    return dispatch(_edit(model, course, lesson, page))
      .then(()=> dispatch(push(`/author/course/${course.get('slug')}/lesson/list`)))
      .catch(res => {
        beautifyAndThrow(res.error);
      });
  };
}
