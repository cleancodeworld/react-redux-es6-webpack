import filter from 'lodash/filter';
import omit from 'lodash/omit';
import uid from 'uid';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export default function Notifications(state = [], action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return [
        ...state,
        { ...omit(action, 'type'), uid: uid(10) }
      ];
    case HIDE_NOTIFICATION:
      return filter(state, notification => {
        return notification.uid !== action.uid;
      });
    default:
      return state;
  }
}


export function show(opts, level = 'success') {
  return {
    type: SHOW_NOTIFICATION,
    ...opts,
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
