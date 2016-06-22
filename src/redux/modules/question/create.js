export const CREATE = 'knexpert/question/CREATE';
export const CREATE_SUCCESS = 'knexpert/question/CREATE_SUCCESS';
export const CREATE_FAIL = 'knexpert/question/CREATE_FAIL';
import {SubmissionError} from 'redux-form';

export function create(model) {
  return dispatch => {
    return dispatch({
      types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
      promise: (client) => client.post(`/api/v1/question`, { data: model }),
      data: model
    })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
