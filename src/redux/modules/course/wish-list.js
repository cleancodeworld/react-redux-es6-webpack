export const ADD_TO_WISH_LIST = 'knexpert/course/ADD_TO_WISH_LIST';
export const ADD_TO_WISH_LIST_SUCCESS = 'knexpert/ADD_TO_WISH_LIST_SUCCESS';
export const ADD_TO_WISH_LIST_FAIL = 'knexpert/course/ADD_TO_WISH_LIST_FAIL';

export function addToWishList(courseName) {
  return {
    types: [ADD_TO_WISH_LIST, ADD_TO_WISH_LIST_SUCCESS, ADD_TO_WISH_LIST_FAIL],
    promise: (client) => client.get(`/api/v1/course/name/${courseName}`),
    data: {
      courseName
    }
  };
}
