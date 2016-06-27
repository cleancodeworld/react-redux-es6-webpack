export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
import {
  LOAD_SUCCESS as LOAD_MY_PORTALS_SUCCESS,
} from './myPortals';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_MY_PORTALS_SUCCESS:
      return state.withMutations(map=> {
        const {portals} = action.result.data;
        portals.map(portal=> {
          map.set(portal.slug, Immutable.fromJS(portal));
        });
      });
    default:
      return state;
  }
}

