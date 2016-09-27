export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/call/expert/LOAD';
export const LOAD_SUCCESS = 'knexpert/call/requester/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/call/requester/LOAD_FAIL';
import { SET_SELECTED_DATE_SUCCESS } from './setSelectedDate';
import { REJECT_SUCCESS } from './rejectCall';

import Immutable from 'immutable';
import {
  normalizeBy,
} from 'utils/normalize';
import { RESET_CALLS } from './loaded';

const initialState = Immutable.fromJS({
  loaded: false,
  order: [],
  entities: {}
});

export default function all(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_SUCCESS:
      return state.withMutations(map=> {
        const {calls} = action.result.data;
        const {order} = normalizeBy(calls, 'id');
        order.map(call=> {
          map.setIn(['entities', call], true);
        });
        map.set('order', Immutable.fromJS(order));
        map.set('loaded', true);
      });
    case SET_SELECTED_DATE_SUCCESS:
    case REJECT_SUCCESS:
    case RESET_CALLS:
      return state.set('loaded', false);
    default:
      return state;
  }
}

export function load(expertId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`api/v1/call/requester/${expertId}`)
  };
}

export function isLoaded(globalState) {
  return globalState.callsByRequester && globalState.portalCurrent && globalState.auth
    && globalState.callsByRequester.get('loaded') && globalState.portalCurrent.getIn(['meta', 'ownerId']) === globalState.auth.getIn(['user', 'userId']);
}
