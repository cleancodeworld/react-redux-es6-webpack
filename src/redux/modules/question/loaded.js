export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
import {LOAD_SUCCESS as LOAD_QUESTION_SUCCESS} from './findOne';
import Immutable from 'immutable';
import { BY_PORTAL_LIST_SUCCESS } from './byPortal';
import {
  normalizeBy
} from 'utils/normalize';

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
    case BY_PORTAL_LIST_SUCCESS:
      return state.withMutations(map=> {
        const {questions} = action.result.data;
        const {entities} = normalizeBy(questions, 'shortId');
        map.merge(entities);
      });
    default:
      return state;
  }
}
