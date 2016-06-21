export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
import {LOAD_SUCCESS as LOAD_QUESTION_SUCCESS} from './findOne';
import Immutable from 'immutable';
import { BY_PORTAL_LIST_SUCCESS } from './byPortal';
import {LOAD_SUCCESS as LOAD_ANSWERS_SUCCESS} from '../answer/find';
import {ADD_SUCCESS as ADD_ANSWER_SUCCESS} from '../answer/create';
import {VOTE_UP_SUCCESS as QUESTION_VOTE_UP_SUCCESS} from './voting';

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
        map.set(question.shortId, Immutable.fromJS(question));
      });
    case ADD_ANSWER_SUCCESS:
      return state.withMutations(map=> {
        const answer = action.result.data;
        const {questionShortId} = action.data;
        map.setIn([questionShortId, 'answers', 'entities', answer.id], Immutable.fromJS(answer));
        map.updateIn([questionShortId, 'answers', 'order', answer.id], array=> array ? array.push(answer.id) : [answer.id]);
      });
    case QUESTION_VOTE_UP_SUCCESS:
      return state.withMutations(map=> {
        const {questionShortId} = action.data;
        map.updateIn([questionShortId, 'votes'], votes=> votes ? votes + 1 : 1);
      });
    case LOAD_ANSWERS_SUCCESS:
      return state.withMutations(map=> {
        const {answers} = action.result.data;
        const normalized = normalizeBy(answers, 'id');
        const {questionId} = action.data;
        map.setIn([questionId, 'answers'], Immutable.fromJS(normalized));
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
