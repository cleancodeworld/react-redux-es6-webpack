export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const RESET_CALLS = 'knexpert/call/RESET';
import { LOAD_SUCCESS as LOAD_CALL_SUCCESS } from './all';
import { LOAD_SUCCESS as LOAD_EXPERT_SUCCESS } from './byExpert';
import { LOAD_SUCCESS as LOAD_REQUESTER_SUCCESS } from './byRequester';
import { LOAD_SUCCESS as LOAD_BY_ID_SUCCESS } from './byId';
import { SET_SELECTED_DATE_SUCCESS } from './setSelectedDate';
import { REJECT_SUCCESS } from './rejectCall';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  entities: {}
});

export default function callLoaded(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_BY_ID_SUCCESS:
      return state.withMutations(map=> {
        const {call} = action.result.data;
        const immutableCall = Immutable.fromJS(call);
        map.mergeIn(['entities', call.id], immutableCall);
      });
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
    case REJECT_SUCCESS:
    case SET_SELECTED_DATE_SUCCESS:
    case RESET_CALLS:
    default:
      return state;
  }
}

export function resetCalls() {
  return {
    type: RESET_CALLS
  };
}
