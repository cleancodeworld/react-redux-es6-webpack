export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const BY_PORTAL_LIST = 'knexpert/question/BY_PORTAL_LIST';
export const BY_PORTAL_LIST_SUCCESS = 'knexpert/question/BY_PORTAL_LIST_SUCCESS';
export const BY_PORTAL_LIST_FAIL = 'knexpert/question/BY_PORTAL_LIST_FAIL';
import {CREATE_SUCCESS as QUESTION_CREATE_SUCCESS} from './create';
import {
  REMOVE_SUCCESS as QUESTION_REMOVE_SUCCESS
} from './../question/remove';

import Immutable from 'immutable';
import {
  normalizeBy
} from 'utils/normalize';

import { RESET_COURSES } from './loaded';

const initialState = Immutable.fromJS({
  loaded: false,
  order: [],
  entities: {}
});

export default function byPortal(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case QUESTION_REMOVE_SUCCESS:
      return state.withMutations(map => {
        const {questionShortId} = action.data;
        map.removeIn(['entities', questionShortId]);
        map.updateIn(['order'], array=>array.filter((question)=> question !== questionShortId));
      });
    case QUESTION_CREATE_SUCCESS:
      return state.withMutations(map => {
        const {question} = action.result.data;
        map.updateIn(['order'], array=> array ? array.push(question.shortId) : [question.shortId]);
        map.setIn(['entities', question.shortId], true);
      });
    case BY_PORTAL_LIST_SUCCESS:
      return state.withMutations(map=> {
        const {questions} = action.result.data;
        const {order} = normalizeBy(questions, 'shortId');
        order.map(question=> {
          map.setIn(['entities', question], true);
        });
        map.set('order', Immutable.fromJS(order));
        map.set('loaded', true);
      });
    case RESET_COURSES:
      return state.set('loaded', false);
    default:
      return state;
  }
}

export function load(portalName) {
  return {
    types: [BY_PORTAL_LIST, BY_PORTAL_LIST_SUCCESS, BY_PORTAL_LIST_FAIL],
    promise: (client) => client.get(`api/v1/question/portal/${portalName}`)
  };
}

export function isLoaded(globalState) {
  return globalState.questionsByPortal && globalState.questionsByPortal.get('loaded');
}
