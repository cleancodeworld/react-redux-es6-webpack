export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
import {LOAD_SUCCESS as LOAD_QUESTION_SUCCESS} from './findOne';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function loaded(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_QUESTION_SUCCESS:
      return state.withMutations(map=> {
        const question = action.result.data;
        map.set(question.ShortId, Immutable.fromJS(question));
      });
    default:
      return state;
  }
}
