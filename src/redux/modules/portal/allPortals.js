export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/portal/LOAD_ALL_PORTALS';
export const LOAD_SUCCESS = 'knexpert/portal/LOAD_ALL_PORTALS_SUCCESS';
export const LOAD_FAIL = 'knexpert/portal/LOAD_ALL_PORTALS_FAIL';
import {
  REMOVE_SUCCESS as REMOVE_PORTAL_SUCCESS,
} from './remove';

import {
  normalizeBy,
} from 'utils/normalize';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  loaded: false,
  order: [],
  entities: {}
});

export default function allPortals(state = initialState, action) {
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
    case REMOVE_PORTAL_SUCCESS:
      return state.withMutations(map=> {
        const {portal} = action.data;
        map.removeIn(['entities', portal.name]);
        map.updateIn(['order'], array=>array.filter((_portal)=> _portal !== portal.name));
      });
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/portals`)
  };
}

export function isLoaded(globalState) {
  return globalState.auth && !globalState.auth.user && globalState.myPortals && globalState.myPortals.get('listLoaded');
}
