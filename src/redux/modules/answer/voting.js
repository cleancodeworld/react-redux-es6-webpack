export const VOTE_UP = 'knexpert/answer/VOTE_UP';
export const VOTE_UP_SUCCESS = 'knexpert/answer/VOTE_UP_SUCCESS';
export const VOTE_UP_FAIL = 'knexpert/answer/VOTE_UP_FAIL';

export const VOTE_DOWN = 'knexpert/answer/VOTE_UP';
export const VOTE_DOWN_SUCCESS = 'knexpert/answer/VOTE_UP_SUCCESS';
export const VOTE_DOWN_FAIL = 'knexpert/answer/VOTE_UP_FAIL';

import {showSignUpModal} from '../auth';

export function voteUp(answer, questionShortId, userId) {
  if (!userId) return showSignUpModal();
  return {
    types: [VOTE_UP, VOTE_UP_SUCCESS, VOTE_UP_FAIL],
    promise: (client) => client.put(`/api/v1/answer/id/${answer.get('id')}/vote/up`),
    data: {
      answerId: answer.get('id'),
      questionShortId
    }
  };
}

export function voteDown(answer, questionShortId, userId) {
  if (!userId) return showSignUpModal();
  return {
    types: [VOTE_DOWN, VOTE_DOWN_SUCCESS, VOTE_DOWN_FAIL],
    promise: (client) => client.put(`/api/v1/answer/id/${answer.get('id')}/vote/down`),
    data: {
      answerId: answer.get('id'),
      questionShortId
    }
  };
}
