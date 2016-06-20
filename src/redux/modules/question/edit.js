export const CREATE = 'knexpert/question/CREATE';
export const CREATE_SUCCESS = 'knexpert/question/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/question/CREATE_FAIL';
import { SubmissionError } from 'redux-form';

export function edit(model) {
  return dispatch =>
    dispatch({
      types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
      promise: (client) => client.put(`/api/v1/question/name/${model.id}/${model.slug}`, { data: model }),
      data: model
    }).catch(res => {
      throw new SubmissionError({ _error: res.error });
    });
}
