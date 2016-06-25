export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const REMOVE = 'knexpert/answer/REMOVE';
export const REMOVE_SUCCESS = 'knexpert/answer/REMOVE_SUCCESS';
export const REMOVE_FAIL = 'knexpert/answer/REMOVE_FAIL';
import {showSignUpModal} from '../auth';

export function remove(answer, question, userId) {
  if (!userId) return showSignUpModal();
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.del(`/api/v1/answer/id/${answer.get('id')}`),
    data: {
      answerId: answer.get('id'),
      questionShortId: question.get('shortId'),
    }
  };
}
