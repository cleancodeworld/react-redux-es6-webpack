export const CREATE = 'knexpert/question/CREATE';
export const CREATE_SUCCESS = 'knexpert/question/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/question/CREATE_FAIL';

export function create(model) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post(`/api/v1/question`, { data: model }),
    data: model
  };
}
