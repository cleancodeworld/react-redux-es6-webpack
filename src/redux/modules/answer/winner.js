export const WINNER = 'knexpert/answer/WINNER';
export const WINNER_SUCCESS = 'knexpert/answer/WINNER_SUCCESS';
export const WINNER_FAIL = 'knexpert/answer/WINNER_FAIL';

export function winner(answer, questionShortId) {
  return {
    types: [WINNER, WINNER_SUCCESS, WINNER_FAIL],
    promise: (client) => client.put(`/api/v1/answer/${answer.get('id')}/winner`),
    data: {
      answerId: answer.get('id'),
      questionShortId
    }
  };
}
