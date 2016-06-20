export const VOTE_UP = 'knexpert/question/VOTE_UP';
export const VOTE_UP_SUCCESS = 'knexpert/question/VOTE_UP_SUCCESS';
export const VOTE_UP_FAIL = 'knexpert/question/VOTE_UP_FAIL';

export const VOTE_DOWN = 'knexpert/question/VOTE_UP';
export const VOTE_DOWN_SUCCESS = 'knexpert/question/VOTE_UP_SUCCESS';
export const VOTE_DOWN_FAIL = 'knexpert/question/VOTE_UP_FAIL';

export function voteUp(id, name) {
  return {
    types: [VOTE_UP, VOTE_UP_SUCCESS, VOTE_UP_FAIL],
    promise: (client) => client.get(`/api/v1/question/name/${id}/${name}`),
    data: {
      questionId: id
    }
  };
}

export function voteDown(id, name) {
  return {
    types: [VOTE_DOWN, VOTE_DOWN_SUCCESS, VOTE_DOWN_FAIL],
    promise: (client) => client.get(`/api/v1/question/name/${id}/${name}`),
    data: {
      questionId: id
    }
  };
}
