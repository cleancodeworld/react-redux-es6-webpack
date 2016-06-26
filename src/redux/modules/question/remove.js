export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const REMOVE = 'knexpert/question/REMOVE';
export const REMOVE_SUCCESS = 'knexpert/question/REMOVE_SUCCESS';
export const REMOVE_FAIL = 'knexpert/question/REMOVE_FAIL';
import {showSignUpModal} from '../auth';

export function remove(question, userId) {
  if (!userId) return showSignUpModal();
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.del(`/api/v1/question/name/${question.get('id')}/${question.get('slug')}`),
    data: {
      questionShortId: question.get('shortId'),
    }
  };
}
