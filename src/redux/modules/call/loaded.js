export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const RESET_CALLS = 'knexpert/call/RESET';
import { LOAD_SUCCESS as LOAD_CALL_SUCCESS } from './all';
import { LOAD_SUCCESS as LOAD_EXPERT_SUCCESS } from './byExpert';
import { LOAD_SUCCESS as LOAD_REQUESTER_SUCCESS } from './byRequester';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  entities: {}
});

export default function callLoaded(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_CALL_SUCCESS:
    case LOAD_EXPERT_SUCCESS:
    case LOAD_REQUESTER_SUCCESS:
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
