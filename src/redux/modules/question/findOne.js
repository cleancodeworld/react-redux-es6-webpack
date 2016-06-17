export const LOAD = 'knexpert/question/LOAD';
export const LOAD_SUCCESS = 'knexpert/question/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/question/LOAD_FAIL';

export function findOne(id, name) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/question/name/${id}/${name}`),
    data: {
      questionId: id
    }
  };
}

export function isLoaded(globalState, id) {
  return globalState.questionLoaded
    && globalState.questionLoaded.get(id);
}
