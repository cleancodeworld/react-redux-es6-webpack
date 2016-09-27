export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
import {
  LOAD_SUCCESS as LOAD_MY_PORTALS_SUCCESS,
} from './myPortals';
import {
  LOAD_SUCCESS as LOAD_ALL_PORTALS_SUCCESS,
} from './allPortals';
import {
  REMOVE_SUCCESS as REMOVE_PORTAL_SUCCESS,
} from './remove';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_ALL_PORTALS_SUCCESS:
    case LOAD_MY_PORTALS_SUCCESS:
      return state.withMutations(map=> {
        const {portals} = action.result.data;
        portals.map(portal=> {
          map.set(portal.slug, Immutable.fromJS(portal));
        });
      });
    case REMOVE_PORTAL_SUCCESS:
      return state.withMutations(map=> {
        const {portal} = action.data;
        map.removeIn([portal.name]);
      });
    default:
      return state;
  }
}

