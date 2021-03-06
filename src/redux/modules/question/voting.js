export const VOTE_UP = 'knexpert/question/VOTE_UP';
export const VOTE_UP_SUCCESS = 'knexpert/question/VOTE_UP_SUCCESS';
export const VOTE_UP_FAIL = 'knexpert/question/VOTE_UP_FAIL';

export const VOTE_DOWN = 'knexpert/question/VOTE_UP';
export const VOTE_DOWN_SUCCESS = 'knexpert/question/VOTE_UP_SUCCESS';
export const VOTE_DOWN_FAIL = 'knexpert/question/VOTE_UP_FAIL';

import {showSignUpModal} from '../auth';

export function voteUp(question, userId) {
  if (!userId) return showSignUpModal();
  return {
    types: [VOTE_UP, VOTE_UP_SUCCESS, VOTE_UP_FAIL],
    promise: (client) => client.put(`/api/v1/question/name/${question.get('id')}/${question.get('slug')}/vote/up`),
    data: {
      questionShortId: question.get('shortId')
    }
  };
}

export function voteDown(question, userId) {
  if (!userId) return showSignUpModal();
  return {
    types: [VOTE_DOWN, VOTE_DOWN_SUCCESS, VOTE_DOWN_FAIL],
    promise: (client) => client.put(`/api/v1/question/name/${question.get('id')}/${question.get('slug')}/vote/down`),
    data: {
      questionShortId: question.get('shortId')
    }
  };
}
