export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const SET_SELECTED_DATE = 'knexpert/call/setSelectedDate/LOAD';
export const SET_SELECTED_DATE_SUCCESS = 'knexpert/call/setSelectedDate/SUCCESS';
export const SET_SELECTED_DATE_FAIL = 'knexpert/call/setSelectedDate/FAIL';

export function setSelectedDate(id, data) {
  return {
    types: [SET_SELECTED_DATE, SET_SELECTED_DATE_SUCCESS, SET_SELECTED_DATE_FAIL],
    promise: (client) => client.put(`api/v1/call/${id}/setdate`, { data })
  };
}