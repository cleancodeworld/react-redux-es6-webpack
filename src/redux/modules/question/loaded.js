export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
import {CREATE_SUCCESS as QUESTION_CREATE_SUCCESS} from './create';
import {LOAD_SUCCESS as LOAD_QUESTION_SUCCESS} from './findOne';
import Immutable from 'immutable';
import { BY_PORTAL_LIST_SUCCESS } from './byPortal';
import {LOAD_SUCCESS as LOAD_ANSWERS_SUCCESS} from '../answer/find';
import {
  VOTE_UP_SUCCESS as QUESTION_VOTE_UP_SUCCESS,
  VOTE_DOWN_SUCCESS as QUESTION_VOTE_DOWN_SUCCESS,
} from './voting';
import {
  VOTE_UP_SUCCESS as ANSWER_VOTE_UP_SUCCESS,
  VOTE_DOWN_SUCCESS as ANSWER_VOTE_DOWN_SUCCESS,
} from './../answer/voting';

import {
  ADD_SUCCESS as ANSWER_ADD_SUCCESS
} from './../answer/create';

import {
  normalizeBy
} from 'utils/normalize';

const initialState = Immutable.fromJS({});

export default function loaded(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case QUESTION_CREATE_SUCCESS:
      return state.withMutations(map => {
        const {question} = action.result.data;
        map.mergeIn([question.shortId], Immutable.fromJS(question));
      });
    case ANSWER_ADD_SUCCESS:
      return state.withMutations(map => {
        const {questionShortId} = action.data;
        const {answer} = action.result.data;
        map.mergeIn([questionShortId, 'answers', 'entities', answer.id], Immutable.fromJS(answer));
        map.updateIn([questionShortId, 'answers', 'order'], array=> array ? array.push(answer.id) : [answer.id]);
      });
    case ANSWER_VOTE_DOWN_SUCCESS:
    case ANSWER_VOTE_UP_SUCCESS:
      return state.withMutations(map=> {
        const {questionShortId, answerId} = action.data;
        const {votes} = action.result.data;
        map.setIn([questionShortId, 'answers', 'entities', answerId, 'votes'], votes);
      });
    case LOAD_QUESTION_SUCCESS:
      return state.withMutations(map=> {
        const question = action.result.data;
        map.set(question.shortId, Immutable.fromJS(question));
      });
    case QUESTION_VOTE_UP_SUCCESS:
    case QUESTION_VOTE_DOWN_SUCCESS:
      return state.withMutations(map=> {
        const {questionShortId} = action.data;
        const {votes} = action.result.data;
        map.setIn([questionShortId, 'votes'], votes);
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
