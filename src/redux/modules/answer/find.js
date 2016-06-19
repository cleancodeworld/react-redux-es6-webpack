export const LOAD = 'knexpert/answers/LOAD';
export const LOAD_SUCCESS = 'knexpert/answers/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/answers/LOAD_FAIL';

export function find(id, name) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/answer/${id}/${name}`),
    data: {
      questionId: id
    }
  };
}

export function isLoaded(globalState, id) {
  return globalState.questionLoaded
    && globalState.questionLoaded.getIn([id, 'answers']);
}
