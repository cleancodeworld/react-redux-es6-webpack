export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

import omit from 'lodash/omit';
import isString from 'lodash/isString';
import uid from 'uid';
import Immutable from 'immutable';
import {CREATE_SUCCESS as COURSE_CREATE_SUCCESS} from './course/create';
import {EDIT_SUCCESS as COURSE_EDIT_SUCCESS} from './course/edit';
import {EDIT_SUCCESS as PRICE_EDIT_SUCCESS} from './course/price';
import {CREATE_SUCCESS as CREATE_RATE_SUCCESS, EDIT_SUCCESS as EDIT_RATE_SUCCESS} from './course/rate';
import {CREATE_FAIL as CREATE_RATE_FAIL, EDIT_FAIL as EDIT_RATE_FAIL} from './course/rate';
import {ADD_SUCCESS as LESSON_ADD_SUCCESS} from './lesson/create';
import {EDIT_SUCCESS as LESSON_EDIT_SUCCESS} from './lesson/edit';
import {UPDATE_COVER_IMAGE_SUCCESS as PORTAL_UPDATE_COVER_IMAGE_SUCCESS} from './portal/edit';
import {UPDATE_COVER_IMAGE_SUCCESS as USER_UPDATE_COVER_IMAGE_SUCCESS} from './user/edit';
import {CREATE_SUCCESS as QUESTION_CREATE_SUCCESS} from './question/create';
import {CREATE_SUCCESS as CALL_CREATE_SUCCESS} from './call/create';
import {SET_SELECTED_DATE_SUCCESS} from './call/setSelectedDate';
import {REJECT_SUCCESS} from './call/rejectCall';
import {REMOVE_SUCCESS as ANSWER_REMOVE_SUCCESS} from './answer/remove';

const initialState = Immutable.fromJS([]);

export default function Notifications(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case COURSE_CREATE_SUCCESS:
    case COURSE_EDIT_SUCCESS:
    case PRICE_EDIT_SUCCESS:
    case CREATE_RATE_SUCCESS:
    case EDIT_RATE_SUCCESS:
    case LESSON_ADD_SUCCESS:
    case LESSON_EDIT_SUCCESS:
    case QUESTION_CREATE_SUCCESS:
    case CALL_CREATE_SUCCESS:
    case SET_SELECTED_DATE_SUCCESS:
    case REJECT_SUCCESS:
      return state.withMutations(map=> {
        const notify = Immutable.fromJS({
          level: 'success',
          title: 'Saved',
          position: 'tc',
          uid: uid(10)
        });
        map.push(notify);
      });
    case ANSWER_REMOVE_SUCCESS:
      return state.withMutations(map=> {
        const notify = Immutable.fromJS({
          level: 'success',
          title: 'Removed',
          position: 'tc',
          uid: uid(10)
        });
        map.push(notify);
      });
    case USER_UPDATE_COVER_IMAGE_SUCCESS:
    case PORTAL_UPDATE_COVER_IMAGE_SUCCESS:
      return state.withMutations(map=> {
        const notify = Immutable.fromJS({
          level: 'success',
          title: 'Uploaded',
          position: 'tc',
          uid: uid(10)
        });
        map.push(notify);
      });
    case 'redux-form/CHANGE':
      if (action.meta.field === 'thumbnail' && isString(action.payload)) {
        return state.withMutations(map=> {
          const notify = Immutable.fromJS({
            level: 'success',
            title: 'Uploaded',
            position: 'tc',
            uid: uid(10)
          });
          map.push(notify);
        });
      }
      return state;
    case CREATE_RATE_FAIL:
    case EDIT_RATE_FAIL:
      return state.withMutations(map=> {
        const notify = Immutable.fromJS({
          level: 'error',
          title: 'ERROR',
          position: 'tc',
          uid: uid(10)
        });
        map.push(notify);
      });
    case SHOW_NOTIFICATION:
      return state.withMutations(map=> {
        const notify = Immutable.fromJS({ ...omit(action, 'type'), uid: uid(10) });
        map.push(notify);
      });
    case HIDE_NOTIFICATION:
      return state.filter((notification)=> notification.get('uid') !== action.uid);
    default:
      return state;
  }
}


export function show(opts, level = 'success') {
  return {
    ...opts,
    type: SHOW_NOTIFICATION,
    level,
    position: 'tc',
  };
}

export function success(opts) {
  return show(opts, 'success');
}

export function error(opts) {
  return show(opts, 'error');
}

export function warning(opts) {
  return show(opts, 'warning');
}

export function info(opts) {
  return show(opts, 'info');
}

export function hide(id) {
  return {
    type: HIDE_NOTIFICATION,
    uid: id
  };
}
