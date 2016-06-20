export const FAVORITE = 'knexpert/question/FAVORITE';
export const FAVORITE_SUCCESS = 'knexpert/question/FAVORITE_SUCCESS';
export const FAVORITE_FAIL = 'knexpert/question/FAVORITE_FAIL';

export const UNFAVORITE = 'knexpert/question/UNFAVORITE';
export const UNFAVORITE_SUCCESS = 'knexpert/question/UNFAVORITE_SUCCESS';
export const UNFAVORITE_FAIL = 'knexpert/question/UNFAVORITE_FAIL';

export function favorite(id) {
  return {
    types: [FAVORITE, FAVORITE_SUCCESS, FAVORITE_FAIL],
    promise: (client) => client.get(`/api/v1/question/name/${id}/${name}`),
    data: {
      questionId: id
    }
  };
}

export function unfavorite(id) {
  return {
    types: [UNFAVORITE, UNFAVORITE_SUCCESS, UNFAVORITE_FAIL],
    promise: (client) => client.get(`/api/v1/question/name/${id}/${name}`),
    data: {
      questionId: id
    }
  };
}
