export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/portal/LOAD';
export const LOAD_SUCCESS = 'knexpert/portal/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/portal/LOAD_FAIL';

import {
  normalizeBy,
} from 'utils/normalize';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  loaded: false,
  order: [],
  entities: {}
});

export default function byPortal(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_SUCCESS:
      return state.withMutations(map=> {
        const {portals} = action.result.data;
        const {order} = normalizeBy(portals, 'slug');
        order.map(course=> {
          map.setIn(['entities', course], true);
        });
        map.set('order', Immutable.fromJS(order));
        map.set('loaded', true);
      });
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/portal/owner/test5`)
  };
}

export function isLoaded(globalState) {
  return globalState.auth && !globalState.auth.user && globalState.myPortals && globalState.myPortals.get('listLoaded');
}
