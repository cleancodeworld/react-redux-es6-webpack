export const LOAD = 'knexpert/question/LOAD';
export const LOAD_SUCCESS = 'knexpert/question/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/question/LOAD_FAIL';

export function findOne(questionId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/question/name/${questionId}`),
    data: {
      questionId
    }
  };
}

export function isLoaded(globalState, questionId) {
  return globalState.questionLoaded
    && globalState.questionLoaded.getIn(['entities', questionId]);
}
