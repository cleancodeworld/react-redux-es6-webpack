export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const RESET_CALLS = 'knexpert/call/RESET';
import { LOAD_SUCCESS } from './all';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  entities: {}
});

export default function callLoaded(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_SUCCESS:
      return state.withMutations(map=> {
        const {calls} = action.result.data;
        calls.map(call=> {
          const immutableCall = Immutable.fromJS(call);
          map.mergeIn(['entities', call.id], immutableCall);
        });
      });
    case RESET_CALLS:
      return initialState;
    default:
      return state;
  }
}

export function resetCalls() {
  return {
    type: RESET_CALLS
  };
}
