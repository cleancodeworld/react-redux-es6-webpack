export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/call/LOAD';
export const LOAD_SUCCESS = 'knexpert/call/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/call/LOAD_FAIL';

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
        debugger;
        const {order} = normalizeBy(calls, 'id');
        order.map(call=> {
          map.setIn(['entities', call], true);
        });
        map.set('order', Immutable.fromJS(order));
        map.set('loaded', true);
      });
    case RESET_CALLS:
      return state.set('loaded', false);
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`api/v1/call`)
  };
}

export function isLoaded(globalState) {
  return globalState.coursesByAuthor && globalState.coursesByAuthor.get('loaded');
}
